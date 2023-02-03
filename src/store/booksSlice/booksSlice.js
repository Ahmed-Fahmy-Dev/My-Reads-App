import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAll, update, search, get } from '../../api/BooksAPI';

const initialState = {
  data: [],
  book: {},
  searchedBooks: [],
  isLoading: false,
  error: null,
};

/**
 * fetches Books from DB
 * @returns an array of books where is each book is represented as an object
 */
export const fetchBooks = createAsyncThunk('books/fetchBooks', async (_, { rejectWithValue }) => {
  try {
    const data = await getAll();
    return data;
  } catch (err) {
    console.error(err.message);
    return rejectWithValue('Something went wrong. Please reload the page or try again later.');
  }
});

/**
 * update Books on DB
 * @param {object}  - an object holding the book id and the shelf it has to placed on
 * @returns an array of shelves each shelf containing the book ids it holds
 */
export const updateBookCategory = createAsyncThunk(
  'books/updateBookCategory',
  async ({ id, shelf }, { rejectWithValue }) => {
    try {
      const data = await update(id, shelf);
      return data;
    } catch (err) {
      console.error(err.message);
      return rejectWithValue('Something went wrong. Please reload the page or try again later.');
    }
  }
);

export const searchBooks = createAsyncThunk('books/searchBooks', async (query, { rejectWithValue }) => {
  console.log(query);
  try {
    const data = await search(query);
    return data;
  } catch (err) {
    console.error(err.message);
    return rejectWithValue('Something went wrong. Please reload the page or try again later.');
  }
});

export const fetchBook = createAsyncThunk('books/fetchBook', async ({ bookId }, { rejectWithValue }) => {
  try {
    const data = await get(bookId);
    return data;
  } catch (err) {
    console.error(err.message);
    return rejectWithValue('Something went wrong. Please reload the page or try again later.');
  }
});

const booksSlice = createSlice({
  name: 'books',
  initialState,

  reducers: {
    resetSearchResults: (state, action) => {
      state.searchedBooks = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchBooks.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });

    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });

    builder.addCase(updateBookCategory.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(updateBookCategory.fulfilled, (state, action) => {
      // when updating a book shelf the following happens:
      // - we search for the book id in our book collection, if it exists then we update the shelf value directly, if not that means that the update happened on the search page and we push this book to our collection as a new book.
      // - in order to update the control for each book instance on the search page instantly, we also check if we have any searched books, if yes then we find the book by id and update also its shelf directly.
      const { id, shelf } = action.meta.arg;
      const index = state.data.findIndex((book) => book.id === id);

      if (index >= 0) {
        state.data[index].shelf = shelf;
      } else {
        const newBook = state.searchedBooks.find((book) => book.id);
        state.data.push(newBook);
      }

      if (state.searchedBooks.length) {
        const index = state.searchedBooks.findIndex((book) => book.id === id);

        state.searchedBooks[index].shelf = shelf;
      }

      state.isLoading = false;
    });

    builder.addCase(updateBookCategory.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });

    builder.addCase(searchBooks.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(searchBooks.fulfilled, (state, action) => {
      // after receiving the array of searched books the following happens:
      // - if the search results turn to be false then we set the searc results to an empty array
      // - if the search results turn to be true, then we check if there are books in the search already added to any shelf earlier, if yes then we add to the searched book the shelf value, if not then we add a shelf value of none.
      const updatedSearchedBooks = Array.isArray(action.payload)
        ? action.payload.map((searchedBook) => {
            if (state.data.some(({ id }) => searchedBook.id === id)) {
              const index = state.data.findIndex((book) => book.id === searchedBook.id);

              return { ...searchedBook, shelf: state.data[index].shelf };
            } else {
              return { ...searchedBook, shelf: 'none' };
            }
          })
        : [];

      state.searchedBooks = updatedSearchedBooks;

      state.isLoading = false;
    });

    builder.addCase(searchBooks.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });

    builder.addCase(fetchBook.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(fetchBook.fulfilled, (state, action) => {
      console.log(action.payload);
      state.book = action.payload;
      state.isLoading = false;
    });

    builder.addCase(fetchBook.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
  },
});

export default booksSlice.reducer;

export const { resetSearchResults } = booksSlice.actions;

import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { searchBooks, resetSearchResults } from '../../store/booksSlice/booksSlice';
import { BookContainer } from '../../components';
import debounce from 'lodash.debounce';

const SearchPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchedBooks, isLoading } = useSelector((store) => store.books, shallowEqual);

  const handleBackbtnClick = () => {
    navigate('/');
    dispatch(resetSearchResults([]));
  };

  const handleChange = (e) => {
    // lodash debounce function to be added to optimize and limit API calls to search endpoint
    e.target.value.length > 0 ? dispatch(searchBooks(e.target.value)) : dispatch(resetSearchResults([]));
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <button className="close-search" onClick={handleBackbtnClick} />
        <div className="search-books-input-wrapper">
          <input type="text" placeholder="Search by title, author, or ISBN" onChange={debounce(handleChange, 750)} />
        </div>
      </div>

      <div className="search-books-results">
        {isLoading ? <p>...Searching</p> : <BookContainer books={searchedBooks} />}
      </div>
    </div>
  );
};
export default SearchPage;

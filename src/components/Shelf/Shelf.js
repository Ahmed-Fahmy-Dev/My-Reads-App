import React from 'react';
import PropTypes from 'prop-types';
import BookContainer from '../BookContainer/BookContainer';

const Shelf = ({ books, title, shelf }) => {
  // books are filtered using the shelf property in each book and the shelf prop created manually that matches one of the 3 shelf categories available
  const filteredBooks = books.filter((books) => books.shelf === shelf);

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <BookContainer books={filteredBooks} />
      </div>
    </div>
  );
};

Shelf.propTypes = {
  books: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  shelf: PropTypes.string.isRequired,
};

export default Shelf;

import React from 'react';
import PropTypes from 'prop-types';
import Book from '../Book/Book';

const BookContainer = ({ books }) => {
  const bookCollection = (
    <ol className="books-grid">
      {books.map(({ title, authors, imageLinks, id, shelf }) => (
        <li key={id}>{<Book title={title} author={authors} url={imageLinks} id={id} shelf={shelf} />}</li>
      ))}
    </ol>
  );

  return (
    <>
      {' '}
      {books.length ? (
        bookCollection
      ) : (
        <p style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }}>There are no Books</p>
      )}
    </>
  );
};

BookContainer.propTypes = {
  books: PropTypes.array.isRequired,
};

export default BookContainer;

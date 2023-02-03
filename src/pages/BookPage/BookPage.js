import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { fetchBook } from '../../store/booksSlice/booksSlice';

const BookPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bookId = useParams();
  const { book, error } = useSelector((store) => store.books, shallowEqual);
  const { imageLinks, title, authors } = book;

  useEffect(() => {
    dispatch(fetchBook(bookId));
  }, []);

  const bookJsx = (
    <div className="book-container">
      <div
        className="front-cover"
        style={{
          backgroundImage: `url(${imageLinks?.thumbnail})`,
          backgroundRepeat: 'no repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>

      <h1 className="book-title large-font">{title}</h1>
      <h2 className="book-authors large-font">
        {authors && authors.map((item, index) => <span key={index}>{item} </span>)}
      </h2>
    </div>
  );

  if (error)
    return (
      <p style={{ color: 'red', fontWeight: 'bold', fontSize: '50px', textAlign: 'center', margin: '40vh 0' }}>
        {error}
      </p>
    );

  return (
    <>
      {bookJsx}
      <button className="home-btn" onClick={() => navigate('/')}>
        HomePage
      </button>
    </>
  );
};

export default BookPage;

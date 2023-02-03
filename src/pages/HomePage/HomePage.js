import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Shelf } from '../../components';
import { fetchBooks } from '../../store/booksSlice/booksSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const books = useSelector((store) => store.books.data);

  useEffect(() => {
    dispatch(fetchBooks());
  }, []);

  return (
    <div className="app">
      <div className="list-books">
        <div className="list-books-content">
          <Shelf books={books} title="Currently Reading" shelf="currentlyReading" />
          <Shelf books={books} title="Want to Read" shelf="wantToRead" />
          <Shelf books={books} title="Read" shelf="read" />
        </div>
        <div className="open-search">
          <button onClick={() => navigate('/my-reads-app/search')} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;

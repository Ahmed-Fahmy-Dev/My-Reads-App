import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { updateBookCategory } from '../../store/booksSlice/booksSlice';

const Book = ({ title, author, url, id, shelf }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMenuChange = (e) => {
    dispatch(updateBookCategory({ id, shelf: e.target.value }));
  };

  const bookControlItems = [
    {
      value: 'currentlyReading',
      text: 'Currently Reading',
    },
    {
      value: 'wantToRead',
      text: 'Want to Read',
    },
    {
      value: 'read',
      text: 'Read',
    },
    {
      value: 'none',
      text: 'None',
    },
  ];

  const shelfOptions = bookControlItems.map(({ value, text }, index) => (
    <option key={index} value={value}>
      {text}
    </option>
  ));

  return (
    <div className="book">
      <div className="book-top">
        <div
          onClick={() => navigate(`/my-reads-app/book/${id}`)}
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${url?.thumbnail})`,
          }}
        ></div>
        <div className="book-shelf-changer">
          <select onChange={handleMenuChange} defaultValue={shelf}>
            <option value="none" disabled>
              Move to...
            </option>
            {shelfOptions}
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">
        {author.map((item, index) => (
          <span key={index}>{item} </span>
        ))}
      </div>
    </div>
  );
};

Book.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.array,
  url: PropTypes.object,
  id: PropTypes.string.isRequired,
  shelf: PropTypes.string.isRequired,
};

Book.defaultProps = {
  url: {},
  author: ['Unknown'],
};

export default Book;

import React, { useEffect, useState } from 'react';
import { getArticles } from '../api';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await getArticles();
      setArticles(response.data);
    };

    fetchArticles();
  }, []);

  return (
    <div className="container">
      <h1>For You</h1>
      <ul>
        {articles.map(article => (
          <li key={article._id}>
            <Link to={`/articles/${article._id}`}>{article.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;

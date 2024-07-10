// src/components/Admin/AdminArticlesPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getArticleByAuthor, deleteArticleById } from '../../api';

const AdminArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = JSON.parse(localStorage.getItem('user'))._id;
  const fetchArticles = async () => {
    try {
      const response = getArticleByAuthor(userId);
      /*const response = await axios.get(`/api/articles/author/${userId}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      }); */
      //console.log(`Author Articles: ${(await response).data}`);
      //const response = await axios.get(`/api/articles/author/${userId}`);
      setArticles((await response).data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = deleteArticleById(id);
      //await axios.delete(`/api/articles/${id}`);
      setArticles(articles.filter(article => article._id !== id));
      console.log('Article deleted:', response.data);
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <h1>Your Articles</h1>
      <ul>
        {articles.map(article => (
          <li key={article._id}>
            <Link to={`/articles/${article._id}`}>{article.title}</Link>
            <button onClick={() => handleDelete(article._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminArticlesPage;

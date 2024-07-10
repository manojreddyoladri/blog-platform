// src/pages/ArticlePage.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const ArticlePage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  console.log(`${id}`);
  useEffect(() => {
    const getArticle = async () => {
      try {
        
        const response = await axios.get(`http://localhost:5001/api/articles/${id}`);
        console.log(`${id}`);
        setArticle(response.data);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };

    getArticle();
  }, [id]);

  console.log(`${id}`);
  if (!article) return <div>Loading...</div>;

  return (
    <div>
      <h1>{article.title}</h1>
      <ReactMarkdown>{article.content}</ReactMarkdown>
    </div>
  );
};

export default ArticlePage;

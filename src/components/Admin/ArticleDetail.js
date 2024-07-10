import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleById, updateArticle } from '../../api';
import ArticleEditor from './ArticleEditor';
import '../../styles/ArticleDetail.css';

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const userId = JSON.parse(localStorage.getItem('user'))._id;

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await getArticleById(id);
        setArticle(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching article:', error);
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  const handleSave = async (updatedArticle) => {
    setArticle(updatedArticle);
    setIsEditing(false);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!article) {
    return <p>Article not found</p>;
  }

  return (
    <div className="container">
      {isEditing ? (
        <ArticleEditor article={article} onSave={handleSave} />
      ) : (
        <div>
          <h1>{article.title}</h1>
          <div className="content">{article.content}</div>
          {article.author === userId && (
            <button onClick={() => setIsEditing(true)}>Edit Article</button>
          )}
        </div>
      )}
    </div>
  );
};

export default ArticleDetail;

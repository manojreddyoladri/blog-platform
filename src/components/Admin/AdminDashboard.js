import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArticleEditor from './ArticleEditor';
import '../../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [currentArticle, setCurrentArticle] = useState(null);

  const handleSave = (savedArticle) => {
    setCurrentArticle(savedArticle);
    navigate(`/articles/${savedArticle._id}`);
  };

  return (
    <div className="container">
     
      <button onClick={() => navigate('/admin/articles')}>View Your Articles</button>
      <div className="editor-container">
        <ArticleEditor article={currentArticle} onSave={handleSave} />
      </div>
    </div>
  );
};

export default AdminDashboard;

import React, { useState } from 'react';
import MarkdownEditor from './MarkdownEditor';
import { saveArticle, updateArticle } from '../../api';
import '../../styles/ArticleEditor.css';

const ArticleEditor = ({ article, onSave }) => {
  const [title, setTitle] = useState(article ? article.title : '');
  const [content, setContent] = useState(article ? article.content : '');
  const [category, setCategory] = useState(article ? article.category : '');
  const [isNew, setIsNew] = useState(!article);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const articleData = { title, content, category };
      let savedArticle;
      if (isNew) {
        savedArticle = await saveArticle(articleData, token);
      } else {
        savedArticle = await updateArticle(article._id, articleData);
      }
      onSave(savedArticle.data);
    } catch (error) {
      console.error('Error saving article:', error);
    }
  };

  const handleNewArticle = () => {
    setTitle('');
    setContent('');
    setCategory('');
    setIsNew(true);
  };

  return (
    <div>
      
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <MarkdownEditor value={content} onChange={setContent} />
      <button onClick={handleSave}>{isNew ? 'Save Article' : 'Update Article'}</button>
      <button onClick={handleNewArticle}>New Article</button>
    </div>
  );
};

export default ArticleEditor;

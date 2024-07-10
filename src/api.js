import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

export const signup = (name, email, password) => axios.post(`${API_URL}/auth/signup`, { name, email, password });
export const login = (email, password) => axios.post(`${API_URL}/auth/login`, { email, password });
export const getArticles = () => axios.get(`${API_URL}/articles`);
export const createArticle = (article) => axios.post(`${API_URL}/articles`, article);
export const updateArticle = (id, article) => axios.put(`${API_URL}/articles/${id}`, article);
export const deleteArticle = (id) => axios.delete(`${API_URL}/articles/${id}`);
export const saveArticle = (article, token) => axios.post(`${API_URL}/articles`, article, {headers: {Authorization: `Bearer ${token}`}});
export const getArticleByAuthor = (id) => axios.get(`${API_URL}/articles/author/${id}`);
export const getArticleById = (id) => axios.get(`${API_URL}/articles/${id}`);
export const deleteArticleById = (id) => axios.delete(`${API_URL}/articles/${id}`);
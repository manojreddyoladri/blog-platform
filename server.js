const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());

const uri = "mongodb+srv://manojreddyoladri12:SvdtzcO7t6QfTKyX@cluster0.nhhn8rv.mongodb.net/blog-platform?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('MongoDB connection error:', err));

const Article = mongoose.model('Article', {
  title: String,
  content: String,
  author: String,
  category: String,
  dateCreated: { type: Date, default: Date.now },
  dateModified: { type: Date, default: Date.now },
});

app.post('/api/articles', async (req, res) => {
  const { title, content, author, category } = req.body;
  const article = new Article({ title, content, author, category });
  await article.save();
  res.json(article);
});

app.get('/api/articles', async (req, res) => {
  const articles = await Article.find();
  res.json(articles);
});

app.put('/api/articles/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content, category } = req.body;
  const article = await Article.findByIdAndUpdate(id, { title, content, category, dateModified: Date.now() }, { new: true });
  res.json(article);
});

app.delete('/api/articles/:id', async (req, res) => {
  const { id } = req.params;
  await Article.findByIdAndDelete(id);
  res.json({ message: 'Article deleted' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

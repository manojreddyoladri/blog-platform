const express = require('express');
const Article = require('../models/Article');
const { authMiddleware } = require('./middleware/auth');
const router = express.Router();


// Create a new article
router.post('/', authMiddleware, async (req, res) => {
  //console.log("article creation route hit");
  try {
    const { title, content, category } = req.body;
    const userId = req.user._id; // Assuming the auth middleware adds the user to the request
    //console.log(`Checking the console with title: ${title}`);
    //console.log(`userId: ${userId}`);
    const newArticle = new Article({
      title,
      content,
      category,
      author: userId,
    });

    const savedArticle = await newArticle.save();
    res.status(201).json(savedArticle);
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all articles
router.get('/', async (req, res) => {
  const articles = await Article.find();
  res.json(articles);
});

// Get articles by author
router.get('/author/:author', async (req, res) => {
  //console.log("articles byt author route hit");
  try {
    //console.log(req.params.author);
    const articles = await Article.find({ author: req.params.author });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single article by ID
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id.trim();  // Trim the ID to remove any newline or whitespace characters
    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json(article);
  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update an article by ID
router.put('/:id', async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Delete an article by ID
router.delete('/:id', async (req, res) => {
  console.log(`Delete request for article ID: ${req.params.id}`);
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: 'Article deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;


const express = require('express');
const { getPosts, searchPosts, addPost } = require('./db');
const app = express();
const bodyParser = require('body-parser')
const multer = require('multer') // v1.0.5
const upload = multer() // for parsing multipart/form-data

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
app.disable('etag');

const port = 3000

app.get('/', async (req, res) => {
  const posts = await getPosts();
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.send(JSON.stringify({ posts }))
  res.end()
})

app.get('/search', async (req, res) => {
  const search = req.query.search
  const posts = await searchPosts(search)
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.send(JSON.stringify({ posts }))
  res.end()
})

app.post('/add', upload.array(), async (req, res) => {
  const post_id = req.body?.post_id
  const post_text = req.body?.post_text
  const username = req.body?.username
  const postAdded = await addPost(post_id, post_text, username)
  if (postAdded) {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.send(JSON.stringify('Post added successfully'))
    res.end()
  } else {
    res.statusCode = 400
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.send(JSON.stringify('Post not added'))
    res.end()
  }
})

app.listen(port, () => {
  console.log(`Grapper app listening on port ${port}`)
})



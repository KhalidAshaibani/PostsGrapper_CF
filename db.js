const mysql = require('mysql');
const connection = mysql.createConnection({
  connectionLimit: 100,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'APIProject'
});

excuteQuery = (query, callback) => {
  return new Promise((resolve, reject) => {
    connection.query(query, (err, rows, fields) => {
      if (err) {
        reject(err);
        return;
      }
      callback(rows);
      resolve();
    })
  });

}

const getPosts = async () => {
  const postsArray = [];
  await excuteQuery('SELECT * from posts', (rows) => {
    rows.forEach((post) => {
      postsArray.push({ id: post.post_id, post: post.post_text, username: post.username });
    });
  })

  return postsArray;
}

const searchPosts = async (search) => {
  const postsArray = [];
  await excuteQuery(`SELECT * from posts where post_text like '%${search}%'`, (rows) => {
    rows.forEach((post) => {
      postsArray.push({ id: post.post_id, post: post.post_text, username: post.username });
    });
  })

  return postsArray;
}

const addPost = async (post_id, post_text, username) => {
  let postAdded = false;
  // check if post already exists
  await excuteQuery(`SELECT * FROM posts WHERE post_text = '${post_text}'`, (rows) => {
    if (rows.length > 0) {
      postAdded = true;
    }
  });

  if (postAdded) return postAdded;
  await excuteQuery(`INSERT INTO posts (post_id, post_text, username) VALUES ('${post_id}', '${post_text}', '${username}')`, () => {
    postAdded = true;
  })

  return postAdded;
}

module.exports = {
  getPosts,
  searchPosts,
  addPost
}
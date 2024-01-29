# Prerequisties

- Xampp with Mysql database
- Nodejs Runtime
- Chrome browser

# Install Chrome Extension

install this chrome extension in your chrome browser
https://chromewebstore.google.com/detail/disable-content-security/ieelmcmcagommplceebfedjlakkhpden

# Open Facebook Page

open the facebook page you want to grap its posts

# Create Database

create a database with name `APIProject`
and add the following table

```bash
  CREATE TABLE `posts` (
    `id` int(11) NOT NULL,
    `post_id` varchar(15) NOT NULL,
    `post_text` longtext NOT NULL,
    `username` varchar(255) NOT NULL
  );

  ALTER TABLE `posts` ADD PRIMARY KEY (`id`);

  ALTER TABLE `posts` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
```

# Run Backend Server

`node index.js`

# Paste Console Code

in the desired facebook page, open the console and paste the following code

```bash
  const INTERVAL = 10 * 1000; // 10 seconds

  const getPosts = () => {
    const posts = document.querySelectorAll('[data-ad-preview="message"]');
    const username = window.location.pathname?.replace('/', '');

    posts.forEach((post) => {
      if (post.textContent == '') return;
      var formdata = new FormData();
      formdata.append("post_id", post.getAttribute('id'));
      formdata.append("post_text", post.textContent);
      formdata.append("username", username);

      var requestOptions = {
        method: 'POST',
        body: formdata,
      };

      fetch("http://127.0.0.1:3000/add", requestOptions)
    });

  }

  setInterval(getPosts, INTERVAL);
```

# Search Posts

copy `APIProject` folder to your local host directory `htdocs`, and then access it from your browser

# Screenshots

![1](/screenshots/1.png)

![2](/screenshots/2.png)

![3](/screenshots/3.png)

![4](/screenshots/4.png)

![5](/screenshots/5.png)

![6](/screenshots/6.png)

![7](/screenshots/7.png)

![8](/screenshots/8.png)

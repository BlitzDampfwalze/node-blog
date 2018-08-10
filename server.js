const express = require('express');
const morgan = require('morgan');
const blogPostsRouter = require('./blogPostsRouter');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(morgan('common'));
app.use(express.json());
app.use('/blog-posts', blogPostsRouter);
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + 'index.html');
});

app.listen(PORT, () => console.log(`🖥  listening on port ${PORT}  👍`));

$(() => {
  const BLOG_URL = '/blog-posts';

  let blogTemplate = `
    <div class="blog-posts">
    <h2 class="blog-title"></h2>
    <h4 class="blog-author"></h4>
    <h5 class="blog-date">Date: </h5>
    <p class="blog-content"></p>
    </div>`;

  const getAndDisplayBlogPosts = () => {
    $.getJSON(BLOG_URL, blogPosts => {
      let blogPost = blogPosts.map(post => {
        let element = $(blogTemplate);
        element.attr('id', post.id);
        element.find('.blog-title').text(post.title);
        element.find('.blog-author').text(`Wrtten by: ${post.author}`);
        element.find('.blog-date').text(`Published on: ${post.publishDate}`);
        element.find('.blog-content').text(post.content);
        return element;
      });
      $('.blog-posts-wrapper').html(blogPost);
    });
  };
  getAndDisplayBlogPosts();
});

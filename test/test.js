const chai = require('chai');
const chaiHttp = require('chai-http');
const {app, runServer, closeServer} = require('../server');

const expect = chai.expect;

chai.use(chaiHttp);

describe("Blog Posts", function() { 
    before(function() {
        return runServer();
    });

    after(function() {
        return closeServer();
    });

    it("should list the blog posts on GET", function(){
        return chai
            .request(app)
            .get('/blog-posts')
            .then(function(res){
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.a("array"); //array?
                expect(res.body).to.be.at.least(1);

                res.body.forEach(function(post){
                    expect(post).to.be.a("object");
                    expect(post).to.include.keys['id', 'title', 'content', 'author', 'publishDate'];
                });
            });
    });

    it("should add a blog post on POST", function(){
        const newPost = {title: "The Law", content: "legalizing theft does not make it legitimate", author: "Bastiat"};
        return chai
            .request(app)
            .post("/blog-posts")
            .send(newPost)
            .then(function(res){
                expect(res).to.have.status(201);
                expect(res).to.be.json;
                expect(res.body).to.be.a("object");
                expect(res.body).to.include.keys('title', 'content', 'author')
                expect(res.body.id).to.not.equal(null);
                expect(res.body).to.deep.equal(
                    Object.assign(newPost, { id: res.body.id })
                );
            })
    });

    it("should update/replace posts on PUT", function(){
        const updateBlog = {
            title: 'Example One', 
            content: 'blah blah blah', 
            author: 'Dr. Suess', 
            publishDate: 'Fri Aug 9 2018'
        };

        return chai
            .request(app)
            .get('/blog-posts')
            .then(function(res){
                updateBlog.id = res.body[0].id;

            return chai
            .request(app)
            .put(`/blog-posts/${updateBlog.id}`)
            .send(updateBlog)
            })
            .then(function(res){
                expect(res).to.have.status(204);
            });
    });

    it("should delete blog posts on DELETE", function(){
        return chai
            .request(app)
            .get('/blog-posts')
            .then(function(res){
                return chai.request(app)
                    .delete(`/blog-posts/${res.body[0].id}`)
            })
            .then(function(res){
                expect(res).to.have.status(204);
            });
    })

});
const express = require('express');
const app = express();
const ejs = require('ejs');
const body = require('body-parser');
var _ = require('lodash');
app.use(body.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use('/', express.static(__dirname + '/public'));

let posts = [];

const homeStartingContent = "Get Started by composing a new Blog";

const aboutContent = " We make it easy for everyone to create a beautiful, professional Blog presence.";

const contactContent = "Contact creator @beingvipinkiruba mail@ vipinkiruba.ei18@bitsathy.ac.in";


app.get('/', function (req, res) {
    res.render('home.ejs', {
        Hcontent: homeStartingContent,
        posts: posts
    });
});

app.get('/about', function (req, res) {
    res.render('about.ejs', { Acontent: aboutContent });
});

app.get('/contact', function (req, res) {
    res.render('contact.ejs', { Ccontent: contactContent });
});

app.get('/compose', function (req, res) {
    res.render('compose.ejs');
});

app.post('/compose', function (req, res) {

    const post = {
        title: req.body.x,
        content: req.body.y
    };
    posts.push(post);
    res.redirect('/');
});

app.get('/:path', function (req, res) {

    var reqTitle = _.lowerCase(req.params.path);

    posts.forEach(function (post) {
        var storTitle = _.lowerCase(post.title);
        if (storTitle === reqTitle) {
            res.render('post.ejs', {
                title: post.title,
                content: post.content
            });
        }
    });
});



app.listen(process.env.PORT || 3000, function () {
    console.log('server is on');
});
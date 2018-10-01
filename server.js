const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
// servers the HTML file @ localhost:3000/help.html
app.use(express.static(__dirname + '/public'))

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`

    console.log(log)
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append to serve.log');
        }
    });

    next();
});

app.use((req, res, next) => {
    res.render("maintance.hbs");
});

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.get('/', (req, res) => {
    //res.send('Hello World!');
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'EU DISSE COÉ. RAPA. ZIADaAAaaaaab',
    });
});

app.get('/about', (req, res) =>{
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', (req, res) =>{
    res.send('uh oh ');
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
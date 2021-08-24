// Carregando Módulos

const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const admin = require('./routes/admin');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');


// Configurações
    //Sessão
    app.use(session({
        secret: "secret",
        resave: true,
        saveUninitialized: true
    }));
    app.use(flash());

    //Middleware
    app.use((req, res, next) => {
        res.locals.success_msg = req.flash("success_msg")
        res.locals.error_msg = req.flash("error_msg")
        next()
    })

    // Body Parse
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());

    // Handlebars
    app.engine('handlebars', handlebars({defaultLayout: 'main'}));
    app.set('view engine', 'handlebars');

    // Mongoose
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/blogapp').then(() => {
    console.log('Conectado ao mongo')
    }).catch(err =>{
        console.log("Erro ao conectar: " + err)
    })
    // 

    //Public
    app.use(express.static(path.join(__dirname, 'public'))) 

    app.use((req, res, next) => {
        console.log("MIDDLEWARE")
        next()
    })

// Rotas
    app.use ('/admin', admin);

// Outros
const PORT = 8080;
app.listen(PORT, () =>{
    console.log("Servidor Rodando")
});
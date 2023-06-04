const express = require('express')
const session = require('express-session')
require('dotenv').config()
const mongoose = require('mongoose')
const bodyparser = require("body-parser");
const app = express()
const { routesAuth } = require('./src/routes/authRoutes')



app.set('view engine', 'html')
app.set('views', './src/views')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(session({
    secret: 'keyboard cat',
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: Number(process.env.TIEMPO_EXPIRACION)
    },
    rolling: true,
    resave: true,
    saveUninitialized: false
}));


app.use('/auth', routesAuth)
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json())

mongoose.connect('mongodb://127.0.0.1/prueba-tec', { useNewUrlParser: true, useUnifiedTopology: true })


const port = process.env.PORT || 3000;
app.listen(3000, () => {
    console.log(`Server running on http://localhost:${port}/`);
});



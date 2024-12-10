require("@babel/register");
require('dotenv').config();

const cookieParser = require('cookie-parser')
const express = require("express");
const serverConfig = require("./middlewares&config/config");
const React = require("react");
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const server = express();
serverConfig(server);

// Конфигурация сессий
const sessionConfig = {
    name: 'user_sid',
    store: new FileStore({}),
    secret: process.env.COOKIE_SECRET ?? "ftvyigbuohnpij",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 1
    }
}

// Подключение middleware сессий
server.use(session(sessionConfig));

const Home = require('./routes/Home.routes');
const Login = require('./routes/Login.routes');
const Registration = require('./routes/Registration.routes');
const Profile = require('./routes/Profile.routes');

server.use('/', Home);
server.use('/login', Login);
server.use('/registration', Registration)
server.use('/profile', Profile)

server.listen(process.env.PORT || 3000, () => {
    console.log('Server is working');
})

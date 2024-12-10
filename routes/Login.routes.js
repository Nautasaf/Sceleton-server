const { User } = require('../db/models')

const express = require('express');
const Login = require("../components/Login")
const bcrypt = require('bcrypt')
const session = require("express-session")

const router = express.Router();

router.get('/', (req, res) => {
  const user = req.session.user_sid;
  const templateData = {
    user,
    title: "Login"
  }
  res.renderComponent(Login, templateData)
});

router.post("/", async (req, res) => {
    try {
        // Записываем Имя пользователя и Пароль пользователя в переменные
        const { userEmail, password } = req.body;
        const userFromDB = await User.findOne({where: {email: userEmail}});

        // Поиск по БД с именем пользователя
        if (userFromDB === null) {
            res.status(403).json({ message: 'A user undefined' });
        }

        const samePassword = await bcrypt.compare(password, userFromDB.password)
        if (userFromDB && samePassword) {
            req.session.user_sid = { id: userFromDB.id, email: userFromDB.email };
            res.status(200).json({ message: 'Successful login' });
        } else {
            res.status(403).json({message: "incorrect login or password"});
        }
    } catch (error) {
        console.log("Ошибка: ", error);
    }
})

module.exports = router;
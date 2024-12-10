const { User } = require('../db/models')

const express = require('express');
const Registration = require('../components/Registration')
const bcrypt = require('bcrypt')

const router = express.Router();

// Регистрация нового пользователя
router.get('/', (req, res) => {
    const user = req.session.user_sid;
    const templateData = {
        user,
        title: "Registration"
    }
    res.renderComponent(Registration, templateData)
})

// Проверка при регистрации, есть ли пользователь с таким же именем уже
router.post("/", async (req, res) => {
    // Записываем Имя пользователя и Пароль нового пользователя в переменные
    const { newUserEmail, newUserPassword1, newUserPassword2 } = req.body;
    const email = JSON.stringify(newUserEmail);
    const password1 = JSON.stringify(newUserPassword1);
    const password2 = JSON.stringify(newUserPassword2)
    console.log(email, password1, password2);

    if (password1 === password2) {
        // Поиск по БД с почтой пользователя
        try {
            // Проверка на существование аккаунта в бд
            const userFromDB = await User.findOne({where: {email: email}})
                
            if (!userFromDB) {
                // Если такого пользователя ещё нет, то создаём
                // Хешируем пароль
                const saltRounds = 10;
                const heshedPass = await bcrypt.hash(password1, saltRounds)
    
                const newUser = await User.create({
                    email: newUserEmail,
                    password: heshedPass
                });

                req.session.user_sid = newUser.id;
                res.status(201).json({ message: 'Created' });
            } else {
                res.status(403).json({ message: 'A user with this email already exists' });
            }
        } catch (error) {
            console.log(error, 'Cannot connect to database');
        }
    } else {
        res.status(403).json({ message: 'Passwords do not match' })
    }
})

module.exports = router;
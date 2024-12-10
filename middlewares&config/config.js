const express = require('express');
const morgan = require('morgan');
const ssr = require('./ssr')
// const { getUser, resLocals} = require('./auth');
const path = require('path')

const serverConfig = (app) => {
  // Используем morgan для логирования запросов
  app.use(morgan('dev'));

  // Парсинг JSON-данных
  app.use(express.json());

  // Парсинг данных из HTML-форм
  app.use(express.urlencoded({ extended: true }));

  // рендер реакт компонентов
  app.use(ssr);

  // Подключение статических файлов
  app.use(express.static(path.join(__dirname, '../public')))

  // функция поиска пользователя в БД по ID из сессии
  // app.use(getUser);
  
  // функция наполнения локальных переменных
  // app.use(resLocals)
};

module.exports = serverConfig;
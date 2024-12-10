const express = require('express');
const Home = require('../components/Home');


const router = express.Router();

router.get('/', (req, res) => {
  const user = req.session.user_sid;
  const templateData = {
    user,
    title: "Home page"
  }
  
  res.renderComponent(Home, templateData);
});

module.exports = router;
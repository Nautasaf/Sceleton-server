const express = require('express');
const Profile = require("../components/Profile");

const router = express.Router();

router.get('/', (req, res) => {
    const user = req.session.user_sid;
    const templateData = {
        user,
        title: "Profile"
    }
    res.renderComponent(Profile, templateData)
})

module.exports = router;
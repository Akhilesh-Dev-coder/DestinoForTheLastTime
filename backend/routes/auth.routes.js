const db = require('../configs/database');
const bcrypt = require('bcrypt');
const router = require('express').Router();

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if(!username || !email || !password) {
            return res.status(400).json({ success : false, message : "All Fields are required" });
        }

        const existingUser = await db("user_creds").where({ email }).first();
        if(existingUser) {
            return res.status(400).json({ success : false, message : "User already exist" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [newUserId] = await db("user_creds").insert({
            username,
            email,
            password: hashedPassword,
        });

        res.status(201).json({ success: true, message: "User registered successfully", user: { id: newUserId, username, email }});
    } catch (error) {
        console.log(error);
        res.status(400).json({ success : false, message : "Error Occured", err : error });
    }
})

module.exports = router;
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
});


router.post('/login', async (req, res) => {
    try {
        const { email, password } =req.body;

        if(!email || !password) {
            return res.status(400).json({ success : false, message : "All Fields are required" });
        }

        const user = await db('user_creds').where({ email }).first();
        if(!user) {
            return res.status(401).json({ success : false, message : "user not Found" });
        }

        const compare = await bcrypt.compare(password, user.password);
        if(!compare) {
            return res.status(401).json({ success : false, message : "Invalid Credentials" });
        }

        res.status(200).json({ success : true, message : "user logged In Successfully", user : { email : user.email, username : user.username } });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success : false, message : "Error Occured", err : error });
    }
})

module.exports = router;
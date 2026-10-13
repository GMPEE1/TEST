import express from "express"
import db from "./db.js"
import cors from "cors"
import jwt from 'jsonwebtoken';

const app = express();
app.use(cors());
app.use(express.json());

const SECRET_KEY = "IT672190"

app.post('/login', async (req, res) =>{
    const username = req.body.username;
    const password = req.body.password;

    const [rows] = await db.query(
        "SELECT * FROM user WHERE username = ?",
        [username]
    );

    if(rows.length === 0){
        return res.status(401).json({
            msg: "Username not found"
        });
    }

    const user = rows[0];
    if(user.password !== password){
        return res.status(401).json({
            msg: "Password incorrect"
        });
    }

    const token = jwt.sign(
        {
            id: user.id,
            username: user.username
        },
        SECRET_KEY
    );

    res.json({
        msg: "Login Succecs",
        token
    });
});

app.listen(3000, ()=> {
    console.log('Server Runing');
});
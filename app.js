const express = require('express');
const jwt = require('jsonwebtoken');
const PORT = 8000 || 8080;
const app = express();

app.post("/user/generateToken", (req, res) => {
    const secret_key = "supersecretkey";
    const data = {
        time: new Date(),
        userId: 12,
    }
    const token = jwt.sign(data, secret_key);
    res.send(token);
});

app.get("/user/validateToken", (req, res) => {
    const secret_key = "supersecretkey";
    try {
        const token = req.header.authorization.split(' ')[1];
        console.log(token);
        const verified = jwt.verify(token, secret_key);
        if (verified) {
            res.json("User is verified");
        } else {
            res.json("User is not authorized");
        }
    } catch (error) {
        return res.status(401).json("error");
    }
});

app.listen(PORT, () => {
    console.log(`Connected to port ${PORT}`);
});

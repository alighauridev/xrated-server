const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const errorMiddleware = require("./middlewares/error");
const cors = require("./utils/cors.js");
const cloudinary = require("cloudinary");
const Token = require("./models/token");
const app = express();

// config
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: "config/config.env" });
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(fileUpload());
app.use(cors.corsAll);

app.get('/api/token', async (req, res) => {
    try {
        let token = await Token.findOne();
        if (!token) {
            // If no token data exists, create a new entry with default values
            token = await new Token().save();
        }
        res.json(token);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching token data' });
    }
});

app.post('/api/token', async (req, res) => {
    try {
        const { cartLink, buyLink, telegramLink, contractAddress } = req.body;
        const token = await Token.findOne();
        if (!token) {
            // If no token data exists, create a new entry with the provided data
            const newToken = new Token({ cartLink, buyLink, telegramLink, contractAddress });
            await newToken.save();
            res.json(newToken);
        } else {
            // If token data exists, update it with the provided data
            token.cartLink = cartLink;
            token.buyLink = buyLink;
            token.telegramLink = telegramLink;
            token.contractAddress = contractAddress;
            await token.save();
            res.json(token);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error saving token data' });
    }
});

// deployment
__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/build")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
    });
} else {
    app.get("/", (req, res) => {
        res.send("Server is Running! 🚀");
    });
}

// error middleware
app.use(errorMiddleware);

module.exports = app;

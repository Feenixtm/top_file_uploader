import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5051;

app.listen(PORT, (error) => {
    if (error) {
        console.error("Server failed to start up:", error);
        return;
    }
    console.log("Listening to Port:", PORT);
})
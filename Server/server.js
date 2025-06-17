import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import fs from 'fs';
console.log("ENV file exists:", fs.existsSync("./.env")); // should print: true


dotenv.config();

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // Enable frontend access
app.use(cookieParser());

const genAI = new GoogleGenerativeAI(process.env.Gemini_API_Key);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
console.log("Gemini API Key:", process.env.Gemini_API_Key);
console.log(genAI)
console.log("Server is running")
app.post("/api/chat", async (req, res) => {
    const prompt = req.body.message; // Get user input

    try {
        const result = await model.generateContent(prompt);
        let botReply = result.response.text(); // Get Gemini AI response

        botReply = botReply
        .replace(/^##\s*(.*?)$/gm, "<h2>$1</h2>")                          // Markdown ## to <h2>
        .replace(/^#\s*(.*?)$/gm, "<h1>$1</h1>")                           // Markdown # to <h1>
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")                 // Bold **text**
        .replace(/\*(.*?)\*/g, "<em>$1</em>")                             // Italic *text*
        .split(/\n{2,}/g)                                                 // Split by double new lines (paragraphs)
        .map(paragraph => `<p>${paragraph.replace(/\n/g, '<br>')}</p>`)   // Wrap each paragraph, convert single \n to <br>
        .join('\n\n'); 
        // Retrieve existing chat history from cookies
        let chatHistory = req.cookies.chatHistory ? JSON.parse(req.cookies.chatHistory) : [];

        // Append new message
        chatHistory.push({ user: prompt, bot: botReply });

        // Store updated chat history in cookies (expires in 1 day)
        res.cookie("chatHistory", JSON.stringify(chatHistory), { maxAge: 365* 24 * 60 * 60 * 1000, httpOnly: true });

        res.json({ reply: botReply, history: chatHistory });
    } catch (error) {
        res.status(500).json({ error: "Error generating response" });
    }
});

// Retrieve chat history from cookies
app.get("/api/chat/history", (req, res) => {
    const chatHistory = req.cookies.chatHistory ? JSON.parse(req.cookies.chatHistory) : [];
    res.json({ history: chatHistory });
});

app.post("/api/chat/clear", (req, res) => {
    res.clearCookie("chatHistory"); // Clear chat history cookie
    res.json({ message: "Chat history cleared" });
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
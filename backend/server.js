import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();

app.use(cors());

app.get('/weather', async (req, res) => {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${req.query.city}&appid=823a6d9920a75a3086765a7e936d8b7f`);
        res.json(response.data);  
    } catch (error) {
        res.status(400).json({ error: "Invalid city name" });
    }
});

app.listen(5000, () => {
    console.log("App is running on port 5000");
});

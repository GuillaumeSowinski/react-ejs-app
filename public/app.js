import express from 'express';
import bodyParser from 'body-parser';
import { getAll, getById, create, updateById, deleteById } from "../store.js"

const app= express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile('public/index.html', { root: '.' });
});

app.get("/api/v1/whispers", async (req, res) => {
    const whispers =  await getAll();
    res.json(whispers);
});

app.set("view engine", "ejs");
app.get('/about', async (req, res) => {
    const whispers = await getAll();
    res.render('about', { whispers });
});
app.get("/api/v1/whisper", async (req, res) => { /*...*/ });
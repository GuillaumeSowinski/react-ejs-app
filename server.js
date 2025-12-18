import express from 'express';
import bodyParser from 'body-parser';
import { getAll, getById, create, updateById, deleteById } from "./store.js"

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile('public/index.html', { root: '.' });
});

app.get("/api/v1/whispers", async (req, res) => {
    const whispers = await getAll();
    res.json(whispers);
});

app.get("/api/v1/whispers/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const whisper = await getById(id);
    res.json(whisper);
});

app.post("/api/v1/whispers", async (req, res) => {
    const whisper = await create(req.body);
    res.status(201).json(whisper);
});

app.put("/api/v1/whispers/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const whisper = await updateById(id, req.body);
    res.json(whisper);
});

app.delete("/api/v1/whispers/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    await deleteById(id);
    res.sendStatus(200);
});

app.set("view engine", "ejs");
app.get('/about', async (req, res) => {
    const whispers = await getAll();
    res.render('about', { whispers });
});

export { app };
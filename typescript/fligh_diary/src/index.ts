import express from 'express';
import diaryRouter from './routes/diaries';

const app = express();

app.use(express.json());

app.get('/ping',(_req,res) => {
    console.log('somone pinged here');
    res.send('pong');
});

app.use('/api/diaries',diaryRouter);
app.use('/api/diaries/:id',diaryRouter);

const PORT = 3000;

app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`);
});
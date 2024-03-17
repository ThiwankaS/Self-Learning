import express from 'express';
import { calculator } from './calculator';

const app = express();

app.get('/ping',(_req,res) => {
    res.send('pong');
});

app.post('/calculate',( req,res ) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { value1, value2, op } = req.query;
    if( !value1 || isNaN(Number(value1))){
        return res.status(400).send({ error : ' argument(s) malformatted '})
    }
    if( !value2 || isNaN(Number(value2))){
        return res.status(400).send({ error : ' argument(s) malformatted '})
    }
    if( !op || !(op === 'multiply' || 'add' || 'divide')){
        return res.status(400).send({ error : ' argument(s) malformatted '})
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculator( Number(value1), Number(value2), op );
    return res.send({ result });
});

const PORT = 3003; 

app.listen(PORT,() => {
    console.log(`Serever running on the port ${PORT}`);
});
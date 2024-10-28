require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connect = require('./db');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/libros', async (req, res) => {
    let db;
    try {
        db = await connect();
        const query = "SELECT * FROM libros";
        const [rows] = await db.execute(query);
        console.log(rows);

        res.json({
            data: rows,
            status: 200
        });
    } catch(err) {
        console.error(err);
    } finally {
        if(db)
            db.end();
    }
});

app.get('/libros/:isbn', async (req, res) => {
    let db;
    try {
        const isbn = req.params.isbn;
        db = await connect();
        const query = `SELECT * FROM libros WHERE isbn=${isbn}`;
        const [rows] = await db.execute(query);
        console.log(rows);

        res.json({
            data: rows,
            status: 200
        });
    } catch(err) {
        console.error(err);
    } finally {
        if(db)
            db.end();
    }
});


app.delete('/libros/:isbn', async (req, res) => {
    let db;
    try {
        const isbn = req.params.isbn;
        db = await connect();
        //const query = `DELETE FROM alumnos WHERE no_control=${noControl}`;
        const query = `CALL SP_REMOVE_LIBRO(?)`;
        const [rows] = await db.execute(query, [isbn]);
        if(rows.affectedRows === 0) {
            res.json({
                data: {},
                msg: 'El valor no fue encontrado',
                status: 404
            });
        } else {
            res.json({
                data: {},
                msg: 'Dato eliminado correctamente',
                status: 200
            });
        }
    } catch(err) {
        console.error(err);
    } finally {
        if(db)
            db.end();
    }
});

app.post('/libros', async (req, res) =>{
    let db;
    try {
        const { isbn, nombre, numeroPaginas } = req.body;
        db = await connect();
        const query = `CALL SP_CREATE_LIBRO(? ,?, ?)`;
        const [rows] = await db.execute(query, [isbn, nombre, numeroPaginas]);
        console.log(rows);

        res.json({
            data: rows,
            status: 200
        });
    } catch(err) {
        console.error(err);
    } finally {
        if(db)
            db.end();
    }
});

app.put('/libros/:isbn', async (req, res) => {
    let db;
    try {
        const { nombre, numeroPaginas } = req.body;
        const isbn = req.params.isbn;
        db = await connect();
        const query = `CALL SP_UPDATE_LIBRO(?, ?, ?)`;
        const [rows] = await db.execute(query, [isbn, nombre, numeroPaginas]);
        console.log(rows);

        res.json({
            data: rows,
            status: 200
        });
    } catch(err) {
        console.error(err);
    } finally {
        if(db)
            db.end();
    }
});



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server connected....' + PORT);
});
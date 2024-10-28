const mysql = require('mysql2/promise');

async function connect() {
    try {
        const conn = await mysql.createConnection({
            host:  process.env.HOST,
            port:  process.env.DB_PORT,
            user:  process.env.USER,
            password:  process.env.PASSWORD,
            database:  process.env.DATABASE,
        });
        console.log('conexión a la bd establecida');
        return conn;
    } catch(err) {
        console.error('Ocurrió un error al realizar la conexión a la bd: ', err);
        throw err;
    }
}

module.exports = connect;
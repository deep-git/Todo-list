const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "deeDatabase1",
    host: "localhost",
    port: 5432,
    database: "perntodolist"
});


module.exports = pool;
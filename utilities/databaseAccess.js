const Pool = require('pg').Pool
const pgConnetion = new Pool({
    host: 'localhost',
    user: 'centraluser',
    password: 'chalal',
    database: 'techant',
    port: 5432.
})

module.exports = {
    pgConnetion : pgConnetion,
};

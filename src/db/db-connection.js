const { Client } = require("pg");
const { user, host, database, password, port } = require("./dbConfig");
const client = new Client({
    user,
    host,
    database,
    password,
    port,
});


// const Pool = require('pg').Pool
// const pool = new Pool({
//     user: user,
//     host: host,
//     database:  database,
//     password: password,
//     port: port,
// })

client.connect();
// async function query(sql,params, schema) {
//     const client1 = await pool.connect();
//     await client1.query(`SET search_path TO ${schema}`);
//     try {
//       return await client.query(sql, params);
//     } finally {
//       client.release();
//     }
// }
module.exports = {client};
// const dbcp = (schemaNam) => {
//     if(schemaNam){
//         client.on('connect',(clientpool) => {
//             clientpool.query("SET search_path TO  "+schemaNam);
//         })
//     }
//     return client;
// }
// module.exports ={ dbcp };
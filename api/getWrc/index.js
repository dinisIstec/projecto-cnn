const mysql = require('mysql');

module.exports = async function (context, req) {
    const connection = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE
    });

    connection.connect();

    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM WRC', (error, results, fields) => {
            if (error) {
                context.log(error);
                context.res = {
                    status: 500,
                    body: "Error querying the database."
                };
                reject();
            } else {
                context.res = {
                    status: 200,
                    body: results
                };
                resolve();
            }
        });
    }).then(() => {
        connection.end();
    }).catch(() => {
        connection.end();
    });
};

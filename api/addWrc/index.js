const mysql = require('mysql');

module.exports = async function (context, req) {
    const { PilotName, CoPilotName, Country, TeamName, CarModel } = req.body;

    if (!PilotName || !CoPilotName || !Country || !TeamName || !CarModel) {
        context.res = {
            status: 400,
            body: "Please pass all required fields in the request body"
        };
        return;
    }

    const connection = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE
    });

    connection.connect();

    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO WRC (PilotName, CoPilotName, Country, TeamName, CarModel) VALUES (?, ?, ?, ?, ?)';
        connection.query(query, [PilotName, CoPilotName, Country, TeamName, CarModel], (error, results, fields) => {
            if (error) {
                context.log(error);
                context.res = {
                    status: 500,
                    body: "Error inserting into the database."
                };
                reject();
            } else {
                context.res = {
                    status: 200,
                    body: "Record added successfully."
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

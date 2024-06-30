const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'hastane',
    password: 'root'
});

module.exports = class Admin{

    constructor(name,surname){

        this.name = name;
        this.surname = surname;

    }

}
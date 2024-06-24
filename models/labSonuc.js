const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'hastane',
    password: 'root'
});

module.exports = class LabSonuc{

    constructor(raporId,url){
        
        this.raporId = raporId;
        this.url = url;

    }

}
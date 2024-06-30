const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'hastane',
    password: 'root'
});

module.exports = class LabResult{

    constructor(reportId,url){
        
        this.reportId = reportId;
        this.url = url;

    }

}
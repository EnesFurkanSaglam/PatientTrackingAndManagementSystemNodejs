const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'hastane',
    password: 'root'
});

module.exports = class Yonetici{

    constructor(ad,soyad){

        this.ad = ad;
        this.soyad = soyad;

    }

}
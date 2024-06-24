const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'hastane',
    password: 'root'
});

module.exports = class TibbiRapor{

    constructor(raporTarihi,raporIcerigi,hastaId){

        
        raporTarihi = this.raporTarihi;
        raporIcerigi = this.raporIcerigi;
        hastaId = this.hastaId;
        
    }

    static raporListele(hastaId) {
        return new Promise((resolve, reject) => {
            connection.execute('SELECT t.rapor_id,t.rapor_tarihi,t.rapor_icerigi,l.lab_sonuc_id,l.url FROM tibbi_raporlar t,lab_sonuclari l WHERE t.hasta_id = ? AND l.rapor_id =t.rapor_id ', [hastaId], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    

}
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'hastane',
    password: 'root'
});


module.exports = class Doktor{

    constructor(doktorId,ad, soyad, uzmanlikAlani, calistigiHastane) {
        this.doktorId = doktorId;
        this.ad = ad;
        this.soyad = soyad;
        this.uzmanlikAlani = uzmanlikAlani;
        this.calistigiHastane = calistigiHastane;
    }

    
    static doktorListele() {
        return new Promise((resolve, reject) => {
            connection.execute('SELECT * FROM doktorlar', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    async doktorKaydet(){
        return new Promise((resolve, reject) => {
            connection.execute('INSERT INTO doktorlar (doktor_ad, doktor_soyad, calistigi_hastane, uzmanlik_alani) VALUES (?, ?, ?, ?)',[this.ad, this.soyad, this.calistigiHastane, this.uzmanlikAlani] , (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static async doktorSil(id) {
        try {
            await connection.execute('DELETE FROM Randevular where doktor_id = ?', [id]);
            await connection.execute('DELETE FROM Doktorlar where doktor_id = ?', [id]);
            return true;
        } catch (err) {
            console.error(err);
            throw err; 
        }
    }

    async doktorGuncelle(doktor){
        return new Promise((resolve, reject) => {
            connection.execute('UPDATE doktorlar SET doktor_ad = ?, doktor_soyad = ?, uzmanlik_alani = ?, calistigi_hastane = ? WHERE doktor_id = ?',
                [doktor.ad, doktor.soyad, doktor.uzmanlikAlani, doktor.calistigiHastane, doktor.doktorId],
                (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                }
            );
        });
    }


    static async doktorLogin(usarname,password){
        return new Promise((resolve, reject) => {

            connection.execute('SELECT * FROM doktorlar WHERE doktor_ad = ? AND doktor_id = ? ',[usarname,password],

                (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                }
            );
        });
    }


   
}
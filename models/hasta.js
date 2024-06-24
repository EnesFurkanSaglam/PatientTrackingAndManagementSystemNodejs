const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'hastane',
    password: 'root'
});

module.exports = class Hasta{

    constructor(hastaId,ad,soyad,dogumTarihi,cinsiyet,telefon,adres){
        this.hastaId = hastaId;
        this.ad = ad;
        this.soyad = soyad;
        this.dogumTarihi = dogumTarihi;
        this.cinsiyet = cinsiyet;
        this.telefon = telefon;
        this.adres = adres;
    }



    static hastaListele() {
        return new Promise((resolve, reject) => {
            connection.execute('SELECT * FROM hastalar', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    async hastaKaydet(){
        return new Promise((resolve, reject) => {
            connection.execute('INSERT INTO hastalar(hasta_ad,hasta_soyad,dogum_tarihi,cinsiyet,telefon,adres) VALUES (?, ?, ?, ?, ?, ?)',[this.ad, this.soyad, this.dogumTarihi,this.cinsiyet,this.telefon,this.adres] , (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static async hastaSil(id) {
        try {
            await connection.execute('DELETE FROM lab_sonuclari WHERE rapor_id IN (SELECT rapor_id FROM tibbi_raporlar WHERE hasta_id = ?)', [id]);
            await connection.execute('DELETE FROM tibbi_raporlar WHERE hasta_id = ?', [id]);
            await connection.execute('DELETE FROM randevular WHERE hasta_id = ?', [id]);
            await connection.execute('DELETE FROM hastalar WHERE hasta_id = ?', [id]);
            return true;
        } catch (err) {
            console.error(err);
            throw err; 
        }
    }

    async hastaGuncelle(hasta){
        return new Promise((resolve, reject) => {
            connection.execute('UPDATE hastalar SET hasta_ad = ?, hasta_soyad = ?, dogum_tarihi = ?, cinsiyet = ?, telefon = ?,adres = ? WHERE hasta_id = ?',
                [hasta.ad,hasta.soyad,hasta.dogumTarihi,hasta.cinsiyet,hasta.telefon,hasta.adres,hasta.hastaId],
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



    static async hastaLogin(usarname,password){
        return new Promise((resolve, reject) => {

            connection.execute('SELECT * FROM hastalar WHERE hasta_ad = ? AND hasta_id = ? ',[usarname,password],

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
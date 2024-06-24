const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'hastane',
    password: 'root'
});

module.exports = class Randevu{

    constructor(hastaId,doktorId,randevuTarihi,randevuSaati){
        
        hastaId = this.hastaId;
        doktorId = this.doktorId;
        randevuTarihi = this.randevuTarihi;
        randevuSaati = this.randevuSaati;

        

    }

    static randevuListele() {
        return new Promise((resolve, reject) => {
            connection.execute(`
                SELECT 
                    d.doktor_id, d.doktor_ad, d.doktor_soyad, 
                    h.hasta_id, h.hasta_ad, h.hasta_soyad, 
                    r.randevu_tarihi, r.randevu_saati, 
                    IFNULL(t.rapor_icerigi, 'Tıbbi rapor bulunamadı.') as rapor_icerigi 
                FROM 
                    randevular r 
                    JOIN hastalar h ON r.hasta_id = h.hasta_id 
                    JOIN doktorlar d ON r.doktor_id = d.doktor_id 
                    LEFT JOIN tibbi_raporlar t ON t.hasta_id = h.hasta_id
            `, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
    

    static async doktorRandevuListele(doktorId){
        return new Promise((resolve, reject) => {
            connection.execute(`
                SELECT  
                    h.hasta_id, h.hasta_ad, h.hasta_soyad, 
                    r.randevu_tarihi, r.randevu_saati, 
                    IFNULL(t.rapor_icerigi, 'Tıbbi rapor bulunamadı.') as rapor_icerigi 
                FROM 
                    randevular r 
                    JOIN hastalar h ON r.hasta_id = h.hasta_id 
                    JOIN doktorlar d ON r.doktor_id = d.doktor_id 
                    LEFT JOIN tibbi_raporlar t ON t.hasta_id = h.hasta_id
                WHERE 
                    d.doktor_id = ?
            `,[doktorId], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }


    static async hastaRandevuListele(hastaId){
        return new Promise((resolve, reject) => {
            connection.execute(`
                SELECT  
                    d.doktor_id,d.doktor_ad,d.doktor_soyad,
                    h.hasta_id, h.hasta_ad, h.hasta_soyad, 
                    r.randevu_tarihi, r.randevu_saati, 
                    IFNULL(t.rapor_icerigi, 'Tıbbi rapor bulunamadı.') as rapor_icerigi 
                FROM 
                    randevular r 
                    JOIN hastalar h ON r.hasta_id = h.hasta_id 
                    JOIN doktorlar d ON r.doktor_id = d.doktor_id 
                    LEFT JOIN tibbi_raporlar t ON t.hasta_id = h.hasta_id
                WHERE 
                    h.hasta_id = ?
            `,[hastaId], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

}
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'hastane',
    password: 'root'
});

module.exports = class Patient{

    constructor(patientId,name,surname,birthday,gender,phone,address){
        this.patientId = patientId;
        this.name = name;
        this.surname = surname;
        this.birthday = birthday;
        this.gender = gender;
        this.phone = phone;
        this.address = address;
    }



    static ListPatient() {
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

    async SavePatient(){
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

    static async DeletePatient(id) {
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

    async UpdatePatient(patient){
        return new Promise((resolve, reject) => {
            connection.execute('UPDATE hastalar SET hasta_ad = ?, hasta_soyad = ?, dogum_tarihi = ?, cinsiyet = ?, telefon = ?,adres = ? WHERE hasta_id = ?',
                [patient.name,patient.surname,patient.birthday,patient.gender,patient.phone,patient.address,patient.patientId],
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



    static async LoginPatient(usarname,password){
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
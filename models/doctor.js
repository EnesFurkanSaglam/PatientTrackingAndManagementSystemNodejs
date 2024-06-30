const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'hastane',
    password: 'root'
});


module.exports = class Doctor{

    constructor(doctorId,name, surname, expertise, hospital) {
        this.doctorId = doctorId;
        this.name = name;
        this.surname = surname;
        this.expertise = expertise;
        this.hospital = hospital;
    }

    
    static ListDoctors() {
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

    async SaveDoctor(){
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

    static async DeleteDoctor(id) {
        try {
            await connection.execute('DELETE FROM Randevular where doktor_id = ?', [id]);
            await connection.execute('DELETE FROM Doktorlar where doktor_id = ?', [id]);
            return true;
        } catch (err) {
            console.error(err);
            throw err; 
        }
    }

    async UpdateDoctor(doctor){
        return new Promise((resolve, reject) => {
            connection.execute('UPDATE doktorlar SET doktor_ad = ?, doktor_soyad = ?, uzmanlik_alani = ?, calistigi_hastane = ? WHERE doktor_id = ?',
                [doctor.name, doctor.surname, doctor.expertise, doctor.hospital, doctor.doctorId],
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


    static async LoginDoctor(usarname,password){
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
const express = require('express');
const router = express.Router();
const Hasta = require('../models/hasta');
const Randevu = require('../models/randevu');

var bizimHasta = 0;


router.get('/secim', (req, res, next) => {
    res.render('hasta/secim.pug');
});


router.get('/hastaFormKaydet', (req, res) => {
    res.render('hasta/hastaFormKaydet', { hastalar: {} });
});


router.post('/kaydetHasta', async (req, res, next) => {
    const { ad, soyad, dogumTarihi, cinsiyet,telefon,adres } = req.body;
    try {
        const hasta = new Hasta(null,ad, soyad, dogumTarihi,cinsiyet, telefon,adres);
        await hasta.hastaKaydet();
        res.redirect('/hasta/secim');
    } catch (err) {
        console.error(err);
        
        res.redirect('/giris'); 
    }
});




router.get('/giris', (req, res, next) => {
    res.render('hasta/login'); 
});

router.post('/giris', async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const result = await Hasta.hastaLogin(username, password);
        if (result.length > 0) {
            bizimHasta = password
            res.redirect('/hasta/randevular'); 
        } else {
            res.redirect('/giris'); 
        }
    } catch (err) {
        console.error(err);
    }
});


router.get('/randevular', async (req, res, next) => {
    try {
       const randevular = await Randevu.hastaRandevuListele(bizimHasta);
        res.render('hasta/randevuListele', {
            title: 'Randevular',
            randevular: randevular,
            path: req.path
        });
    } catch (err) {
        console.error(err);
    }
});







module.exports = router;
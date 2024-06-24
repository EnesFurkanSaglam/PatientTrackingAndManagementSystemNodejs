const express = require('express');
const router = express.Router();

const Doktor = require('../models/doktor');
const Randevu = require('../models/randevu');
const TibbiRapor = require('../models/tibbiRapor');

var bizimDoktor = 0;


router.get('/giris', (req, res, next) => {
    res.render('doktor/login');
});

router.post('/giris', async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const result = await Doktor.doktorLogin(username, password);
        if (result.length > 0) {
            bizimDoktor = password
            res.redirect('/doktor/randevular'); 
        } else {
            res.redirect('/giris'); 
        }
    } catch (err) {
        console.error(err);
    }
});


router.get('/randevular', async (req, res, next) => {
    try {
       const randevular = await Randevu.doktorRandevuListele(bizimDoktor);
        res.render('doktor/randevuListele', {
            title: 'Randevular',
            randevular: randevular,
            path: req.path
        });
    } catch (err) {
        console.error(err);
       
    }
});


//

router.post('/hastaRaporGoster', async (req, res, next) => {
    const { hastaId } = req.body;
    try {
        const result = await TibbiRapor.raporListele(hastaId);
        if (result.length > 0) {
            res.render('doktor/raporListele', {
                title: 'Raporlar',
                result: result,
                path: req.path
            });
        } else {
            res.redirect('/giris'); 
            
        }
    } catch (err) {
        console.error(err);
        next(err); 
    }
});



module.exports = router;


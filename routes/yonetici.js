const express = require('express');
const Doktor = require('../models/doktor');
const Hasta = require('../models/hasta');
const Randevu = require('../models/randevu');

const router = express.Router();

var doktorIdGuncellenecek = 0;
var hastaIdGuncellenecek = 0;


router.get('/secim', (req, res, next) => {
    res.render('yonetici/secim.pug');
});


router.get('/doktorlar', async (req, res, next) => {
  try {
      const doktorlar = await Doktor.doktorListele();
      res.render('yonetici/doktorListele', {
          title: 'Doktorlar',
          doktorlar: doktorlar,
          path: req.path
      });
  } catch (err) {
      console.error(err);
      // Hataları uygun şekilde yönetin
  }
});

router.get('/doktorFormKaydet', (req, res) => {
    res.render('yonetici/doktorFormKaydet', { doktorlar: {} });
});


router.post('/kaydetDoktor', async (req, res, next) => {
    const { ad, soyad, uzmanlikAlani, calistigiHastane } = req.body;
    try {
        const doktor = new Doktor(null,ad, soyad, uzmanlikAlani, calistigiHastane);
        await doktor.doktorKaydet();
        res.redirect('/yonetici/doktorlar');
    } catch (err) {
        console.error(err);
        // Hataları uygun şekilde yönetin
        res.redirect('/yonetici/doktorlar'); // veya hata sayfasına yönlendirin
    }
});


router.get('/doktorFormGuncelle', (req, res) => {
    // doktorId parametresi formdan alınarak doktorFormGuncelle sayfasına gönderilir
    doktorIdGuncellenecek = req.query.doktorId;
    res.render('yonetici/doktorFormGuncelle');
});

router.post('/guncelleDoktor', async (req, res, next) => {
    const {ad, soyad, uzmanlikAlani, calistigiHastane } = req.body;
    try {
        const doktor = new Doktor(doktorIdGuncellenecek, ad, soyad, uzmanlikAlani, calistigiHastane);
        await doktor.doktorGuncelle(doktor);
        res.redirect('/yonetici/doktorlar');
    } catch (err) {
        console.error(err);
        // Hataları uygun şekilde yönetin
        res.redirect('/yonetici/doktorlar'); // veya hata sayfasına yönlendirin
    }
});



router.post('/silDoktor', async (req, res, next) => {
    try {
        await Doktor.doktorSil(req.body.doktorId);
        res.redirect('/yonetici/doktorlar');
    } catch (err) {
        console.error(err);
        // Hataları uygun şekilde yönetin
    }
});




  

router.get('/hastalar', async (req, res, next) => {
    try {
       const hastalar = await Hasta.hastaListele();
        res.render('yonetici/hastaListele', {
            title: 'Hastalar',
            hastalar: hastalar,
            path: req.path
        });
    } catch (err) {
        console.error(err);
        // Hataları uygun şekilde yönetin
    }
  });


  router.get('/hastaFormKaydet', (req, res) => {
    res.render('yonetici/hastaFormKaydet', { hastalar: {} });
});


router.post('/kaydetHasta', async (req, res, next) => {
    const { ad, soyad, dogumTarihi, cinsiyet,telefon,adres } = req.body;
    try {
        const hasta = new Hasta(null,ad, soyad, dogumTarihi,cinsiyet, telefon,adres);
        await hasta.hastaKaydet();
        res.redirect('/yonetici/hastalar');
    } catch (err) {
        console.error(err);
        // Hataları uygun şekilde yönetin
        res.redirect('/yonetici/hastalar'); // veya hata sayfasına yönlendirin
    }
});

router.post('/silHasta',async(req,res,next) => {

    try {
        Hasta.hastaSil(req.body.hastaId);
        res.redirect('/yonetici/hastalar');
     } catch (err) {
         console.error(err);
         // Hataları uygun şekilde yönetin
     }

});


// Yönlendirme işlemi için POST yerine GET kullanılmalıdır
router.get('/hastaFormGuncelle', (req, res) => {
    // doktorId parametresi formdan alınarak doktorFormGuncelle sayfasına gönderilir
    hastaIdGuncellenecek = req.query.hastaId;
    res.render('yonetici/hastaFormGuncelle');
});

router.post('/guncelleHasta', async (req, res, next) => {
    const {ad, soyad, dogumTarihi, cinsiyet,telefon,adres } = req.body;
    try {
        const hasta = new Hasta(hastaIdGuncellenecek, ad, soyad, dogumTarihi, cinsiyet,telefon,adres);
        await hasta.hastaGuncelle(hasta);
        res.redirect('/yonetici/hastalar');
    } catch (err) {
        console.error(err);
        
        res.redirect('/yonetici/hastalar'); 
    }
});


router.get('/randevular', async (req, res, next) => {
    try {
       const randevular = await Randevu.randevuListele();
        res.render('yonetici/randevuListele', {
            title: 'Randevular',
            randevular: randevular,
            path: req.path
        });
    } catch (err) {
        console.error(err);
       
    }
});









  

module.exports = router;
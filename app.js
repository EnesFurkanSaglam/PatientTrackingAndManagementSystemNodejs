const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const path = require('path'); 

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

const yoneticiRoutes = require('./routes/yonetici');
const doktorRoutes = require('./routes/doktor');
const hastaRoutes = require('./routes/hasta');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/yonetici',yoneticiRoutes);
app.use('/doktor',doktorRoutes);
app.use('/patient',hastaRoutes);

app.listen(5000,()=>{
    console.log('port 5000 aktif');
});
app.get('/homepage', (req, res, next) => {
    res.render('homePage.pug');
});


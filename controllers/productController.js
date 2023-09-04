const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const productService = require('../services/productService.js'); // productService'yi ekledik


var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const corsOptions = {
    origin: 'http://localhost:5173', // İzin verilen köken
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204, // İçerik Yok
};


async function startLocalhostServer() {
    const app = express();
    app.use(cors());
    const port = 3003; // Kullanmak istediğiniz port numarası
    console.log("bağlantı sağlandı")
    app.get('/api/getAllProductList', (req, res) => {
        console.log("istek geldi")
        productService.getProductList()
            .then(result => {
                console.log("döndü ", result);
                res.send(result);
            })
            .catch(error => {
                console.error('Hata:', error);
                res.status(500).send({ status: false, msg: "bir hata oluştu" });
            });
    });
    app.post('/api/addNewProductList', jsonParser, (req, res) => {
        console.log("req.body  --> ", req.body)
        productService.addProductList(req.body)
            .then(result => {
                console.log("döndü ", result);
                res.send(result);
            })
            .catch(error => {
                console.error('Hata:', error);
                res.status(500).send({ status: false, msg: "bir hata oluştu" });
            });
    });
    await new Promise((resolve) => {
        app.listen(port, () => {
            console.log(`Localhost sunucusu ${port} portunda çalışıyor.`);
            resolve();
        });
    });
}

module.exports = {
    startLocalhostServer,
};

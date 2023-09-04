const { startLocalhostServer } = require('./controllers/productController'); // productController.js dosyasının yolu

async function main() {
    await startLocalhostServer(); // localhost sunucunuzu başlatan bir fonksiyonunuz var
}
main();
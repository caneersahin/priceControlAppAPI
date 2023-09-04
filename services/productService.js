const dbConnection = require('../dbConnection');
const sql = require('mssql');


const productService = {

	getProductList: async function () {
		return new Promise((resolve, reject) => {
			dbConnection.connect()
				.then(() => {
					const request = dbConnection.request();
					request.query('SELECT * FROM product')
						.then(result => {
							const response = {
								status: true,
								message: 'Products fetched successfully',
								data: result.recordset,
								count: result.recordset.length
							};
							resolve(response);
						})
						.catch(err => {
							console.error('Sorgu hatası:', err);
							reject({
								status: false,
								message: 'An error occurred while fetching products',
								error: err.message,
							});
						})
						.finally(() => {
							dbConnection.close();
						});
				})
				.catch(error => {
					console.error('Genel hata:', error);
					reject({
						status: false,
						message: 'An error occurred while processing the request',
						error: error.message,
					});
				});
		});
	},

	addProductList: function (req) {
		return new Promise(async (resolve, reject) => {
			try {
				const query = `
                INSERT INTO product (productName, productPrices, productLink, date)
                VALUES (@productName, @productPrices, @productLink, @date)
            `;
				for (const product of req) {
					await dbConnection.connect();
					const request = dbConnection.request();
					request.input('productName', sql.NVarChar, product.productName);
					request.input('productPrices', sql.Float, product.productPrices);
					request.input('productLink', sql.NVarChar, product.productLink);
					request.input('date', sql.DateTime2, new Date());
					await request.query(query);
					await dbConnection.close();
				}
				const response = {
					message: 'Products added successfully',
					count: req.length,
					addedProducts: req
				};
				resolve(response);
			} catch (error) {
				reject(error);
			}
		});
	}
};

module.exports = productService;
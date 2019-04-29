const express = require('express')
const Quote = require('../models/quote')
const router = new express.Router()

/**  
 * This is the router for the Create and Retrive operations of the REST API, representing the POST and GET HTTP verbs, for interacting with the quotes db.
 **/

 /**  
 * Create a currency
 * HTTP REQUEST - POST /quote 
 *      body: { "currency": "ETC", "date": "20180509", "quotes": [{ "time": "0900", "price": "1.45"}, {"time": "1030","price": "1.87"}, 
 *               {"time": "1245","price": "1.55"}, {"time": "1515","price": "2.01"}, {"time": "1700","price": "2.15"}]}
 * HTTP RESPONSE 201-created, 400-bad request
 * { "newQuote": {"currency": "ETC", "date": "20180507", "quotes": [{"time": "0900","price": "1.45"}, {"time": "1030","price": "1.87"},
 *               {"time": "1245", "price": "1.55"}, {"time": "1515", "price": "2.01"}, {"time": "1700","price": "2.15"}]}
}
 **/
router.post('/quote', async (req, res) => {
    const quote = new Quote(req.body)
    try {
        const newQuote = await quote.save();
        res.status(201).send({ newQuote });
    } catch (e) {
        res.status(400).send(e);
    }
})

/**  
 * Get all currencies' names
 * HTTP request - POST /quotes
 * HTTP response: 
 *               200 [{currency: string, date: string, quotes: [{time: string, price: string}]}]
 *               200 []
 **/
router.get('/quotes', async (req, res) => {
  const currencies = await Quote.find({})

  res.send(currencies);
})

/**  
 * Get the profit by currency name and optionally a date
 * HTTP request GET /currency/profit/:currencyName
 *      parameters: 
 *                  name: currency 
 *                  description: name of the virtual currency
 *                  type: string
 *                  required: true
 *                  name: date 
 *                  description: date to look for quotes of the previous define currency
 *                  type: string
 *                  required: false
 *              
 * HTTP response 200: [{currency: string, date: string, quotes: [{time: string, price: string}]}]  OR  No possible profit for currency
 *               404: No currency by that name
 **/
router.get('/currency/profit/:currency/:date?', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  try {
    let quote;
    if (req.params.date) {
      quote = await Quote.findByCurrencyAndDate({currency: req.params.currency, date: req.params.date})
    } else {
      quote = await Quote.findByCurrency({currency: req.params.currency});
    }
    const profit = quote.getProfit();    
    res.send(profit);
  } catch (error) {
    res.status(404).send(error.message);
  }  
})

/**  
 * Delete all quotes, utility route not actually used. Inside a historical data, it would not make sense, but for this study case, it does, for testing purposes.
 * HTTP request DELETE /deleteQuotes
 * HTTP response 200: [{currency: string, date: string, quotes: [{time: string, price: string}]}]  OR  No possible profit for currency
 **/
router.delete('/deleteQuotes', async (req, res) => {
  const result = await Quote.deleteMany({});
  res.status(200).send(result); 
})

module.exports = router;
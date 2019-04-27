const express = require('express')
const Quote = require('../models/quote')
const router = new express.Router()

/**  
 * This is the router for the Create and Retrive operations of the REST API, representing the POST and GET HTTP verbs, for interacting with the quotes db.
 **/

 /**  
 * Create a currency
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
 **/
router.get('/quotes', async (req, res) => {
  const currencies = await Quote.find({})

  res.send(currencies);
})

/**  
 * Get the profit by currency name
 **/
router.get('/currency/profit/:currencyName', async (req, res) => {
  try {
    const quote = await Quote.findByCurrency({currency: req.params.currencyName});

    const profit = quote.getProfit();
    
    if ( profit.value <= 0 ) {
      res.send(`No possible profit for currency ${req.params.currencyName}`);
    }
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(profit);

  } catch (error) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.status(404).send(error);
  }
})

/**  
 * Get the profits by currency name and date
 **/
router.get('/currency/profit/:currency/:date', async (req, res) => {
  try {
    const quote = await Quote.findByCurrencyAndDate({currency: req.params.currency, date: req.params.date})
    const profit = quote.getProfit();
    
    if ( profit.value <= 0 ) {
      res.send(`No possible profit for currency ${req.params.currencyName} and date ${req.params.date}`);
    }
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(profit);

  } catch (error) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.status(404).send(error.message);
  }  
})

// delete all quotes - utilitary method not actually used in the front-end
router.delete('/deleteQuotes', async (req, res) => {
  try {
    const result = await Quote.deleteMany({});
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send(error);
  }  
})

module.exports = router;
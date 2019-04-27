const mongoose = require('mongoose')

/**
 * This is the model for the data in MongoDB: a quote is composed of a currency, date, and an array of time and price tuples representing the hour and price of the
 * currency in a given date.
 **/
const quoteSchema = new mongoose.Schema({
    currency: {
        type: String,
        required: true,
        trim: true
    },
    date: String,
    quotes: {
        type: 'Mixed'
    }
})

/**  
 * Overriden toJSON method for a simple view of the Quote object 
 **/
quoteSchema.methods.toJSON = function () {
  const quote = this;
  const quoteObject = quote.toObject();

  delete quoteObject._id;
  delete quoteObject.__v;

  return quoteObject;
}

/**  
 * Instance method to get a possible profit for a quote
 **/
quoteSchema.methods.getProfit = function () {
    const quotes = this.quotes;

    let buyer = quotes[0]; // the buyer would be the earliest and cheaper, in principle
    
    let seller = quotes[quotes.length-1]; // the seller would be the latest and more expensive, in principle
    for (let i = 1; i < quotes.length; i++) {
      const quote = quotes[i];
      if (quote.price < buyer.price && quote.time < buyer.time) {
        buyer = quote;
      }
      else if (quote.price > seller.price) {
        seller = quote;
      }
    }
    const value = seller.price - buyer.price;

    return {
        date: this.date,
        currency: this.currency,
        buy: buyer.price,
        sell: seller.price,
        buyHour: buyer.time,
        sellHour: seller.time,
        value: value
      };
}

/**  
 * Model method to get a quote by currency name
 **/
quoteSchema.statics.findByCurrency = async (currency) => {
    const quote = await Quote.findOne(currency);

    if (!quote) {
        throw new Error(`No currency with name ${currency.currency}`)
    }

    return quote;
}

/**  
 * Model method to get a quote by currency name and date
 **/
quoteSchema.statics.findByCurrencyAndDate = async (currency) => {
  const quote = await Quote.findOne({currency: currency.currency, date: currency.date});
  if (!quote) {
      throw new Error(`No quote with currency ${currency.currency} and date ${currency.date}`)
  }
  return quote;
}

/**  
 * Creation of the actual model to export
 **/
const Quote = mongoose.model('Quote', quoteSchema);
module.exports = Quote;
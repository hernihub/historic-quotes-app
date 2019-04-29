const request = require('supertest')
const app = require('../src/app')

/***  
 ** This is the test suite for the necessary tests for the API.
 ***/

 // Test quotes for testing
const testQuotes = [{
  "currency": "LTC",
  "date": "20180507",
  "quotes": [
      {
          "time": "0930",
          "price": "14.32"
      },
      {
          "time": "1115",
          "price": "14.87"
      },
      {
          "time": "1245",
          "price": "15.03"
      },
      {
          "time": "1400",
          "price": "14.76"
      },
      {
          "time": "1700",
          "price": "14.15"
      }
  ]
}, {
  "currency": "ETC",
  "date": "20180509",
  "quotes": [
      {
          "time": "0900",
          "price": "1.45"
      },
      {
          "time": "1030",
          "price": "1.87"
      },
      {
          "time": "1245",
          "price": "1.55"
      },
      {
          "time": "1515",
          "price": "2.01"
      },
      {
          "time": "1700",
          "price": "2.15"
      }
  ]
}, {
  "currency": "BTC",
  "date": "2018050",
  "quotes": [
      {
          "time": "0915",
          "price": "34.98"
      },
      {
          "time": "1045",
          "price": "36.13"
      },
      {
          "time": "1230",
          "price": "37.01"
      },
      {
          "time": "1400",
          "price": "35.98"
      },
      {
          "time": "1530",
          "price": "33.56"
      }
  ]
}, {
  "currency": "STC",
  "date": "20180501",
  "quotes": [
      {
          "time": "0915",
          "price": "34.98"
      },
      {
          "time": "1045",
          "price": "33.13"
      },
      {
          "time": "1230",
          "price": "32.01"
      },
      {
          "time": "1420",
          "price": "31.98"
      },
      {
          "time": "1620",
          "price": "30.56"
      }
  ]
}];

describe('CRD OVER REST API - without UPDATE because it is historical data', () => {

  it('should create a quote', async() => 
    request(app)
      .post('/quote')
      .send(testQuotes[0])
      .expect('Content-Type', /json/)
      .expect(201)
      .then(res => {
        const newQuote = res.body.newQuote;
        expect(newQuote).toEqual(testQuotes[0]);
    })
  );  

  it('should get all quotes', async () => {
    await request(app).post('/quote').send(testQuotes[1]).expect(201);
    await request(app).post('/quote').send(testQuotes[2]).expect(201);
    const currencies = await request(app).get('/quotes').send().expect(200);
    expect(currencies.body.length).toEqual(3);  // for each test, there should be only 3 quotes.
  });

  it('should get a possible profit for a currency without date', async() => {
    await request(app).post('/quote').send(testQuotes[0]).expect(201);
    request(app)
      .get('/currency/profit/LTC')
      .send()
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        const profit = res.body;
        expect(profit.value.toFixed(2)).toEqual('0.71');
    });
  });

  it('should get a possible profit for a currency for a date', async() => {
    await request(app).post('/quote').send(testQuotes[1]).expect(201);
    return request(app)
      .get('/currency/profit/ETC/20180509')
      .send()
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        const profit = res.body;
        expect(profit.value.toFixed(2)).toEqual('0.70');
    })
  });

  it('should not get quotes for a currency', async () => {
    await request(app).get('/currency/profit/XTC').send().expect(404); // No such currency
  });
  
  it('should not get quotes for a currency and a given date', async () => {
    await request(app).get('/currency/profit/LTC/19821120').send().expect(404); // No quotes for that date
  });

  it('should not get any profit for this currency', async () => {
    await request(app).post('/quote').send(testQuotes[3]).expect(201);
    request(app)
      .get('/currency/profit/STC')
      .send()
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        const profit = res.body;
        expect(profit.value).toBeLessThan(0); // No profit for this currency, it only got cheaper
    });
  });

  it('should delete all quotes', async () => {
    await request(app).delete('/deleteQuotes').send().expect(200); // All quotes deleted
  });
});
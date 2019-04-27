const request = require('supertest')
const app = require('../src/app')

/**  
 * This is the test suite for the necessary tests for the API.
 **/

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
}];

describe('CR OVER REST API - without UPDATE nor DELETE because it is historical data', () => {

  it('should create a quote through the REST API', async() => 
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

  it('should get all quotes through the REST API', async () => {
    await request(app).get('/quotes').send().expect(200); // there can be a significant number of quotes, so HTTP status 200 is enough
  });

  it('should get a possible profit for a currency through the REST API', async() => {
    await request(app).post('/quote').send(testQuotes[0]).expect(201);
    request(app)
      .get('/currency/profit/LTC')
      .send()
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        const profit = res.body;
        expect(profit.value.toFixed(2)).toEqual('0.71');
    })
  });

  it('should get a possible profit for a currency for a date through the REST API', async() => {
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

  it('should not get a profit for a currency through the REST API', async () => {
    await request(app).get('/currency/profit/XTC').send().expect(404);
  });
  
  /* it('should delete all quotes through the REST API', async () => {
    await request(app).delete('/deleteQuotes').send().expect(200)
  }); */
});
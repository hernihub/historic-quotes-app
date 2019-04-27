const parse = require('../util/utils');

const defaultInputFormat = 'YYYY-MM-DDTHH:MM:SS.ZZZZ';

describe('TEST FOR PARSER FUNCTIONS', () => {
    it('should parse a date in string format "YYYYMMDD" ', async() => {
        const dateString = '20180507';
        const targetDate = new Date();
        targetDate.setFullYear(2018);
        targetDate.setMonth(4);
        targetDate.setDate(7);
        const targetDateConverted = parse.parseDateOrTime(targetDate, true, defaultInputFormat);
        const convertedDate = parse.parseDateOrTime(dateString, true);
        expect(convertedDate).toEqual(targetDateConverted);
    });

    it('should parse time in military format "HHMM"', async() => {
        const timeString = '0930';
        const targetTime = new Date();
        targetTime.setFullYear(2018);
        targetTime.setMonth(4);
        targetTime.setDate(7);
        targetTime.setHours(9);
        targetTime.setMinutes(30);
        const targetTimeConverted = parse.parseDateOrTime(targetTime, false);
        const convertedTime = parse.parseDateOrTime(timeString, false);
        expect(convertedTime).toEqual(targetTimeConverted);
    });

    it('should parse money in decimal format "n.dd"', async() => {
        const moneyString = '2.70';
        const targetMoneyConverted = '$2.70';
        const convertedMoney = parse.parseMoney(moneyString);
        expect(convertedMoney).toEqual(targetMoneyConverted);
    });
});
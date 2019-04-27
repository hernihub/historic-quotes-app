const moment = require('moment');

const Parser = {
    parseDateOrTime: (input, date=false, inputFormat='YYYYMMDD', outputFormat='DD-MMM-YYYY') => {
        if (date) {
            return moment(input, inputFormat).format(outputFormat);
        }
        return moment(input, 'HH:mm:ss').format('h:mm A');
    },
    
    parseMoney: (moneyString) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD' }).format(moneyString)
    }
};

module.exports = Parser;
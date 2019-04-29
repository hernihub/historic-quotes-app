import React from 'react';
import parser from '../util/utils';

const ResultTable = (props) => {
    if(props.status === 404){        
        return (
            <div>
              <p>No quotes for {props.quote.currency} and date {parser.parseDateOrTime(props.quote.date, true)} </p>
            </div>
        );
    } else if (props.status === 200) {
        if(props.quote.value < 0) {
            return (
                <div>
                  <p>No profit for {props.quote.currency} and date {parser.parseDateOrTime(props.quote.date, true)} </p>
                </div>
            );
        }
        return (
        <div className="">
            <table className="resulttableClass">
                <tbody>
                  <tr><td colSpan="2">{parser.parseDateOrTime(props.quote.date, true)}</td></tr>
                  <tr><th colSpan="2" className="resulttableClass currency">{props.quote.currency}</th></tr>
                  <tr><th>Buy</th><th>Sell</th></tr>
                  <tr>
                    <td>{parser.parseMoney(props.quote.buy)}</td>
                    <td>{parser.parseMoney(props.quote.sell)}</td>
                  </tr>
                  <tr>          
                    <td>{parser.parseDateOrTime(props.quote.buyHour)}</td>
                    <td>{parser.parseDateOrTime(props.quote.sellHour)}</td>
                  </tr>
                  <tr><td colSpan="2">Profit: {parser.parseMoney(props.quote.value)}</td></tr>
                </tbody>
            </table>
        </div>
        );
    } else {
        return (
            <div>
                <p>An unexpected error has occurred, most likey a network error. Please try again later.</p>
            </div>
        );
    }
};

export default ResultTable;
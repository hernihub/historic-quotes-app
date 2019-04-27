import React from 'react';
import parser from '../util/utils';
import CurrencyForm from './CurrencyForm';
import axios from 'axios';
import Header from './Header';
import ResultModal from './ResultModal';

export default class IndecisionApp extends React.Component {
    state = {
        options: [],
        quote: {},
        status: undefined,
        openModal: false
    };

    handleCloseModal = () => {
        this.setState(() => ( { openModal: false } ));
    }

    handleGetProfit = (currency, date) => {
        if (!currency) {
            return 'Enter valid currency to fetch profit from';
        }
        
        axios.get(`http://localhost:3000/currency/profit/${currency}/${date}`).then(response => {
            const quotte = response.data;
            this.setState({
                openModal: true,
                status: response.status,
                quote: quotte
             });
        }).catch((error) => {
            if (error.message.toLowerCase() === 'network error') {              
              this.setStateWithError(-1, {});
            }
            else {
              const ddat = parser.parseDateOrTime(date, true, undefined, undefined);
              this.setStateWithError(error.response.status, '', {currency, date: ddat});
            }
        });        
    }

    setStateWithError = (status, message, res) => {
      this.setState({
        openModal: true,
        status,
        quote: res
      });
    }

    render() {
        return (
        <div>
            <Header />
            <div className="container">              
              <div className="widget">
                <p className="widget__message">Type a currency name</p>
                <CurrencyForm quote={this.quote} handleGetProfit={this.handleGetProfit}/>
              </div>
            </div>
            <ResultModal openModal={this.state.openModal} status={this.state.status}
                         quote={this.state.quote} handleCloseModal={this.handleCloseModal}/>
        </div>);
    }
}
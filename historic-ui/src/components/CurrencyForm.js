import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import parser from '../util/utils';
export default class CurrencyForm extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        error: undefined,
        startDate: new Date()
    };
    
    handleSubmit = (e) => {
        e.preventDefault();
        const currency = e.target.elements.option.value.trim();
        const date = parser.parseDateOrTime(this.state.startDate,true,undefined,'YYYYMMDD');
        if (!currency) {
            this.setState(() => ({ error: 'Please type a currency name' }));
        }
        this.props.handleGetProfit(currency, date);
    }

    handleChange = (date) => {
      this.setState({startDate: date});
    }

    render() {
      return (
            <div>
                <p className="currencyForm-error">Picke a date</p>
                <DatePicker selected={this.state.startDate} onChange={this.handleChange} className="currencyForm__date"/>                
                {this.state.error && <p className="currencyForm-error">{this.state.error}</p>}
                <form className="currencyForm" onSubmit={this.handleSubmit}>
                    <input className="currencyForm__input" type="text" name="option"/>
                    <div>
                        <button className="button">Get profit</button>
                    </div>
                </form>
            </div>
        );
    }
}
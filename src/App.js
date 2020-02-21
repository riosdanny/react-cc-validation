import React from 'react';
import Visa from './assets/icons8-visa.svg';
import Mastercard from './assets/icons8-mastercard.svg';
import Discover from './assets/icons8-discover.svg';
import Amex from './assets/icons8-amex.svg';
import {prefixes} from './prefixes.js';

const Logo = ({ type, alt, active }) => {
  let imgClass = 'cc-logo';

  if (active) {
    imgClass = 'cc-logo active';
  }

  return (
    <>
      <img src={type} alt={`${alt} credit card logo`} className={imgClass} />
    </>
  );
}

class CreditCardForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maxLength: 16,
      cardNumber: '',
      placeholder: 'Enter credit card number',
      activeVisa: false, // TODO: Clean this up
      activeMastercard: false,
      activeDiscover: false,
      activeAmex: false,
      type: '',
      validMessage: '',
      error: {},
    };
  }

  getValid = () => {
    if (this.state.validMessage !== '') {
      return this.state.validMessage
        ? 'Credit card number is valid'
        : 'Credit card number is invalid';
    }

    return '';
  }

  verifyNumber = () => {
    let sum = 0;
    let temp = 0;
    let cardNumberCopy = this.state.cardNumber;
    let checkDigit = parseInt(this.state.cardNumber.slice(-1));
    let parity = cardNumberCopy.length % 2;

    for (let i = 0; i <= cardNumberCopy.length - 2; i++) {
      if (i % 2 === parity) {
        temp = (+cardNumberCopy[i]) * 2;
      }
      else {
        temp = (+cardNumberCopy[i]);
      }

      if (temp > 9) {
        temp -= 9;
      }

      sum += temp;
    }

    return (sum + checkDigit) % 10 === 0;
  }

  /* 
    Not sure of a better way to allow arguments
    that are switched up depending on the call
    and only present 3/4 options at any given
    time
  */
  reset = (firstCard, secondCard, thirdCard, fourthCard) => {
    this.setState({
      ['active' + firstCard]: false,
      ['active' + secondCard]: false,
      ['active' + thirdCard]: false,
      ['active' + fourthCard]: true,
      validMessage: '',
    });
  }

  determineType = (cardNumber) => {

    for (let key of prefixes) {
      for (let value of key[1]) {
        if (cardNumber.startsWith(value)) {
          this.setState({
            type: key[0],
            //['active' + key[0]]: true,
          });

          /* TODO: Find a better way to manage this. */
          switch (key[0]) {
            case 'Visa':
              this.reset('Mastercard', 'Discover', 'Amex', 'Visa');
              break;
            case 'Mastercard':
              this.reset('Visa', 'Discover', 'Amex', 'Mastercard');
              break;
            case 'Discover':
              this.reset('Visa', 'Mastercard', 'Amex', 'Discover');
              break;
            case 'Amex':
              this.reset('Visa', 'Mastercard', 'Discover', 'Amex');
              break;
            default:
              break;
          }

          return;
        }
        else {
          this.setState({
            ['active' + key[0]]: false,
            type: '',
            validMessage: '',
          });
        }
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.cardNumber !== this.state.cardNumber) {
      this.determineType(this.state.cardNumber);
    }

    if (prevState.activeAmex !== this.state.activeAmex) {
      this.state.activeAmex
        ? this.setState({ maxLength: 15 })
        : this.setState({ maxLength: 16 });
    }

    if (prevState.type !== this.state.type) {
      if (this.state.type !== '') {
        this.setState({
          ['active' + this.state.type]: true,
        });
      }
    }

    /* A chain like this just seems wrong. */
    // prevState.cardNumber.length !== this.state.maxLength
    if (
         prevState.cardNumber.length !== this.state.cardNumber.length
        && this.state.cardNumber.length === this.state.maxLength) {
          this.setState({
            validMessage: this.verifyNumber(),
          });
    }
  }

  handleChange = (e) => {
    this.setState({
      cardNumber: e.target.value
    });
  }

  handleClick = (e) => {
    this.setState({
      cardNumber: '',
      validMessage: '',
    });
  }

  render() {
    return (
      <>
        <div className="input-addon">
          <input type="text"
            value={this.state.cardNumber}
            placeholder={this.state.placeholder}
            maxLength={this.state.maxLength}
            onChange={this.handleChange}
          />
          <button className="reset" onClick={this.handleClick}>reset</button>
        </div>
        <div className="error">
          <span>{this.getValid()}</span>
        </div>
        <div>
        <Logo type={Visa} 
            alt="Visa"
            active={this.state.activeVisa}
          />
          <Logo type={Mastercard} 
            alt= "Mastercard"
            active={this.state.activeMastercard}
          />
          <Logo type={Discover}
            alt="Discover"
            active={this.state.activeDiscover}
          />
          <Logo type={Amex}
            alt="American Express"
            active={this.state.activeAmex}
          />
        </div>
      </>
    );
  }
}

function App() {
  return (
    <div className="wrapper">
      <h1 className="header">Credit Card Number Validation</h1>
      <div className="cc-form">
        <CreditCardForm />
      </div>
      <footer>
          Credit card icons by <a href="https://icons8.com/">Icons8</a>
      </footer>
    </div>
  );
}

export default App;
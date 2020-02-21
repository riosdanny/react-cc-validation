import React from 'react';
import Visa from './assets/icons8-visa.svg';
import Mastercard from './assets/icons8-mastercard.svg';
import Discover from './assets/icons8-discover.svg';
import Amex from './assets/icons8-amex.svg';

const prefixes = new Map([
  ['Visa', '4'],
  ['Mastercard', ['51', '52', '53', '54', '55']],
  ['Discover', ['6011', '64', '65']],
  ['Amex', ['34', '37']],
]);

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
      valid: false,
      error: {},
    };
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
        console.log("temp doubled: ", temp);
      }
      else {
        temp = (+cardNumberCopy[i]);
        console.log("temp single: ", temp);
      }

      if (temp > 9) {
        temp -= 9;
      }

      console.log(`cardNumberCopy${i}'s temp: ${temp}`);
      sum += temp;
    }

    console.log("overall sum: ", sum);
    console.log("checkDigit: ", checkDigit);
    return (sum + checkDigit) % 10 === 0;
  }

  reset = (first, second, third) => {
    this.setState({
      ['active' + first]: false,
      ['active' + second]: false,
      ['active' + third]: false,
    });
  }

  determineType = (cardNumber) => {

    for (let key of prefixes) {
      for (let value of key[1]) {
        if (cardNumber.startsWith(value)) {
          this.setState({
            type: key[0],
            ['active' + this.state.type]: true,
          });

          /* TODO: Find a better way to manage this. */
          switch (key[0]) {
            case 'Visa':
              this.reset('Mastercard', 'Discover', 'Amex');
              break;
            case 'Mastercard':
              this.reset('Visa', 'Discover', 'Amex');
              break;
            case 'Discover':
              this.reset('Visa', 'Mastercard', 'Amex');
              break;
            default:
              this.reset('Visa', 'Mastercard', 'Discover');
          }

          return;
        }
        else {
          this.setState({
            ['active' + key[0]]: false,
            type: '',
          });
        }
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.cardNumber !== this.state.cardNumber) {
      this.determineType(this.state.cardNumber);
    }

    if (prevState.cardNumber.length !== this.state.maxLength
        && prevState.cardNumber.length !== this.state.cardNumber.length
        && this.state.cardNumber.length >= 15) {
      console.log("verifyNumber(): ", this.verifyNumber());
    }

    if (prevState.type !== this.state.type) {
      if (this.state.type !== '') {
        this.setState({
          ['active' + this.state.type]: true,
        });
      }
    }

    if (prevState.activeAmex !== this.state.activeAmex) {
      this.state.activeAmex
        ? this.setState({ maxLength: 15 })
        : this.setState({ maxLength: 16 });
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
        <div className="error"></div>
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
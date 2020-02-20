import React from 'react';
import visa from './assets/visa.png';
import mastercard from './assets/mastercard.png';
import discover from './assets/discover.png';
import amex from './assets/amex.png';

const prefix = new Map([
  ['cc-visa', '4'],
  ['cc-mastercard', ['51', '52', '53', '54', '55']],
  ['cc-discover', ['6011', '64', '65']],
  ['cc-amex', ['34', '37']],
]);

const Logo = ({ type, alt, imgClass }) => {
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
      maxLength: 19,
      cardNumber: '',
      placeholder: 'Enter credit card number',
      active: 'cc-logo inactive',
      type: '',
    };
  }

  determineType = (cardNumber) => {
    prefix.forEach( (value, key) => {
      if (cardNumber.startsWith(key)) {
        console.log("hey, keys match");
      }
    });
  }

  insertSpace = (cardNumber) => {
    /* TODO: Group digits visually and appropriately. */
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.cardNumber !== this.state.cardNumber) {
      this.insertSpace(this.state.cardNumber);
      this.determineType(this.state.cardNumber);
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
        <div>
          <Logo type={visa} 
            alt="Visa" 
            imgClass={this.state.active} /* move to function */
          />
          <Logo type={mastercard} 
            alt= "Mastercard" 
            imgClass={this.state.active}
          />
          <Logo type={discover}
            alt="Discover" 
            imgClass={this.state.active} 
          />
          <Logo type={amex}
            alt="American Express" 
            imgClass={this.state.active}
          />
        </div>
      </>
    );
  }
}

function App() {
  return (
    <div className="cc-form">
      <CreditCardForm />
    </div>
  );
}

export default App;
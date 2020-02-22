# Credit Card Validation

A React component for verifying the potential validity of a credit card number using the [Luhn algorithm](https://en.wikipedia.org/wiki/Luhn_algorithm).

## Demo

![Demonstration](demo/demo.gif)

## Features

- Calculates potential validity of credit card number
- Indicates card issuer corresponding to issuer identification number (IIN)
- Provides colored message indicating validity

### Supported card issuers

- Visa
- Mastercard
- Discover
- American Express

## Setup

```bash
$ git clone https://github.com/riosdcs/react-cc-validation.git
$ cd react-cc-validation
$ npm install
$ npm start
```

View the app at `http://localhost:3000`.

## Known issues

#### State update lag
The state's `maxLength` property changes based on the issuer: 15 for American Express, 16 otherwise. However, if the user replaces text by selecting text and pasting, it may not trigger updates in time due to state updating asynchronously. See [here](demo/selection_error.gif).

#### Credit card number formatting
Credit card numbers should follow their respective spacing as seen on their actual cards.

#### Form validation
Currently, `<input type="text">` and so allows non-integer input. Additionally, there should be visual indication that the user has not entered a complete credit card number (only after first `focus` event) and if the user attempts to exceed `maxLength`.

## Contributing

Contributions are welcomed and encouraged.

## License

![GitHub](https://img.shields.io/github/license/riosdcs/react-cc-validation?color=blue)

This project is licensed under the [MIT license](LICENSE).
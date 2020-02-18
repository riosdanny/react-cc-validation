import React from 'react';

const Label = ({ name }) => {
  return (
    <label for="name">credit card number:</label>
  );
}

const Input = ({ name, id, placeholder }) => {
  return (
    <>
      <Label for="name" />
      <input name={name} id={id} placeholder={placeholder}></input>
    </>
  );
}

function App() {
  return (
    <div>
      <Input name="cc-number" id="cc-number" placeholder="enter credit card number" />
    </div>
  );
}

export default App;
import React, { useState } from 'react';
import './Acc.css';

function CreateAccounts(props) {
  const [name, setName] = useState('');
  const [balance, setBalance] = useState('');

  const addAccount = (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const date = `${day}-${month}-${year}`;

    const created = {
      date: date,
      amount: parseFloat(balance).toFixed(2),
      description: 'Account Created'
    };

    const newAccount = {
      id: props.prevID + 1,
      accNo: props.prevAccNo + 1,
      name: name,
      balance: parseFloat(balance).toFixed(2),
      history: [created]
    };

    props.addAccount(newAccount);
    setName(' ');
    setBalance('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == 'name') {
      setName(value);
    } else if (name == 'balance') {
      setBalance(value);
    }
  };

  return (
    <form className='createAccForm' onSubmit={addAccount}>
      <h1> Add Account </h1>
      <div>
        <label> Name : </label>
        <input type="text" name="name" id="name"  placeholder='Enter Name' onChange={handleChange} required/>
      </div>
      <div>
        <label> Deposit : </label>
        <input type="text" name="balance" id="balance"  placeholder='Enter Ammount' onChange={handleChange} required />
      </div>
      <button type="submit" className="">
        Add Account
      </button>
    </form>
  );
}

export default CreateAccounts;

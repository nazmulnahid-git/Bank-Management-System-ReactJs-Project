import React, { useEffect, useState } from 'react';
import Axios from 'axios';

function Transfer() {
  const [rates, setRates] = useState({});
  const [baseCurrency, setBaseCurrency] = useState('BDT');
  const [transfer, setTransfer] = useState({
    sender: '',
    receiver: '',
    amount: '',
    currency: ''
  });

  useEffect(() => {
    Axios.get(`https://open.er-api.com/v6/latest/${baseCurrency}`)
      .then((res) => {
        console.log(res.data.rates);
        setRates(res.data.rates);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [baseCurrency]);
  const handleCurrencyChange = (e) => {
    setBaseCurrency(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransfer((prevTransfer) => ({ ...prevTransfer, [name]: value }));
  };

  const handleTransfer = (sender, receiver, amount) => {
    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    
    const senderId = accounts.findIndex(account => account.accNo == sender);
    const receiverId = accounts.findIndex(account => account.accNo == receiver);
    
    if (sender === receiver) {
      alert(`Sender and Receiver cannot have the same Account Number`)
    } else if (senderId != -1 && receiverId != -1) {
      const updatedAccounts = [...accounts];
      const senderAcc = { ...updatedAccounts[senderId] };
      const receiverAcc = { ...updatedAccounts[receiverId] };
  
      const Amount = parseFloat(amount) * rates['BDT'];
      const Balance = parseFloat(senderAcc.balance);
      
      if (Balance >= Amount) {
        senderAcc.balance = (Balance - Amount).toFixed(2);
        receiverAcc.balance = (parseFloat(receiverAcc.balance) + Amount).toFixed(2);
  
        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        const date = `${day}-${month}-${year}`;
        const ammount = `${Amount.toFixed(2)}`;
        
        const send = {
          date: date,
          amount: ammount,
          description: 'Transfered'
        };
        const recv = {
          date: date,
          amount: ammount,
          description: 'Recieved'
        };
        senderAcc.history.push(send);
        receiverAcc.history.push(recv);
  
        updatedAccounts[senderId] = senderAcc;
        updatedAccounts[receiverId] = receiverAcc;
        localStorage.setItem('accounts', JSON.stringify(updatedAccounts));
        alert('Transferd Successfully')
      } else {
        alert('Insufficient balance');
      }
    } else {
      if (senderId == -1) {
        alert('Sender account not found');
      } else if (receiverId == -1) {
        alert('Receiver account not found');
      }
    }
  };
  
  return (
    <div className="transferContainer">
      <h1 className="title">Balance Transfer</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleTransfer(transfer.sender, transfer.receiver, transfer.amount);
      }}>
        <div className="inputContainer">
          <label className="label">Sender Account No:</label>
          <input type="text" name="sender" id="sender" className="input" value={transfer.sender} placeholder = 'Enter Sender Acc No' onChange={handleChange} />
        </div>
        <div className="inputContainer">
          <label className="label">Receiver Account No:</label>
          <input type="text" name="receiver" id="receiver" className="input" value={transfer.receiver} placeholder = 'Enter Reciever Acc No' onChange={handleChange} />
        </div>
        <div className="inputContainer">
          <label className="label">Amount:</label>
          <input type="text" name="amount" id="amount" className="input" value={transfer.amount} placeholder = 'Enter Amount' onChange={handleChange} />
        </div>
        <div className="inputContainer">
          <label className="label">Currency:</label>
          <select value={transfer.currency} onChange={handleCurrencyChange} name="currency" className="select">
            {Object.keys(rates).map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="transferButton">Transfer</button>
      </form>
    </div>
  );
}

export default Transfer;

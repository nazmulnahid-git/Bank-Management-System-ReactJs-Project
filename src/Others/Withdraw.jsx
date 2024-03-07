import React, { useState } from 'react';

function Withdraw() {
  const [withdrawal, setWithdrawal] = useState({
    accNo: '',
    amount: '',
  });

  const handleWithdraw = (e) => {
    e.preventDefault();
    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    const { accNo, amount } = withdrawal;

    const Id = accounts.findIndex(account => account.accNo == accNo);

    if (Id != -1) {
      const updatedAccounts = [...accounts];
      const account = { ...updatedAccounts[Id] };

      const Amount = parseFloat(amount);
      const Balance = parseFloat(account.balance);

      if (!isNaN(Amount) && Amount > 0 && Balance >= Amount) {
        account.balance = (Balance - Amount).toFixed(2);
        
        
        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        const date = `${day}-${month}-${year}`;
        const ammount = `${Amount.toFixed(2)}`;
        const transaction = {
          date: date,
          amount: ammount,
          description: 'Withdrawn'
        };  


        account.history.push(transaction);

        updatedAccounts[Id] = account;

        localStorage.setItem('accounts', JSON.stringify(updatedAccounts));
        alert('Withdrawn Successfully');
        setWithdrawal({
          accNo: '',
          amount: '',
        });
      } else if (isNaN(Amount) || Amount <= 0) {
        alert('Invalid amount');
      } else {
        alert('Insufficient balance');
      }
    } else {
      alert('Account not found');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWithdrawal((prevWithdrawal) => ({ ...prevWithdrawal, [name]: value }));
  };

  return (
    <div className="transferContainer">
      <h1 className="title">Withdraw </h1>
      <form onSubmit={handleWithdraw}>
        {/* <div className="inputContainer">
          <label className="label"> Name :</label>
          <input type="text" name="name" id="name" className="input" />
        </div> */}
        <div className="inputContainer">
          <label className="label">Account No:</label>
          <input type="text" name="accNo" id="accNo" className="input" placeholder = 'Enter Account Number' onChange={handleChange} value={withdrawal.accNo} />
        </div>
        <div className="inputContainer">
          <label className="label">Amount:</label>
          <input type="text" name="amount" id="amount" className="input" placeholder = 'Enter Amount' onChange={handleChange} value={withdrawal.amount} />
        </div>
        <div className="inputContainer">
        </div>
        <button type="submit" className="transferButton"> Withdraw </button>
      </form>
    </div>
  );
}

export default Withdraw;

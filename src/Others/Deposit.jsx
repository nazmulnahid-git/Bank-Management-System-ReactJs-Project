import React, { useState }  from 'react';


function Deposit() {
  const [Deposit, setDeposit] = useState({
    accNo: '',
    amount: '',
  });

  const handleDeposit = (e) => {
    e.preventDefault();
    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    const { accNo, amount } = Deposit;
  
    const Id = accounts.findIndex(account => account.accNo == accNo);

    if (Id != -1) {
      const updatedAccounts = [...accounts];
      const account = { ...updatedAccounts[Id] };
    
      const Amount = parseFloat(amount);
      const Balance = parseFloat(account.balance);
      
      if (!isNaN(Amount) && Amount > 0) {
        account.balance = (Balance + Amount).toFixed(2);
        
        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        const date = `${day}-${month}-${year}`;
        const ammount = `${Amount.toFixed(2)}`;
        const transaction = {
          date: date,
          amount: ammount,
          description: 'Deposited'
        };  


        account.history.push(transaction);
    
        updatedAccounts[Id] = account;
    
        localStorage.setItem('accounts', JSON.stringify(updatedAccounts));
        alert('Deposited Successfully');
      } else {
        alert('Invalid amount');
      }
    } else {
      alert('Account not found');
    }
    setDeposit({
      accNo: '',
      amount: '',
    });
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeposit((prevDeposit) => ({ ...prevDeposit, [name]: value }));
  };
  
  return (
    <div className="transferContainer">
      <h1 className="title">Deposit </h1>
      <form onSubmit={handleDeposit}>
        {/* <div className="inputContainer">
          <label className="label"> Name :</label>
          <input type="text" name="name" id="name" className="input"  />
        </div> */}
        <div className="inputContainer">
          <label className="label">Account No:</label>
          <input type="text" name="accNo" id="accNo" className="input" placeholder = 'Enter Account Number' onChange={handleChange} value={Deposit.accNo} />
        </div>
        <div className="inputContainer">
          <label className="label">Amount:</label>
          <input type="text" name="amount" id="amount" className="input" placeholder = 'Enter Amount' onChange={handleChange} value={Deposit.amount} />
        </div>
        <div className="inputContainer">
        </div>
        <button type="submit" className="transferButton"> Deposit </button>
      </form>
    </div>
  );
}
export default Deposit;

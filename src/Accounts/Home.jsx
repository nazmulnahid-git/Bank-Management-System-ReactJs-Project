import React, { useState, useEffect} from 'react';
import Accounts from './Accounts';
import CreateAccounts from './CreateAccounts';
import './Acc.css'

function Home() {
  
  const [allAccounts, setAllAccounts] = useState(() => {
  const savedAccounts = localStorage.getItem('accounts');
  return savedAccounts ? JSON.parse(savedAccounts) : [
    {
      id: 1,
      accNo: 1000,
      name: "Nahid",
      balance: 1000,
      history: []
    },
    {
      id: 2,
      accNo: 1001,
      name: "Falak",
      balance: 1000,
      history: []
    },
    {
      id: 3,
      accNo: 1002,
      name: "Tahmid",
      balance: 1000,
      history: []
    }
  ];
});

const addAccount = (newAccount) => {
  setAllAccounts(prevAccounts => [...prevAccounts, newAccount]);
  console.log(newAccount)
};

useEffect(() => {
  localStorage.setItem('accounts', JSON.stringify(allAccounts));
}, [allAccounts]);

  const prevID = allAccounts.length > 0 ? allAccounts[allAccounts.length - 1].id : 0;
  const prevAccNo = allAccounts.length > 0 ? allAccounts[allAccounts.length - 1].accNo : 0;
  console.log(prevAccNo, prevID)

  return (
    <div className='Section'>
        <div className='leftSection'>
          <h1> Accounts </h1>
          <Accounts accounts={allAccounts} />
        </div>
        <div className='rightSection'>
          <CreateAccounts prevID={prevID} prevAccNo={prevAccNo} addAccount={addAccount} />
      </div>
    </div>
    
  );
}

export default Home;
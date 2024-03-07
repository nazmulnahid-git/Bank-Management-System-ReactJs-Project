import React, {useState} from 'react';
import Card from './Card';
import './Home.css';

function Home() {
  
  const cards = [
    {
      name: "Deposit",
      path : "/deposit",
      icon : "deposit.png"
    },
    {
      name: "Withdraw",
      path : "/withdraw",
      icon : "withdraw.png"
    },
    {
      name: "Transfer",
      path : "/transfer",
      icon : "transfer.png"
    },
    {
      name: "Accounts",
      path : "/accounts",
      icon : "user.png"
    }
  ];
  
  return (
    <>
    <h1> Bank Managment System </h1>
    <div className='container'>
      {cards.map((card) => (
        <Card key={card.path} {...card} />
      ))}
    </div>
    </>
  );
}

export default Home;

import React from 'react'
import './Acc.css'
function Account(props) {
  const {name, balance, accNo} = props.account
return (
  <div className='AccContainer'>
      <h3>{name}</h3>
      <p>Acc No : {accNo}</p>
      <p>Cur Balance : {balance}</p>
  </div>
)
}

export default Account
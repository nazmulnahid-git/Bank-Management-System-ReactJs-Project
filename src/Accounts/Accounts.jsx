import React, { useState } from 'react';
import Account from './Account';
import './Acc.css';

function Accounts(props) {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const handleClick = (account) => {
    setSelectedAccount(account);
    setShowPopup(true);
  };

  const handlePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      {props.accounts.length === 0 ? (
        <h1 style={{backgroundColor:"#fff", border:"none"}}> No Account Found ! </h1>
      ) : (
        <section className='AccsContainer'>
          {props.accounts.map((account, index) => (
            <div key={index} onClick={() => handleClick(account)}>
              <Account account={account} />
            </div>
          ))}
        </section>
      )}

      {showPopup && selectedAccount && (
        <div className="popup">
          <div className="popup-content">
            <h2>User Details</h2>
            <code className="close" onClick={handlePopup}> x </code>
            <div className="user-detail">
              <div className="detail">
                <p>Name:</p>
                <h4>{selectedAccount.name}</h4>
              </div>
              <div className="detail">
                <p>Account No:</p>
                <h4>{selectedAccount.accNo}</h4>
              </div>
              <div className="detail">
                <p>Current Balance:</p>
                <h4>{selectedAccount.balance} BDT</h4>
              </div>
            </div>
            <div className="transaction-history">
              <h3>Transaction History</h3>
              {selectedAccount.history.length === 0 ? (
                <p>No Transactions</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedAccount.history.map((transaction, index) => (
                      <tr key={index}>
                        <td>{transaction.date}</td>
                        <td>{transaction.amount}</td>
                        <td>{transaction.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Accounts;

//import logo from './logo.svg';
import bookclub from './images/bookclub.jpg';
import './App.css';

// Import Web3
import web3 from 'web3';
//Import State
import {React, useState, useEffect} from 'react';
import Web3 from 'web3';

const coolButton = {

  padding: '.5em',
  textAlign: 'center',
  backgroundColor: 'red',
  borderRadius: '20px',
  border: '5px solid #FFFFFF',
  color: 'white',
  fontSize: '2rem',
  cursor: 'pointer'

}

const coolButton2 = {

  padding: '.5em',
  textAlign: 'center',
  backgroundColor: 'green',
  borderRadius: '20px',
  border: '5px solid #FFFFFF',
  color: 'white',
  fontSize: '2rem',
  cursor: 'pointer'

}

function App() {

  useEffect(() => {
    //Local DOM window
    const {ethereum} = window;
    //Prompt user for ethereum window
    let web3 = new Web3(window.ethereum);
  })

  //Connects to Web3 ethereum
  const connectWallet = async() => {

    await window.ethereum.request({
      method: "wallet_requestPermissions",
      params: [
        {
          eth_accounts: {},
        },
      ],
    });

    //waits for the account address from metamask wallet
    const account = await window.ethereum.request({method: "eth_requestAccounts"});
    //Saves the address in local storage
    localStorage.setItem("address", account[0]);

    window.alert("Connected wallet address: " + localStorage.address);
  }
  // const sendETH = () => {
  //   web3.eth.sendTransaction({to: 0xa54b7Fa940E00ca53eb293D992908F4C59a61D9F, from: localStorage.address, value: web3.utils.toWei("0.5", "ether")});
  // }

  const sendETH = () => {
    window.ethereum.request({
      method: "eth_sendTransaction",
      params: [{
        to: "0xa54b7Fa940E00ca53eb293D992908F4C59a61D9F",
        from: localStorage.address,
        value: web3.utils.toHex(web3.utils.toWei("0.1", "ether")),
      }],
    })
    .then(() => {
      alert("Thank you for your contribution!")
    })
    .catch((e) => {
      alert("Oops, please try again!")
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">Online Crypto Book Club</h1>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <img src={bookclub} className="bookclub" alt="bookclub" />
        <button style={coolButton} onClick={connectWallet}>Connect wallet</button>
        <p>
          Contribute to further our goals
        </p>
        <button style={coolButton2} onClick={sendETH}>Send 0.1 ETH</button>
      </header>
    </div>
  );
}

export default App;

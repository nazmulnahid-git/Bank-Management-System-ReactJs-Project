import React from 'react'
import Home from './Home'
import Deposit from './Others/Deposit'
import Transfer from './Others/Transfer'
import Withdraw from './Others/Withdraw'
import Accounts from './Accounts/Home'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

function App() {
  const router = createBrowserRouter([
    {
      path : '/',
      element : <Home/>,
    },
    {
      path : '/deposit',
      element : <Deposit/>,
    },
    {
      path : '/withdraw',
      element : <Withdraw/>,
    },
    {
      path : '/transfer',
      element : <Transfer/>,
    },
    {
      path : '/accounts',
      element : <Accounts/>,
    }

  ])
  return (
    <RouterProvider router = {router}/>
  )
}

export default App

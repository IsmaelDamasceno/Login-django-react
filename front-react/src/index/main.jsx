import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import RootRoute from '../routes/rootRoute.jsx'
import Cadastro from '../routes/cadastro/cadastro.jsx'
import Login from "../routes/login/login.jsx"
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootRoute />,
  },
  {
    path: '/cadastro',
    element: <Cadastro />
  },
  {
    path: '/login',
    element: <Login />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {<App router={router} />}
  </React.StrictMode>,
)

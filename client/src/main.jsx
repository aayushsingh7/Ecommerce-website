import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './assets/main.css'
import { BrowserRouter } from 'react-router-dom'
import AppFunction from './context/Context'

ReactDOM.createRoot(document.getElementById('root')).render(
    <AppFunction>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppFunction>
)

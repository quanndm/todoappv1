import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux';
import { store } from "./store/store";
import "./styles/index.scss";
import axios from "axios"
import 'react-toastify/dist/ReactToastify.css';
// const url = "http://localhost:5111"
const url = "https://quan-todoapiv1-dev.azurewebsites.net/"
axios.defaults.baseURL = `${url}/api`
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)

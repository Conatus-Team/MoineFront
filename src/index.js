import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

//DB
// const express = require('express');
// const router = express();
// const db = require('./sever/config/db');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
  // document.getElementById("root")
);


// router.get('/db',(req,res) => {
//   db.query('SELECT * FROM group_info', (err, data)=>{
//     if(!err) res.send({products : data});
//     else res.send(err);
//   })
// })

// module.exports = router;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

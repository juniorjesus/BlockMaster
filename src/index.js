import React from 'react';
import ReactDOM from 'react-dom';
import './style/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import AppRouter from './routers/AppRouter';



ReactDOM.render(
    <AppRouter/>,

 document.getElementById('root')
);



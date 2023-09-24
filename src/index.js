import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Websocket from "./Websocket";
import OrderTable from "./OrderTable";
import TotalsTable from "./TotalsTable";

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
    <React.StrictMode>
        <OrderTable/>
        <hr/>
        <TotalsTable/>
        <hr/>
        <Websocket/>
    </React.StrictMode>
);

reportWebVitals();

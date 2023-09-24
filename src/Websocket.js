import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

function triggerFetchAndSaveDataLoop() {
    fetch("http://localhost:8080/fetchAndSaveDataLoopWebsocket", {
        method: "GET"
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error("Error:", error);
        });
}

function Websocket() {
    const [results, setResults] = useState([]);

    useEffect(() => {
        let socket = new SockJS('http://localhost:8080/websocket-endpoint');
        let stompClient = Stomp.over(socket);

        stompClient.connect({}, function(frame) {
            stompClient.subscribe('/topic/batchProcessing', function(result) {
                let data = JSON.parse(result.body);
                setResults(prevResults => [...prevResults, data]);
            });
        });

        return () => {
            if (stompClient) {
                stompClient.disconnect();
            }
        };
    }, []);

    return (
        <div>
            <button onClick={triggerFetchAndSaveDataLoop}>Start Fetch and Save Process</button>
            <table>
                <thead>
                <tr>
                    <th>Batch Number</th>
                    <th>Batch Processing Time</th>
                    <th>Total Processing Time</th>
                </tr>
                </thead>
                <tbody>
                {results.map((result, index) => (
                    <tr key={index}>
                        <td>{result.batchNumber}</td>
                        <td>{result.batchProcessingTime} ms</td>
                        <td>{result.totalProcessingTime} ms</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}


export default Websocket;

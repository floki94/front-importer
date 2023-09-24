import axios from "axios";
import React, {useState} from 'react';

function TotalsTable() {

    const [tableData, setTableData] = useState([]);
    const [activeTable, setActiveTable] = useState(null);

    const fetchData = async (endpoint) => {
        try {
            const response = await axios.get(endpoint);
            console.log(response.data);

            const dataArray = Object.entries(response.data).map(([key, value]) => ({data: key, count: value}));

            setTableData(dataArray);
            setActiveTable(endpoint);
        } catch (error) {
            console.error("Error al obtener los datos:", error);
        }
    };

    const downloadCSV = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/orders/generate-csv", {
                responseType: 'blob'
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'orders.csv');
            document.body.appendChild(link);
            link.click();

            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error al descargar el CSV:", error);
        }
    };

    return (
        <div>
            <button onClick={() => fetchData("http://localhost:8080/api/orders/countByRegion")}>countByRegion</button>
            <button onClick={() => fetchData("http://localhost:8080/api/orders/countByCountry")}>countByCountry</button>
            <button onClick={() => fetchData("http://localhost:8080/api/orders/countByPriority")}>countByPriority
            </button>
            <button onClick={() => fetchData("http://localhost:8080/api/orders/countByItemType")}>countByItemType
            </button>
            <button
                onClick={() => fetchData("http://localhost:8080/api/orders/countBySalesChannel")}>countBySalesChannel
            </button>
            <button onClick={downloadCSV}>Descargar CSV</button>

            {activeTable && tableData && Array.isArray(tableData) && (
                <table>
                    <tbody>
                    {tableData.map((row, index) => (
                        <tr key={index}>
                            <td>{row.data}</td>
                            <td>{row.count}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default TotalsTable;

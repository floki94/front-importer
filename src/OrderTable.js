import React, { useState, useEffect } from 'react';
import { useTable, usePagination } from 'react-table';
import axios from 'axios';
import './OrderTable.css';


const OrderTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const isFirstPage = page === 0;
    const isLastPage = page === 99999;
    const [enteredPage, setEnteredPage] = useState("");

    const goToPage = () => {
        const pageNumber = parseInt(enteredPage, 10) - 1;
        if (pageNumber >= 0 && pageNumber <= 99999) {
            setPage(pageNumber);
        }
    };

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            const response = await axios.get("http://localhost:8080/api/orders", {
                params: {
                    page: page,
                    size: 10
                }
            });
            setData(response.data.content);
            setLoading(false);
        };

        fetchOrders();
    }, [page]);

    const columns = React.useMemo(
        () => [
            {
                Header: 'Uuid',
                accessor: 'uuid',
            },
            {
                Header: 'Order ID',
                accessor: 'id',
            },
            {
                Header: 'Region',
                accessor: 'region',
            },
            {
                Header: 'Country',
                accessor: 'country',
            },
            {
                Header: 'Item type',
                accessor: 'item_type',
            },
            {
                Header: 'Sales Channel',
                accessor: 'sales_channel',
            },
            {
                Header: 'Order Priority',
                accessor: 'priority',
            },
            {
                Header: 'Formatted Date',
                accessor: 'formattedDate',
            },
            {
                Header: 'Ship Formatted Date',
                accessor: 'shipFormattedDate',
            },
            {
                Header: 'Units sold',
                accessor: 'units_sold',
            },
            {
                Header: 'Unit price',
                accessor: 'unit_price',
            },
            {
                Header: 'Unit Cost',
                accessor: 'unit_cost',
            },
            {
                Header: 'Total Revenue',
                accessor: 'total_revenue',
            },
            {
                Header: 'Total cost',
                accessor: 'total_cost',
            },
            {
                Header: 'Total Profit',
                accessor: 'total_profit',
            },



        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 10 },
        },
        usePagination
    );

    return (
        <div>
            <table {...getTableProps()}>
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => (
                                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            ))}
                        </tr>
                    );
                })}
                </tbody>
            </table>
            <div>
                <button onClick={() => setPage(old => Math.max(old - 1, 0))} disabled={isFirstPage}>
                    Anterior
                </button>
                <button onClick={() => setPage(old => old + 1)} disabled={isLastPage}>
                    Siguiente
                </button>
                <div>
                    <input
                        type="number"
                        value={enteredPage}
                        onChange={e => setEnteredPage(e.target.value)}
                        placeholder="Número de página"
                    />
                    <button onClick={goToPage}>
                        Ir a página
                    </button>
                </div>

            </div>
        </div>
    );
};

export default OrderTable;
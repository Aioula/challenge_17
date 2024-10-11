import React, { useState, useEffect } from 'react';
import axios from 'axios';

const   CryptoCurrencyInfo= ()=>{
    const [cryptoData, updateCryptoData] = useState([]);
    const [isFetchingData, updateIsFetchingData] = useState(false);

    useEffect(() => {
        
    const  fetchCryptoData= async ()=> {
        updateIsFetchingData(true);
        try{
            const response = await axios.get('https://api.coinlore.net/api/tickers/');
            
                console.log(response)
                updateCryptoData(response.data.data);
                updateIsFetchingData(false);
            
            } catch (error) {
            console.log("Error fetching weather data:", error);            
            }
        }
            fetchCryptoData();
    }, []);
    
    function renderCryptoTable() {
        const selectedKeys = ['symbol', 'name', 'price_usd', 'price_btc']
        if (cryptoData.length) {
            const tableHeadings = [];
            const tableRows = [];
            cryptoData.map((item, index) => {
                const rowItems = [];
                for (let key in item) {
                    if (selectedKeys.includes(key)) {
                        if (index === 0) {
                            tableHeadings.push(
                                <th scope="col" className={"text-capitalize"} key={key}>
                                    {key.replace('_', ' ')}
                                </th>
                            );
                        }
                        rowItems.push(<td key={item[key] + Math.random()}>{item[key]}</td>)
                    }
                }
                tableRows.push(
                    <tr>
                        {rowItems}
                    </tr>
                )
            });
            return (
                <table className="table table-striped table-dark">
                    <thead className="thead-dark">
                        <tr>
                            {tableHeadings}
                        </tr>
                    </thead>
                    <tbody>
                        {tableRows}
                    </tbody>
                </table>
            )
        }
    }
    if (isFetchingData) {
        return (
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        )
    }
    return (
        <div className="container">
            {renderCryptoTable()}
        </div>
    );
}

export default CryptoCurrencyInfo;

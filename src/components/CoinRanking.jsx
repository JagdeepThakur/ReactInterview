import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

const CoinRanking = () => {
  const [rankingData, setRankingData] = useState([]);

  const getRankingData = async () => {
    const response = await axios.get("https://api.coinranking.com/v2/coins");
    setRankingData(response.data.data.coins);
    console.log(response.data.data.coins);
  };

  useEffect(() => {
    getRankingData();
  }, []);

  const column = [
    {
      name: "Coin Name",
      selector: (row) => row.name,
    },
    {
      name: "Coin Symbol",
      selector: (row) => row.symbol,
    },
    {
      name: "Coin Price",
      selector: (row) => Number(row.price).toFixed(4),
      sortable: true,
    },
    {
      name: "Coin Icon",
      selector: (row) => (
        <img width={50} height={50} alt="Coin" src={row.iconUrl}></img>
      ),
    },
  ];

  return (
    <div>
      <DataTable
        title="Coin Ranking"
        columns={column}
        data={rankingData}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="500px"
      ></DataTable>
    </div>
  );
};

export default CoinRanking;

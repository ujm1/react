import { useQuery } from "react-query";
import { useLocation, useParams } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexCharts from "apexcharts";

interface ChartProps {
  coinId : string;
}

interface IChart {
  time_open: string;
  time_close : string;
  open : number;
  high : number;
  low : number; 
  close: number;
  vomume : number;
  market_cap: number;
}

function Chart() {
  const {state} = useLocation();
  console.log('state:',state);


  const {coinId}= useParams();
  console.log(coinId, 'coinId');

  const {isLoading, data}=useQuery<IChart[]>(["ohlcv",coinId],()=>
    fetchCoinHistory(coinId));

    return (
      <>
      chart of {coinId} 
{/*       <div>{isLoading ? "Loading Chart..." : <ApexCharts />}</div> */}
      </>  
    );
};

export default Chart;
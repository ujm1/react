import { useQuery } from "react-query";
import { useLocation, useParams } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ReactApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atom";

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

  const isDark=useRecoilValue(isDarkAtom);
    return (
      <>
      chart of {coinId} 
      <div>{isLoading ? "Loading Chart..." : <ReactApexChart
      type="line" series={[
        {
          name: "Prices",
          data: data?.map((price)=>price.close)??[],
        },
      ]} options={{
        theme:{mode:"dark"},
        chart:{height:300, width:500,
          toolbar: {
            show: false,
          },
          background:"transparent",
         },
         grid:{show: false},
        stroke: {
          curve:"smooth",
          width:4,
          },
        yaxis: {
          show: false,
          },
        xaxis : {
          axisTicks: {show: false, },
          axisBorder : {show: false,},
          labels: {show:false},
          type: "datetime",
          categories: data?.map((price)=>price.time_close),
          },
        fill : {
          type:"gradient", 
          gradient:{gradientToColors : ["blue"], }
        },
        colors:["red"],
        tooltip : {
          y: {
            formatter: (value)=>`$${value.toFixed(2)}`, //달러표시+소숫점 2자리까지
          }
        }

        }}/>}</div> 
      </>  
    );
};

export default Chart;
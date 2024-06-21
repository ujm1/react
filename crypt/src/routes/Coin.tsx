import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useMatch, useParams } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Price from "./Price";
import Chart from "./Chart";
import { useQuery } from "react-query";
import { fecthTickersInfo, fetchCoinInfo } from "../api";
import {Helmet} from 'react-helmet';

interface RouteState {
    name?:string;
    rank?:number;
    coinId?:string;
}

interface IInfoData { 
    id: string ;
    name:     string ;
    symbol:     string ;
    rank:     number ;
    is_new:     boolean ;
    is_active:     boolean ;
    type:     string ;
    logo:     string ;
    description:     string ;
    message:     string ;
    open_source:     boolean ;
    started_at:     string ;
    development_status:     string ;
    hardware_wallet:     boolean ;
    proof_type:     string ;
    org_structure:     string ;
    hash_algorithm:     string ;
    first_data_at:     string ;
    last_data_at:    string;
}

interface IPriceData {
    id : string;
    name : string;
    symbol : string;
    rank : number;
    total_supply : number;
    max_supply : number;
    beta_value : number;
    first_data_at : string;
    last_updated : string;
    quotes : {
        USD : {
            ath_date: string;
            ath_price : number; 
            market_cap : number; 
            market_cap_change_24h : number; 
            percent_change_1h : number; 
            percent_change_1y : number; 
            percent_change_6h : number; 
            percent_change_7d : number; 
            percent_change_12h : number; 
            percent_change_15m : number; 
            percent_change_24h : number; 
            percent_change_30d : number; 
            percent_change_30m : number; 
            percent_from_price_ath : number; 
            price : number; 
            volume_24h : number; 
            volume_24h_change_24h : number; 
        };
    };
}


function Coin() {

    const {coinId}=useParams();

    console.log('coinId',coinId); //param으로 해서, 주소 찍어도 바로 간다.

    const location=useLocation(); /* link에서 state로 보낸 객체
    내가 임의로 보낸 name과 rank를 갖고 있다. 콘솔 찍어보면 */
    const state=location.state as RouteState;
    // 이러면 state {name : } 이 됨.
 // 만약 const state=location.state.name; 이러면 
 // name이 딱 name의 그 값만 되고.

    console.log('state',state); //state로 보내서, 전페이지 안거치면 안 간다.



    const priceMatch=useMatch("/:coinId/price");
    const chartMatch=useMatch("/coinId/chart");

    const {isLoading : infoLoading, data: infoData}=useQuery<IInfoData>(["info",coinId],()=>fetchCoinInfo(coinId));
    const {isLoading :tickersLoading, data:tickersData}=useQuery<IPriceData>(
        ["tickers",coinId],()=>fecthTickersInfo(coinId)); //5초마다 다시 패치

    const loading=infoLoading || tickersLoading;
 
    return (
        <> 
        <Helmet>
            <title>
           asdf 
            </title>
        </Helmet>
        <h1>Coin : {coinId? coinId: null}</h1> {/* to로 보낸 param */}

            {state?.name ? '이름:'+state?.name : loading? "Loading" : infoData?.name} 


            {'랭크:'+state?.rank}
            <br></br>
            {'Price:$'+tickersData?.quotes.USD.price.toFixed(2)}

            <br></br><br></br>
            { state && coinId ? ( <>
            <Link to={`/${coinId}/chart`} state= {{name:state.name, rank:state.rank}}>Chart</Link> 
            <Link to={`/${coinId}/price`} state= {{name:state.name, rank:state.rank}}>Price</Link>
           </>   ) :null }
            <br></br><br></br>
            여기서 Outlet으로 하위페이지 삽입
            <br></br><br></br>
            <Outlet/>

        </>
    );
};

export default Coin;
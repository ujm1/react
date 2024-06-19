import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useMatch, useParams } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Price from "./Price";
import Chart from "./Chart";

interface RouteState {
    name:string;
    rank:number;
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
    const {coinId}=useParams(); //link에서 to로 보낸 것
/*     const {state}=useLocation(); */
    const location=useLocation(); /* link에서 state로 보낸 객체
    내가 임의로 보낸 name과 rank를 갖고 있다. 콘솔 찍어보면 */
    const state=location.state as RouteState;
    // 이러면 state {name : } 이 됨.
 // 만약 const state=location.state.name; 이러면 
 // name이 딱 name의 그 값만 되고.

    const [info, setInfo]=useState<IInfoData>();
    const [priceInfo, setPriceInfo]=useState<IPriceData>();

    const [loading, setLoading] = useState(true);

    const priceMatch = useMatch("/:coinId/price");
    console.log(priceMatch); //내가 price에 있는지 확인, 들어가있으면 object반환
    //안들어가있으면 null

    const aa=useMatch("/:coinId");
    console.log('aa',aa);

    useEffect(()=>{
        (async()=> {
            const infoData = await ( //앞서 한 await 과 똑같으나 2줄을 1줄로 줄인 것
                await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
            ).json();
            
            const priceData = await ( //하나는 fetch를 위한 await, 하나는 json을 위한 await임
                await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
            ).json();
        
            setInfo(infoData);
            console.log('infoData:',infoData);

            setPriceInfo(priceData);
            console.log('priceData:',priceData);

            setLoading(false);
            
        })();
    }, [coinId]); /*이걸 넣으나 넣지않으나 (해당 url이 coinId에 의존하고 있으므로) 
    변하지 않지만, hook은 최적으 성능을 위해선 그 안에서 쓰인 것들은 저렇게 지정해줘야한다고 하니 추가 /*


 
    console.log('state:',state);
/*     const name=location.state as RouterState; */
    //즉 const location.useLocation(); 
    //const name = location.state 임. 보낸 
    return (
        <> 
        <h1>Coin : {coinId}</h1> {/* to로 보낸 param */}

            {state?.name ? state.name : loading? "Loading" : info?.name} 


            {state.rank}

            {priceInfo?.quotes.USD.ath_date}

            {priceInfo?.total_supply}
            {priceInfo?.max_supply}
            <Link to={`/${coinId}/chart`}>Chart</Link> 
            <Link to={`/${coinId}/price`}>Price</Link>
            여기서 하위페이지 삽입

            <Outlet/>

        </>
    );
};

export default Coin;
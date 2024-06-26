import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atom";


const Container=styled.div`
    padding: 0px 10px; /* 위아래 0 좌우 10 */
    max-width: 480px;
    margin : 0 auto; /* 언제나 중앙에 위치하도록 */
    `; 

const Header=styled.header`
    height:10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CoinsList=styled.ul``;

const Coin=styled.li`
    background-color: white;
    color:${props=>props.theme.bgColor};
    border-radius: 15px;
    margin-bottom:10px;
    a {
        padding: 20px; //대충 더 넓혀져 보인다는 뜻
        transition: color 0.2s ease in;
        align-items: center;
        display: block; //이거 안하면 인라인이어서 글짜부분까지만 클릭 가능
        //이걸 해줘야 block으로 바뀌어서 전체 넓이 먹어서 글자 없는 부분까지 클릭 가능
    }
    &:hover { //마우스 갖다댔을 떄
        a { //앵커의 경우에만
            color:${(props)=>props.theme.accentColor} //글씨색을 초록으로 변경
            //즉 link로 라우팅해도 이걸 a 로 인식.
        }
    }
    `;

const Title=styled.h1`
    font-size: 48px;
    color: ${(props)=>props.theme.accentColor};
    `;

const Loader=styled.span`
    text-align: center;
    display: block;
`;

const Img=styled.img`
    width:25px;
    height:25px;
    margin-right: 10px;
    `;

interface CoinInterface {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}

function Coins() {


    const {isLoading, data}=useQuery<CoinInterface[]>("allCoins", fetchCoins);
     //api 폴더 안에 선언한 fetchCoins라는 함수 호출, 호출되면 isLoading, 
     //호출 끝나면 return된 결과물이 data에
     //아울러 data의 타입을 지정해줘야하므로 <> 안에 넣음

     const setDarkAtom=useSetRecoilState(isDarkAtom);

     const toggleDarkAtom=()=>setDarkAtom((prev)=>!prev);

    return (
        <>
            <Container>
                <Header>
                    <Title>코인</Title>
                    <button onClick={toggleDarkAtom}>Toggle</button>
                </Header>
                { isLoading ? (<Loader> "Loading..." </Loader> ): 
                <CoinsList>
                    {data?.slice(0,100).map((coin)=>(
                        <Coin key={coin.id}> {/* li와 key가 나오며, 단지 Coin으로 스타일링 */}
                            <Link to={`/${coin.id}`} 
                            state= {{name:coin.name, rank:coin.rank}}> {/* 객체로 보냄 */}
                            {/* 이 state는 Coins를 열때, 그리고 각각의 coin을 열 때. 두 번 생성된다. */}
                            <Img src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}/>
                            {coin.name} &rarr;
                            </Link>
                            {/* <Link to={`/${coin.id}`}>{coin.name} &rarr;</Link> */} 
                        </Coin>
                    ))}
                    {/* Router에서 /:coinId로 보냈으므로 여기선, 이 Coin은 위의 스타일링 Coin임 */}
                </CoinsList>
                }
            </Container>
        </>
    );
};

export default Coins;
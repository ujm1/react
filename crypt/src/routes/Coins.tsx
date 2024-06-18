import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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

    const [coins, setCoins] = useState<CoinInterface[]>([]); //array는 타입 이렇게 해줘야

    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        (async()=> {
            const response = await fetch("https://api.coinpaprika.com/v1/coins");
            const json = await response.json();
            setCoins(json.slice(0,100)); //json 수만개 가져와서 그 중 100개만 잘라 스테이트화한다는것
            setLoading(false);
        })(); //즉시실행함수
    }, []);

    console.log(coins);

    return (
        <>
            <Container>
                <Header>
                    <Title>코인</Title>
                </Header>
                { loading ? (<Loader> "Loading..." </Loader> ): 
                <CoinsList>
                    {coins.map((coin)=>(
                        <Coin key={coin.id}> {/* li와 key가 나오며, 단지 Coin으로 스타일링 */}
                            <img src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}/>
                            <Link to={`/${coin.id}`}>{coin.name} &rarr;</Link> {/* 그 리스트마다 이름 및 화살표에 Link 넣은 것 */}
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
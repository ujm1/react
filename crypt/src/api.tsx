const BASE_URL = 'https://api.coinpaprika.com/v1';

export async function fetchCoins() {
    return fetch(`${BASE_URL}/coins`)
    .then((response)=>response.json());
}

export async function fetchCoinInfo(coinId : string | undefined) {
    return fetch(`${BASE_URL}/coins/${coinId}`)
    .then((response)=>response.json());
} //infoData 대체

export async function fecthTickersInfo(coinId: string | undefined) {
    return fetch(`${BASE_URL}/tickers/${coinId}`)
    .then((response)=>response.json());
} //priceData 대체

export function fetchCoinHistory(coinId: string | undefined) {
    return fetch(`https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`)
    .then((response)=>response.json());
}
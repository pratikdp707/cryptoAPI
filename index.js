
let globalCoins = 'https://api.coinstats.app/public/v1/coins?';
let globalCoin = 'https://api.coinstats.app/public/v1/coins/';
let historyCoin = 'https://api.coinstats.app/public/v1/charts?';

var currency = 'INR';
var coin = 'bitcoin';
const url = "https://api.coinstats.app/public/v1/charts?period=1y&coinId=ethereum";

getData(globalCoin+coin+'?currency=INR');
document.getElementById('input-location').value  = '';

let xyValues=[];

document.getElementById('search-coin').addEventListener('click',e=>{
    let coinName = document.getElementById('input-location').value;
    getData(globalCoin+coinName+'?currency='+currency);
    coin = coinName;
    console.log(coinName);
});

document.getElementById('btn-INR').addEventListener('click',e=>{
    document.getElementById('btn-'+currency).classList.remove('active');
    e.target.classList.add('active');
    currency = e.target.innerText;
    getData(globalCoin+coin+'?currency='+currency);
    console.log(currency);
})
document.getElementById('btn-USD').addEventListener('click',e=>{
    document.getElementById('btn-'+currency).classList.remove('active');
    e.target.classList.add('active');
    currency = e.target.innerText;
    getData(globalCoin+coin+'?currency='+currency);
    console.log(currency);
})
document.getElementById('btn-EURO').addEventListener('click',e=>{
    document.getElementById('btn-'+currency).classList.remove('active');
    e.target.classList.add('active');
    currency = e.target.innerText;
    getData(globalCoin+coin+'?currency='+currency);
    console.log(currency);
})


async function getData(globalCoin){
    let globalCoinResp = await fetch(globalCoin);
    let globalCoinData = await globalCoinResp.json();
    console.log(globalCoinData);
    if(globalCoinData.coin == undefined){
        coin = 'bitcoin';
        alert('no such coin exists');
        document.getElementById('input-location').value = '';
    }
    display(globalCoinData);
}


function display(globalCoinData){
    let coinImg = document.getElementById('coin-image');
    let coinName = document.getElementById('coin-name');
    let symbol = document.getElementById('value-symbol');
    let rank = document.getElementById('value-rank');
    let btc = document.getElementById('value-btc');
    let price = document.getElementById('value-price');
    let url = document.getElementById('value-url')
    let oneDay = document.getElementById('value-1D');
    let week = document.getElementById('value-1W');
    let volume = document.getElementById('value-volume');
    let cap = document.getElementById('value-cap');

    coinImg.src = globalCoinData.coin.icon;
    coinName.innerText = globalCoinData.coin.name;
    symbol.innerText = globalCoinData.coin.symbol;
    rank.innerText = globalCoinData.coin.rank;
    btc.innerText = globalCoinData.coin.priceBtc.toFixed(10);
    price.innerText = currency +" "+ globalCoinData.coin.price.toFixed(2);
    url.href = globalCoinData.coin.websiteUrl;
    url.innerText = globalCoinData.coin.websiteUrl;
    oneDay.innerText = globalCoinData.coin.priceChange1d;
    week.innerText = globalCoinData.coin.priceChange1w;
    volume.innerText = globalCoinData.coin.volume.toFixed(2);
    cap.innerText = globalCoinData.coin.marketCap.toFixed(2);
}









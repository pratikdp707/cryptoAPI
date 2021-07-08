
let globalCoins = 'https://api.coinstats.app/public/v1/coins?&';
let globalCoin = 'https://api.coinstats.app/public/v1/coins/';

var currency = 'INR';
var coin = 'bitcoin';
let currentPage = 1;
let previousPage = 1;
let globalCoinsData;

getData(globalCoin+coin+'?currency=INR', globalCoins+'currency=INR');
setActive(1,1);
document.getElementById('input-location').value  = '';

document.getElementById('search-coin').addEventListener('click',e=>{
    let coinName = document.getElementById('input-location').value;
    getData(globalCoin+coinName+'?currency='+currency, globalCoins+'currency='+currency);   
    coin = coinName;
    console.log(coinName);
});

document.getElementById('btn-INR').addEventListener('click',e=>{
    document.getElementById('btn-'+currency).classList.remove('active');
    e.target.classList.add('active');
    currency = e.target.innerText;
    getData(globalCoin+coin+'?currency='+currency, globalCoins+'currency='+currency);
    console.log(currency);
})
document.getElementById('btn-USD').addEventListener('click',e=>{
    document.getElementById('btn-'+currency).classList.remove('active');
    e.target.classList.add('active');
    currency = e.target.innerText;
    getData(globalCoin+coin+'?currency='+currency, globalCoins+'currency='+currency);
    console.log(currency);
})
document.getElementById('btn-EURO').addEventListener('click',e=>{
    document.getElementById('btn-'+currency).classList.remove('active');
    e.target.classList.add('active');
    currency = e.target.innerText;
    getData(globalCoin+coin+'?currency='+currency, globalCoins+'currency='+currency);
    console.log(currency);
})


async function getData(globalCoin, globalCoins){
    let globalCoinResp = await fetch(globalCoin);
    let globalCoinData = await globalCoinResp.json();
    let globalCoinsResp = await fetch(globalCoins);
    globalCoinsData = await globalCoinsResp.json();

    if(globalCoinData.coin == undefined){
        coin = 'bitcoin';
        alert('no such coin exists');
        document.getElementById('input-location').value = '';
    }
    display(globalCoinData);
    displayTable(currentPage);
}

function displayTable(currentPage){
    let tableBody = document.getElementById('tablebody');
    tableBody.innerHTML = '';
    for (let i = 10 * (currentPage - 1); i < (10 * (currentPage - 1)) + 10 && i < globalCoinsData.coins.length; i++){
        element = globalCoinsData.coins[i];
        let oneDayChange = element.priceChange1d;
        let oneDay= '';
        if(oneDayChange < 0){
            oneDay= `<span style="color:red"><i class="fas fa-chevron-down" style="color:red;"></i> ${Math.abs(oneDayChange)}%</span>`;
        }else{
            oneDay= `<span style="color:green"><i class="fas fa-chevron-up" style="color:green;"></i> ${Math.abs(oneDayChange)}%</span>`;
        }    
        let tr = document.createElement('tr');

        let html = `<td>${element.rank}</td>
        <td>${element.name}</td>
        <td>${element.symbol}</td>
        <td>${element.priceBtc.toFixed(10)}</td>
        <td>${currency} ${element.price.toFixed(2)}</td>
        <td>${oneDay}</td>`;
        tr.innerHTML = html;
        tableBody.append(tr);
    }
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
    let oneDayChange = globalCoinData.coin.priceChange1d;
    let oneWeekChange = globalCoinData.coin.priceChange1w;
    if(oneDayChange < 0){
        oneDay.innerHTML = `<i class="fas fa-chevron-down"></i> ${Math.abs(oneDayChange)}%`;
        oneDay.style.color = 'red';
    }else{
        oneDay.innerHTML = `<i class="fas fa-chevron-up"></i> ${Math.abs(oneDayChange)}%`;
        oneDay.style.color = 'green';
    }
    if(oneWeekChange < 0){
        week.innerHTML = `<i class="fas fa-chevron-down"></i> ${Math.abs(oneWeekChange)}%`;
        week.style.color = 'red';
    }else{
        week.innerHTML = `<i class="fas fa-chevron-up"></i> ${Math.abs(oneWeekChange)}%`;
        week.style.color = 'green';
    }

    volume.innerText = globalCoinData.coin.volume.toFixed(2);
    cap.innerText = globalCoinData.coin.marketCap.toFixed(2);
}

let pages = document.querySelectorAll('a');
for (page of pages) {
    page.addEventListener('click', (event) => {
        let key = event.target.innerText;

        if (key == 'Next') {
            if (currentPage == 5)
                key = 5;
            else
                key = +currentPage + +1;
            previousPage = currentPage;
            currentPage = key;
            displayTable(currentPage);
            setActive(currentPage, previousPage);
        }
        else if (key == 'Previous') {
            if (currentPage == 1)
                key = 1;
            else
                key = +currentPage - +1;
            previousPage = currentPage;
            currentPage = key;
            displayTable(currentPage);
            setActive(currentPage, previousPage);
        }
        else if (key == 'First') {
            key = 1;
            previousPage = currentPage;
            currentPage = key;
            displayTable(currentPage);
            setActive(currentPage, previousPage);
        }
        else if (key == 'Last') {
            key = 5;
            previousPage = currentPage;
            currentPage = key;
            displayTable(currentPage);
            setActive(currentPage, previousPage);
        }
        else {
            previousPage = currentPage;
            currentPage = key;
            displayTable(currentPage);
            setActive(currentPage, previousPage);
        }
    });
}

function setActive(currentPage, previousPage) {
    let activepage = document.getElementById('li' + currentPage);
    let earlierActivePage = document.getElementById('li' + previousPage);
    earlierActivePage.classList.remove('active-pagination');
    activepage.classList.add('active-pagination');
    if(currentPage == 1){
        document.getElementById('li-previous').classList.add('disabled');
        document.getElementById('li-first').classList.add('disabled');
    }
    else if(previousPage == 1){
        document.getElementById('li-previous').classList.remove('disabled');
        document.getElementById('li-first').classList.remove('disabled');
    }
    if(currentPage == 5){
        document.getElementById('li-next').classList.add('disabled');
        document.getElementById('li-last').classList.add('disabled');
    }
    else if(previousPage == 5){
        document.getElementById('li-next').classList.remove('disabled');
        document.getElementById('li-last').classList.remove('disabled');
    }
}







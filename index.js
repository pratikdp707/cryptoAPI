var proxy = "https://cors-anywhere.herokuapp.com/";
const url = "https://api.coinranking.com/v2/coins";


async function getData(){
    let response = await fetch(proxy+url);
    let data = response.json();
    console.log(data);
}

getData();









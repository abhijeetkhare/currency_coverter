const dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("form button");


for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "From" && currCode === "USD") {
            newOption.selected = true;
        }
        else if (select.name === "To" && currCode === "INR") {
            newOption.selected = true;
        }

        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        evt.preventDefault();   
        console.log(evt.target);
        updateFlag(evt.target);
    });
}
const updateFlag = (element) => {

    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    const fromm = document.querySelector(".from select").value;
    const too = document.querySelector(".to select").value;
    ab(fromm, too);
});


const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '1ae1aa2cd1msh7d303cab433923fp1ecfbejsne152ce705ea2',
        'x-rapidapi-host': 'fast-price-exchange-rates.p.rapidapi.com'
    }
};


async function ab(fromm, too) {
    const url = `https://fast-price-exchange-rates.p.rapidapi.com/api/v1/rates?base_currency=${fromm}&quote_currency=${too}%2CBTC`;
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    const value = Object.values(result.to)[0];
    console.log(value);

    modify(value, fromm, too);
}

const modify = (value, fromm, too) => {
    let msg = document.querySelector(".msg");
    console.log(msg);
    let input = document.querySelector("#input").value;
    msg.innerText = `${input} ${fromm} = ${input * value} ${too} `
};
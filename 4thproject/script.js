const currencyone = document.getElementById('currency-one');
const amountone = document.getElementById('amount-one');
const currencytwo = document.getElementById('currency-two');
const amounttwo = document.getElementById('amount-two');
const rate = document.getElementById('rate');
const swap = document.getElementById('swap');

const calculate = () => {
    const currencyonecode = currencyone.value;
    const currencytwocode = currencytwo.value;
    console.log(currencyonecode, currencytwocode);

    fetch(`https://v6.exchangerate-api.com/v6/39623d110108fe6719dea7ee/pair/${currencyonecode}/${currencytwocode}`)
    .then(res => res.json())
    .then(data => {
        const conversionrate = data.conversion_rate;
        rate.innerText = `1 ${currencyonecode} = ${conversionrate} ${currencytwocode}`;
        amounttwo.value = (amountone.value * conversionrate).toFixed(2);
    });
};

currencyone.addEventListener('change', calculate);
amountone.addEventListener('input', calculate);
currencytwo.addEventListener('change', calculate);
amounttwo.addEventListener('input', calculate);
swap.addEventListener('click', () => {
    const temp = currencyone.value;
    currencyone.value = currencytwo.value;
    currencytwo.value = temp;
    calculate();  
})

calculate();



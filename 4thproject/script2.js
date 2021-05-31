const currencyone = document.getElementById('currency-one');
const conversionrates = document.getElementById('conversionrates');

const calculate = () => {
    fetch(`https://v6.exchangerate-api.com/v6/39623d110108fe6719dea7ee/latest/${currencyone.value}`)
    .then(res => res.json())
    .then(data => {
        var text = " ";
        var x;
        for (x in data.conversion_rates) {
        text += x + " " + data.conversion_rates[x] + "<br />";
        }
        conversionrates.innerHTML = text;
        console.log(text);
    })

}

currencyone.addEventListener('change', calculate);



calculate();
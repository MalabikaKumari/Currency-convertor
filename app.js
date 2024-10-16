const base_URL =
  "https://v6.exchangerate-api.com/v6/4408aa65937e809c27004496/pair";

let dropdowns = document.querySelectorAll("select");
const btn = document.querySelector("form button");
const fromCur = document.querySelector(".from select");
const toCur = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (let curCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerHTML = curCode;
    newOption.value = curCode;
    if (select.name === "from" && curCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && curCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let curCode = element.value;
  let countryCode = countryList[curCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", async (evnt) => {
  evnt.preventDefault();

  let amount = document.querySelector(".amount input").value;
  const url = `${base_URL}/${fromCur.value}/${toCur.value}`; // Correct URL construction
  let response = await fetch(url);
  let data = await response.json();

  // Get the conversion rate
  let rate = data.conversion_rate; // Access conversion rate from API response
  let finalAmount = rate * amount;

  // Update the message with the converted amount
  msg.innerHTML = ` ${amount} ${fromCur.value} = ${finalAmount} ${toCur.value}`;
});

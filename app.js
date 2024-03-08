const countriesDropdown = document.querySelector("#countries-dropdown");

const baseUrl = "https://restcountries.com/v3.1/all";
const cardContainer = document.getElementById("card-container");
console.log(cardContainer);
const getAllCountries = async (url) => {
    //get response
    const response = await fetch(url);
    console.log(response);
    
    //get json
    const jsonData = await response.json()
    console.log(jsonData);
    

    //send countries to dropdown
    sendCountriesToDropDown(jsonData);









    countriesDropdown.addEventListener( "change", function() {
        const value = this.options[this.selectedIndex].value;
        console.log(value);
        const selectedObject = jsonData.filter(item => item.name.common === value)[0]
console.log(selectedObject);
        sendToDom(selectedObject);
    });
    
}


const sendCountriesToDropDown = (data) => {
    // Object.values(data.name.common)

    const countries = data.map( item => item.name.common);
    countries.sort();
    countries.forEach(item =>  {
        let option = document.createElement("option");
        option.textContent = item;
        option.value = item;
        countriesDropdown.appendChild(option);
    });
    //enable dropdown after get countries
    countriesDropdown.removeAttribute("disabled")
}






const sendToDom = (data) => {


    cardContainer.innerHTML = `

        <div class="card mx-auto shadow" style="max-width: 25rem;">
        <img src="${data.flags.png || 'https://www.bergerpaints.com/imaginecolours/wp-content/uploads/2016/09/flags-of-the-world-1170x693.png'}" class="card-img-top" alt="${data.flags.alt}">

        <ul class="list-group list-group-flush">

        <li class="list-group-item pt-3 pb-2"><h5 class="card-title text-center fw-bold">${data.name.common ? data.name.common : "-"}</h6></li>

        <li class="list-group-item d-flex align-items-baseline gap-2 flex-nowrap"><h6 class="fw-bold  text-nowrap" style="width: 125px">
            <i class="fa-solid fa-earth-asia me-1"></i>
            Region: </h6>
            <span>${data.region ? data.region : "-"}</span>
        </li>

        <li class="list-group-item d-flex align-items-baseline gap-2 flex-nowrap"><h6 class="fw-bold  text-nowrap " style="width: 125px">
            <i class="fa-solid fa-building-columns me-1"></i>
            Capitals: </h6>
            <span>${data.capital ? [...data.capital].join(", ") : "-"}</span>
        </li>
        <li class="list-group-item d-flex align-items-baseline gap-2 flex-nowrap"><h6 class="fw-bold  text-nowrap " style="width: 125px">
            <i class="fa-solid fa-comments me-1"></i>
            Languages: </h6>
            <span>${data.languages ?  Object.values(data.languages).join(", ") : "-"}</span>
        </li>
        <li class="list-group-item d-flex align-items-baseline gap-2 flex-nowrap"><h6 class="fw-bold  text-nowrap " style="width: 125px">
            <i class="fa-solid fa-coins me-1"></i>
            Currencies: </h6>
            <span>${data.currencies ? Object.values(data.currencies).map(item=> item.name +' \('+item.symbol + "\)").join(',</br>') : "-"}
            </span>
        </li>
        <li class="list-group-item d-flex align-items-baseline gap-2 flex-nowrap"><h6 class="fw-bold  text-nowrap " style="width: 125px">
            <i class="fa-solid fa-users-line me-1"></i>
            Population: </h6>
            <span>${formatNumbers (data.population ? data.population : "-")}</span>
        </li>
        <li class="list-group-item d-flex align-items-baseline gap-2 flex-nowrap"><h6 class="fw-bold  text-nowrap " style="width: 125px">
            <i class="fa-solid fa-arrows-left-right-to-line me-1"></i>
            Borders: </h6>
            <span>${data.borders ? data.borders.join(", ") : "-"}
            </span>
        </li>
        <li class="list-group-item d-flex align-items-baseline gap-2 flex-nowrap"><h6 class="fw-bold  text-nowrap " style="width: 125px">
            <i class="fa-solid fa-street-view me-1"></i>
            Map: </h6>
            <a href="${data.maps.googleMaps ? data.maps.googleMaps : "-"}" target="_blank" class="card-link" >Go to google map</a>
        </li>
        </ul>
        </div>
        `


}


getAllCountries(baseUrl);


Number.prototype.formatNumbers = function (fractionDigits, decimal, separator) {
fractionDigits = isNaN(fractionDigits = Math.abs(fractionDigits)) ? 2 : fractionDigits;
 
decimal = typeof (decimal) === "undefined" ? "." : decimal;
 
separator = typeof (separator) === "undefined" ? "," : separator;
 
let number = this;
 
let neg = number < 0 ? "-" : "";
 
let wholePart = parseInt(number = Math.abs(+number || 0).toFixed(fractionDigits)) + "";
 
var separtorIndex = (separtorIndex = wholePart.length) > 3 ? separtorIndex % 3 : 0;
 
return neg +
 
(separtorIndex ? wholePart.substr(0, separtorIndex) + separator : "") +
 
wholePart.substr(separtorIndex).replace(/(\d{3})(?=\d)/g, "$1" + separator) +
 
(fractionDigits ? decimal + Math.abs(number - wholePart).toFixed(fractionDigits).slice(2) : "");
 
};

function formatNumbers (raw) {
 
    return Number(raw).formatNumbers(0, '.', ',');
     
    }





document.addEventListener("DOMContentLoaded", () => {
    const map = document.querySelector("svg");
    const countries = document.querySelectorAll("path");
    const sidePanel = document.querySelector(".side-panel");
    const container = document.querySelector(".side-panel .container");
    const closeBtn = document.querySelector(".close-btn");
    const loading = document.querySelector(".loading");
    const zoomInBtn = document.querySelector(".zoom-in");
    const zoomOutBtn = document.querySelector(".zoom-out");
    const zoomValueOutput = document.querySelector(".zoom-value");

    const countryNameOutput = document.querySelector(".country-name");
    const countryFlagOutput = document.querySelector(".country-flag");
    const cityOutput = document.querySelector(".city");
    const areaOutput = document.querySelector(".area");
    const currencyOutput = document.querySelector(".currency");
    const languagesOutput = document.querySelector(".languages");

    countries.forEach(country => {
        // mouse enter event to each country
        country.addEventListener("mouseenter", function() {
            // get all classes of element the mouse enters
            const classList = [...this.classList].join('.');
            console.log(classList);

            // create a selector for matching classes
            const selector = '.' + classList;
            // select all matching elements and land that belong to same country
            const matchingElements = document.querySelectorAll(selector);
            // add hover effect to matching elements
            matchingElements.forEach(el => el.style.fill = "#c99aff");
        });

        // add a mouse out event (cursor leaves a country)
        country.addEventListener("mouseout", function() {
            // repeat the same steps from before to remove hovered styles from matching elements
            const classList = [...this.classList].join('.');
            const selector = '.' + classList;
            const matchingElements = document.querySelectorAll(selector);
            matchingElements.forEach(el => el.style.fill = "#443d4b");
        });

        // add click event to each country
        country.addEventListener("click", function(e) {
            // set loading text
            loading.innerText = "Loading...";

            // hide country data container
            container.classList.add("hide");

            // show loading screen
            loading.classList.remove("hide");

            // variable to hold the country name
            let clickedCountryName;

            // if the clicked svg path (country) has a name attribute
            if(e.target.hasAttribute("name")) {
                // get the value of the name attribute (country name)
                clickedCountryName = e.target.getAttribute("name");
            //if it doesn't have a name attribute
            } else {
                // get the class name (country name)
                clickedCountryName = e.target.classList.value;
            }
            // open the side panel
            sidePanel.classList.add("side-panel-open");
            // use fetch to get data from the API
            fetch(`https://restcountries.com/v3.1/name/${clickedCountryName}?fullText=true`)
            .then(response => {
                // check if the response is OK (status code 200)
                if (!response.ok) {
                    throw new Error('Network response was not ok'); 
                }
                // parse the response as JSON
                return response.json();
            })
            .then(data => {
                // console log data
                console.log(data);

                // delay code
                setTimeout(() => {
                    // extract data and output to the side panel
                    // country name
                    countryNameOutput.innerText = data[0].name.common;
                    // flag image
                    countryFlagOutput.src = data[0].flags.png;
                    // capital city
                    cityOutput.innerText = data[0].capital;
                    // area
                    // change number format to include dots in big numbers
                    const formatedNumber = data[0].area.toLocaleString('de-DE');
                    areaOutput.innerHTML = formatedNumber + ` km<sup>2</sup>`;

                    // currency
                    // get the currencies object
                    const currencies = data[0].currencies;
                    currencyOutput.innerText = "";
                    
                    // loop through each object key
                    Object.keys(currencies).forEach(key => {
                        // output the name of each currency of the selected country
                        currencyOutput.innerHTML += `<li>${currencies[key].name}</li>`;
                    });
                    // languages
                    const languages = data[0].languages;
                    languagesOutput.innerText = "";
                    Object.keys(languages).forEach(key => {
                        languagesOutput.innerHTML += `<li>${languages[key]}</li>`;
                    });
                    // wait for new flag image to load
                    countryFlagOutput.onload = () => {
                        // show the container with country info
                        container.classList.remove("hide");
                        // hide loading screen
                        loading.classList.add("hide");
                    };
                }, 500);
            })
            // handle errors
            .catch(error => {
                // output explanation for the user
                loading.innerText = "No data to show for selected country";
                // console log the error
                console.error("There was a problem with the fetch operation:", error);
            });
        });
    });

    // add click event to side panel close button
    closeBtn.addEventListener("click", () => {
        // close side panel
        console.log("Close button clicked");
        sidePanel.classList.remove("side-panel-open");
    });

    // variable to contain the current zoom value
    let zoomValue = 100;

    // disable zoom out button on load
    zoomOutBtn.disabled = true;

    // add click event to zoom in button
    zoomInBtn.addEventListener("click", () => {
        // enable zoom out button
        zoomOutBtn.disabled = false;

        // increment zoom value by 100
        zoomValue += 100;

        if (zoomValue < 500) {
            // enable zoom in button
            zoomInBtn.disabled = false;
        } else {
            // disable the zoom in button
            zoomInBtn.disabled = true;
        }
        // set map width and height to zoom value
        map.style.width = zoomValue + "vw";
        map.style.height = zoomValue + "vh";

        // output zoom value percentage
        zoomValueOutput.innerText = zoomValue + "%";
    });

    zoomOutBtn.addEventListener("click", () => {
        zoomInBtn.disabled = false;
        zoomValue -= 100;
        if(zoomValue > 100) {
            zoomOutBtn.disabled = false;
        } else {
            zoomOutBtn.disabled = false;
        }
        map.style.width = zoomValue + "vw";
        map.style.height = zoomValue + "vh";
        zoomValueOutput.innerText = zoomValue + "%";
    });

});

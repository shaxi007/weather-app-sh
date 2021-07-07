let api = "408cf4980f0ed2a840d7071f8f87e333";
let fahren='F'
let temp=0;
let temp2=0;

const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);
const $$$ = (a) => Array.from(a);

async function searchCountry(sugg) {
    return await fetch(`https://restcountries.eu/rest/v2/name/${sugg}`);
}

let timerSuggestions = null;

const suggList$ = $("#suggestion-list");
const reset$ = $("#reset");
const suggInput$ = $("#suggestions");

const suggestionsType = {
    DEFAULT: "default",
    ERROR: "error",
};

const toggleLoading = (isLoading) => {
    if (isLoading) $("#suggestion-input").classList.add("loading");
    else $("#suggestion-input").classList.remove("loading");
};

const createSuggestionDom = (sugg) => {
    const sugg$ = document.createElement("div");
    sugg$.classList.add("suggestion");
    sugg$.classList.add(sugg.type);
    sugg$.innerText = sugg.message;
    if (sugg.flag) {
        const flag$ = document.createElement("img");
        flag$.src = sugg.flag;
        flag$.alt = "Image";
        sugg$.appendChild(flag$);
        sugg$.addEventListener(
            "click",
            () => {
                suggInput$.value = sugg.message;
                resetApp(false);
            },
            false
        );
    }
    return sugg$;
};

const updateSuggestionList = (list, direct = false) => {
    suggList$.innerText = "";
    if (direct) {
        suggList$.appendChild(
            createSuggestionDom({
                message: list.message,
                type: list.type,
            })
        );
    } else {
        list.forEach((country) => {
            suggList$.appendChild(
                createSuggestionDom({
                    message: country.name,
                    type: suggestionsType.DEFAULT,
                    flag: country.flag,
                })
            );
        });
    }
    if (list.length > 0 || direct) {
        suggList$.classList.add("displayed");
        reset$.classList.add("displayed");
    }
};

reset$.addEventListener(
    "click",
    () => {
        resetApp();
    },
    false
);

function resetApp(withInput = true) {
    suggList$.classList.remove("displayed");
    if (withInput) {
        suggInput$.value = "";
        reset$.classList.remove("displayed");
    }
}

suggInput$.addEventListener(
    "input",
    (e) => {
        clearTimeout(timerSuggestions);
        suggList$.classList.remove("displayed");
        reset$.classList.remove("displayed");
        if (e.target.value.length < 2) return;
        timerSuggestions = setTimeout(() => {
            searchEvent(e.target.value.toLowerCase());
        }, 500);
    },
    false
);

function searchEvent(searchValue) {
    toggleLoading(true);
    searchCountry(searchValue)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            toggleLoading(false);
            if (data.status < 200 || data.status >= 300) {
                updateSuggestionList(
                    {
                        message: data.message,
                        type: suggestionsType.ERROR,
                    },
                    true
                );
            } else {
                updateSuggestionList(data);
            }
        });
}

setTimeout(() => {
    suggInput$.value = "buxoro";
    searchEvent(suggInput$.value.toLowerCase());
}, 1000);

suggestions.onkeyup = (event) => {
    const data = new Date();
    let day = data.toDateString();
    if (event.keyCode == 13) {
        let response = fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${
                suggestions.value || "tashkent"
            }&appid=${api}`
        );
        response
            .then((malumot) => malumot.json())
            .then((malumot) => {
            	fahr.textContent='C'
		        chiz.textContent=' | '
            	darajaF.textContent=fahren
                joylashuv.textContent = `${malumot.name}, ${malumot.sys.country}`;
                bugungi_kun.textContent = day;
                daraja.textContent = `${
                    ((malumot.main.temp - 273) | 0) + "°C"
                }`;
                temp=malumot.main.temp-273
                temp2=malumot.main.temp-273
                humidity.textContent = `Humidity: ${
                    malumot.main.humidity + "%"
                }`;
                pressere.textContent = `Pressure: ${
                    malumot.main.pressure + "mbar"
                }`;
                wind.textContent = `Speed of wind: ${
                    malumot.wind.speed + " m/s"
                }`;
                clear.textContent = malumot.weather[0].main;
                img.src = `http://openweathermap.org/img/wn/${malumot.weather[0].icon}@2x.png`;
            });
    }
};

let response = fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=buxoro&appid=${api}`
);
response
    .then((malumot) => malumot.json())
    .then((malumot) => {
		const data=new Date()
		let day=data.toDateString()
		darajaF.textContent=fahren
		fahr.textContent='C'
		chiz.textContent=' | '
        temp=malumot.main.temp-273
        temp2=malumot.main.temp-273
        joylashuv.textContent = `${malumot.name}, ${malumot.sys.country}`;
        bugungi_kun.textContent = day;
        daraja.textContent = `${((malumot.main.temp - 273) | 0 ) + "°C"}`;
        humidity.textContent = `Humidity: ${malumot.main.humidity + "%"}`;
        pressere.textContent = `Pressure: ${malumot.main.pressure + "mbar"}`;
        wind.textContent = `Speed of wind: ${malumot.wind.speed + " m/s"}`;
        clear.textContent = malumot.weather[0].main;
        img.src = `http://openweathermap.org/img/wn/${malumot.weather[0].icon}@2x.png`;
    });

darajaF.onclick= ()=>{
	darajaF.style.opacity='1'
	fahr.style.opacity='0.5'
	daraja.textContent= ((temp*9/5)+32 |2 ) +"°F"
}

fahr.onclick= ()=>{
	fahr.style.opacity='1'
	darajaF.style.opacity='0.5'
	daraja.textContent= (temp2 | 0 ) + "°C"
}
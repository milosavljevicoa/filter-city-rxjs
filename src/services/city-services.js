import { City } from "../models/city";
import { fromEvent } from "rxjs";
import { debounceTime, map, switchMap, catchError } from "rxjs/operators";

const DATA_BASE_CITIES = "http://localhost:3000/city/";
// "https://my-json-server.typicode.com/milosavljevicoa/Aleksandar-Milosavljevic-16722/";

export async function getAllCities() {
	let allCities = await fetch(DATA_BASE_CITIES).then((promise) =>
		promise.json()
	);
	allCities = allCities.map(
		(cityJson) => new City(cityJson["name"], cityJson["population"])
	);
	return allCities;
}

export function addEventToInput(inputElement, pElementForCityDetails) {
	fromEvent(inputElement, "input")
		.pipe(
			debounceTime(1000),
			map((ev) => ev.target.value),
			switchMap((text) => getCityInformation(text))
		)
		.subscribe((city) => city.writeCityDetailsTo(pElementForCityDetails));
}

async function getCityInformation(specificCity) {
	const formatedStringForDatabase = formatCityNameToDb(specificCity);
	let cityDetails = await getCityDetailsObject(formatedStringForDatabase);
	return cityDetails;
}

function formatCityNameToDb(cityName) {
	cityName = cityName.toLowerCase();
	let allWords = cityName.split(" ");
	let modifiedWords = allWords.map(
		(word) => word.charAt(0).toUpperCase() + word.slice(1)
	);
	let returnVal = modifiedWords.join(" ");
	return returnVal;
}

async function getCityDetailsObject(specificCity) {
	const promiseCity = await fetch(DATA_BASE_CITIES + "?name=" + specificCity);
	const jsonArrayCity = await promiseCity.json();
	if (jsonArrayCity.length === 0) {
		let errorCity = City.errorCity();
		return City.errorCity();
	}
	const jsonCity = jsonArrayCity[0];
	return new City(jsonCity["name"], jsonCity["population"]);
}

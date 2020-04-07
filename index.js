import { getAllCities, addEventToInput } from "./src/services/city-services";
import { fromEvent, from } from "rxjs";
import {
	debounceTime,
	map,
	filter,
	switchMap,
	catchError,
} from "rxjs/operators";

const unorderList = document.getElementById("city-ul");

getAllCities().then((allCities) => {
	allCities.forEach((city) => {
		city.drawListItem(unorderList);
	});
});
let input = document.getElementById("city-input");
let cityDetailsP = document.getElementById("city-details-p");
addEventToInput(input, cityDetailsP);

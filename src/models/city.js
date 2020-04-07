export class City {
	constructor(name, population) {
		this.name = name;
		this.population = population;
	}

	drawListItem(host) {
		let listItem = document.createElement("li");
		listItem.innerHTML = this.name;
		host.appendChild(listItem);
	}

	writeCityDetailsTo(paragrph) {
		let text = "City Not Found";
		if (this.name !== "")
			text = "City: " + this.name + " has population of " + this.population;
		paragrph.innerHTML = text;
	}

	static errorCity() {
		return new City("", 0);
	}
}

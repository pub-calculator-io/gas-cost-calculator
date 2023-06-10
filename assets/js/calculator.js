function calculate() {
	let distance = input.get('distance').gt(0).val();
	let fuelConsumption = input.get('consumption').gt(0).val();
	let price = input.get('price').gt(0).val();
	if(!input.valid()) return;

	let tableDefaultEfficiency, distanceUnit, fuelConsumptionUnitText, fuelConsumptionUnit, priceUnit;
	if(isMetricSystem()) {
		fuelConsumptionUnit = 'l-100km';
		fuelConsumptionUnitText = 'L/100km';
		tableDefaultEfficiency = [40, 30, 20, 10, 5, 3, 2];
		priceUnit = 'l';
		distanceUnit = 'km';
	}
	else {
		fuelConsumptionUnit = 'mpg';
		fuelConsumptionUnitText = 'mpg';
		tableDefaultEfficiency = [5, 10, 20, 30, 40, 50, 60];
		priceUnit = 'g';
		distanceUnit = 'ml';
		fuelConsumption = +(235.21 / fuelConsumption).toFixed(2);
		price = +(price * 3.78541178).toFixed(2);
		distance = +(distance / 1.609344).toFixed(2);
	}

	let tableValues = [];
	tableDefaultEfficiency.forEach(function(value){
		tableValues.push(calculateFuel(distance, distanceUnit, fuelConsumptionUnitText, value, fuelConsumptionUnit, price, priceUnit));
	});
	if(!tableDefaultEfficiency.includes(+fuelConsumption.toFixed(2))) {
		tableValues.push(calculateFuel(distance, distanceUnit, fuelConsumptionUnitText, fuelConsumption, fuelConsumptionUnit, price, priceUnit));
		if(fuelConsumptionUnit === 'l-100km') {
			tableValues = tableValues.sort((a, b) => b.efficiency - a.efficiency);
		}
		else {
			tableValues = tableValues.sort((a, b) => a.efficiency - b.efficiency);
		}
	}
	let resultHTML = '';
	tableValues.forEach(result => {
		let tdClass = result.efficiency === fuelConsumption ? 'semibold' : '';
		resultHTML += `
			<tr>
				<td class="${tdClass}">${result.fuelConsumption}</td>
				<td class="${tdClass}">${result.fuel}</td>
				<td class="${tdClass}">${result.cost}</td>
			</tr>
		`;
	});
	_('result').innerHTML = resultHTML;
}

function calculateFuel(distance, distanceUnit, fuelConsumptionUnitText, fuelConsumption, fuelConsumptionUnit, price, priceUnit){
	let fuel;
	if(distanceUnit === 'km'){
		if(fuelConsumptionUnit === 'mpg'){
			fuel = priceUnit === 'l' ? (distance * 2.35215) / fuelConsumption : (distance * 0.621371) / fuelConsumption;
		}
		else if(fuelConsumptionUnit === 'l-100km'){
			fuel = priceUnit === 'l' ? (fuelConsumption / 100) * distance : ( (fuelConsumption / 100) * distance ) / 3.78541;
		}
	}
	else {
		if(fuelConsumptionUnit === 'mpg'){
			fuel = priceUnit === 'l' ? (distance * 3.78536496) / fuelConsumption : distance / fuelConsumption;
		}
		else if(fuelConsumptionUnit === 'l-100km'){
			fuel = priceUnit === 'l' ? (distance / 62.1369229) * fuelConsumption : (distance / 235.2) * fuelConsumption;
		}
	}
	const fuelUnit = priceUnit === 'l' ? 'L' : 'gal';
	return {
		fuelConsumption: +fuelConsumption.toFixed(2) + ' ' + fuelConsumptionUnitText,
		fuel: +fuel.toFixed(1) + ' ' + fuelUnit,
		cost: currencyFormat(fuel * price),
		efficiency: fuelConsumption,
	}
}

function currencyFormat(price){
	return '$' + numberWithCommas(Number(price).toFixed(2));
}

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

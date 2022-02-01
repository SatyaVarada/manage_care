import {ERROR_MESSAGE_SERVER} from '../utilities/constants';
import values from 'lodash/values';

const getResponse = async(url:string, method:string, headers:any)=>{
	const request = {headers: headers, method: method};
	const response = await fetch(url, request);
	return response;
};

const jsonToArray = (json: any[])=>{
	let x: any[]=[], y: any[]=[];
	json.map((item: any)=>{
		Object.keys(item).map((key)=>{
			key === 'date'? x.push(item[key]) : y.push(item[key]);
		})
	});
	return [x, y];
};

const invokeGETAPI = async (cases_url:string, incidence_url:string) => {
	const cases_response = await getResponse(cases_url, 'GET' , {accept: 'application/json'} );
	const cases_data = await cases_response.json();
	const incidence_response = await getResponse(incidence_url, 'GET' , {accept: 'application/json'} );
	const incidence_data = await incidence_response.json();
	return [cases_data, incidence_data];
};

const getCountryData = async () => {
	try {
		const cases_url = 'https://api.corona-zahlen.org/germany/history/cases';
		const incidence_url = 'https://api.corona-zahlen.org/germany/history/incidence';
		let result = await invokeGETAPI(cases_url, incidence_url);
		let a = jsonToArray(result[0].data);
		let b = jsonToArray(result[1].data);
		return {cases_x: a[0], cases_y: a[1], incidence_x: b[0], incidence_y: b[1]};
	} catch (e) {
		alert('Error: ' + ERROR_MESSAGE_SERVER);
	}
};

const getStateData = async (state: string) => {
	try {
		const cases_url = 'https://api.corona-zahlen.org/states/' + state + '/history/cases';
		const incidence_url = 'https://api.corona-zahlen.org/states/' + state + '/history/incidence';
		let result = await invokeGETAPI(cases_url, incidence_url);
		let a = jsonToArray(result[0].data[state].history);
		let b = jsonToArray(result[1].data[state].history);
		return {cases_x: a[0], cases_y: a[1], incidence_x: b[0], incidence_y: b[1]};
	} catch (e) {
		alert('Error: ' + ERROR_MESSAGE_SERVER);
	}
};

const getDistrictData = async (district: string) => {
	try {
		const cases_url = 'https://api.corona-zahlen.org/districts/' + district + '/history/cases';
		const incidence_url = 'https://api.corona-zahlen.org/districts/' + district + '/history/incidence';
		let result = await invokeGETAPI(cases_url, incidence_url);
		let a = jsonToArray(result[0].data[district].history);
		let b = jsonToArray(result[1].data[district].history);
		return {cases_x: a[0], cases_y: a[1], incidence_x: b[0], incidence_y: b[1]};
	} catch (e) {
		alert('Error: ' + ERROR_MESSAGE_SERVER);
	}
};

const getCountryDataForPastNDays = async (days: string) => {
	try {
		const cases_url = 'https://api.corona-zahlen.org/germany/history/cases/' + days;
		const incidence_url = 'https://api.corona-zahlen.org/germany/history/incidence/' + days;
		let result = await invokeGETAPI(cases_url, incidence_url);
		let a = jsonToArray(result[0].data);
		let b = jsonToArray(result[1].data);
		return {cases_x: a[0], cases_y: a[1], incidence_x: b[0], incidence_y: b[1]};
	} catch (e) {
		alert('Error: ' + ERROR_MESSAGE_SERVER);
	}
};

const getStateDataForPastNDays = async (state: string, days: string) => {
	try {
		const cases_url = 'https://api.corona-zahlen.org/states/' + state + '/history/cases/' + days;
		const incidence_url = 'https://api.corona-zahlen.org/states/' + state + '/history/incidence/' + days;
		let result = await invokeGETAPI(cases_url, incidence_url);
		let a = jsonToArray(result[0].data[state].history);
		let b = jsonToArray(result[1].data[state].history);
		return {cases_x: a[0], cases_y: a[1], incidence_x: b[0], incidence_y: b[1]};
	} catch (e) {
		alert('Error: ' + ERROR_MESSAGE_SERVER);
	}
};

const getDistrictDataForPastNDays = async (district: string, days: string) => {
	try {
		const cases_url = 'https://api.corona-zahlen.org/districts/' + district + '/history/cases/' + days;
		const incidence_url = 'https://api.corona-zahlen.org/districts/' + district + '/history/incidence/' + days;
		let result = await invokeGETAPI(cases_url, incidence_url);
		let a = jsonToArray(result[0].data[district].history);
		let b = jsonToArray(result[1].data[district].history);
		return {cases_x: a[0], cases_y: a[1], incidence_x: b[0], incidence_y: b[1]};
	} catch (e) {
		alert('Error: ' + ERROR_MESSAGE_SERVER);
	}
};

const getOptions = async (choice:string) => {
	try {
		const url = 'https://api.corona-zahlen.org/' + choice;
		const response = await getResponse(url, 'GET' , {accept: 'application/json'} );
		const data = await response.json();
		let arr = values(data.data);
		return arr;
	} catch (e) {
		alert('Error: ' + ERROR_MESSAGE_SERVER);
	}
};

export {getCountryData, getStateData, getDistrictData, getCountryDataForPastNDays, getStateDataForPastNDays, getDistrictDataForPastNDays, getOptions};

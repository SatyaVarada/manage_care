import React, {useEffect, useState} from 'react';
import {
	CASES_PLOT_TITLE,
	INCIDENCE_PLOT_TITLE,
	VISUALS,
	WELCOME,
	WELCOME_MESSAGE,
} from '../utilities/constants';
import {getCountryData, getCountryDataForPastNDays, getDistrictData, getDistrictDataForPastNDays, getStateData, getStateDataForPastNDays} from '../models/model';
import Chart from './Chart';
import Filter from './Filter';

interface HomeProps {}

const Home: React.FC<HomeProps> = (props) => {
	const [data, setData] = useState<any>({});
	const [title, setTitle] = useState<string>('Germany');
	useEffect(() => {
		updateCharts(
			{
				currentFilter: 'None',
				code: '',
				name: '',
				days: ''
			}
		);
	}, []);
	const backgroundUrl = 'https://www.freeiconspng.com/uploads/line-png-28.png';
	const casesPlotData = [{
		x: data.cases_x,
		y: data.cases_y,
		type: 'scatter',
		mode: 'lines',
		marker: {color: 'pink'},
	}];
	const incidencePlotData = [{
		x: data.incidence_x,
		y: data.incidence_y,
		type: 'scatter',
		mode: 'lines',
		marker: {color: 'purple'},
	}];
	const getFilterCallback = (filterChoice: {
			currentFilter: string;
			code: string;
			name: string;
			days: string;
		}) => {
		const chartTitle = (filterChoice.code ? filterChoice.name : 'Germany') + (filterChoice.days ? (' - In past '+filterChoice.days+' days') : (''));
		setTitle(chartTitle);
		updateCharts(filterChoice);
	};
	const updateCharts = async (filterChoice:any) => {
		let response;
		switch(filterChoice.currentFilter){
			case 'None':
				response = filterChoice.days ?
					await getCountryDataForPastNDays(filterChoice.days) :
					await getCountryData();
				setData({...response});
				break;
			case 'State': 
				response = filterChoice.days ?
					await getStateDataForPastNDays(filterChoice.code, filterChoice.days) :
					await getStateData(filterChoice.code);
				setData({...response});			
				break;	
			case 'District':
				response = filterChoice.days ?
					await getDistrictDataForPastNDays(filterChoice.code, filterChoice.days) :
					await getDistrictData(filterChoice.code);
				setData({...response});
				break;
		}
	};
	
	return (
		<>
			<div className="flex flex-col bg-cover bg-center bg-scroll opacity-85 w-screen h-screen"
				style={{backgroundImage: `url(${backgroundUrl})`}}>
				 <div className="flex flex-col m-auto w-3/5 h-auto text-center">
					<h2 className="text-cyan-600 text-4xl font-black tracking-wide">
						{WELCOME}
					</h2>
					<p className="text-slate-500 mt-2 italic font-bold text-2xl">
						{WELCOME_MESSAGE}
					</p>
				</div>
				<Filter callBack = {getFilterCallback} />
				<span className="flex self-center mt-6 text-cyan-600 font-medium text-lg">{VISUALS + title}</span>
				<div className="flex flex-row mx-auto justify-center">
					<Chart data={casesPlotData} title={CASES_PLOT_TITLE}/>
					<Chart data={incidencePlotData} title={INCIDENCE_PLOT_TITLE}/>
				</div>
			</div>
		</>
	);
};

export default Home;

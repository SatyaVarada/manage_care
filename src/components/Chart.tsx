import React from 'react';
import Plot from 'react-plotly.js';

interface ChartProps {
	data: any,
	title: string
}

const Chart: React.FC<ChartProps> = (props) => {
	
	return (
		<>
			<Plot 
				data={props.data} 
				layout={ {width: 650, height: 400, title: props.title, paper_bgcolor:'rgba(0,0,0,0)', plot_bgcolor:'rgba(0,0,0,0)'} } 
			/>					
		</>
	);
};

export default Chart;

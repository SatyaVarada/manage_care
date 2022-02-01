import React, { useState } from 'react';
import { getOptions } from '../models/model';
import { DAYS_DESCRIPTION_1, DAYS_DESCRIPTION_2, DISTRICT, DISTRICTS, ENTER, ERROR_MESSAGE_CODE, FILTER, NONE, SEARCHPLACEHOLDER, SELECT, STATE, STATES } from '../utilities/constants';
import { displayErrorMessage, filterOptions } from '../utilities/utils';

interface FilterProps {
	callBack: (filterChoice:{
		currentFilter: string;
		code: string;
        name: string;
		days: string;
	}) => void
}

const Filter: React.FC<FilterProps> = (props) => {
    const [dropdownOptions, setOptions] = useState<Array<any>>([]);
    const [filterChoice, setFilter] = useState<any>({currentFilter: NONE, code: '', name: '', days: ''});
    const [errorMessage, setErrorMessage] = useState('');

    const handleFilter = async (e: React.ChangeEvent<HTMLSelectElement>) => {
		let response;
        const updatedFilter = {...filterChoice, currentFilter: e.target.value, code:'', name:''};
        setFilter(updatedFilter);
		switch(e.target.value){
			case NONE:
                props.callBack(updatedFilter);
				break;
			case STATE: 
                response = await getOptions(STATES);
				response = response?response:[];
				setOptions([...response]);		
				break;
			case DISTRICT:
				response = await getOptions(DISTRICTS);
				response = response?response:[];
				setOptions([...response]);
				break;
		}    
	};
	const handleSelection = async (e: React.ChangeEvent<HTMLSelectElement>) => {
		const record = dropdownOptions.filter((record)=>record.name===e.target.value)[0];
		let code;
        let updatedFilter;
        if(record){
            setErrorMessage('');
            switch(filterChoice.currentFilter){
                case STATE:
                    code = record.abbreviation;
                    break;
                case DISTRICT:
                    code = record.ags;
                    break;
            }
            updatedFilter = {...filterChoice, code:code, name:record.name};
            props.callBack(updatedFilter);  
        }else{
            setErrorMessage(ERROR_MESSAGE_CODE);
            updatedFilter = {...filterChoice, code:'', name:''};
        }
        setFilter(updatedFilter);
	};
	const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
		const days = e.currentTarget.value.trim();
        let updatedFilter = {...filterChoice};
		if( (e.key === ENTER && days) || !days ){
            updatedFilter.days = days;
            setFilter(updatedFilter);
            if(updatedFilter.currentFilter !== NONE && !updatedFilter.code){
                setErrorMessage(ERROR_MESSAGE_CODE);
                return;
            }
            props.callBack(updatedFilter);
		}	
	};
	
	return (
		<>
			<div className = "flex flex-row h-auto w-3/5 mx-auto mt-20 justify-between">
				<span className = "text-slate-600 font-medium text-lg">{FILTER}&nbsp;
					<select
						className = "w-40 h-10 px-4 border-2 border-cyan-600 ring-2 rounded-md caret-cyan-800 italic text-cyan-600 text-lg shadow-md focus:outline-none "
						title = "filter"
						defaultValue = {filterOptions[0]}
						onChange = {(e: React.ChangeEvent<HTMLSelectElement>) =>
							handleFilter(e)
						}>
						{filterOptions.map((option) => (
							<option key = {option}>{option}</option>
						))}	
					</select>
				</span>
				{filterChoice.currentFilter !== NONE && 
					<div className = "flex flex-col ">
						<span className = "text-slate-600 font-medium text-lg">{SELECT}&nbsp;
                            <select
                                className = "w-68 h-10 px-4 border-2 border-cyan-600 ring-2 rounded-md caret-cyan-800 italic text-cyan-600 text-lg shadow-md focus:outline-none "
                                title = "filterText"
                                onChange = {(e: React.ChangeEvent<HTMLSelectElement>) =>
                                    handleSelection(e)
                                }>
                                <option key = {NONE}>{NONE}</option>
                                { dropdownOptions.map((option:any) => 
                                    <option key = {option.ags ? option.ags : option.abbreviation}>{option.name}</option>
                                )}
                            </select>
                        </span>
                        {displayErrorMessage(errorMessage)}
					</div>
				}
			</div>
            <div className = "h-auto mx-auto my-5 w-3/5 ">
				<p className = "text-slate-600 font-medium text-lg">
					{DAYS_DESCRIPTION_1}&nbsp;
					<input
						className = "w-20 h-10 py-2 px-4 border-2 border-cyan-600 ring-2 rounded-md caret-cyan-800 placeholder-cyan-600 italic text-cyan-600 text-lg shadow-md focus:outline-none "
						id = "search"
						type = "text"
						placeholder = {SEARCHPLACEHOLDER}
						onKeyUp = {(e: React.KeyboardEvent<HTMLInputElement>) =>
							handleSearch(e)
						}
					></input>
					&nbsp;{DAYS_DESCRIPTION_2}
                </p>
            </div>
		</>
	);
};

export default Filter;

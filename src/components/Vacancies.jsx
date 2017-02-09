import React, { Component } from 'react';
import { Link } from 'react-router';
import getDate from '../utils/getDate';

class Vacancy extends Component {
	
	handleVacancyClick(e){
		if (e.button !== 0){
			e.preventDefault();
		}
		if (e.ctrlKey){
			e.preventDefault();
			window.open(e.currentTarget.hash);
		}
	}
	
	render(){
		const { id, name, state_id, start_date, candidates_count, viewStates } = this.props;
		return (
			<div className='vacancies__vacancy'>
				<Link onClick={this.handleVacancyClick} to={`vacancy/${id}`} className='no-link vacancies__link'>
					<div className='vacancies__title'>{name}</div>
					<span
						className='vacancies__status'
						style={{ 'backgroundColor': `rgb(${viewStates[state_id].color})` }}
					>
						{viewStates[state_id].text}
					</span>
					<span className='bullet'>•</span>
					<span className='vacancies__date'>{getDate(start_date)}</span>
					<span className='vacancies__additional'>
						<span className='vacancies__candidates-count'>
							<i className='icon-user vacancies__candidates-icon' />
							<span>{candidates_count}</span>
						</span>
					</span>
				</Link>
			</div>
		);
	}
}

class Vacancies extends Component {
	render(){
		const { vacancies, viewStates } = this.props;
		
		return (
			<div className='vacancies'>
				{vacancies.map(v => <Vacancy key={v.id} viewStates={viewStates} {...v} />)}
			</div>
		);
	}
}


export default Vacancies;
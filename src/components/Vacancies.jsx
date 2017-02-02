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
		const { id, title, status, date, candidatesCount } = this.props;
		return (
			<div className='vacancies__vacancy'>
				<Link onClick={this.handleVacancyClick} to={`vacancy/${id}`} className='no-link vacancies__link'>
					<div className='vacancies__title'>{title}</div>
					<span className='vacancies__status'>{status}</span>
					<span className='bullet'>•</span>
					<span className='vacancies__date'>{getDate(date)}</span>
					<span className='vacancies__additional'>
						<span className='vacancies__candidates-count'>
							<i className='icon-user vacancies__candidates-icon' />
							<span>{candidatesCount}</span>
						</span>
					</span>
				</Link>
			</div>
		);
	}
}

class Vacancies extends Component {
	render(){
		const { vacancies } = this.props;
		return (
			<div className='vacancies'>
				{vacancies.map(v => <Vacancy key={v.id} {...v} />)}
			</div>
		);
	}
}


export default Vacancies;
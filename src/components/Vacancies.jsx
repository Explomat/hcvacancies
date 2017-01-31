import React, { Component } from 'react';
import { Link } from 'react-router';
import formatDate from '../utils/formatDate';

const Vacancy = ({ id, title, status, date, candidatesCount }) => {
	return (
		<div className='vacancies__vacancy'>
			<Link to={`vacancy/${id}`} className='no-link vacancies__link'>
				<div className='vacancies__title'>{title}</div>
				<span className='vacancies__status'>{status}</span>
				<span className='bullet'>•</span>
				<span className='vacancies__date'>{formatDate(date)}</span>
				<span className='vacancies__additional'>
					<span className='vacancies__candidates-count'>
						<i className='icon-user vacancies__candidates-icon' />
						<span>{candidatesCount}</span>
					</span>
				</span>
			</Link>
		</div>
	);
};

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
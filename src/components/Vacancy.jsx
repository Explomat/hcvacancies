import React, { Component } from 'react';
import { Link } from 'react-router';
import numDeclension from '../utils/numDeclension';
import formatDate from '../utils/formatDate';

const Candidate = ({ id, vacancyId, fullname, dateResponse, dateInterview, dateInvitation, commentsCount }) => {
	return (
		<div className='vacancy__candidate'>
			<Link to={`vacancy/${vacancyId}/${id}`} className='no-link vacancy__candidate-link'>
				<i className='icon-user vacancy__candidate-icon' />
				<div className='vacancy__candidate-fullname'>{fullname}</div>
				<span className='vacancy__candidate-dates'>
					<span>{formatDate(dateResponse)}</span>&nbsp;/&nbsp;
					<span>{formatDate(dateInterview)}</span>&nbsp;/&nbsp;
					<span>{formatDate(dateInvitation)}</span>
				</span>
				<div className='vacancy__candidate-additional'>
					<i className='icon-comment vacancy__candidate-additional-comment-icon'/>
					<span>{commentsCount}</span>
				</div>
			</Link>
		</div>
	);
};

class Vacancy extends Component {
	render(){
		const { id, title, status, date, candidates } = this.props;
		const candidateLen = candidates.length;
		return (
			<div className='vacancy'>
				<div className='vacancy__title'>{title}</div>
				<div className='vacancy__description'>
					<span className='vacancy__field-label'>Статус</span>
					<span className='vacancy__field-value'>{status}</span>
					<span className='vacancy__field-label'>Дата создания</span>
					<span className='vacancy__field-value'>{formatDate(date)}</span>
				</div>
				<div className='vacancy__candidates'>
					<div className='vacancy__candidates-title'>
						<span>{candidateLen} </span>
						<span>{numDeclension(candidateLen, 'Кандидат', 'Кандидата', 'Кандидатов')}</span>
					</div>
					<div className='vacancy__candidates-list'>
						{candidates.map(c => <Candidate key={c.id} vacancyId={id} {...c} />)}
					</div>
				</div>
			</div>
		);
	}
}


export default Vacancy;
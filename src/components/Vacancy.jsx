import React, { Component } from 'react';
import { Link } from 'react-router';
import numDeclension from '../utils/numDeclension';
import getDate from '../utils/getDate';
import { isInStates } from '../utils/states';

const Candidate = ({ id, vacancyId, fullname, state_id, comments_count, viewCandidateStates }) => {
	const inStates = isInStates(viewCandidateStates, state_id);
	const inlineStyles = inStates ?
			{ 'backgroundColor': `rgb(${viewCandidateStates[state_id].color})` } : null;
	const text = inStates ? viewCandidateStates[state_id].text : 'Нет статуса';
	return (
		<div className='vacancy__candidate'>
			<Link to={`vacancy/${vacancyId}/${id}`} className='no-link vacancy__candidate-link'>
				<i className='icon-user vacancy__candidate-icon' />
				<div className='vacancy__candidate-fullname'>{fullname}</div>
				{/* <span className='vacancy__candidate-dates'>
					<span>{getDate(dateResponse)}</span>&nbsp;/&nbsp;
					<span>{getDate(dateInterview)}</span>&nbsp;/&nbsp;
					<span>{getDate(dateInvitation)}</span>
				</span>*/}
				<span
					className='vacancy__candidate-status'
					style={inlineStyles}
				>
					{text}
				</span>
				<div className='vacancy__candidate-additional'>
					<i className='icon-comment vacancy__candidate-additional-comment-icon'/>
					<span>{comments_count}</span>
				</div>
			</Link>
		</div>
	);
};

class Vacancy extends Component {
	render(){
		const { id, name, state_id, start_date, candidates, viewVacancyStates, viewCandidateStates } = this.props;
		const candidateLen = candidates.length;
		const text = isInStates(viewVacancyStates, state_id) ? viewVacancyStates[state_id].text : '';
		return (
			<div className='vacancy'>
				<div className='vacancy__title'>{name}</div>
				<div className='vacancy__description'>
					<span className='vacancy__field-label'>Статус</span>
					<span className='vacancy__field-value'>{text}</span>
					<span className='vacancy__field-label'>Дата создания</span>
					<span className='vacancy__field-value'>{getDate(start_date)}</span>
				</div>
				<div className='vacancy__candidates'>
					<div className='vacancy__candidates-title'>
						<span>{candidateLen} </span>
						<span>{numDeclension(candidateLen, 'Кандидат', 'Кандидата', 'Кандидатов')}</span>
					</div>
					<div className='vacancy__candidates-list'>
						{candidates.map(c =>
							<Candidate
								key={c.id}
								viewCandidateStates={viewCandidateStates}
								vacancyId={id}
								{...c}
							/>)
						}
					</div>
				</div>
			</div>
		);
	}
}


export default Vacancy;
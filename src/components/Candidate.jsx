import React, { Component } from 'react';
import { TextAreaView } from './modules/text-label';
import formatDate from '../utils/formatDate';

const Comment = ({ fullname, comment }) => {
	return (
		<div className='comment'>
			{fullname} - {comment}
		</div>
	);
};

class Candidate extends Component {
	render(){
		const { fullname, dateResponse, dateInterview, dateInvitation, comments } = this.props;
		return (
			<div className='candidate'>
				<div className='candidate__fullname'>{fullname}</div>
				<div className='candidate___description'>
					<span className='candidate__field-label'>Дата отклика</span>
					<span className='candidate__field-value'>{formatDate(dateResponse)}</span>
					<span className='candidate__field-label'>Дата интервью</span>
					<span className='candidate__field-value'>{formatDate(dateInterview)}</span>
					<span className='candidate__field-label'>Дата приглашения</span>
					<span className='candidate__field-value'>{formatDate(dateInvitation)}</span>
				</div>
				<div className='candidate__add-comment'>
					add comment
					<TextAreaView placeholder='Добавьте комментарий' />
				</div>
				<div className='candidate__comments'>
					{comments.map(c => <Comment key={c.id} {...c} />)}
				</div>
			</div>
		);
	}
}


export default Candidate;
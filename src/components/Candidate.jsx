import React, { Component } from 'react';
import { TextAreaView } from './modules/text-label';
import getDate from '../utils/getDate';

const Comment = ({ fullname, comment }) => {
	return (
		<div className='comment'>
			<div className='comment__avatar'>
				<i className='icon-user' />
			</div>
			<div className='comment__post'>
				<div className='comment__post-header'>
					<div className='comment__post-author'>{fullname}</div>
				</div>
				<div className='comment__post-body'>{comment}</div>
			</div>
		</div>
	);
};

class Candidate extends Component {
	render(){
		const { fullname, cvPath, dateResponse, dateInterview, dateInvitation, comments } = this.props;
		return (
			<div className='candidate'>
				<div className='candidate__fullname'>{fullname}</div>
				<div className='candidate___description'>
					<span className='candidate__field-label'>Дата отклика</span>
					<span className='candidate__field-value'>{getDate(dateResponse)}</span>
					<span className='candidate__field-label'>Дата интервью</span>
					<span className='candidate__field-value'>{getDate(dateInterview)}</span>
					<span className='candidate__field-label'>Дата приглашения</span>
					<span className='candidate__field-value'>{getDate(dateInvitation)}</span>
					<span className='candidate__field-label'>Резюме</span>
					<span className='candidate__field-value'>
						<a href={cvPath}>
							<span>Скачать </span>
							<i className='icon-file-archive'/>
						</a>
					</span>
				</div>
				<div className='candidate__add-comment'>
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
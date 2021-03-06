import React, { Component } from 'react';
import { TextAreaView } from './modules/text-label';
import { ButtonDefault, ButtonPrimary } from './modules/button';
import getDate from '../utils/getDate';
import numDeclension from '../utils/numDeclension';

const Comment = ({ fullname, date, state_id, comment, viewStates }) => {
	return (
		<div className='comment'>
			<div className='comment__avatar'>
				<i className='icon-user' />
			</div>
			<div className='comment__post'>
				<div className='comment__post-header'>
					<span className='comment__post-status'>{viewStates[state_id].text}</span>
					<span className='bullet'>•</span>
					<span className='comment__post-date'>{getDate(date)}</span>
					<div className='comment__post-author'>{fullname}</div>
				</div>
				<div className='comment__post-body'>{comment}</div>
			</div>
		</div>
	);
};

class Candidate extends Component {
	
	constructor(props){
		super(props);
		
		this.renderAddNewBossComment = this.renderAddNewBossComment.bind(this);
		this.renderBossComment = this.renderBossComment.bind(this);
		this.handleEditBossPost = this.handleEditBossPost.bind(this);
	}
	
	handleEditBossPost(){
		const value = this.refs.bossComment.getValue();
		const { id } = this.props;
		const { vacancyId } = this.props.params;
		this.props.editBossPost(vacancyId, id, value);
	}
	
	renderAddNewBossComment(){
		const { isFetchingBossPost } = this.props;
		return (
			<div className='candidate__boss-comment-container'>
				<TextAreaView ref='bossComment' placeholder='Добавьте комментарий'/>
				<ButtonPrimary
					onClick={this.handleEditBossPost}
					text='Добавить'
					className='candidate__boss-comment-submit'
					loading={isFetchingBossPost}
				/>
			</div>
		);
	}
	
	renderBossComment(){
		const { boss, isEditBossPost, isFetchingBossPost } = this.props;
		const header = (
			<div className='candidate__boss-title'>
				<span>Ваш комментарий</span>
			</div>);
		
		if (isEditBossPost){
			return (
				<div className='candidate__boss-comment-container'>
					{header}
					<TextAreaView ref='bossComment' placeholder='Добавьте комментарий' value={boss.comment} />
					<ButtonDefault
						onClick={this.props.toggleEditBossPost}
						text='Отменить'
						className='candidate__boss-comment-cancel'
					/>
					<ButtonPrimary
						onClick={this.handleEditBossPost}
						text='Редактировать'
						className='candidate__boss-comment-submit'
						loading={isFetchingBossPost}
					/>
				</div>
			);
		}
		return (
			<div className='candidate__boss-comment-container'>
				{header}
				<div className='candidate__boss-comment'>
					<div className='candidate__boss-comment-avatar'>
						<i className='icon-users-2' />
					</div>
					<div className='candidate__boss-comment-post'>
						<div className='candidate__boss-comment-post-header'>
							<span className='candidate__boss-comment-post-author'>{boss.fullname}</span>
							<span className='candidate__boss-comment-post-menu'>
								<i onClick={this.props.toggleEditBossPost} className='icon-edit-1' />
							</span>
						</div>
						<div className='candidate__boss-comment-post-body'>{boss.comment}</div>
					</div>
				</div>
			</div>
		);
	}
	
	render(){
		const { fullname,
			state_id,
			cvPath,
			dateResponse,
			dateInterview,
			dateInvitation,
			comments,
			boss,
			viewStates } = this.props;
		const commentsLen = comments.length;
		return (
			<div className='candidate'>
				<div className='candidate__fullname'>{fullname}</div>
				<div className='candidate___description'>
					<span className='candidate__field-label'>Статус</span>
					<span className='candidate__field-value'>{viewStates[state_id].text}</span>
					<span className='candidate__field-label'>Дата отклика</span>
					<span className='candidate__field-value'>{getDate(dateResponse)}</span>
					<span className='candidate__field-label'>Дата интервью</span>
					<span className='candidate__field-value'>{getDate(dateInterview)}</span>
					<span className='candidate__field-label'>Дата приглашения</span>
					<span className='candidate__field-value'>{getDate(dateInvitation)}</span>
					<span className='candidate__field-label'>Резюме</span>
					<span className='candidate__field-value'>
						<a href={cvPath} onClick={e => e.preventDefault()}>
							<span>Скачать </span>
							<i className='icon-file-archive'/>
						</a>
					</span>
				</div>
				<div className='candidate__boss-is-comment'>
					{!boss && this.renderAddNewBossComment()}
					{boss && this.renderBossComment()}
				</div>
				<div className='candidate__comments'>
					<div className='candidate__comments-title'>
						<span>{commentsLen} </span>
						<span>{numDeclension(commentsLen, 'Комментарий', 'Комментария', 'Комментариев')} от рекрутеров</span>
					</div>
					<div className='candidate__comments-list'>
						{comments.map(c => <Comment key={c.id} viewStates={viewStates} {...c} />)}
					</div>
				</div>
			</div>
		);
	}
}


export default Candidate;
import React, { Component } from 'react';
import { Link } from 'react-router';

const Candidate = ({ id, vacancyId, fullname }) => {
	return (
		<div>
			<Link to={`vacancy/${vacancyId}/${id}`}>{fullname}</Link>
			<br />
		</div>
	);
};

const Comment = ({ fullname, comment }) => {
	return (
		<div>{fullname} - {comment}</div>
	);
};

class Vacancy extends Component {
	render(){
		const { id, title, status, comments, candidates } = this.props;
		return (
			<div>
				{title}<br/>
				{status}<br/>
				{comments.map(c => <Comment key={c.id} {...c} />)}
				{candidates.map(c => <Candidate key={c.id} vacancyId={id} {...c} />)}
			</div>
		);
	}
}


export default Vacancy;
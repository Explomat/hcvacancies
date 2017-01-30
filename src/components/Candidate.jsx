import React, { Component } from 'react';

const Comment = ({ fullname, comment }) => {
	return (
		<div>{fullname} - {comment}</div>
	);
};

class Candidate extends Component {
	render(){
		const { fullname, comments } = this.props;
		return (
			<div>
				{fullname}<br/>
				{comments.map(c => <Comment key={c.id} {...c} />)}
			</div>
		);
	}
}


export default Candidate;
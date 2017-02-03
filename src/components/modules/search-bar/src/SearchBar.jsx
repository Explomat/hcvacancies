import React from 'react';
import './style/search-bar.scss';

class SearchBar extends React.Component {
	
	constructor(props){
		super(props);
		
		this.handleChange = this.handleChange.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.state = {
			value: props.value || ''
		};
	}
		
	componentWillReceiveProps(nextProps){
		if (nextProps.value){
			this.setState({ value: nextProps.value });
		}
	}

	handleChange(e){
		this.setState({ value: e.target.value });
	}

	handleSearch(e){
		if (e.keyCode === 13 && this.props.onSearch){
			this.props.onSearch(e.target.value);
		}
	}

	render() {
		const className = this.props.className ? this.props.className : '';
		const classNameInput = this.props.classNameInput ? this.props.classNameInput : '';
		return (
			<div className={`search-box ${  className}`}>
				<input
					onChange={this.handleChange}
					onKeyDown={this.handleSearch}
					className={`search-box__search-input ${  classNameInput}`}
					type='text' value={this.state.value}
					placeholder='Поиск...'
				/>
				<span className='search-box__search-icon icon-search' />
				{this.props.children}
			</div>
		);
	}
}

SearchBar.propTypes = {
	value: React.PropTypes.string,
	className: React.PropTypes.string,
	classNameInput: React.PropTypes.string,
	onSearch: React.PropTypes.func
};

export default SearchBar;
import React, { Component } from 'react';
import Vacancies from '../components/Vacancies';
import SearchBar from '../components/modules/search-bar';
import DropDown from '../components/modules/dropdown';
import { DropDownIcon, DropDownIconItem } from '../components/modules/dropdown-icon';
import * as actionCreators from '../actions';
import { connect } from 'react-redux';

class VacanciesContainer extends Component {
	
	constructor(props){
		super(props);
		
		this.handleSearch = this.handleSearch.bind(this);
		this.handleFilterStatus = this.handleFilterStatus.bind(this);
		this.handleSortByTitle = this.handleSortByTitle.bind(this);
		this.handleSortByStatus = this.handleSortByStatus.bind(this);
		this._getVacancies = this._getVacancies.bind(this);
	}
	
	componentDidMount(){
		const { search, page, statusFilter, orderedByTitle, orderedByStatus } = this.props;
		this._getVacancies(search, page, statusFilter.selected, orderedByTitle, orderedByStatus);
	}
	
	handleSearch(val){
		const { page, statusFilter, orderedByTitle, orderedByStatus } = this.props;
		this._getVacancies(val, page, statusFilter.selected, orderedByTitle, orderedByStatus);
	}
	
	handleFilterStatus(e, payload){
		const { search, page } = this.props;
		this._getVacancies(search, page, payload);
	}
	
	handleSortByTitle(e, payload){
		const { search, page, statusFilter, orderedByStatus } = this.props;
		this._getVacancies(search, page, statusFilter.selected, payload, orderedByStatus);
	}
	
	handleSortByStatus(e, payload){
		const { search, page, statusFilter, orderedByTitle } = this.props;
		this._getVacancies(search, page, statusFilter.selected, orderedByTitle, payload);
	}
	
	_getVacancies(search, page, statusFilter, orderedByTitle, orderedByStatus){
		this.props.getVacancies(search, page, statusFilter, orderedByTitle, orderedByStatus);
	}
	
	render(){
		const { count } = this.props;
		const { search, statusFilter, orderedByTitle, orderedByStatus } = this.props;
		return (
			<div className='vacancies-container'>
				<div className='vacancies-container__header'>
					<div className='vacancies-container__filters'>
						<div className='vacancies-container__search-bar-container'>
							<SearchBar
								onSearch={this.props.handleSearch}
								value={search}
								className='vacancies-container__search-bar'
							/>
							<span className='vacancies-container__vacancys-count'>{count}</span>
						</div>
						<DropDown
							onChange={this.handleFilterStatus}
							items={statusFilter.filters}
							selectedPayload={statusFilter.selected}
							deviders={[ 1 ]}
							className='vacancies-container__filter-status'
						/>
						<DropDownIcon
							icon={<i className='icon-arrow-combo' />}
							className='default-button vacancies-container__sort'
						>
							<DropDownIconItem
								onClick={this.handleSortByTitle}
								payload={orderedByTitle}
								text='По названию (А-я)'
							/>
							<DropDownIconItem
								onClick={this.props.handleSortByTitle}
								payload={!orderedByTitle}
								text='По названию (я-А)'
							/>
							<DropDownIconItem
								onClick={this.handleSortByStatus}
								payload={orderedByStatus}
								text='По статусу (А-я)'ы
							/>
							<DropDownIconItem
								onClick={this.handleSortByStatus}
								payload={!orderedByStatus}
								text='По статусу (я-А)'
							/>
						</DropDownIcon>
					</div>
				</div>
				<div className='vacancies-container__body'>
					<Vacancies {...this.props}/>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { vacancies } = state.vacanciesData;
	
	return {
		count: vacancies.length,
		...state.vacanciesData
	};
}

export default connect(mapStateToProps, actionCreators)(VacanciesContainer);
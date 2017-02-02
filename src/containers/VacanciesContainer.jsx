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
		this.handleChangeStatus = this.handleChangeStatus.bind(this);
		this.handleSortByTitle = this.handleSortByTitle.bind(this);
		this.handleSortByStatus = this.handleSortByStatus.bind(this);
		this._getVacancies = this._getVacancies.bind(this);
		this._srollDown = this._srollDown.bind(this);
	}
	
	componentDidMount(){
		const { search, statusFilter, orderedByTitle, orderedByStatus } = this.props;
		this._getVacancies(search, 0, statusFilter.selected, orderedByTitle, orderedByStatus);
		window.addEventListener('scroll', this._srollDown);
	}
	
	componentWillUnmount(){
		window.removeEventListener('scroll', this._srollDown);
	}
	
	handleSearch(val){
		const { statusFilter, orderedByTitle, orderedByStatus } = this.props;
		this._getVacancies(val, 0, statusFilter.selected, orderedByTitle, orderedByStatus);
	}
	
	handleChangeStatus(e, payload){
		const { search, orderedByTitle, orderedByStatus  } = this.props;
		this._getVacancies(search, 0, payload, orderedByTitle, orderedByStatus);
	}
	
	handleSortByTitle(e, payload){
		const { search, statusFilter, orderedByStatus } = this.props;
		this._getVacancies(search, 0, statusFilter.selected, payload, orderedByStatus);
	}
	
	handleSortByStatus(e, payload){
		const { search, statusFilter, orderedByTitle } = this.props;
		this._getVacancies(search, 0, statusFilter.selected, orderedByTitle, payload);
	}
	
	_srollDown(){
		const scrollHeight = document.documentElement.scrollHeight;
		const clientHeight = document.documentElement.clientHeight;
		const offset = window.pageYOffset;
		
		const { isFetchingScroll, search, page, pagesCount, statusFilter, orderedByTitle, orderedByStatus } = this.props;
		if (scrollHeight - (clientHeight + offset) < 100 && !isFetchingScroll && (page + 1) <= pagesCount) {
			this.props.getVacanciesOnScroll(search, page + 1, statusFilter.selected, orderedByTitle, orderedByStatus);
		}
	}
	
	_getVacancies(search, page, statusFilter, orderedByTitle, orderedByStatus){
		this.props.getVacancies(search, page, statusFilter, orderedByTitle, orderedByStatus);
	}
	
	render(){
		const { isFetching, isFetchingScroll, count } = this.props;
		const { search, statusFilter } = this.props;
		return (
			<div className='vacancies-container'>
				<div className='vacancies-container__header'>
					<div className='vacancies-container__filters'>
						<div className='vacancies-container__search-bar-container'>
							<SearchBar
								onSearch={this.handleSearch}
								value={search}
								className='vacancies-container__search-bar'
							/>
							<span className='vacancies-container__vacancys-count'>{count}</span>
						</div>
						<DropDown
							onChange={this.handleChangeStatus}
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
								payload
								text='По названию (А-я)'
							/>
							<DropDownIconItem
								onClick={this.handleSortByTitle}
								payload={false}
								text='По названию (я-А)'
							/>
							<DropDownIconItem
								onClick={this.handleSortByStatus}
								payload
								text='По статусу (А-я)'
							/>
							<DropDownIconItem
								onClick={this.handleSortByStatus}
								payload={false}
								text='По статусу (я-А)'
							/>
						</DropDownIcon>
					</div>
				</div>
				<div className='vacancies-container__body'>
					{isFetching ?
					[
						<div key='overlay-loading' className='overlay-loading overlay-loading--show' />,
						<Vacancies key='vacancies' ref='vacancies' {...this.props}/>
					] : <Vacancies ref='vacancies' {...this.props}/>}
					
				</div>
				{isFetchingScroll &&
					<div className='vacancies-container__scroll-loading'>
						<div className='overlay-loading overlay-loading--show' />
					</div>}
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
import React, { Component } from 'react';
import Vacancies from '../components/Vacancies';
import SearchBar from '../components/modules/search-bar';
import DropDown from '../components/modules/dropdown';
import { DropDownIcon, DropDownIconItem } from '../components/modules/dropdown-icon';
import * as actionCreators from '../actions';
import { connect } from 'react-redux';
import cx from 'classnames';

class VacanciesContainer extends Component {
	
	constructor(props){
		super(props);
		
		this.handleSearch = this.handleSearch.bind(this);
		this.handleChangeStatus = this.handleChangeStatus.bind(this);
		this.handleSortByTitle = this.handleSortByTitle.bind(this);
		this.handleSortByStatus = this.handleSortByStatus.bind(this);
		this._getVacancies = this._getVacancies.bind(this);
		
		this._srollDown = this._srollDown.bind(this);
		this._toggleUpIcon = this._toggleUpIcon.bind(this);
		
		this.state = {
			showUpIcon: false
		};
	}
	
	componentDidMount(){
		const { search, statusFilter, orderedByTitle, orderedByStatus } = this.props;
		this._getVacancies(search, 0, statusFilter.selected, orderedByTitle, orderedByStatus);
		window.addEventListener('scroll', this._srollDown);
		window.addEventListener('scroll', this._toggleUpIcon);
	}
	
	componentWillUnmount(){
		window.removeEventListener('scroll', this._srollDown);
		window.removeEventListener('scroll', this._toggleUpIcon);
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
	
	/* _setUpButtonPosition(){
		const btn = this.refs.iconTop;
		const documentHeight = document.documentElement.clientHeight;
		console.log('documentHeight: ' + documentHeight);
		const contHeight = this.refs.vacanciesContainer.clientHeight;
		console.log('contHeight: ' + contHeight);
		const scrollTop = this.refs.vacanciesContainer.getBoundingClientRect().top;
		console.log('scrollTop: ' + scrollTop);

		if (contHeight > documentHeight) {
			const hiddentTestsHeight = contHeight - documentHeight;
			console.log('hiddentTestsHeight: ' + hiddentTestsHeight);
			const visibleTestsHeight = contHeight - hiddentTestsHeight;
			console.log('visibleTestsHeight: ' + visibleTestsHeight);
			btn.style.top = (visibleTestsHeight - btn.offsetHeight - scrollTop - 50) + 'px';
		}
	}*/
	
	_toggleUpIcon() {
		this.setState({
			showUpIcon: window.pageYOffset > document.documentElement.clientHeight
		});
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
		const { isFetching, isFetchingScroll, curCount, allCount } = this.props;
		const { search, statusFilter } = this.props;
		const upIconClasses = cx({
			'vacancies-container__up-icon': true,
			'vacancies-container__up-icon--show': this.state.showUpIcon
		});
		return (
			<div className='vacancies-container'>
				<span
					className={upIconClasses}
					onClick={() => {
						window.scrollTo(0, 0);
					}}
				>
					<i className='icon-up-open-2' />
				</span>
				<div className='vacancies-container__header'>
					<div className='vacancies-container__filters'>
						<div className='vacancies-container__search-bar-container'>
							<SearchBar
								onSearch={this.handleSearch}
								value={search}
								className='vacancies-container__search-bar'
							>
								<span className='vacancies-container__vacancys-count'>{curCount} / {allCount}</span>
							</SearchBar>
						</div>
						<div className='vacancies-container__filters'>
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
		curCount: vacancies.length,
		allCount: state.vacanciesData.count,
		...state.vacanciesData
	};
}

export default connect(mapStateToProps, actionCreators)(VacanciesContainer);
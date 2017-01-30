import React from 'react';
import SelectedItems from './SelectedItems';
import Items from './Items';
import Filters from './Filters';
import { ButtonPrimary } from '../../button';
import { some } from 'lodash';
import cx from 'classnames';
import './style/select-items.scss';

/* var items = {
	headerCols: [{ name: 'a', type: 'integer' }],
	items: [
		{ id: '1', data: {fullname: '1'} },
		{ id: '2', data: {fullname: '2'} },
		{ id: '3', data: {fullname: '3'} },
		{ id: '4', data: {fullname: '4'} }
	]
}*/

class SelectItems extends React.Component {
	
	constructor(props){
		super(props);
		this.types = { 'integer': 'integer', 'date': 'date' };
		this.errors = { MAX_SELECTED_ITEMS: `Вы не можете выбрать более ${props.maxSelectedItems} элемента(ов)` };

		this.onSort = this.onSort.bind(this);
		this.onAddItem = this.onAddItem.bind(this);
		this.onRemoveItem = this.onRemoveItem.bind(this);
		this.handleSave = this.handleSave.bind(this);
		this.handleChangeSearch = this.handleChangeSearch.bind(this);
		this.handleChangePage = this.handleChangePage.bind(this);
		this._setData = this._setData.bind(this);
		this._castType = this._castType.bind(this);
		this.handleCloseError = this.handleCloseError.bind(this);
		this.state = {
			headerCols: props.headerCols || [],
			items: props.items || [],
			selectedItems: props.selectedItems || [],
			maxSelectedItems: Number.MAX_VALUE,
			search: '',
			page: 1,
			pagesCount: 1,
			isLoading: true,
			error: '',
			isShowError: false
		};
	}

	getChildContext(){
    	return {
    		onSort: this.onSort,
    		onAddItem: this.onAddItem,
    		onRemoveItem: this.onRemoveItem
    	};
  	}

	componentWillReceiveProps(nextProps){
		this.setState({
			items: nextProps.items ? nextProps.items : [],
			selectedItems: nextProps.selectedItems ? nextProps.selectedItems : [],
			isLoading: false
		});
	}

	_castType(val, type){
		function isInteger(val) {
			return isNaN(parseInt(val)) === false;
		}

		function isDate(val){
			return Date.parse(val) !== isNaN(val);
		}

		if (val === undefined || val === null || !(type in this.types)) return val.toString();
		switch (type) {
			case this.types.integer:
				if (isInteger(val) === true){
					return Number(val);
				}
				break;
			case this.types.date:
				if (isDate(val) === true){
					return new Date(val);
				}
				break;
			default:
				return val.toString();
		}
	}

	_setData(data){
		const self = this;
		if (!data || !data.items || !data.headerCols) return;
		data.items = data.items.map(item => {
			Object.keys(item.data).forEach((col, index) => {
				item.data[col] = self._castType(item.data[col], data.headerCols[index].type);
			});
			return item;
		});
		this.setState({ items: data.items, headerCols: data.headerCols, pagesCount: data.pagesCount, isLoading: false });
	}

	onSort(index, isAscending){
		function getFieldByIndex(data, index){
			const keys = Object.keys(data).filter((key, _index) => {
				return index === _index;
			});
			return keys.length > 0 ? data[keys[0]] : null;
		}

		const isAsc = isAscending ? 1 : -1;
		const items = this.state.items;
		items.sort((first, second) => {
			const firstField = getFieldByIndex(first.data, index);
			const secondFiled = getFieldByIndex(second.data, index);
			if (firstField && secondFiled){
				return firstField > secondFiled ? isAsc : firstField === secondFiled ? 0 : -(isAsc);
			}
			return 0;
		});
		this.setState({ items });
	}

	onAddItem(item){
		const _items = this.state.items;
		const _selectedItems = this.state.selectedItems;

		if (_selectedItems.length >= this.props.maxSelectedItems){
			this.setState({ error: this.errors.MAX_SELECTED_ITEMS, isShowError: true });
			return;
		}
		if (some(_selectedItems, { id: item.id })) return;
		_selectedItems.push({ ...item });
		this.setState({ items: _items, selectedItems: _selectedItems });
	}

	onRemoveItem(id){
		let _selectedItems = this.state.selectedItems;

		_selectedItems = _selectedItems.filter(r => {
			return r.id !== id;
		});
		this.setState({ selectedItems: _selectedItems });
	}

	handleSave(){
		if (this.props.onSave){
			this.props.onSave(this.state.selectedItems);
		}
	}

	handleChangeSearch(search){
		this.setState({ search, isLoading: true, page: 1 });
		if (this.props.onChange){
			this.props.onChange(search, this.state.page);
		}
	}

	handleChangePage(page){
		this.setState({ page, isLoading: true });
		if (this.props.onChange){
			this.props.onChange(this.state.search, page);
		}
	}

	handleCloseError(){
		this.setState({ error: '', isShowError: false });
	}

	render() {
		const { title, headerCols, pagesCount } = this.props;
		const { isShowError, isLoading, error, page, search, items, selectedItems } = this.state;
		const errorClass = cx({
			'alert': true,
			'alert--info': true,
			'select-item__error': true,
			'select-item__error--show': isShowError
		});

		return (
			<div className='select-items'>
				<div className='select-items__modal-box'>
					<div className='select-items__content'>
						<div className='select-item__header'>
							<button type='button' className='close-button' onClick={this.props.onClose}>&times;</button>
							<span>{title}</span>
						</div>
						<div className='select-item__body clearfix'>
							<Filters
								page={page}
								pagesCount={pagesCount}
								search={search}
								onSearch={this.handleChangeSearch}
								onPage={this.handleChangePage}
							/>
							<Items
								items={items}
								selectedItems={selectedItems}
								headerCols={headerCols}
								isLoading={isLoading}
							/>
							<SelectedItems items={selectedItems} />
						</div>
						<div className='select-item__footer'>
							<div className={errorClass}>
								<button type='button' className='close-button' onClick={this.handleCloseError}>&times;</button>
								<span>{error}</span>
							</div>
							<ButtonPrimary onClick={this.handleSave} text='Сохранить' />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

SelectItems.childContextTypes = {
	onSort: React.PropTypes.func,
	onAddItem: React.PropTypes.func,
	onRemoveItem: React.PropTypes.func
}

SelectItems.propTypes = {
	items: React.PropTypes.array,
	selectedItems: React.PropTypes.array,
	maxSelectedItems: React.PropTypes.number,
	title: React.PropTypes.string,
	onClose: React.PropTypes.func,
	onSave: React.PropTypes.func,
	onChange: React.PropTypes.func
}

SelectItems.defaultProps = {
	title: '',
	maxSelectedItems: Number.MAX_VALUE
}

export default SelectItems;
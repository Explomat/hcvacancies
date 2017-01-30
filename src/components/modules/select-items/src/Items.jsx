import React from 'react';
import { ButtonPrimary } from '../../button';
import some from 'lodash/some';
import cx from 'classnames';

class HeaderCol extends React.Component {

	constructor(props){
		super(props);
		this.handleSort = this.handleSort.bind(this);
	}

	handleSort(){
		if (this.context.onSort) {
			const caret = this.refs.caret;
			this.context.onSort(this.props.index, caret.classList.contains('caret--rotate'));
			caret.classList.toggle('caret--rotate');
		}
	}

	render(){
		return (
			<th onClick={this.handleSort} className='header-row__col'>
				<span className='header-row__col-name'>{this.props.name}</span>
				<span ref='caret' className='caret header-row__caret' />
			</th>
		);
	}
}

HeaderCol.propTypes = {
	name: React.PropTypes.string,
	type: React.PropTypes.string,
	onSort: React.PropTypes.func
};

HeaderCol.defaultProps = {
	name: ''
};

HeaderCol.contextTypes = {
	onSort: React.PropTypes.func
};

class Item extends React.Component {

	constructor(props){
		super(props);
		this.handleAddItem = this.handleAddItem.bind(this);
	}

	handleAddItem(){
		if (this.context.onAddItem){
			this.context.onAddItem({ ...this.props });
		}
	}

	render(){
		const data = this.props.data;
		const classesButton = cx({
			'body-row__add-btn': true,
			'body-row__add-btn--selected': this.props.isSelected
		});
		const classesIcon = cx({
			'icon-plus': !this.props.isSelected,
			'icon-check': this.props.isSelected
		});
		return (
			<tr className='body-row' onClick={this.handleAddItem}>
				<td>
					<ButtonPrimary className={classesButton} reverse>
						<i className={classesIcon} />
					</ButtonPrimary>
				</td>
				{Object.keys(data).map((c, index) => {
					return <td key={index} className='body-row__col oneline'>{data[c]}</td>;
				})}
			</tr>
		);
	}
}

Item.propTypes = {
	data: React.PropTypes.object,
	isSelected: React.PropTypes.bool
};

Item.defaultProps = {
	data: {},
	isSelected: false
};

Item.contextTypes = {
	onAddItem: React.PropTypes.func
};

class Items extends React.Component {

	getColsMarkup(){
		const headerCols = this.props.headerCols;
		const markUpCols = [ <th key={0} /> ];
		headerCols.forEach((c, index) => {
			markUpCols.push(<HeaderCol key={index + 1} name={c.name} index={index}/>);
		});
		return markUpCols;
	}

	getRowsMarkUp(){
		const items = this.props.items;
		const selectedItems = this.props.selectedItems;
		return items.map((i, index) => {
			const isSelected = some(selectedItems, { id: i.id });
			return <Item key={index} {...i} isSelected={isSelected}/>;
		});
	}

	render() {
		const cols = this.getColsMarkup();
		const items = this.getRowsMarkUp();
		const isLoadingClass = cx({
			'overlay-loading': true,
			'overlay-loading--show': this.props.isLoading
		});
		return (
			<div className='items-wrapper'>
				<table className='items-wrapper__header'>
					<thead>
						<tr className='header-row'>{cols}</tr>
					</thead>
				</table>
				<div className='items-wrapper__body'>
					<table className='items'>
						<tbody className='items__body'>
							{items}
						</tbody>
					</table>
				</div>
				
				<div className={isLoadingClass} />
			</div>
			
		);
	}
}

Items.propTypes = {
	headerCols: React.PropTypes.array,
	items: React.PropTypes.array,
	selectedItems: React.PropTypes.array
};

Items.defaultProps = {
	headerCols: [],
	items: [],
	selectedItems: []
};

export default Items;
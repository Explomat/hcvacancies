import orderBy from 'lodash/orderBy';

export function sortTable(array, key, isAsc){
	const ascending = isAsc === 'true' ? 'asc' : 'desc';
	return orderBy(array, [key], [ascending]);
}
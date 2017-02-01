import tryDateParse from './tryDateParse';
import formatDate from './formatDate';

export default function getDate(date){
	const newDate = tryDateParse(date);
	if (!newDate){
		return 'Нет даты';
	}
	return formatDate(newDate);
}
export default function tryDateParse(date){
	if (date === null){
		return '';
	}
	const _date = Date.parse(date);
	if (!isNaN(_date)){
		return new Date(_date);
	}
	return '';
}
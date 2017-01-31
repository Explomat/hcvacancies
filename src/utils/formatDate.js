import moment from 'moment';

export default function formatDate(date){
	console.log(moment(date).format());
	return moment(date).format('MM.DD.YYYY');
}
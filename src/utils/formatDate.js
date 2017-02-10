import moment from 'moment';

export default function formatDate(date){
	return moment(date).format('DD.MM.YYYY');
}
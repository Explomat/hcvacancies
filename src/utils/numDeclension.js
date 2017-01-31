
// склонение слова относительно числа
export default function numDeclension(number, one, two, five) {
	let dnumber = Math.abs(number);
	dnumber %= 100;
	if (dnumber >= 5 && dnumber <= 20) {
		return five;
	}
	dnumber %= 10;
	if (dnumber === 1) {
		return one;
	}
	if (dnumber >= 2 && dnumber <= 4) {
		return two;
	}
	return five;
}
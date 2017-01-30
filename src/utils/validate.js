export function validateEmail(email) {
    var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(email);
}


/*(/^
(?=.*\d)                //хотя бы 1 число
(?=.*[a-z])             //одна маленькая буква
(?=.*[A-Z])             //одна заглавная буква
[a-zA-Z0-9]{8,}         //минимум 8 символов
$/)*/
export function validatePassword(password){
	var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
	return re.test(password);
}

export function validateLogin(str){
	var re = /^[a-zA-Z0-9]+$/;
	return re.test(str);
}
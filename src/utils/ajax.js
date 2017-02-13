const AJAX_TIME_OVER = 30000;
const CACHE_MAX_REQUESTS = 30;
let cache = {};

function getXmlHttp(){
	let xmlHttp;
	try {
		xmlHttp = new ActiveXObject('Msxml2.XMLHTTP');
	} catch (e){
		try {
			xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
		} catch (err){
			xmlHttp = false;
		}
	}
	if (!xmlHttp && typeof (XMLHttpRequest) !== 'undefined'){
		xmlHttp = new XMLHttpRequest();
	}
	if (xmlHttp.withCredentials !== undefined){
		xmlHttp.withCredentials = process.env.NODE_ENV !== 'production';
	}
	return xmlHttp;
}

function isCacheOverflow(){
	return Object.keys(cache).length > CACHE_MAX_REQUESTS;
}

function getCacheRequest(url){
	if (isCacheOverflow()) {
		cache = {};
		return;
	}
	return cache[encodeURI(url)];
}

function sendRequest(url, data, isCache, requestType){
	function prepareUrl(_url, _isCache){
		return !_isCache ? encodeURI(`${_url}&r=${Math.round(Math.random() * 10000)}`) : encodeURI(_url);
	}

	const cacheRequest = getCacheRequest(url);
	if (cacheRequest) return cacheRequest;
	if (!url) return Promise.reject(Error('Unknown url'));

	const preparedUrl = prepareUrl(url, isCache);
	const resp = new Promise((resolve, reject) => {
		const xmlHttp = getXmlHttp();
		const type = requestType || 'GET';

		xmlHttp.open(type, preparedUrl, true);
		// xmlHttp.setRequestHeader('Authorization', 'Basic ' + btoa('matveev.s:matveev.s'));
		xmlHttp.onreadystatechange = () => {
			if (xmlHttp.readyState === 4) {
				if (timeout){
					clearTimeout(timeout);
				}

				if (xmlHttp.status === 200){
					resolve(xmlHttp.responseText);
				} else {
					console.log(xmlHttp.status);
					reject(new Error(xmlHttp.statusText || 'Ajax request error'));
				}
			}
		};
		xmlHttp.send(data || null);
		const timeout = setTimeout(() => {
			xmlHttp.abort();
			reject(new Error('Ajax request time over'));
		}, AJAX_TIME_OVER);
	});

	if (isCache) {
		cache[preparedUrl] = resp;
	}

	return resp;
}


export function get(url, isCache){
	return sendRequest(url, null, isCache);
}

export function post(url, data, isCache){
	return sendRequest(url, data, isCache, 'POST');
}

export function uploadFile(url, file){
	return new Promise((resolve, reject) => {
		const xmlHttp = getXmlHttp();

		xmlHttp.onreadystatechange = () => {
			if (xmlHttp.readyState === 4) {
				if (xmlHttp.status === 200){
					resolve(xmlHttp.responseText);
				} else {
					console.log(xmlHttp.status);
					reject(new Error(xmlHttp.statusText || 'Upload file error'));
				}
			}
		};

		xmlHttp.open('POST', url);

		const formData = new FormData();
		formData.append('file', file, file.name);

		xmlHttp.send(formData);
	});
}

export function uploadFiles(url, files) {
	return new Promise((resolve, reject) => {
		const xmlHttp = getXmlHttp();

		xmlHttp.onreadystatechange = () => {
			if (xmlHttp.readyState === 4) {
				if (xmlHttp.status === 200){
					resolve(xmlHttp.responseText);
				} else {
					console.log(xmlHttp.status);
					reject(new Error(xmlHttp.statusText || 'Upload file error'));
				}
			}
		};

		xmlHttp.open('POST', url);

		const formData = new FormData();
		for (let i = files.length - 1; i >= 0; i--) {
			const file = files[i];
			formData.append('files[]', file, file.name);
		}
		xmlHttp.send(formData);
	});
}
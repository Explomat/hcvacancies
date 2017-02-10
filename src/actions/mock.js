// import numberToWords from 'number-to-words';
import filter from 'lodash/filter';
import find from 'lodash/find';
// import indexOf from 'lodash/indexOf';

const limitRows = 15;
const vacanciesCount = 100;

const vacancyStates = [
	{ 'payload':'vacancy_cancelled', 'text':'Отменена', 'color':'128, 0, 0' },
	{ 'payload':'vacancy_closed', 'text':'Закрыта', 'color':'0, 128, 0' },
	{ 'payload':'vacancy_opened', 'text':'Открыта', 'color':'128, 128, 128' },
	{ 'payload':'vacancy_reopened', 'text':'Возобновлена', 'color':'128, 128, 128' },
	{ 'payload':'vacancy_state_1', 'text':'Закрыта внутренним кандидатом', 'color':'0, 0, 255' },
	{ 'payload':'vacancy_submitted', 'text':'Новая заявка', 'color':'128, 128, 128' },
	{ 'payload':'vacancy_suspended', 'text':'Приостановлена', 'color':'255, 128, 0' }
];

const candidateStates = [
	{ 'payload':'blacklist', 'text':'Черный список', 'color':'68, 68, 68' },
	{ 'payload':'candidate_letter', 'text':'Отправлено письмо кандидату', 'color':'128, 128, 128' },
	{ 'payload':'client_letter', 'text':'Отправлено письмо заказчику', 'color':'128, 128, 128' },
	{ 'payload':'dismiss', 'text':'Уволен', 'color':'255, 0, 0' },
	{ 'payload':'elem1', 'text':'Собеседование в СБ', 'color':'255, 0, 255' },
	{ 'payload':'elem1:failed', 'text':'Собеседование в СБ - не пройдено', 'color':'255, 0, 0' },
	{ 'payload':'elem1:scheduled', 'text':'Собеседование в СБ - запланировано', 'color':'128, 128, 128' },
	{ 'payload':'elem1:succeeded', 'text':'Собеседование в СБ - пройдено', 'color':'0, 128, 64' },
	{ 'payload':'elem2', 'text':'Внутренний', 'color':'0, 0, 255' },
	{ 'payload':'elem3', 'text':'Не пришел на собеседование', 'color':'128, 128, 128' },
	{ 'payload':'elem5', 'text':'Отобран заказчиком', 'color':'128, 128, 128' },
	{ 'payload':'elem6', 'text':'Отобран  рекрутером', 'color':'128, 128, 128' },
	{ 'payload':'elem7', 'text':'не вышел на работу', 'color':'128, 128, 128' },
	{ 'payload':'elem8', 'text':'Первый рабочий день', 'color':'255, 128, 0' },
	{ 'payload':'elem8:scheduled', 'text':'Первый рабочий день - запланировано', 'color':'128, 128, 128' },
	{ 'payload':'event_type_1', 'text':'Вышел в УЦ', 'color':'0, 0, 255' },
	{ 'payload':'event_type_2', 'text':'инструктаж', 'color':'128, 128, 128' },
	{ 'payload':'event_type_2:failed', 'text':'инструктаж - не пройдено', 'color':'255, 0, 0' },
	{ 'payload':'event_type_2:scheduled', 'text':'инструктаж - запланировано', 'color':'128, 128, 128' },
	{ 'payload':'event_type_2:succeeded', 'text':'инструктаж - пройдено', 'color':'0, 128, 64' },
	{ 'payload':'event_type_3', 'text':'ВАХТА РЕЗЕРВ', 'color':'128, 128, 128' },
	{ 'payload':'event_type_3:scheduled', 'text':'ВАХТА РЕЗЕРВ - запланировано', 'color':'128, 128, 128' },
	{ 'payload':'hire', 'text':'Принят на работу', 'color':'0, 192, 0' },
	{ 'payload':'interview', 'text':'Интервью состоялось', 'color':'0, 0, 200' },
	{ 'payload':'interview:cancelled', 'text':'Интервью - отменено', 'color':'150, 0, 32' },
	{ 'payload':'interview:failed', 'text':'Отказ после интервью', 'color':'255, 0, 0' },
	{ 'payload':'interview:scheduled', 'text':'Интервью запланировано', 'color':'128, 128, 128' },
	{ 'payload':'interview:succeeded', 'text':'Интервью - пройдено', 'color':'0, 128, 64' },
	{ 'payload':'invitation', 'text':'Отправлено приглашение', 'color':'0, 128, 255' },
	{ 'payload':'job_offer', 'text':'Предложение кандидату', 'color':'128, 128, 128' },
	{ 'payload':'job_offer:failed', 'text':'Предложение кандидату - отклонено', 'color':'255, 0, 0' },
	{ 'payload':'phone_interview', 'text':'Тел. интервью состоялось', 'color':'0,192,192' },
	{ 'payload':'phone_interview:failed', 'text':'Отказ после тел. интервью', 'color':'255,0,0' },
	{ 'payload':'phone_interview:scheduled', 'text':'Тел. интервью запланировано', 'color':'128,128,128' },
	{ 'payload':'probation', 'text':'Испытательный срок', 'color':'0,128,128' },
	{ 'payload':'probation:failed', 'text':'Испытательный срок - не пройден', 'color':'255,0,0' },
	{ 'payload':'probation:succeeded', 'text':'Испытательный срок - пройден', 'color':'0,128,64' },
	{ 'payload':'reject', 'text':'Отклонен рекрутером', 'color':'255,0,0' },
	{ 'payload':'reserve', 'text':'Резерв', 'color':'100,100,100' },
	{ 'payload':'rr_interview', 'text':'Интервью с руководителем сост.', 'color':'192,0,192' },
	{ 'payload':'rr_interview:cancelled', 'text':'Интервью с руководителем - отменено', 'color':'150,0,32' },
	{ 'payload':'rr_interview:failed', 'text':'Отказ после интервью у зак', 'color':'255,0,0' },
	{ 'payload':'rr_interview:scheduled', 'text':'Интервью с руководителем запл.', 'color':'128,128,128' },
	{ 'payload':'rr_interview:succeeded', 'text':'Интервью с руководителем - пройдено', 'color':'0,128,64' },
	{ 'payload':'rr_reject', 'text':'Отклонен руководителем', 'color':'255,0,0' },
	{ 'payload':'rr_resume_review', 'text':'Резюме у руководителя', 'color':'100,0,100' },
	{ 'payload':'rr_resume_review:failed', 'text':'Резюме у руководителя - отклонено', 'color':'255,0,0' },
	{ 'payload':'rr_resume_review:succeeded', 'text':'Резюме одобр. руководителем', 'color':'0,128,64' },
	{ 'payload':'self_reject', 'text':'Самоотказ', 'color':'255,0,0' },
	{ 'payload':'testing', 'text':'Тестирование', 'color':'128,128,128' },
	{ 'payload':'testing:failed', 'text':'Тестирование - не пройдено', 'color':'255,0,0' },
	{ 'payload':'testing:started', 'text':'Тестирование - начато', 'color':'128,128,128' },
	{ 'payload':'testing:succeeded', 'text':'Тестирование - пройдено', 'color':'0,128,64' },
	{ 'payload':'unused', 'text':'[Не использован]', 'color':'100,100,100' },
	{ 'payload':'vacancy_cancel', 'text':'Вакансия отменена', 'color':'100,100,100' },
	{ 'payload':'vacancy_close', 'text':'Не прошел (вакансия закрыта)', 'color':'100,100,100' },
	{ 'payload':'vacancy_response', 'text':'Отклик на вакансию', 'color':'255,128,0' },
	{ 'payload':'vacancy_response:failed', 'text':'Отклик отклонен', 'color':'100,100,100' },
	{ 'payload':'vacancy_response:succeeded', 'text':'Отклик подходит', 'color':'170,100,23' }
];

function getRandomArbitrary(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function mapStates(states){
	return states.map(s => s.payload);
}

function filterVacancies(vacancies, search, page, state_id, order){
	const newVacancies = filter(vacancies,  v => {
		return (~v.name.indexOf(search) && (v.state_id === state_id || state_id === 'all'));
	});
	const [key, orderBy] = order.split(':');
	const sortVacancies = newVacancies.sort((f, s) => {
		if (orderBy === 'asc'){
			if (f[key] < s[key]){
				return -1;
			}
			if (f[key] > s[key]){
				return 1;
			}
			return 0;
		} else if (orderBy === 'desc') {
			if (f[key] < s[key]){
				return 1;
			}
			if (f[key] > s[key]){
				return -1;
			}
			return 0;
		}
	});
	
	const sliceVacancies = sortVacancies.slice((page * limitRows),  (page * limitRows + limitRows));
	
	return {
		vacancies: sliceVacancies,
		pagesCount: Math.round(newVacancies.length / limitRows),
		count: newVacancies.length
	};
	
	/* const sortVacancies = !orderedByTitle ? newVacancies :
	newVacancies.sort((f,  s) => {
		if (f.name < s.name){
			return -1;
		}
		if (f.name > s.name){
			return 1;
		}
		return 0;
	});
	const sortVacancies2 = !orderedByStatus ? sortVacancies :
	sortVacancies.sort((f,  s) => {
		if (f.state_id < s.state_id){
			return -1;
		}
		if (f.state_id > s.state_id){
			return 1;
		}
		return 0;
	});
	const sliceVacancies = sortVacancies2.slice((page * limitRows),  (page * limitRows + limitRows));
	
	return {
		vacancies: sliceVacancies,
		pagesCount: Math.round(newVacancies.length / limitRows),
		count: newVacancies.length
	};*/
}

function mockVacancies(){
	function getStatus(arr){
		return arr[getRandomArbitrary(0, arr.length)];
	}
	
	const outVacancies = [];

	for (let i = 0; i < vacanciesCount; i++) {
		const candidates = [];
		const comments = [];
		const vacancyCommentsCount = getRandomArbitrary(0,  5);
		const candidatesCount = getRandomArbitrary(1,  6);
		
		for (let j = 0; j < candidatesCount; j++) {
			const candidateComments = [];
			const candidateCommentsCount = getRandomArbitrary(1,  6);
			
			for (let jj = 0; jj < candidateCommentsCount; jj++){
				candidateComments.push({
					id: jj,
					fullname: 'ФИО кто оставил комментарий',
					date: new Date(),
					state_id: getStatus(mapStates(candidateStates)),
					comment: `Lorem ipsum dolor sit amet,
					consectetur adipiscing elit.
					Donec commodo,  est id lobortis gravida,
					diam diam hendrerit purus,  at consectetur ligula metus sit amet felis.`
				});
			}
			
			candidates.push({
				id: j,
				fullname: `ФИО кандидата ${j}`,
				state_id: getStatus(mapStates(candidateStates)),
				attachment_id: 1,
				comments: candidateComments,
				states: candidateStates,
				boss_state_id: 'test'
			});
		}
		for (let k = 0; k < vacancyCommentsCount; k++) {
			comments.push({
				id: k,
				fullname: `ФИО кто оставил комментарий ${i}/${k}`,
				comment: 'Comment'
			});
		}
		outVacancies.push({
			id: i,
			name: `Вакансия ${i}`,
			state_id: getStatus(mapStates(vacancyStates)),
			vacancyStates,
			candidateStates,
			start_date: new Date(),
			candidates
		});
	}
	return outVacancies;
}

const vacancies = mockVacancies();

export function getMockVacancies(search, page, status, order){
	const data = filterVacancies(vacancies, search, page, status, order);
	const filteredVacancies = data.vacancies.map(v => {
		return {
			id: v.id,
			name: v.name,
			state_id: v.state_id,
			start_date: v.start_date,
			candidates_count: v.candidates.length
		};
	});
	return {
		vacancies: filteredVacancies,
		pages_count: data.pagesCount,
		count: data.count,
		states: vacancyStates
	};
}

export function getMockVacancy(vacancyId){
	const vacancy = vacancies.filter(v => v.id.toString() === vacancyId.toString())[0];
	if (vacancy){
		const candidates = vacancy.candidates.map(c => {
			return {
				id: c.id,
				fullname: c.fullname,
				state_id: c.state_id,
				comments_count: c.comments.length
			};
		});
		return {
			id: vacancy.id,
			name: vacancy.name,
			state_id: vacancy.state_id,
			vacancyStates,
			candidateStates,
			start_date: vacancy.start_date,
			candidates
		};
	}
}

export function getMockCandidate(vacancyId, candidateId){
	const vacancy = vacancies.filter(v => v.id.toString() === vacancyId.toString())[0];
	if (vacancy){
		return vacancy.candidates.filter(c => c.id.toString() === candidateId.toString())[0];
	}
	return null;
}

export function editMockBossPost(vacancyId,  candidateId,  post){
	try {
		const vacancy = find(vacancies,  v => {
			return v.id.toString() === vacancyId.toString();
		});
		if (!vacancy){
			throw new Error('Произошла непредвиденная ошибка,  обратитесь к администратору!');
		}
		const candidate = find(vacancy.candidates,  c => {
			return c.id.toString() === candidateId.toString();
		});
		if (!candidate){
			throw new Error('Произошла непредвиденная ошибка,  обратитесь к администратору!');
		}
		if (!candidate.boss) {
			candidate.boss = {
				id: 'boss_id',
				fullname: 'Boss',
				comment: post
			};
		} else {
			candidate.boss.comment = post;
		}
		
		return candidate;
	} catch (e){
		return {
			status: 'error',
			error: e.message
		};
	}
}
import numberToWords from 'number-to-words';
import filter from 'lodash/filter';
// import indexOf from 'lodash/indexOf';

const limitRows = 15;
const vacanciesCount = 100;
/* function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
}*/

function filterVacancies(vacancies, search, page, status, orderedByTitle, orderedByStatus){
	const newVacancies = filter(vacancies, v => {
		return (~v.title.indexOf(search) && (v.status === status || status === 'all'));
	});
	const sortVacancies = !orderedByTitle ? newVacancies :
	newVacancies.sort((f, s) => {
		if (f.title < s.title){
			return -1;
		}
		if (f.title > s.title){
			return 1;
		}
		return 0;
	});
	const sortVacancies2 = !orderedByStatus ? sortVacancies :
	sortVacancies.sort((f, s) => {
		if (f.status < s.status){
			return -1;
		}
		if (f.status > s.status){
			return 1;
		}
		return 0;
	});
	const sliceVacancies = sortVacancies2.slice((page * limitRows), (page * limitRows + limitRows));
	
	
	/* return filter(vacancies, v => {
		return (~indexOf(v, search) && v.status === status);
	}).slice((page * limitRows), (page * limitRows + limitRows))
	.sort((f, s) => {
		if (orderedByTitle){
			if (f.title < s.title){
				return -1;
			}
			if (f.title > s.title){
				return 1;
			}
		}
		return 0;
	})
	.sort((f, s) => {
		if (orderedByStatus){
			if (f.status < s.status){
				return -1;
			}
			if (f.status > s.status){
				return 1;
			}
		}
		return 0;
	});*/
	return sliceVacancies;
}

function mockVacancies(){
	function getStatus(id){
		if ((id % 3) === 0) {
			return 'active';
		}
		if ((id % 2) === 0){
			return 'opened';
		}
		return 'closed';
	}
	
	const outVacancies = [];

	for (let i = 0; i < vacanciesCount; i++) {
		const candidates = [];
		const comments = [];
		const vacancyCommentsCount = 5;
		const candidatesCount = 4;
		
		for (let j = 0; j < candidatesCount; j++) {
			const candidateComments = [];
			const candidateCommentsCount = 6;
			
			for (let jj = 0; jj < candidateCommentsCount; jj++){
				candidateComments.push({
					id: jj,
					fullname: 'Fullname who pass a comment',
					date: new Date(),
					comment: `Comment for candidate ${j}\r\n
						Comment for candidate ${j}\r\nComment for candidate ${j}
						Comment for candidate ${j}\r\n\Comment for candidate ${j}\r\n\Comment for candidate ${j}
						Comment for candidate ${j}\r\n\Comment for candidate ${j}\r\n\Comment for candidate ${j}
						Comment for candidate ${j}\r\n\Comment for candidate ${j}\r\n\Comment for candidate ${j}
						Comment for candidate ${j}\r\n\Comment for candidate ${j}\r\n\Comment for candidate ${j}`
				});
			}
			candidates.push({
				id: j,
				fullname: `Candidate ${i}/${j}`,
				cvPath: '#',
				dateResponse: new Date(),
				dateInterview: new Date(),
				dateInvitation: new Date(),
				comments: candidateComments
			});
		}
		for (let k = 0; k < vacancyCommentsCount; k++) {
			comments.push({
				id: k,
				fullname: `Who comment ${i}/${k}`,
				comment: 'Comment'
			});
		}
		outVacancies.push({
			id: i,
			title: `Vacancy ${numberToWords.toWords(i)}`,
			status: getStatus(i),
			date: new Date(),
			candidates,
			comments
		});
	}
	return outVacancies;
}

const vacancies = mockVacancies();

export function getMockVacancies(search, page, status, orderedByTitle, orderedByStatus){
	return filterVacancies(vacancies, search, page, status, orderedByTitle, orderedByStatus).map(v => {
		return {
			id: v.id,
			title: v.title,
			status: v.status,
			date: v.date,
			candidatesCount: v.candidates.length,
			commentsCount: v.comments.length
		};
	});
}

export function getMockVacancy(vacancyId){
	const vacancy = vacancies.filter(v => v.id.toString() === vacancyId.toString())[0];
	if (vacancy){
		const candidates = vacancy.candidates.map(c => {
			return {
				id: c.id,
				fullname: c.fullname,
				cvPath: c.cvPath,
				dateResponse: c.dateResponse,
				dateInterview: c.dateInterview,
				dateInvitation: c.dateInvitation,
				commentsCount: c.comments.length
			};
		});
		return {
			id: vacancy.id,
			title: vacancy.title,
			status: vacancy.status,
			date: vacancy.date,
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
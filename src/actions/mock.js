import numberToWords from 'number-to-words';

function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
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
	const vacanciesCount = getRandomArbitrary(1, 100);

	for (let i = 0; i < vacanciesCount; i++) {
		const candidates = [];
		const comments = [];
		const vacancyCommentsCount = getRandomArbitrary(0, 5);
		const candidatesCount = getRandomArbitrary(0, 5);
		
		for (let j = 0; j < candidatesCount; j++) {
			const candidateComments = [];
			const candidateCommentsCount = getRandomArbitrary(0, 5);
			
			for (let jj = 0; jj < candidateCommentsCount; jj++){
				candidateComments.push({
					id: jj,
					fullname: 'Fullname who pass a comment',
					comment: `Comment for candidate ${j}`
				});
			}
			candidates.push({
				id: j,
				fullname: `Candidate ${i}/${j}`,
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
			title: numberToWords.toWords(i),
			status: getStatus(i),
			date: new Date(),
			candidates,
			comments
		});
	}
	return outVacancies;
}

const vacancies = mockVacancies();

export function getMockVacancies(){
	return vacancies.map(v => {
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
	return vacancies.filter(v => v.id.toString() === vacancyId.toString())[0];
}

export function getMockCandidate(vacancyId, candidateId){
	const vacancy = vacancies.filter(v => v.id.toString() === vacancyId.toString())[0];
	if (vacancy){
		return vacancy.candidates.filter(c => c.id.toString() === candidateId.toString())[0];
	}
	return null;
}
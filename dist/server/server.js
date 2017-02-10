function __isConnectOpen(connection){
	return (connection != undefined && connection != null) && connection.state != null && connection.state != 0;
}

function __closeConnect(connection){
	if ((connection != undefined && connection != null)  && __isConnectOpen(connection)){
		connection.Close();
	}
}

function __connect(){
	var newConnect = new ActiveXObject("ADODB.Connection");
	newConnect.Open("Driver={SQL Server};Server=supsql;Database=Estaff;Uid=edu;password=Qwer12345");
	return newConnect;
}

function __fetchData(recordSet){
	var arrResult = Array();
	
	if(!recordSet.EOF)
	{
		recordSet.MoveFirst();
		while (!recordSet.EOF)
		{
			newObj = new Object();
			for (i=0; i < recordSet.Fields.Count; i++) {
				newObj.SetProperty(StrLowerCase(recordSet.Fields.Item(i).Name), recordSet.Fields.Item(i).Value);
			}
			arrResult.push(newObj);
			recordSet.MoveNext();
		}
	}
	return arrResult;
}

function _toJSON(obj){
	return tools.object_to_text(obj, 'json');
}

function _vacanciesCount(connection, search, states, limitRows){
	var query = "
		select 
		COUNT(*)/"+limitRows+" pages_count,
		COUNT(*) count 
	from 
		vacancies 
	where 
		vacancies.state_id in ('" + states + "') and 
		vacancies.name LIKE '%" + search + "%'";
	var recordSet = connection.Execute(query);
	return __fetchData(recordSet)[0];
}

function _vacancies(connection, userHexId, search, page, states, order, limitRows){
	var orders = order.split(':');
	var query = "
	select
		top 15
		v.id,
		REPLACE(v.name, '\"', '') as name,
		v.state_id,
		v.start_date,
		v.candidates_count
		
		from (
			select ROW_NUMBER() OVER(ORDER BY vacancies." + orders[0] + " " + orders[1] + ") rowNum, 
			vacancies.id,
			vacancies.candidates_num as candidates_count,
			vacancies.name,
			vacancies.state_id,
			vacancies.start_date
			
			from vacancies 
			inner join persons p on p.id = vacancies.rr_persons.value('(rr_persons/rr_person/person_id)[1]','varchar(max)')
			where 
				vacancies.name LIKE '%" + search + "%'
				and vacancies.state_id in ('" + states + "')
				and p.eid is not null
				and p.eid <> ''
				and p.eid = '" + userHexId + "'
		) v
		where 
			v.rowNum > " + page * limitRows;
	var recordSet = connection.Execute(query);
	return __fetchData(recordSet);
}

function _vacancyStates(connection){
	var query = "
		select vs.id as payload, vs.name as text,	
		case
			when vs.text_color = '' then '128,128,128'
			when vs.text_color <> '' then vs.text_color
		end color

		from vacancy_states vs
		where vs.is_active = 1";
	
	var recordSet = connection.Execute(query);
	return __fetchData(recordSet);
}

function _vacancy(connection, vacancyId){
	var vacancyQuery = "
		select v.id, v.name, v.state_id, v.start_date
		from vacancies v 
		where v.id = " + vacancyId;
	var vacancyRecordSet = connection.Execute(vacancyQuery);
	var vacancyData = __fetchData(vacancyRecordSet)[0];
	if (vacancyData != undefined){
		var candidatesQuery = "
			select c.id, c.fullname, c.state_id, 
			(select COUNT(e.id) from events e where e.candidate_id = c.id) as comments_count 
			from candidates c 
			where c.id in 
			(select DISTINCT(e.candidate_id) from events e 
			where e.vacancy_id = " + vacancyData.id + ")";
		var candidatesRecordSet = connection.Execute(candidatesQuery);
		var candidatesData = __fetchData(candidatesRecordSet);
		return {
			id: vacancyData.id,
			name: vacancyData.name,
			state_id: vacancyData.state_id,
			vacancyStates: _vacancyStates(connection),
			candidateStates: _candidateStates(connection),
			start_date: vacancyData.start_date,
			candidates: candidatesData
		}
	}
	return null;
}

function _candidateStates(connection){
	var query = "
		select cs.id as payload, cs.name as text,
		case
			when cs.text_color = '' then '128,128,128'
			when cs.text_color = 'black' then '68,68,68'
			when cs.text_color <> '' then cs.text_color
		end color
		from candidate_states cs";
	var recordSet = connection.Execute(query);
	return __fetchData(recordSet);
}

function _candidateResume(connection, attachmentId){
	var query = "select lf.data from [(spxml_large_fields)] lf where lf.id = " + attachmentId;
	var recordSet = connection.Execute(query);
	return __fetchData(recordSet)[0];
}

function _candidate(connection, vacancyId, candidateId){
	
	function _candidateAttachmentId(attachmentsStr){
		
		function selectByKey(arr, key, value){
			var outArr = [];
			for (elem in arr){
				if ((el = elem.OptChild(key)) != undefined && el.Value == value){
					outArr.push(elem);
				}
			}
			return outArr;
		}
		
		try {
			var doc = OpenDocFromStr('<root>' + attachmentsStr + '</root>');
			var resumeTypedAttaches = selectByKey(doc.TopElem.attachments, "type_id", "resume");
			var len = resumeTypedAttaches.length;
			if (len > 0){
				var elem = resumeTypedAttaches[len - 1].text.OptAttrValue("EXT-OBJECT-ID", 'null');
				return elem == 'null' ? null : Int(elem);
			}
		} catch(e){
			return null;
		}
		return null;
	}
	
	var candidateQuery = "
		select c.id, c.fullname, c.state_id, c.attachments 
		from candidates c
		where c.id = " + candidateId;
	var candidateRecordSet = connection.Execute(candidateQuery);
	var candidateData = __fetchData(candidateRecordSet)[0];
	if (candidateData != undefined){
		var commentsQuery = "
			select e.id, u.fullname, e.date, e.comment,
			case 
				when e.occurrence_id = '' then e.type_id
				when e.occurrence_id <> '' then e.type_id + ':' + e.occurrence_id
			end state_id
			from events e
			inner join users u on u.id = e.user_id
			inner join candidates c on c.id = e.candidate_id
			where e.vacancy_id = " + vacancyId + "
			and e.candidate_id = " + candidateId;
		var commentsRecordSet = connection.Execute(commentsQuery);
		var commentsData = __fetchData(commentsRecordSet);
		var candidateStates = _candidateStates(connection);
		return {
			id: candidateData.id,
			fullname: candidateData.fullname,
			state_id: candidateData.state_id,
			attachment_id: _candidateAttachmentId(candidateData.attachments),
			comments: commentsData,
			states: candidateStates,
			boss_state_id: 'test'
		}
	}
	return null;
}

function _bossCommentForCandidate(){
	
}

function getAccess(){
	return { access: true };
}

function getVacancies(queryObjects){
	var DEFAULT_LIMIT_ROWS = 15;
	var connection = null;
	try {
		connection = __connect();
		var vacancyStates = _vacancyStates(connection);
		
		var search = queryObjects.HasProperty('search') ? queryObjects.search : '';
		var page = queryObjects.HasProperty('page') ? queryObjects.page : 0;
		var states = 
			queryObjects.HasProperty('states') ? 
			(queryObjects.states == 'all' ?
			ArrayMerge(vacancyStates, 'This.payload', '\',\'') :
			queryObjects.states) :
			ArrayMerge(vacancyStates, 'This.payload', '\',\'');
		
		var order = queryObjects.HasProperty('order') ? queryObjects.order : 'name:asc';
		var limitRows = queryObjects.HasProperty('limit_rows') ? queryObjects.limit_rows : DEFAULT_LIMIT_ROWS;
		
		var vacanciesCount = _vacanciesCount(connection, search, states, limitRows);
		//var vc = _vacancies(connection, search, page, status, orderedByTitle, orderedByStatus, limitRows);
		//alert('vacancies: ' + _toJSON(vc));
		alert(_toJSON({
			vacancies: _vacancies(connection, '0x36726E0B10161F00', search, page, states, order, limitRows),
			pages_count: vacanciesCount.pages_count,
			count: vacanciesCount.count,
			states: vacancyStates
		}));
	} catch (e){
		if (connection != null){
			__closeConnect(connection);
		}
		alert(e);
	}
}

function getVacancy(queryObjects){
	var vacancyId = queryObjects.HasProperty('vacancy_id') ? queryObjects.vacancy_id : null;
	var connection = null;
	
	try {
		if (vacancyId == null){
			throw "Неверные входные данные!";
		}
		connection = __connect();
		var vacancy = _vacancy(connection, vacancyId);
		alert(_toJSON(vacancy));
	} catch (e){
		if (connection != null){
			__closeConnect(connection);
		}
		alert(e);
	}
}

function getCandidate(queryObjects){
	var vacancyId = queryObjects.HasProperty('vacancy_id') ? queryObjects.vacancy_id : null;
	var candidateId = queryObjects.HasProperty('candidate_id') ? queryObjects.candidate_id : null;
	var connection = null;
	
	try {
		if (vacancyId == null || candidateId == null){
			throw "Неверные входные данные!";
		}
		connection = __connect();
		var candidate = _candidate(connection, vacancyId, candidateId);
		alert(_toJSON(candidate));
	} catch (e){
		if (connection != null){
			__closeConnect(connection);
		}
		alert(e);
	}
}

function getCandidateResume(queryObjects){
	var attachmentId = queryObjects.HasProperty('attachment_id') ? queryObjects.attachment_id : null;
	var connection = null;
	try {
		if (attachmentId == null){
			throw "Неверные входные данные!";
		}
		connection = __connect();
		var resume = _candidateResume(connection, attachmentId);
		
		var fileData = LoadFileData(ROOT_DIRECTORY + '\\'+ curUserID+'\\'+ fileName);
		Request.RespContentType = 'text/html';
		Request.AddRespHeader("Content-Disposition","attachment; filename=resume.html");
		return fileData;
	} catch(e){
		if (connection != null){
			__closeConnect(connection);
		}
		alert(e);
	}
}

function updateBossCommentForCandidate(queryObjects){
	var connection = null;
	try {
		var data = tools.read_object(queryObjects.Body);
		var vacancyId = data.HasProperty('vacancy_id') ? data.vacancy_id : null;
		var candidateId = data.HasProperty('candidate_id') ? data.candidate_id : null;
		var comment = data.HasProperty('comment') ? data.comment : null;
		
		if (vacancyId == null || candidateId == null || comment == null){
			throw "Неверные входные данные!";
		}
		connection = __connect();
	} catch (e){
		if (connection != null){
			__closeConnect(connection);
		}
		alert(e);
	}
}

getVacancies({});
getVacancy({vacancy_id: 20687982340604723});
getCandidate({vacancy_id: 5617996101482139474, candidate_id: 1193842844893290933});
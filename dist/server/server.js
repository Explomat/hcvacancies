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

function _vacanciesCount(connection, search, status, limitRows){
	var query = "
		select 
		COUNT(*)/"+limitRows+" pages_count,
		COUNT(*) count 
	from 
		vacancies 
	where 
		vacancies.state_id in ('" + status + "') and 
		vacancies.name LIKE '%" + search + "%'";
	var recordSet = connection.Execute(query);
	return __fetchData(recordSet)[0];
}

function _vacancies(connection, search, page, status, order, limitRows){
	var orders = order.split(':');
	var query = "
		select vs.* from (select 
		top " + limitRows + " CONVERT(BIGINT, v.id) as id,
		REPLACE(v.title, '\"', '') as title,
		v.status,
		v.date,
		(select COUNT(DISTINCT(e.candidate_id)) from events e where e.vacancy_id = v.id) candidates_count
	from (
		select ROW_NUMBER() OVER(ORDER BY vacancies.name) rowNum, 
		vacancies.id,
		vacancies.name as title,
		vacancies.state_id as status,
		vacancies.start_date as date
		
		from vacancies 
		where 
		vacancies.name LIKE '%"+search+"%' and 
		vacancies.state_id in ('" + status + "')
	) v
	where 
		v.rowNum > " + page * limitRows + ") vs 
	order by vs." + orders[0] + " " + orders[1];
	
	var recordSet = connection.Execute(query);
	return __fetchData(recordSet);
}

function _vacancyStatuses(connection){
	var query = "
		select vs.id, vs.name,	
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
		select v.id, v.name as title, v.state_id as status, v.start_date as date
		from vacancies v 
		where v.id = " + vacancyId;
	var vacancyRecordSet = connection.Execute(vacancyQuery);
	var vacancyData = __fetchData(vacancyRecordSet)[0];
	if (vacancyData != undefined){
		var candidatesQuery = "
			select c.id, c.fullname, c.state_id, c.attachments, 
			(select COUNT(e.id) from events e where e.candidate_id = c.id) as comments_count 
			from candidates c 
			where c.id in 
			(select DISTINCT(e.candidate_id) from events e 
			where e.vacancy_id = " + vacancyData.id + ")";
		var candidatesRecordSet = connection.Execute(candidatesQuery);
		var candidatesData = __fetchData(candidatesRecordSet);
		return {
			id: vacancyData.id,
			title: vacancyData.title,
			status: vacancyData.status,
			statuses: _vacancyStatuses(connection),
			date: vacancyData.date,
			candidates: candidatesData
		}
	}
	return null;
}

function _candidateStatuses(connection){
	var query = "
		select cs.id, cs.name,
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
		select c.id, c.fullname, c.state_id as status, c.attachments 
		from candidates c
		where c.id = " + candidateId;
	var candidateRecordSet = connection.Execute(candidateQuery);
	var candidateData = __fetchData(candidateRecordSet)[0];
	if (candidateData != undefined){
		var commentsQuery = "
			select e.id, u.fullname, e.date, e.type_id as status, e.comment from events e
			inner join users u on u.id = e.user_id
			where e.vacancy_id = " + vacancyId + "
			and e.candidate_id = " + candidateId;
		var commentsRecordSet = connection.Execute(commentsQuery);
		var commentsData = __fetchData(commentsRecordSet);
		var candidateStatuses = _candidateStatuses(connection);
		return {
			id: candidateData.id,
			fullname: candidateData.fullname,
			status: candidateData.status,
			attachment_id: _candidateAttachmentId(candidateData.attachments),
			comments: commentsData,
			statuses: candidateStatuses
		}
	}
	return null;
}

function getVacancies(queryObjects){
	var DEFAULT_LIMIT_ROWS = 15;
	try {
		var connection = __connect();
		var vacancyStatuses = _vacancyStatuses(connection);
		
		var search = queryObjects.HasProperty('search') ? queryObjects.search : '';
		var page = queryObjects.HasProperty('page') ? queryObjects.page : 1;
		var status = 
			queryObjects.HasProperty('status') ? 
			(queryObjects.status == 'all' ?
			ArrayMerge(vacancyStatuses, 'This.id', '\',\'') :
			queryObjects.status) :
			ArrayMerge(vacancyStatuses, 'This.id', '\',\'');
		
		var order = queryObjects.HasProperty('order') ? queryObjects.order : 'title:asc';
		var limitRows = queryObjects.HasProperty('limit_rows') ? queryObjects.limit_rows : DEFAULT_LIMIT_ROWS;
		
		var vacanciesCount = _vacanciesCount(connection, search, status, limitRows);
		//var vc = _vacancies(connection, search, page, status, orderedByTitle, orderedByStatus, limitRows);
		//alert('vacancies: ' + _toJSON(vc));
		alert(_toJSON({
			vacancies: _vacancies(connection, search, page, status, order, limitRows),
			pages_count: vacanciesCount.pages_count,
			count: vacanciesCount.count,
			statuses: vacancyStatuses
		}));
	} catch (e){
		
		alert(e);
	} finally{
		__closeConnect(connection);
	}
}

function getVacancy(queryObjects){
	var vacancyId = queryObjects.HasProperty('vacancy_id') ? queryObjects.vacancy_id : null;
	
	try {
		if (vacancyId == null){
			throw "Неверные входные данные!";
		}
		var connection = __connect();
		var vacancy = _vacancy(connection, vacancyId);
		alert(_toJSON(vacancy));
	} catch (e){
		alert(e);
	} finally {
		__closeConnect();
	}
}

function getCandidateResume(queryObjects){
	var attachmentId = queryObjects.HasProperty('attachment_id') ? queryObjects.attachment_id : null;
	try {
		if (attachmentId == null){
			throw "Неверные входные данные!";
		}
		var connection = __connect();
		var resume = _candidateResume(connection, attachmentId);
		
		var fileName = queryObjects.file_name;
		var fileData = LoadFileData(ROOT_DIRECTORY + '\\'+ curUserID+'\\'+ fileName);
		Request.RespContentType = 'application/pdf';
		Request.AddRespHeader("Content-Disposition","attachment; filename=" + fileName);
		return fileData;
	} catch(e){
		alert(e);
	} finally {
		__closeConnect();
	}
}

function getCandidate(queryObjects){
	var vacancyId = queryObjects.HasProperty('vacancy_id') ? queryObjects.vacancy_id : null;
	var candidateId = queryObjects.HasProperty('candidate_id') ? queryObjects.candidate_id : null;
	
	try {
		if (vacancyId == null || candidateId == null){
			throw "Неверные входные данные!";
		}
		var connection = __connect();
		var candidate = _candidate(connection, vacancyId, candidateId);
		alert(_toJSON(candidate));
	} catch (e){
		alert(e);
	} finally {
		__closeConnect();
	}
}

//getVacancies({});
//getVacancy({vacancy_id: 20687982340604723});
getCandidate({vacancy_id: 5617996101482139474, candidate_id: 1193842844893290933});
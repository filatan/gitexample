var API_BASE_URL = "https://api.github.com";
var USERNAME = "filatan"
var PASSWORD = "7mirntoum";

$("#button_get_repos").click(function(e) {
	e.preventDefault();
	getRepos();
});

$.ajaxSetup({
    headers: { 'Authorization': "Basic "+ btoa(USERNAME+':'+PASSWORD) }
});

$("#button_get_repo").click(function(e) {
	e.preventDefault();
	getRepo($("#repository_name").val());
});

$("#button_del_repo").click(function(e) {
	e.preventDefault();
	delRepo($("#repository_name_to_delete").val());
});


$("#button_get_repo_to_edit").click(function(e) {
	e.preventDefault();
	getRepoToEdit($("#repository_name_get_to_edit").val());
});


$("#button_edit_repo").click(function(e) {
	e.preventDefault();

	var newRepo = new Object();
	newRepo.name = $("#repository_name_to_edit").val()
	newRepo.description = $("#description_to_edit").val()

	EditRepo(newRepo);
});

$("#button_to_create").click(function(e) {
	e.preventDefault();

    var newRepo = new Object();
	newRepo.name = $("#repository_name_to_create").val();
	newRepo.description = $("#description_to_create").val();
 	newRepo.homepage = "https://github.com";
 	newRepo.private = false;
	newRepo.has_issues = true;
	newRepo.has_wiki = true;
	newRepo.has_downloads = true;

	createRepo(newRepo);
});
function getRepos() {
	var url = API_BASE_URL + '/users/' + $("#username").val() + '/repos';


	$("#repos_result").text("");
	
	
	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {
				var repos = data;
				
				$.each(repos, function(i, v) {
					var repo = v;
					$('<h4> Name: ' + repo.name + '</h4>').appendTo($('#repos_result'));
					$('<p>').appendTo($('#repos_result'));	
					$('<strong> ID: </strong> ' + repo.id + '<br>').appendTo($('#repos_result'));
					$('<strong> URL: </strong> ' + repo.html_url + '<br>').appendTo($('#repos_result'));
					$('</p>').appendTo($('#repos_result'));
				});
				

	}).fail(function() {
		$("#repos_result").text("No repositories.");
	});

}

function getRepo(repository_name) {
	var url = API_BASE_URL + '/repos/' + USERNAME + '/' + repository_name;
	$("#get_repo_result").text('');

	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {

				var repo = data;

				$("#get_repo_result").text('');
				$('<h4> Name: ' + repo.name + '</h4>').appendTo($('#get_repo_result'));
				$('<p>').appendTo($('#get_repo_result'));	
				$('<strong> ID: </strong> ' + repo.id + '<br>').appendTo($('#get_repo_result'));
				$('<strong> URL: </strong> ' + repo.html_url + '<br>').appendTo($('#get_repo_result'));
				$('<strong> Description: </strong> ' + repo.description + '<br>').appendTo($('#get_repo_result'));
				$('</p>').appendTo($('#get_repo_result'));

			}).fail(function() {
				$('<div class="alert alert-danger"> <strong>Oh!</strong> Repository not found </div>').appendTo($("#get_repo_result"));
	});

}

function delRepo(name_repository) {
	var url = API_BASE_URL + '/repos/' + USERNAME + '/'+ name_repository;
	$("#repos_result").text('');
	
	$.ajax({
		url : url,
		type : 'DELETE',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {
				$('<div class="alert alert-success"> <strong>Ok!</strong> Repository deleted</div>').appendTo($("#delete_repo_result"));	
				
	
	
	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Oh!</strong> Error </div>').appendTo($("#delete_repo_result"));;
	});
	}
	

function getRepoToEdit(repository_name) {
	var url = API_BASE_URL + '/repos/' + USERNAME + '/' + repository_name;

	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {
		
				var repo = data;
				

				$("#update_result").text('');
				$("#repository_name_to_edit").val(repo.name);
				$("#description_to_edit").val(repo.description);

	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Oh!</strong> Repository not found </div>').appendTo($("#update_result"));
	});

}

function EditRepo(repository) {
	var url = API_BASE_URL + '/repos/' + USERNAME + '/' + repository.name;
	var data = JSON.stringify(repository);

	$("#update_result").text('');

	$
			.ajax(
					{
						url : url,
						type : 'PATCH',
						crossDomain : true,
						dataType : 'json',
						data : data,
						statusCode : {
							404 : function() {
								$(
										'<div class="alert alert-danger"> <strong>Oh!</strong> Page not found </div>')
										.appendTo($("#update_result"));
							}
						}
					})
			.done(
					function(data, status, jqxhr) {
						$(
								'<div class="alert alert-success"> <strong>Ok!</strong> Repository Updated</div>')
								.appendTo($("#update_result"));
					})
			.fail(
					function() {
						$(
								'<div class="alert alert-danger"> <strong>Oh!</strong> Error </div>')
								.appendTo($("#update_result"));
					});

}

function createRepo(repository) {
	var url = API_BASE_URL + '/user/repos';
	var data = JSON.stringify(repository);

	$("#create_result").text('');

	$.ajax({
		url : url,
		type : 'POST',
		crossDomain : true,
		dataType : 'json',
		data : data,
	}).done(function(data, status, jqxhr) {
		$('<div class="alert alert-success"> <strong>Ok!</strong> Repository Created</div>').appendTo($("#create_result"));				
  	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Oh!</strong> Error </div>').appendTo($("#create_result"));
	});

}

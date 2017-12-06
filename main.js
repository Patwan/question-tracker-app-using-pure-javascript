document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function saveIssue(e) {
  //Retrieve all the value of inputs from the form
  var issueDesc = document.getElementById('issueDescInput').value;
  var issueSeverity = document.getElementById('issueSeverityInput').value;
  var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
  var issueId = chance.guid();
  var issueStatus = 'Open';

  //Put all the input values into one object
  var issue = {
    id: issueId,
    description: issueDesc,
    severity: issueSeverity,
    assignedTo: issueAssignedTo,
    status: issueStatus
  }

  //Checks to make sure localStorage is empty
  if (localStorage.getItem('issues') == null) {
    //Initialize an empty array
    var issues = [];
    //Push ino the array our issue object
    issues.push(issue);
    /*The setItem() method of the Storage interface, when passed a key name and value, 
    will add that key to the storage, or update that key's value if it already exists*/
    localStorage.setItem('issues', JSON.stringify(issues));
  } 
  //if local storage is NOT empty
  else {
    /*Get all the items from localStorage and convert into an array using JSON.parse 
    then store in a variable called issues */ 
    var issues = JSON.parse(localStorage.getItem('issues'));
    //Push into the array the issue object
    issues.push(issue);
    //Store in Local storage
    localStorage.setItem('issues', JSON.stringify(issues));
  }

  //Resets everything in the form after storage
  document.getElementById('issueInputForm').reset();

  /*We call this function after a new issue is created so that a new list 
  can be regetrated*/
  fetchIssues();

  //Prevents the form from submitting the values
  //e is the event
  e.preventDefault();
}

//Function for close button
function setStatusClosed(id) {
  var issues = JSON.parse(localStorage.getItem('issues'));

  for (var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues[i].status = 'Closed';
    }
  }
  //Resave it back to local storage since we made changes
  localStorage.setItem('issues', JSON.stringify(issues));
  //WE then call fetchIssues since we would like to update our output
  fetchIssues();
}

//Function to delete an issue
function deleteIssue(id) {
  var issues = JSON.parse(localStorage.getItem('issues'));

  for (var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      //Removes the current item using the splice method
      issues.splice(i, 1);
    }
  }

  localStorage.setItem('issues', JSON.stringify(issues));

  fetchIssues();
}

function fetchIssues() {
  var issues = JSON.parse(localStorage.getItem('issues'));
  var issuesList = document.getElementById('issuesList');

  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    var id = issues[i].id;
    var desc = issues[i].description;
    var severity = issues[i].severity;
    var assignedTo = issues[i].assignedTo;
    var status = issues[i].status;

    issuesList.innerHTML +=   '<div class="well">'+
                              '<h6>Issue ID: ' + id + '</h6>'+
                              '<p><span class="label label-info">' + status + '</span></p>'+
                              '<h3>' + desc + '</h3>'+
                              '<p><span class="glyphicon glyphicon-time"></span> ' + severity + '</p>'+
                              '<p><span class="glyphicon glyphicon-user"></span> ' + assignedTo + '</p>'+
                              '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning">Close</a> '+
                              '<a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a>'+
                              '</div>';
  }
}

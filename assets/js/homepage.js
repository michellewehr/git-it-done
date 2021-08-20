var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
//reference right column showing repos for: #repo-search-term and div with #repos-container/ class list-group
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

//submit form handling function
var formSubmitHandler = function(event) {
    //prevent default prevents the browswer from sending hte forms input data to a url as we'll handle what happens with the form input data oursleves in js
    event.preventDefault();
    // get value from input element
    var username = nameInputEl.value.trim();

    //get value from input element
    if(username) {
        //get username to pass into getuserrepos funciton
        getUserRepos(username);
        //clear out input field on search by user card 
        nameInputEl.value = "";
    } else {
        alert("Please enter a GitHubt username");
    }
}

//when click submit button for search by usernmae
userFormEl.addEventListener("submit", formSubmitHandler);

//response object in fetch logic has method called json() this method formats the response as json but sometimes a resource may return non-json data. in those cases a different method like text() would be used
//json method returns another promise- hence the extra then() method whos callback function captured actual data
  //(outside is console logged first before the fetch() response because asynchronus and takes longer to do fetch response so keeps running and comes back to it)=> referred to as AJAX = asynchronous javascript and xml=> xml = term refers to old fashioned way of formatting data- replaced by JSON
var getUserRepos = function (user) {
    //format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    //make a request to the url
    fetch(apiUrl).then(function(response){
        //if no 404 error/ response.ok = successful, if not alert if there is a 404 error
        if(response.ok) {
            response.json().then(function(data) {
                displayRepos(data, user);
            });
        } else {
            alert("Error: GitHub User Not Found");
        }
    })
        .catch(function(error) {
            //notice this '.catch()' getting chainged onto the end of the '.then() method
            alert("Unable to connect to GitHub");
        });
    }


//function to display repos
var displayRepos = function(repos, searchTerm) {
    //check if api returned any repos
    if(repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }
   repoContainerEl.textContent = "";
   repoSearchTerm.textContent = searchTerm;
   //loop over repos
   for (var i = 0; i < repos.length; i++) {
       //format repo name
       var repoName = repos[i].owner.login + "/" + repos[i].name;

       //create a container for each repo
       var repoEl = document.createElement("a");
       repoEl.classList = "list-item flex-row justify-space-between align-center";
       repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

       //create a span element to hold repository name
       var titleEl = document.createElement("span");
       titleEl.textContent = repoName;

    // create a status element
    var statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";

    // check if current repo has issues or not
    if (repos[i].open_issues_count > 0) {
    statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
    } else {
    statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

       //append to conatiner
       repoEl.appendChild(titleEl);
       //append container to the dom
       repoContainerEl.appendChild(repoEl);
       //append status/ open issues to container
       repoEl.appendChild(statusEl);
   }
}


getUserRepos();
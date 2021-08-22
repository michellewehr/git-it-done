var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");
var repoNameEl = document.querySelector("#repo-name");

//get repo name function 
var getRepoName = function() {
    // search is js t property allows you to read the current page’s query string
    // .search = returns something like ?q=hello.
    var queryString = document.location.search;
    //^^ = "?repo=michellewehr/git-it-done"
    //split() @ "=" and get the 2nd half of string @ index 1
    var repoName = queryString.split("=")[1];
    // console.log(repoName); "michellewehr/git-it-done"

    if(repoName) {
        repoNameEl.textContent = repoName;
        //pass repoName into get repo issues funciton call
        getRepoIssues(repoName);
    }
    //if not a repoName existing then return to homepage
    else {
        document.location.replace("./index.html");
    }
   
}
var displayWarning = function(repo) {
    //add text to warning container
    limitWarningEl.textContent = "To see more than 30 issues, visit "; 
    
    var linkEl = document.createElement("a");
    linkEl.textContent = "See More Issues on GitHub.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");
    //append to warning container
    limitWarningEl.appendChild(linkEl);
   
}

var getRepoIssues = function(repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    fetch(apiUrl).then(function(response) {
        //response was successful
        if(response.ok) {
            //pass response data to dom function
            response.json().then(function(data) {
                displayIssues(data);
                if(response.headers.get("Link")) {
                    displayWarning();
                }
            });

        } else {
           //if not successful, redirect to homepage
           document.location.replace("./index.html");
        }
    })
};

var displayIssues = function(issues) {
    if(issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
    }
    for (var i = 0; i < issues.length; i++) {
        //create a link element to take users to the issue on github
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");

        //create span to hold issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        //append to container
        issueEl.appendChild(titleEl);

        //create a type element
        var typeEl = document.createElement("span");

        //check if issue is an actual issue or a pull request
        if(issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        } else {
            typeEl.textContent = "(Issue)";
        }

        //append to container
        issueEl.appendChild(typeEl);
        issueContainerEl.appendChild(issueEl);

    
    }
}

getRepoName();
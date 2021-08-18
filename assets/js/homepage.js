var getUserRepos = function (user) {
    //format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    //make a request to the url
    fetch(apiUrl).then(function(response){
        //response object in fetch logic has method called json() this method formats the response as json but sometimes a resource may return non-json data. in those cases a different method like text() would be used
        //json method returns another promise- hence the extra then() method whos callback function captured actual data
        response.json().then(function(data) {
            console.log(data);
        })
    });
};

//(outside is console logged first before the fetch() response because asynchronus and takes longer to do fetch response so keeps running and comes back to it)=> referred to as AJAX = asynchronous javascript and xml=> xml = term refers to old fashioned way of formatting data- replaced by JSON
getUserRepos("michellewehr");
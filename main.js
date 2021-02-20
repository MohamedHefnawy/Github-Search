let search = document.querySelector('.input .search-box');
let searchBtn = document.querySelector("body button");
let menu = document.querySelector("menu li");
search.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        if (search.value.trim() != 0) {
            getResults(search.value);
            console.log(search.value);
        } else {
            console.log('else');
            alert('you have to enter something ');
        }
    }
}

searchBtn.onclick = () => {

    if (search.value.trim() != 0) {
        getResults(search.value);
        console.log(search.value);
    } else {
        console.log('else');
        alert('you have to enter something ');
    }
}

function getResults(query) {

    console.log(query);
    fetch(`https://api.github.com/users/${query}`)
        .then(res => {
            return res.json();
        }).then(data => displatResults(data));

};


function displatResults(res) {
    if (res.message == "Not Found") {
        alert(' unkown user');

    } else {

        let userinfo = document.querySelector('.userinfo ');
        userinfo.innerHTML = `<h1> UserName: ${res.login} </h1>`;

        let avatarurl2 = document.querySelector('.avatarurl');
        avatarurl2.innerHTML = `<img src="${res.avatar_url}" width="150" height="150" alt="Avatar" style="border-radius: 50%;"/>`;

        let repos = document.querySelector('.repo');
        repos.innerHTML = `<h3> publicRepos : ${res.public_repos} </h3>`;

        document.querySelector('.followers').innerHTML = `<h3> followers: ${res.followers} </h3>`;

        document.querySelector('.following').innerHTML = `<h3> following: ${res.following} </h3>`;
        document.querySelector('.public_gists').innerHTML = `<h3> public_gists: ${res.public_gists} </h3>`;
        document.querySelector('.container .button1').innerHTML = `<input type="button" class="btn1" style="background-color: black; color:white; cursor: pointer;" onclick="window.location.href= '${res.html_url}';" value="Visit GetHub profile" />
    `;
    }
}
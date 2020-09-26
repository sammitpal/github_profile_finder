const URL = "https://api.github.com/users/";
const form = document.getElementById('form');
const search = document.getElementById('input');
const desc = document.getElementById('desc');
const name = document.getElementById('name');
const image = document.getElementById('myImg');
const company = document.getElementById('company');
const card = document.getElementById('card');
const repo = document.getElementById('repo');
const followers = document.getElementById('followers');
const following = document.getElementById('following');

async function getUser(username) {
    const resp = await fetch(URL + username);
    const respdata = await resp.json();
    console.log(resp);


    userCard(respdata);
    getRepos(username);
}
async function getRepos(username) {

    const resp = await fetch(URL + username + "/repos");
    const respdata = await resp.json();

    addReposToCard(respdata);
}
function userCard(user) {
    name.innerText = user.name;
    desc.innerText = user.bio;
    card.style.display = "block";
    image.style.display = "block";
    image.src = user.avatar_url;
    company.innerText = user.company;
    repo.innerText = "Repositories: " + user.public_repos;
    followers.innerText = "Followers: " + user.followers;
    following.innerText = "Following: " + user.following;
    const card1 = document.getElementById("app");
    card1.innerHTML = `<div id="repos"></div>`
}

function addReposToCard(repos) {
    const reposEl = document.getElementById("repos");
    repos
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 10)
        .forEach((repo) => {
            const repoEl = document.createElement("a");
            repoEl.classList.add("repo");

            repoEl.href = repo.html_url;
            repoEl.target = "_blank";
            repoEl.innerText = repo.name;
            reposEl.appendChild(repoEl);
        });
        
}


form.addEventListener('submit', e => {
    e.preventDefault();
    const user = search.value;
    if (user) {
        getUser(user)
        search.value = "";
    }
})

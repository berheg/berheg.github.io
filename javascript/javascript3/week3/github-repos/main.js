
const usernames = ["benna100", "abedaarabi","aina21","azinkamran", "fatemeh-pakpour", "Laila1222", "berheg"];


function fetchApi(userName) {
  const url = `https://api.github.com/search/repositories?q=user:${userName}`;
  const promise = fetch(url)
    .then(response => response.json())
    .then(json => json.items);

  return promise;
}


function promiseAll() {
  Promise.all(usernames.map(user => fetchApi(user))).then(allRepo => {
    allRepo.forEach(userRepo => {
        renderRepositories(userRepo);
    });
  });
}

function renderRepositories(repos) {
  console.log(repos);
  const ul = document.querySelector("ul.list");
  const user = repos[0].owner.login;
  const userList = createList(ul, `${user}'s repos`);

  ul.appendChild(userList);
  const repoLists = document.createElement("ul");
  repos.forEach(repository => {
    const repoName = `${repository.name}: ${repository.html_url}`;
    createList(repoLists, repoName);
  });
  userList.appendChild(repoLists);
}

function createList(parent, json) {
  const li = document.createElement("li");
  li.innerHTML = json;
  parent.appendChild(li);
  return li;
}
promiseAll();
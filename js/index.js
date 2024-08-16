document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#github-form");
    const userList = document.querySelector("#user-list");
    const reposList = document.querySelector("#repos-list");
  
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const searchQuery = document.querySelector("#search").value;
      searchUsers(searchQuery);
    });
  
    function searchUsers(query) {
      fetch(`https://api.github.com/search/users?q=${query}`)
        .then(response => response.json())
        .then(data => {
          displayUsers(data.items);
        });
    }
  
    function displayUsers(users) {
      userList.innerHTML = ""; // Clear any existing results
      reposList.innerHTML = ""; // Clear any existing repos
      users.forEach(user => {
        const li = document.createElement("li");
  
        const img = document.createElement("img");
        img.src = user.avatar_url;
        img.alt = `${user.login}'s avatar`;
        img.style.width = "50px";
        img.style.height = "50px";
  
        const username = document.createElement("p");
        username.textContent = user.login;
  
        const link = document.createElement("a");
        link.href = user.html_url;
        link.textContent = "View Profile";
        link.target = "_blank";
  
        li.appendChild(img);
        li.appendChild(username);
        li.appendChild(link);
  
        li.addEventListener("click", () => {
          fetchRepos(user.login);
        });
  
        userList.appendChild(li);
      });
    }
  
    function fetchRepos(username) {
      fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(data => {
          displayRepos(data);
        });
    }
  
    function displayRepos(repos) {
      reposList.innerHTML = ""; // Clear any existing repos
      repos.forEach(repo => {
        const li = document.createElement("li");
        li.textContent = repo.name;
        reposList.appendChild(li);
      });
    }
  });
  
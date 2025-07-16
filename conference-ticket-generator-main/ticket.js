const name = localStorage.getItem("name");
console.log(name)
document.getElementById("ticketName").textContent = name;

const email = localStorage.getItem("email")
console.log(email)
document.getElementById("ticketEmail").textContent = email;

const git_id = localStorage.getItem("git_id")
document.getElementById("ticketGit_id").textContent = git_id;
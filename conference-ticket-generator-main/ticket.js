const name = localStorage.getItem("name");
console.log(name)
document.getElementById("ticketName").textContent = name;

const email = localStorage.getItem("email")
console.log(email)
document.getElementById("ticketEmail").textContent = email;

const git_id = localStorage.getItem("git_id")
document.getElementById("ticketGit_id").textContent = git_id;

const timestamp = Date.now(); // milliseconds since Jan 1, 1970
  const random = Math.floor(Math.random() * 1000); // random number 0–999
//   document.getElementById('ticketID').innerHTML = `REG-${timestamp}-${random}`;

document.getElementById('ticketID').textContent = `REG-${timestamp}-${random}`;
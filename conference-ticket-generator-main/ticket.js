const name = localStorage.getItem("name");
console.log(name)
document.getElementById("ticketName").textContent = name;
document.getElementById("ticketName2").textContent = name;

const email = localStorage.getItem("email")
console.log(email)
document.getElementById("ticketEmail").textContent = email;
document.getElementById("ticketEmail").style.color = "hsl(7, 88%, 67%)"
//document.getElementById("ticketEmail2").textContent = email;

const git_id = localStorage.getItem("git_id")
document.getElementById("ticketGit_id").textContent = git_id;

  const avatarImage = localStorage.getItem("avatarImage");
  //console.log(avatarImage)

  if (avatarImage) {
    const img = document.createElement("img");
    img.src = avatarImage;
    img.alt = "Avatar";
    img.classList.add("profile-pic"); // optional styling class
    document.getElementById("ticketAvatar").appendChild(img);
  }

const timestamp = Date.now(); // milliseconds since Jan 1, 1970
  const random = Math.floor(Math.random() * 1000); // random number 0–999
//   document.getElementById('ticketID').innerHTML = `REG-${timestamp}-${random}`;

document.getElementById('ticketID').textContent = `CONF-${timestamp}-${random}`;
//document.getElementById("ticketName").style.color = "red";

const ticketName = document.getElementById("ticketName");
ticketName.style.background = "linear-gradient(to right, #f27d7a, #fddde6, #ffffff)";
ticketName.style.webkitBackgroundClip = "text";
ticketName.style.webkitTextFillColor = "transparent";

// You can encode as plain text or JSON string
const ticketData = {
  name: name,
  email: email,
  git_id: git_id,
  //avatar: avatarImage // Be cautious: base64 avatar is large
};

const qrData = JSON.stringify(ticketData);

new QRCode(document.getElementById("qrcode"), {
  text: qrData,
  width: 70,
  height: 70,
  colorLight: "#ffffff",
  correctLevel: QRCode.CorrectLevel.H 
});

const ticketName2 = document.getElementById("ticketName2")
ticketName2.style.fontSize = "28px"

//document.getElementById("qrcode").style.backgroundColor = "#fff";
//document.getElementById("qrcode").style.padding = "10px";
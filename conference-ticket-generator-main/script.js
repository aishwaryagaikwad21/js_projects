const form = document.getElementById("myForm")

const avatar = document.getElementById("avatar");

const profile = document.querySelector('#upload-icon');

const name = document.getElementById("name")

const submitBtn = document.getElementById("submitBtn")
submitBtn.disabled = true;// can't submit without valid inputs

avatar.addEventListener("input",(e)=>{
    const file = e.target.files[0];
    console.log(file.size)
    const maxSize = 500*1024;
    const fileNameDisplay = document.getElementById("fileName");

  if (file) {
    fileNameDisplay.textContent = `${file.name}`;

    if (file.size > maxSize) {
      e.target.value = ""; // This clears the file input
      alert("File size too large (Max: 500 KB)");
      fileNameDisplay.textContent = "";
      return 
    }
    else{
        profile.innerHTML = ""; //removes the icon
        const reader = new FileReader();
        reader.onload = function () {
            const img = document.createElement("img"); //instead of icon display avatar
            img.src = reader.result;
            img.alt = "Profile Preview";
            img.style.width = "50px";
            img.style.height = "50px";
            img.style.borderRadius = "12px"; 
            img.style.objectFit = "cover";
            profile.appendChild(img);
             localStorage.setItem("avatarImage", reader.result);
            console.log(reader.result)
      };
      reader.readAsDataURL(file);
    }
  } 
  else {
    fileNameDisplay.textContent = "";
  }
})

const email = document.getElementById("email")
let isEmailValid = false

email.addEventListener("input", (e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValue = e.target.value
    if (emailRegex.test(emailValue)) {
        console.log("Valid email");
        console.log(email.value)
        email.style.borderBlockColor = 'green'
        isEmailValid = true
    } else {
        console.log("Invalid email");
        email.style.borderBlockColor = 'red'
        isEmailValid = false
    }
     toggleSubmitButton();
})

const git_id = document.getElementById("git_name")
let isGitValid = false; // Global variable to store validation status

git_id.addEventListener("input",(e) => {
    const githubRegex = /^(?!-)(?!.*--)[a-zA-Z0-9-]{1,39}(?<!-)$/;
    const gitValue = e.target.value

    if (githubRegex.test(gitValue)) {
        console.log("Valid GitHub username");
        git_id.style.borderBlockColor = 'green'
        isGitValid = true;
    } 
    else {
        console.log("Invalid GitHub username");
        git_id.value = "";
        git_id.style.borderBlockColor = 'red'
        isGitValid = false
    }
     toggleSubmitButton();
})

//check github account - Only for testing
fetch(`https://api.github.com/users/${git_id.value}`)
      .then(res => {
                if (res.ok) {
                console.log("GitHub user exists!");
                console.log(git_id.value)
                //git_id.style.borderBlockColor = 'green'
                } else {
                console.log("GitHub user not found.");
                //git_id.style.borderBlockColor = 'red'
                }
});

const formFinal = document.getElementById("myForm");

function toggleSubmitButton() {
    if (isGitValid && isEmailValid) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
}

formFinal.addEventListener("submit", function (e) {
      e.preventDefault(); //prevent default form action
   
  //localStorage saving here
    localStorage.setItem("name", name.value);
    localStorage.setItem("email",email.value)
    localStorage.setItem("git_id",git_id.value)
      
  // Add a short delay OR redirect only after avatar is saved
    setTimeout(() => {
        window.location.href = "ticket.html";
       }, 500); // 0.5 second delay
          // Redirect to a new page
});

window.onload = function () {
  document.getElementById("myForm").reset(); // Clears all fields
}; 

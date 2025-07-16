const form = document.getElementById("myForm")

const avatar = document.getElementById("avatar");

const profile = document.querySelector('#upload-icon');

const name = document.getElementById("name")

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
            const img = document.createElement("img");
            img.src = reader.result;
            img.alt = "Profile Preview";
            img.style.width = "50px";
            img.style.height = "50px";
            img.style.borderRadius = "12px"; 
            img.style.objectFit = "cover";
            profile.appendChild(img);
    };
    reader.readAsDataURL(file);
    }
  } else {
    fileNameDisplay.textContent = "";
  }
  // console.log("Input after clearing:", e.target.files.length);
})

const email = document.getElementById("email")

email.addEventListener("input", (e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValue = e.target.value
    if (emailRegex.test(emailValue)) {
        console.log("Valid email");
        console.log(email.value)
        email.style.borderBlockColor = 'green'
    } else {
        console.log("Invalid email");
        email.style.borderBlockColor = 'red'
        //alert("wrong email")
        //email.value=""
    }
})

const git_id = document.getElementById("git_name")

git_id.addEventListener("input",(e) => {
    const githubRegex = /^(?!-)(?!.*--)[a-zA-Z0-9-]{1,39}(?<!-)$/;
    const gitValue = e.target.value

    if (githubRegex.test(gitValue)) {
        console.log("Valid GitHub username");
        fetch(`https://api.github.com/users/${gitValue}`)
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
    } 
    else {
        console.log("Invalid GitHub username");
        git_id.value = "";
    }
})

const formFinal = document.getElementById("myForm");

formFinal.addEventListener("submit", function (e) {
  e.preventDefault(); // prevent default form action
  console.log(name)

  //(Optional) Do your validation or localStorage saving here
    localStorage.setItem("name", name.value);
    localStorage.setItem("email",email.value)
    localStorage.setItem("git_id",git_id.value)
  // Redirect to a new page
  window.location.href = "ticket.html";  // or any other HTML file
});

window.onload = function () {
  document.getElementById("myForm").reset(); // Clears all fields
}; 

//also clearing data from localstorage on reloading
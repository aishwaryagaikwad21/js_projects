const form = document.getElementById("myForm")

const avatar = document.getElementById("avatar");

const profile = document.querySelector('#upload-icon');

avatar.addEventListener("input",(e)=>{
    const file = e.target.files[0];
    console.log(file.size)
    const maxSize = 500*1024;
    const fileNameDisplay = document.getElementById("fileName");
    fileNameDisplay.textContent = `${file.name}`


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
    if (emailRegex.test(email)) {
        console.log("Valid email");
    } else {
        console.log("Invalid email");
        alert("wrong email")
        email.innerHTML=""
    }
})

const git_id = document.getElementById("git_name")
git_id.addEventListener("input",(e) => {
    const githubRegex = /^(?!-)(?!.*--)[a-zA-Z0-9-]{1,39}(?<!-)$/;
    
    if (githubRegex.test(git_id)) {
        console.log("Valid GitHub username");
    } 
    else {
        console.log("Invalid GitHub username");
    }
})
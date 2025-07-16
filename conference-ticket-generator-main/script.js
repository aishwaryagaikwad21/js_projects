const form = document.getElementById("myForm")

const avatar = document.getElementById("avatar");

avatar.addEventListener("input",(e)=>{
    const file = e.target.files[0];
    console.log(file.size)
    const maxSize = 500*1024;
    const fileNameDisplay = document.getElementById("fileName");
    fileNameDisplay.textContent = `${file.name}`
    if (file) {
    fileNameDisplay.textContent = `${file.name}`;

    if (file.size > maxSize) {
      e.target.value = ""; // ✅ This clears the file input
      alert("❌ File size too large (Max: 500 KB)");
      fileNameDisplay.textContent = "";
    }
  } else {
    fileNameDisplay.textContent = "";
  }
  // console.log("Input after clearing:", e.target.files.length);
})
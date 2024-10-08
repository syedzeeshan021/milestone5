// Get the form and output div
var resumeForm = document.getElementById("resume-form");
var resumeDisplayElement = document.getElementById("resume-display");
var shareableLinkContainer = document.getElementById("shareable-link-container");
var shareableLinkElement = document.getElementById("shareable-link");
var downloadPdfButton = document.getElementById('download-pdf');
var profilePictureInput = document.getElementById("profilePicture");
// Handle form submission
resumeForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from refreshing the page
    // Get form input values
    var username = document.getElementById("username").value;
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var education = document.getElementById("education").value;
    var experience = document.getElementById("experience").value;
    var skills = document.getElementById("skills").value;
    // Get the uploaded profile picture file
    var profilePictureFile = profilePictureInput.files[0];
    var profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : "";
    // Save form data in localStorage with the username as the key
    var resumeData = {
        name: name,
        email: email,
        phone: phone,
        education: education,
        experience: experience,
        skills: skills
    };
    localStorage.setItem(username, JSON.stringify(resumeData));
    // Saving the data locally
    // Generate the resume output in HTML format with editable code 
    var resumeHTML = "\n        <h2><b> Editable Resume</b></h2>\n        <h3>Personal Information</h3>\n        ".concat(profilePictureURL ? "<img src=\"".concat(profilePictureURL, "\" alt=\"Profile Picture\" class = \"profilePicture\";>") : "", "\n        <p><b>Name:</b><span contenteditable= \"true\"> ").concat(name, " </span></p>\n        <p><b>Email:</b><span contenteditable= \"true\"> ").concat(email, " </span></p>\n        <p><b>Phone:</b><span contenteditable= \"true\"> ").concat(phone, " </span></p>\n  \n        <h3>Education</h3>\n        <p contenteditable= \"true\">").concat(education, "</p>\n  \n        <h3>Experience</h3>\n        <p contenteditable= \"true\">").concat(experience, "</p>\n  \n        <h3>Skills</h3>\n        <p contenteditable= \"true\">").concat(skills, "</p>\n      ");
    // Insert the generated resume into the output div
    resumeDisplayElement.innerHTML = resumeHTML;
    //Generate the shareable URL with the username only
    var shareableURL = "".concat(window.location.origin, "?username=").concat(encodeURIComponent(username));
    // Display the shareable link 
    shareableLinkContainer.style.display = 'block';
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
});
//Handle PDF download
downloadPdfButton.addEventListener('click', function () {
    window.print();
});
// Prefill the form based on the username in the URL 
window.addEventListener('DOMContentLoaded', function () {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get('username');
    if (username) {
        // Autofill form if data is found in localStorage 
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            document.getElementById('username').value = username;
            document.getElementById('name').value = resumeData.name;
            document.getElementById('email').value = resumeData.email;
            document.getElementById('phone').value = resumeData.phone;
            document.getElementById('education').value = resumeData.education;
            document.getElementById('experience').value = resumeData.experience;
            document.getElementById('skills').value = resumeData.skills;
        }
    }
});

/* =====================================================
   STUDYPILOT AI - DASHBOARD
===================================================== */


/* =====================================================
   CHECK LOGIN
===================================================== */

const isLoggedIn =
    localStorage.getItem("studyPilotLoggedIn");


if (isLoggedIn !== "true") {

    window.location.href =
        "../signup/login.html";

}



/* =====================================================
   GET STUDENT
===================================================== */

const savedStudent =
    JSON.parse(
        localStorage.getItem("studyPilotStudent")
    );


if (!savedStudent) {

    localStorage.removeItem(
        "studyPilotLoggedIn"
    );

    window.location.href =
        "../signup/login.html";

}



/* =====================================================
   DISPLAY STUDENT INFORMATION
===================================================== */

function loadStudentData() {

    const name =
        savedStudent.name || "Student";


    /* TOP */

    document.getElementById(
        "topStudentName"
    ).textContent = name;


    document.getElementById(
        "topName"
    ).textContent = name;


    /* PROFILE */

    document.getElementById(
        "studentName"
    ).textContent =
        name;


    document.getElementById(
        "studentEmail"
    ).textContent =
        savedStudent.email || "-";


    document.getElementById(
        "studentDob"
    ).textContent =
        formatDate(savedStudent.dob);


    document.getElementById(
        "studentCollege"
    ).textContent =
        savedStudent.college || "-";


    document.getElementById(
        "studentSemester"
    ).textContent =
        savedStudent.semester || "-";


    /* AVATAR */

    const firstLetter =
        name.charAt(0).toUpperCase();


    document.getElementById(
        "topAvatar"
    ).textContent =
        firstLetter;


    document.getElementById(
        "largeAvatar"
    ).textContent =
        firstLetter;

}



/* =====================================================
   DATE FORMAT
===================================================== */

function formatDate(dateString) {

    if (!dateString) {

        return "-";

    }


    const date =
        new Date(dateString);


    if (isNaN(date)) {

        return dateString;

    }


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}



/* =====================================================
   START LEARNING
===================================================== */

function startLearning() {

    document
        .getElementById("learning")
        .scrollIntoView({
            behavior: "smooth"
        });

}



/* =====================================================
   FEATURE COMING SOON
===================================================== */

function featureComingSoon() {

    alert(
        "This StudyPilot AI feature will be available soon."
    );

}



/* =====================================================
   LOGOUT
===================================================== */

function logout() {

    document
        .getElementById("logoutModal")
        .classList.add("active");

}



/* =====================================================
   CLOSE LOGOUT
===================================================== */

function closeLogoutModal() {

    document
        .getElementById("logoutModal")
        .classList.remove("active");

}



/* =====================================================
   CONFIRM LOGOUT
===================================================== */

function confirmLogout() {

    localStorage.removeItem(
        "studyPilotLoggedIn"
    );

    localStorage.removeItem(
        "studyPilotLoginTime"
    );


    window.location.href =
        "../signup/login.html";

}



/* =====================================================
   ESCAPE KEY
===================================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            closeLogoutModal();

        }

    }
);



/* =====================================================
   LOAD DATA
===================================================== */

loadStudentData();


/* =====================================================
   YEAR
===================================================== */

document.getElementById("year").textContent =
    new Date().getFullYear();
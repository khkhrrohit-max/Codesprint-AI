/* =====================================================
   STUDYPILOT AI - LOGIN / SIGNUP
===================================================== */


/* =====================================================
   YEAR
===================================================== */

document.getElementById("leftYear").textContent =
    new Date().getFullYear();



/* =====================================================
   SHOW LOGIN
===================================================== */

function showLogin() {

    document.getElementById("loginForm").style.display =
        "block";

    document.getElementById("signupForm").style.display =
        "none";

}


/* =====================================================
   SHOW SIGNUP
===================================================== */

function showSignup() {

    document.getElementById("loginForm").style.display =
        "none";

    document.getElementById("signupForm").style.display =
        "block";

}



/* =====================================================
   PASSWORD VISIBILITY
===================================================== */

function togglePassword(inputId, button) {

    const input =
        document.getElementById(inputId);

    if (input.type === "password") {

        input.type = "text";

        button.textContent = "🙈";

    } else {

        input.type = "password";

        button.textContent = "👁";

    }

}



/* =====================================================
   SIGNUP
===================================================== */

const signupForm =
    document.getElementById("studentSignupForm");


signupForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const name =
            document.getElementById("studentName").value.trim();

        const email =
            document.getElementById("studentEmail").value.trim();

        const dob =
            document.getElementById("dateOfBirth").value;

        const college =
            document.getElementById("collegeName").value.trim();

        const semester =
            document.getElementById("semester").value;

        const password =
            document.getElementById("newPassword").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;


        const message =
            document.getElementById("signupMessage");


        /* Password check */

        if (password !== confirmPassword) {

            message.textContent =
                "Passwords do not match.";

            message.style.color =
                "#e63946";

            return;
        }


        /* Minimum password */

        if (password.length < 6) {

            message.textContent =
                "Password must contain at least 6 characters.";

            message.style.color =
                "#e63946";

            return;
        }


        /* Check existing account */

        const existingUser =
            JSON.parse(
                localStorage.getItem("studyPilotStudent")
            );


        if (
            existingUser &&
            existingUser.email.toLowerCase() ===
            email.toLowerCase()
        ) {

            message.textContent =
                "An account with this email already exists.";

            message.style.color =
                "#e63946";

            return;
        }


        /* Create student object */

        const student = {

            name: name,

            email: email,

            dob: dob,

            college: college,

            semester: semester,

            password: password,

            createdAt:
                new Date().toISOString()

        };


        /* Save student */

        localStorage.setItem(
            "studyPilotStudent",
            JSON.stringify(student)
        );


        /* Success */

        message.textContent =
            "Account created successfully! Redirecting...";

        message.style.color =
            "#159b6d";


        signupForm.reset();


        setTimeout(
            function() {

                showLogin();

                document.getElementById("loginEmail").value =
                    email;

            },
            1200
        );

    }
);



/* =====================================================
   LOGIN
===================================================== */

const loginForm =
    document.getElementById("studentLoginForm");


loginForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value;


        const message =
            document.getElementById("loginMessage");


        /* Get saved account */

        const savedStudent =
            JSON.parse(
                localStorage.getItem("studyPilotStudent")
            );


        if (!savedStudent) {

            message.textContent =
                "No student account found. Please create an account first.";

            message.style.color =
                "#e63946";

            return;
        }


        /* Verify email */

        if (
            savedStudent.email.toLowerCase() !==
            email.toLowerCase()
        ) {

            message.textContent =
                "Incorrect email address.";

            message.style.color =
                "#e63946";

            return;
        }


        /* Verify password */

        if (
            savedStudent.password !==
            password
        ) {

            message.textContent =
                "Incorrect password.";

            message.style.color =
                "#e63946";

            return;
        }


        /* Login successful */

        localStorage.setItem(
            "studyPilotLoggedIn",
            "true"
        );


        localStorage.setItem(
            "studyPilotLoginTime",
            new Date().toISOString()
        );


        message.textContent =
            "Login successful! Opening dashboard...";

        message.style.color =
            "#159b6d";


        setTimeout(
            function() {

                window.location.href =
                    "dashboard.html";

            },
            800
        );

    }
);
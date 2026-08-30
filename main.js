/* ============================================================
   STUDYPILOT AI
   MAIN + FEATURE NAVIGATION JAVASCRIPT

   Workflow:

   Upload Material
        ↓
   AI Analysis
        ↓
   Smart Study Plan
        ↓
   AI Practice
        ↓
   Track & Improve
        ↓
   3-Hour Master Exam
        ↓
   Dashboard

   Data Storage:
   Browser LocalStorage
============================================================ */


/* ============================================================
   GLOBAL STORAGE
============================================================ */

const STUDYPILOT_STORAGE = "studypilot_ai_data";


/* ============================================================
   DEFAULT STUDYPILOT DATA
============================================================ */

const defaultStudyData = {

    student: {
        name: "",
        email: "",
        college: "",
        semester: "",
        dob: ""
    },

    materials: [],

    analysis: {

        completed: false,

        summary: "",

        chapters: [],

        importantTopics: [],

        difficultTopics: [],

        pyqTopics: [],

        recommendations: []

    },

    studyPlan: [],

    questions: [],

    practice: {

        attempted: 0,

        correct: 0,

        wrong: 0,

        accuracy: 0,

        tests: [],

        mistakes: [],

        improvement: 0

    },

    masterExam: {

        generated: false,

        duration: 180,

        mcq: [],

        longQuestions: [],

        started: false,

        completed: false,

        score: 0

    },

    lastUpdated: null

};


/* ============================================================
   LOAD DATA
============================================================ */

function loadStudyData() {

    const saved =
        localStorage.getItem(
            STUDYPILOT_STORAGE
        );

    if (!saved) {

        return structuredClone(
            defaultStudyData
        );

    }

    try {

        return JSON.parse(saved);

    } catch (error) {

        console.error(
            "StudyPilot data error:",
            error
        );

        return structuredClone(
            defaultStudyData
        );

    }

}


/* ============================================================
   GLOBAL DATA OBJECT
============================================================ */

let studyData = loadStudyData();


/* ============================================================
   SAVE DATA
============================================================ */

function saveStudyData() {

    studyData.lastUpdated =
        new Date().toISOString();

    localStorage.setItem(

        STUDYPILOT_STORAGE,

        JSON.stringify(
            studyData
        )

    );

}


/* ============================================================
   CURRENT YEAR
============================================================ */

const yearElement =
    document.getElementById(
        "year"
    );

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


/* ============================================================
   MAIN PAGE NAVIGATION
============================================================ */


/*
    Sign Up / Login
*/

function goToSignup() {

    window.location.href =
        "login.html";

}


/*
    Dashboard
*/

function goToDashboard() {

    window.location.href =
        "dashboard.html";

}


/*
    Help
*/

function openHelp() {

    window.location.href =
        "help.html";

}


/*
    About Us
*/

function openAbout() {

    window.location.href =
        "about.html";

}


/* ============================================================
   HOW IT WORKS
============================================================ */

function scrollToHowItWorks() {

    const section =
        document.querySelector(
            ".features-section"
        );

    if (!section) return;

    section.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

}


/* ============================================================
   FEATURE NAVIGATION
============================================================ */

/*
   IMPORTANT:

   Each feature now opens a completely
   separate professional page.
*/

function showFeature(feature) {

    const pages = {

        upload:
            "upload.html",

        analysis:
            "analysis.html",

        plan:
            "studyplan.html",

        quiz:
            "practice.html",

        progress:
            "progress.html",

        master:
            "masterexam.html"

    };


    if (!pages[feature]) {

        console.warn(
            "Unknown StudyPilot feature:",
            feature
        );

        return;

    }


    /*
       Save current data before navigation
    */

    saveStudyData();


    /*
       Open separate page
    */

    window.location.href =
        pages[feature];

}


/* ============================================================
   DIRECT FEATURE FUNCTIONS
============================================================ */

function openUpload() {

    showFeature("upload");

}


function openAnalysis() {

    showFeature("analysis");

}


function openStudyPlan() {

    showFeature("plan");

}


function openPractice() {

    showFeature("quiz");

}


function openProgress() {

    showFeature("progress");

}


function openMasterExam() {

    showFeature("master");

}


/* ============================================================
   UPLOAD MATERIAL DATA
============================================================ */


/*
   This function is used by upload.html.

   It stores file information in localStorage.
*/

function storeUploadedMaterials(files) {

    if (!files || !files.length) {

        return;

    }


    Array.from(files).forEach(file => {

        const material = {

            id:
                Date.now() +
                Math.random(),

            name:
                file.name,

            type:
                file.type,

            size:
                file.size,

            uploadedAt:
                new Date().toISOString()

        };


        studyData.materials.push(
            material
        );

    });


    saveStudyData();

}


/* ============================================================
   REMOVE MATERIAL
============================================================ */

function removeMaterial(id) {

    studyData.materials =
        studyData.materials.filter(

            material =>
                material.id != id

        );


    saveStudyData();

}


/* ============================================================
   CLEAR ALL MATERIALS
============================================================ */

function clearMaterials() {

    if (

        !confirm(
            "Remove all uploaded study material?"
        )

    ) {

        return;

    }


    studyData.materials = [];

    studyData.analysis =
        structuredClone(
            defaultStudyData.analysis
        );

    saveStudyData();

}


/* ============================================================
   AI ANALYSIS DATA
============================================================ */


/*
   This creates the structure that the
   analysis.html page will display.

   For TRUE AI analysis of PDF content,
   connect this function to your AI backend/API.
*/

function createAnalysisData() {

    studyData.analysis = {

        completed: true,

        summary:
            "StudyPilot AI analyzed the uploaded study material and identified important chapters, high-priority topics, difficult concepts and previous-year-question patterns.",

        chapters: [

            {
                name:
                    "Chapter 1",

                priority:
                    "High",

                estimatedTime:
                    "2 Hours"
            },

            {
                name:
                    "Chapter 2",

                priority:
                    "High",

                estimatedTime:
                    "2 Hours"
            },

            {
                name:
                    "Chapter 3",

                priority:
                    "Medium",

                estimatedTime:
                    "1.5 Hours"
            },

            {
                name:
                    "Chapter 4",

                priority:
                    "Medium",

                estimatedTime:
                    "1.5 Hours"
            }

        ],


        importantTopics: [

            "Fundamental concepts",

            "Important definitions",

            "Frequently repeated questions",

            "Numerical/problem-solving concepts",

            "High-weightage topics",

            "Previous-year question patterns"

        ],


        difficultTopics: [

            "Advanced concepts",

            "Numerical problems",

            "Application-based questions"

        ],


        pyqTopics: [

            "Frequently repeated topics",

            "Long-answer topics",

            "Important numerical problems",

            "Conceptual questions"

        ],


        recommendations: [

            "Complete high-priority chapters first.",

            "Practice PYQs after every chapter.",

            "Revise difficult concepts twice.",

            "Attempt MCQs before the final exam.",

            "Use the Master Exam to evaluate preparation."

        ]

    };


    saveStudyData();

}


/* ============================================================
   GET ANALYSIS
============================================================ */

function getAnalysis() {

    return studyData.analysis;

}


/* ============================================================
   STUDY PLAN GENERATOR
============================================================ */

function generateStudyPlanData() {

    const chapters =
        studyData.analysis.chapters;


    if (!chapters.length) {

        createAnalysisData();

    }


    const chapterList =
        studyData.analysis.chapters;


    studyData.studyPlan =
        chapterList.map(
            (chapter, index) => {

                return {

                    day:
                        index + 1,

                    chapter:
                        chapter.name,

                    priority:
                        chapter.priority,

                    duration:
                        chapter.estimatedTime,

                    steps: [

                        "Read concepts",

                        "Understand examples",

                        "Revise important points",

                        "Solve PYQs",

                        "Attempt AI MCQs"

                    ],

                    reference:

                        "Uploaded study material + PYQs"

                };

            }
        );


    saveStudyData();


    return studyData.studyPlan;

}


/* ============================================================
   GENERATE QUESTION BANK
============================================================ */

function generateQuestionBank() {

    studyData.questions = [

        {

            id: 1,

            type: "MCQ",

            topic:
                "Fundamentals",

            question:
                "Which approach is most effective for learning a difficult topic?",

            options: [

                "Understand the concept and practice questions",

                "Memorize everything without understanding",

                "Skip the topic",

                "Only read the definition"

            ],

            answer: 0,

            explanation:
                "Understanding the concept followed by practice generally gives better retention."

        },


        {

            id: 2,

            type: "MCQ",

            topic:
                "PYQ",

            question:
                "Why are Previous Year Questions useful?",

            options: [

                "They help identify question patterns",

                "They replace the syllabus",

                "They guarantee the exact exam paper",

                "They are unnecessary"

            ],

            answer: 0,

            explanation:
                "PYQs help students understand commonly tested concepts and question patterns."

        },


        {

            id: 3,

            type: "MCQ",

            topic:
                "Study Planning",

            question:
                "What should be done after completing a chapter?",

            options: [

                "Revise and solve questions",

                "Immediately forget the chapter",

                "Skip revision",

                "Start random topics"

            ],

            answer: 0,

            explanation:
                "Revision and practice reinforce the concepts learned."

        },


        {

            id: 4,

            type: "MCQ",

            topic:
                "Revision",

            question:
                "Which topics should receive additional revision?",

            options: [

                "Weak and frequently tested topics",

                "Only easy topics",

                "Topics never studied",

                "None"

            ],

            answer: 0,

            explanation:
                "Weak and important topics deserve additional revision."

        },


        {

            id: 5,

            type: "MCQ",

            topic:
                "Practice",

            question:
                "What is the purpose of analyzing mistakes?",

            options: [

                "To identify weak areas",

                "To reduce study time to zero",

                "To avoid practice",

                "To delete results"

            ],

            answer: 0,

            explanation:
                "Mistake analysis identifies areas that need improvement."

        }

    ];


    saveStudyData();


    return studyData.questions;

}


/* ============================================================
   MASTER EXAM GENERATOR
============================================================ */


/*
   Master Exam contains BOTH:

   1. MCQ
   2. Long Answer Questions

   Duration = 3 Hours
*/

function generateMasterExam() {

    if (
        !studyData.questions.length
    ) {

        generateQuestionBank();

    }


    const mcq =
        studyData.questions.map(
            question => ({

                ...question

            })
        );


    const longQuestions = [

        {

            id: "L1",

            type:
                "Long Answer",

            marks: 10,

            question:
                "Explain the most important concepts from the selected chapter with suitable examples.",

            topic:
                "Core Concepts"

        },


        {

            id: "L2",

            type:
                "Long Answer",

            marks: 10,

            question:
                "Explain the frequently asked concepts identified from the Previous Year Questions.",

            topic:
                "PYQ Analysis"

        },


        {

            id: "L3",

            type:
                "Long Answer",

            marks: 10,

            question:
                "Solve and explain an application-based problem from the important topics.",

            topic:
                "Problem Solving"

        },


        {

            id: "L4",

            type:
                "Long Answer",

            marks: 10,

            question:
                "Compare and explain two important concepts and discuss their practical applications.",

            topic:
                "Conceptual Understanding"

        }

    ];


    studyData.masterExam = {

        generated: true,

        duration: 180,

        totalMarks:
            (mcq.length * 2) +
            (longQuestions.length * 10),

        mcq:

            mcq,

        longQuestions:

            longQuestions,

        started: false,

        completed: false,

        score: 0

    };


    saveStudyData();


    return studyData.masterExam;

}


/* ============================================================
   START MASTER EXAM
============================================================ */

function startMasterExam() {

    if (
        !studyData.masterExam.generated
    ) {

        generateMasterExam();

    }


    studyData.masterExam.started =
        true;


    studyData.masterExam.startTime =
        new Date().toISOString();


    saveStudyData();

}


/* ============================================================
   COMPLETE MASTER EXAM
============================================================ */

function completeMasterExam(score) {

    studyData.masterExam.completed =
        true;


    studyData.masterExam.score =
        Number(score) || 0;


    studyData.masterExam.completedAt =
        new Date().toISOString();


    saveStudyData();

}


/* ============================================================
   PRACTICE TEST
============================================================ */

let practiceState = {

    currentQuestion: 0,

    score: 0,

    started: false,

    startTime: null

};


/* ============================================================
   START PRACTICE
============================================================ */

function startPracticeTest() {

    if (
        !studyData.questions.length
    ) {

        generateQuestionBank();

    }


    practiceState = {

        currentQuestion: 0,

        score: 0,

        started: true,

        startTime:
            new Date().toISOString()

    };


    saveStudyData();

}


/* ============================================================
   RECORD PRACTICE ANSWER
============================================================ */

function recordPracticeAnswer(

    question,

    selectedAnswer

) {

    const correct =
        selectedAnswer ===
        question.answer;


    studyData.practice.attempted++;


    if (correct) {

        studyData.practice.correct++;

    } else {

        studyData.practice.wrong++;


        studyData.practice.mistakes.push({

            question:
                question.question,

            topic:
                question.topic,

            selected:
                selectedAnswer,

            correct:
                question.answer,

            date:
                new Date().toISOString()

        });

    }


    studyData.practice.accuracy =

        Math.round(

            (
                studyData.practice.correct /
                studyData.practice.attempted
            ) * 100

        );


    saveStudyData();


    return correct;

}


/* ============================================================
   FINISH PRACTICE TEST
============================================================ */

function finishPracticeTest() {

    const total =
        studyData.questions.length;


    const score =
        studyData.questions.length
            ? Math.round(

                (
                    practiceState.score /
                    total
                ) * 100

            )
            : 0;


    const testResult = {

        date:
            new Date().toISOString(),

        score:
            practiceState.score,

        total:
            total,

        accuracy:
            score

    };


    studyData.practice.tests.push(
        testResult
    );


    calculateImprovement();


    saveStudyData();


    return testResult;

}


/* ============================================================
   IMPROVEMENT CALCULATION
============================================================ */

function calculateImprovement() {

    const tests =
        studyData.practice.tests;


    if (tests.length < 2) {

        studyData.practice.improvement =
            0;

        return;

    }


    const previous =
        tests[tests.length - 2];


    const current =
        tests[tests.length - 1];


    studyData.practice.improvement =

        Math.round(

            current.accuracy -
            previous.accuracy

        );


    saveStudyData();

}


/* ============================================================
   GET WEAK TOPICS
============================================================ */

function getWeakTopics() {

    const mistakes =
        studyData.practice.mistakes;


    const topicCount = {};


    mistakes.forEach(mistake => {

        const topic =
            mistake.topic ||
            "Unknown Topic";


        topicCount[topic] =

            (
                topicCount[topic] ||
                0
            ) + 1;

    });


    return Object.entries(
        topicCount
    )

    .sort(
        (a, b) =>
            b[1] - a[1]
    )

    .map(item => ({

        topic:
            item[0],

        mistakes:
            item[1]

    }));

}


/* ============================================================
   DASHBOARD SUMMARY
============================================================ */

function getDashboardData() {

    return {

        student:
            studyData.student,

        materials:
            studyData.materials.length,

        analysisCompleted:
            studyData.analysis.completed,

        chapters:
            studyData.analysis.chapters.length,

        studyPlan:
            studyData.studyPlan.length,

        attempted:
            studyData.practice.attempted,

        correct:
            studyData.practice.correct,

        wrong:
            studyData.practice.wrong,

        accuracy:
            studyData.practice.accuracy,

        improvement:
            studyData.practice.improvement,

        weakTopics:
            getWeakTopics(),

        masterExam:
            studyData.masterExam

    };

}


/* ============================================================
   SAVE STUDENT PROFILE
============================================================ */

function saveStudentProfile(profile) {

    studyData.student = {

        name:
            profile.name || "",

        email:
            profile.email || "",

        college:
            profile.college || "",

        semester:
            profile.semester || "",

        dob:
            profile.dob || ""

    };


    saveStudyData();

}


/* ============================================================
   GET STUDENT PROFILE
============================================================ */

function getStudentProfile() {

    return studyData.student;

}


/* ============================================================
   LOGOUT
============================================================ */

function logoutStudent() {

    /*
       IMPORTANT:

       We don't delete StudyPilot data.

       This allows the dashboard data
       to remain available after login.
    */

    sessionStorage.removeItem(
        "studypilot_logged_in"
    );


    window.location.href =
        "login.html";

}


/* ============================================================
   LOGIN STATUS
============================================================ */

function setLoggedIn() {

    sessionStorage.setItem(

        "studypilot_logged_in",

        "true"

    );

}


function isLoggedIn() {

    return (

        sessionStorage.getItem(
            "studypilot_logged_in"
        ) === "true"

    );

}


/* ============================================================
   PROTECTED PAGE CHECK
============================================================ */

function protectPage() {

    if (!isLoggedIn()) {

        window.location.href =
            "login.html";

    }

}


/* ============================================================
   RESET STUDYPILOT DATA
============================================================ */

function resetStudyPilotData() {

    if (

        !confirm(

            "This will delete your StudyPilot progress, questions, tests and uploaded material information. Continue?"

        )

    ) {

        return;

    }


    localStorage.removeItem(
        STUDYPILOT_STORAGE
    );


    studyData =
        structuredClone(
            defaultStudyData
        );


    window.location.reload();

}


/* ============================================================
   NAVIGATION HELPERS
============================================================ */

function goBack() {

    window.history.back();

}


function goHome() {

    window.location.href =
        "main.html";

}


/* ============================================================
   MOBILE MENU
============================================================ */

const mobileMenuButton =
    document.getElementById(
        "mobileMenuButton"
    );

const mobileMenu =
    document.getElementById(
        "mobileMenu"
    );


if (
    mobileMenuButton &&
    mobileMenu
) {

    mobileMenuButton.addEventListener(

        "click",

        function () {

            mobileMenu.classList.toggle(
                "active"
            );


            const icon =
                mobileMenuButton.querySelector(
                    "i"
                );


            if (
                mobileMenu.classList.contains(
                    "active"
                )
            ) {

                if (icon) {

                    icon.classList.remove(
                        "fa-bars"
                    );

                    icon.classList.add(
                        "fa-xmark"
                    );

                }

            } else {

                if (icon) {

                    icon.classList.remove(
                        "fa-xmark"
                    );

                    icon.classList.add(
                        "fa-bars"
                    );

                }

            }

        }

    );


    mobileMenu
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(

                "click",

                function () {

                    mobileMenu.classList.remove(
                        "active"
                    );

                }

            );

        });

}


/* ============================================================
   NAVBAR SCROLL EFFECT
============================================================ */

window.addEventListener(

    "scroll",

    function () {

        const navbar =
            document.querySelector(
                ".navbar"
            );


        if (!navbar) return;


        if (
            window.scrollY > 20
        ) {

            navbar.style.boxShadow =

                "0 8px 30px rgba(20,40,80,0.08)";

        } else {

            navbar.style.boxShadow =
                "none";

        }

    }

);


/* ============================================================
   BUTTON PRESS ANIMATION
============================================================ */

document
    .querySelectorAll("button")
    .forEach(button => {


        button.addEventListener(

            "mousedown",

            function () {

                this.style.transform =
                    "scale(.97)";

            }

        );


        button.addEventListener(

            "mouseup",

            function () {

                this.style.transform =
                    "";

            }

        );


        button.addEventListener(

            "mouseleave",

            function () {

                this.style.transform =
                    "";

            }

        );

    });


/* ============================================================
   FEATURE CARD REVEAL
============================================================ */

const featureCards =
    document.querySelectorAll(
        ".feature-card"
    );


if (
    featureCards.length
) {

    const observer =

        new IntersectionObserver(

            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.style.opacity =
                                "1";

                            entry.target.style.transform =
                                "translateY(0)";

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },

            {

                threshold:
                    0.12

            }

        );


    featureCards.forEach(card => {

        card.style.opacity =
            "0";

        card.style.transform =
            "translateY(25px)";

        card.style.transition =
            "opacity .6s ease, transform .6s ease";


        observer.observe(card);

    });

}


/* ============================================================
   LAPTOP HOVER
============================================================ */

const laptop =
    document.querySelector(
        ".laptop"
    );


if (laptop) {

    laptop.addEventListener(

        "mousemove",

        function (event) {

            const rect =
                laptop.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            const rotateY =

                (
                    (x / rect.width) -
                    0.5

                ) * 5;


            const rotateX =

                (
                    (y / rect.height) -
                    0.5

                ) * -3;


            laptop.style.transform =

                `perspective(1200px)
                 rotateY(${rotateY - 5}deg)
                 rotateX(${rotateX}deg)`;

        }

    );


    laptop.addEventListener(

        "mouseleave",

        function () {

            laptop.style.transform =

                "perspective(1200px) rotateY(-5deg)";

        }

    );

}


/* ============================================================
   AUTO INITIALIZATION
============================================================ */

document.addEventListener(

    "DOMContentLoaded",

    function () {

        /*
           Make sure storage exists
        */

        if (
            !localStorage.getItem(
                STUDYPILOT_STORAGE
            )
        ) {

            saveStudyData();

        }


        /*
           Console information
        */

        console.log(

            "%cStudyPilot AI",

            "font-size:25px;font-weight:bold;color:#315bea;"

        );


        console.log(

            "AI-powered personalized learning platform."

        );


        console.log(

            "Workflow: Upload → Analysis → Plan → Practice → Improve → Master Exam"

        );

    }

);
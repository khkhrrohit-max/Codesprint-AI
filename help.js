/* =====================================================
   STUDYPILOT AI - HELP / AI STUDY ASSISTANT
===================================================== */

const STORAGE_KEY = "studypilot_ai_data";

const chat = document.getElementById("chat");
const form = document.getElementById("chatForm");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const clearBtn = document.getElementById("clearChat");


/* =====================================================
   LOAD STUDYPILOT DATA
===================================================== */

function getStudyData() {

    try {

        return JSON.parse(
            localStorage.getItem(STORAGE_KEY) || "{}"
        );

    } catch (error) {

        console.error("Unable to load StudyPilot data:", error);

        return {};

    }

}


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHTML(value) {

    return String(value ?? "").replace(
        /[&<>"']/g,
        character => ({

            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"

        })[character]
    );

}


/* =====================================================
   FORMAT AI RESPONSE
===================================================== */

function formatText(text) {

    return escapeHTML(text)

        .replace(
            /\*\*(.*?)\*\*/g,
            "<strong>$1</strong>"
        )

        .replace(
            /\n/g,
            "<br>"
        );

}


/* =====================================================
   ADD MESSAGE TO CHAT
===================================================== */

function addMessage(text, type = "ai") {

    const wrapper =
        document.createElement("div");

    wrapper.className =
        `message ${type}`;

    wrapper.innerHTML = `

        <div class="avatar">

            ${type === "ai" ? "✦" : "U"}

        </div>

        <div class="bubble">

            ${formatText(text)}

        </div>

    `;

    chat.appendChild(wrapper);

    chat.scrollTop =
        chat.scrollHeight;

}


/* =====================================================
   TYPING INDICATOR
===================================================== */

function showTyping() {

    const wrapper =
        document.createElement("div");

    wrapper.className =
        "message ai";

    wrapper.id =
        "typingMessage";

    wrapper.innerHTML = `

        <div class="avatar">
            ✦
        </div>

        <div class="bubble">

            <div class="typing">

                <i></i>
                <i></i>
                <i></i>

            </div>

        </div>

    `;

    chat.appendChild(wrapper);

    chat.scrollTop =
        chat.scrollHeight;

}


/* =====================================================
   REMOVE TYPING
===================================================== */

function removeTyping() {

    const typing =
        document.getElementById(
            "typingMessage"
        );

    if (typing) {

        typing.remove();

    }

}


/* =====================================================
   GET IMPORTANT TOPICS
===================================================== */

function getTopics(data) {

    return (
        data.analysis?.importantTopics ||
        []
    );

}


/* =====================================================
   GET WEAK TOPICS
===================================================== */

function getWeakTopics(data) {

    const mistakes =
        data.practice?.mistakes || [];

    const count = {};

    mistakes.forEach(item => {

        const topic =
            item.topic ||
            "Unknown Topic";

        count[topic] =
            (count[topic] || 0) + 1;

    });

    return Object.entries(count)

        .sort(
            (a, b) =>
                b[1] - a[1]
        )

        .slice(0, 5);

}


/* =====================================================
   LOCAL AI RESPONSE ENGINE
===================================================== */

function generateLocalResponse(question) {

    const data =
        getStudyData();

    const analysis =
        data.analysis || {};

    const practice =
        data.practice || {};

    const materials =
        data.materials || [];

    const plan =
        data.studyPlan || [];

    const q =
        question.toLowerCase();


    /* =================================================
       NO MATERIAL
    ================================================= */

    if (
        materials.length === 0 &&
        !data.sourceText
    ) {

        if (
            q.includes("upload") ||
            q.includes("pdf") ||
            q.includes("material") ||
            q.includes("notes")
        ) {

            return `You haven't uploaded any study material yet.

📚 Go to **Upload Study Material** and upload:

• Syllabus
• Notes
• PDF books
• Previous-year papers
• Study documents

After uploading, StudyPilot can personalize your learning journey.`;

        }

    }


    /* =================================================
       HELLO
    ================================================= */

    if (
        q === "hi" ||
        q === "hello" ||
        q.includes("hey")
    ) {

        return `Hello! 👋

I'm your **StudyPilot AI Assistant**.

I can help you with:

💡 Explain difficult topics
📚 Summarize your material
❓ Solve study doubts
📝 Generate important questions
🎯 Decide what to study
📊 Analyze your mistakes
🔄 Prepare quick revision
🎓 Prepare for the Master Exam

What would you like to do?`;

    }


    /* =================================================
       WHAT SHOULD I STUDY
    ================================================= */

    if (
        q.includes("what should i study") ||
        q.includes("study today") ||
        q.includes("study now") ||
        q.includes("what to study")
    ) {

        if (plan.length > 0) {

            const today =
                plan[0];

            return `🎯 **Your Study Recommendation**

**Topic:** ${today.chapter}

**Priority:** ${today.priority}

**Estimated Time:** ${today.duration}

### Recommended Routine

1. Understand the concept.
2. Create short notes.
3. Solve examples.
4. Practice PYQs.
5. Attempt AI questions.
6. Review your mistakes.

📚 **Reference:** ${
                today.reference ||
                "Your uploaded study material"
            }`;

        }


        const topics =
            getTopics(data);


        if (topics.length > 0) {

            return `🎯 **Start with these important topics**

${topics
    .slice(0, 5)
    .map(
        (topic, index) =>
            `${index + 1}. ${topic}`
    )
    .join("\n")}

Complete your **AI Analysis** and **Smart Study Plan** to get a detailed daily schedule.`;

        }


        return `Please upload your study material first.

Then I can recommend what you should study.`;

    }


    /* =================================================
       WEAK TOPICS
    ================================================= */

    if (
        q.includes("weak") ||
        q.includes("mistake") ||
        q.includes("improve") ||
        q.includes("wrong answer")
    ) {

        const weak =
            getWeakTopics(data);


        if (weak.length === 0) {

            return `📊 **No weak areas detected yet.**

Start an **AI Practice Test** first.

StudyPilot will track:

• Wrong answers
• Weak topics
• Accuracy
• Repeated mistakes
• Improvement percentage

Then I can recommend exactly what you should revise.`;

        }


        return `📊 **Your Current Weak Areas**

${weak
    .map(
        ([topic, count], index) =>
            `${index + 1}. **${topic}** — ${count} mistake(s)`
    )
    .join("\n")}

### Recommendation

Revise these topics before attempting the Master Exam.

Focus more time on topics with repeated mistakes.`;

    }


    /* =================================================
       SUMMARY
    ================================================= */

    if (
        q.includes("summary") ||
        q.includes("summarize") ||
        q.includes("revision") ||
        q.includes("revise")
    ) {

        if (!analysis.summary) {

            return `I don't have an AI analysis yet.

Please:

1. Upload your study material.
2. Complete AI Analysis.
3. Return here for personalized revision.`;

        }


        const topics =
            getTopics(data);


        return `📚 **Quick Revision**

${analysis.summary}

### Important Topics

${topics
    .slice(0, 10)
    .map(
        (topic, index) =>
            `${index + 1}. ${topic}`
    )
    .join("\n")}`;

    }


    /* =================================================
       QUESTIONS
    ================================================= */

    if (
        q.includes("question") ||
        q.includes("mcq") ||
        q.includes("practice") ||
        q.includes("quiz")
    ) {

        const topics =
            getTopics(data);


        if (!topics.length) {

            return `📝 I need your analyzed study material first.

Upload your material and complete **AI Analysis**.

Then StudyPilot can generate practice questions based on your topics.`;

        }


        return `📝 **Important Practice Areas**

Based on your analysis:

${topics
    .slice(0, 8)
    .map(
        (topic, index) =>
            `${index + 1}. ${topic}`
    )
    .join("\n")}

Go to **AI Practice** to test yourself.

Your incorrect answers will automatically be added to your improvement data.`;

    }


    /* =================================================
       STUDY PLAN
    ================================================= */

    if (
        q.includes("plan") ||
        q.includes("schedule") ||
        q.includes("routine") ||
        q.includes("timetable")
    ) {

        if (!plan.length) {

            return `📅 Your personalized study plan has not been created yet.

Please complete:

**Upload → AI Analysis → Smart Study Plan**

Then I can help you follow the plan.`;

        }


        return `📅 **Your Smart Study Plan**

${plan
    .slice(0, 7)
    .map(
        item =>
            `**Day ${item.day}:** ${item.chapter} — ${item.duration}`
    )
    .join("\n")}

Follow this cycle:

📖 Learn → 📝 Notes → 📚 PYQ → 🧠 Practice → 🔄 Revision`;

    }


    /* =================================================
       MASTER EXAM
    ================================================= */

    if (
        q.includes("master exam") ||
        q.includes("final exam") ||
        q.includes("mock exam")
    ) {

        return `🎓 **StudyPilot Master Exam**

Your final assessment is designed as a **3-hour exam**.

It can include:

• MCQs
• Short-answer questions
• Long-answer questions
• Application/problem-solving questions
• Questions based on important concepts
• Questions inspired by PYQ patterns

### Before attempting it

✓ Complete your study plan
✓ Practice important topics
✓ Review mistakes
✓ Revise weak areas

Then start the Master Exam.`;

    }


    /* =================================================
       MATERIALS
    ================================================= */

    if (
        q.includes("uploaded") ||
        q.includes("documents") ||
        q.includes("my material")
    ) {

        if (!materials.length) {

            return `📚 You haven't uploaded any study material yet.`;

        }


        return `📚 **Your Study Material**

${materials
    .map(
        item =>
            `• ${item.name}`
    )
    .join("\n")}

These materials are being used by the StudyPilot workflow.`;

    }


    /* =================================================
       PROGRESS
    ================================================= */

    if (
        q.includes("progress") ||
        q.includes("performance") ||
        q.includes("accuracy") ||
        q.includes("score")
    ) {

        const attempted =
            practice.attempted || 0;

        const correct =
            practice.correct || 0;

        const accuracy =
            practice.accuracy || 0;


        return `📊 **Your StudyPilot Progress**

**Questions Attempted:** ${attempted}

**Correct Answers:** ${correct}

**Accuracy:** ${accuracy}%

**Wrong Answers:** ${
            practice.wrong || 0
        }

Keep practicing and review your mistakes regularly.`;

    }


    /* =================================================
       HELP
    ================================================= */

    if (
        q.includes("help") ||
        q.includes("can you help")
    ) {

        return `🤖 **Of course!**

I can help you with:

💡 Explain a difficult topic
📚 Summarize study material
📝 Generate questions
🎯 Create a study routine
📊 Find weak areas
🔄 Prepare revision
🎓 Prepare for the Master Exam

Just tell me what you need.`;

    }


    /* =================================================
       DEFAULT
    ================================================= */

    return `🤖 I can help you with your StudyPilot journey.

Try asking:

• **What should I study today?**
• **Explain my weak topics**
• **Summarize my material**
• **Generate important questions**
• **Make my study plan**
• **Show my progress**
• **How should I prepare for the Master Exam?**

For true open-ended AI answers about the exact content of your PDFs, connect this interface to your AI backend.`;

}


/* =====================================================
   SEND MESSAGE
===================================================== */

async function sendMessage(text) {

    text =
        text.trim();


    if (!text) {

        return;

    }


    addMessage(
        text,
        "user"
    );


    input.value = "";

    input.style.height =
        "auto";

    sendBtn.disabled =
        true;


    showTyping();


    /*
       Simulated AI thinking time.
       Replace this with fetch()
       when connecting your backend.
    */

    await new Promise(
        resolve =>
            setTimeout(
                resolve,
                650
            )
    );


    removeTyping();


    const response =
        generateLocalResponse(
            text
        );


    addMessage(
        response,
        "ai"
    );


    sendBtn.disabled =
        false;

    input.focus();

}


/* =====================================================
   FORM SUBMISSION
===================================================== */

form.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        sendMessage(
            input.value
        );

    }
);


/* =====================================================
   ENTER TO SEND
   SHIFT + ENTER = NEW LINE
===================================================== */

input.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            sendMessage(
                input.value
            );

        }

    }
);


/* =====================================================
   AUTO RESIZE INPUT
===================================================== */

input.addEventListener(
    "input",
    function() {

        input.style.height =
            "auto";

        input.style.height =
            Math.min(
                input.scrollHeight,
                110
            ) + "px";

    }
);


/* =====================================================
   QUICK HELP BUTTONS
===================================================== */

document
    .querySelectorAll(
        "[data-prompt]"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            function() {

                document
                    .querySelectorAll(
                        ".quick"
                    )
                    .forEach(item =>
                        item.classList.remove(
                            "active"
                        )
                    );


                if (
                    button.classList.contains(
                        "quick"
                    )
                ) {

                    button.classList.add(
                        "active"
                    );

                }


                sendMessage(
                    button.dataset.prompt
                );

            }
        );

    });


/* =====================================================
   CLEAR CHAT
===================================================== */

clearBtn.addEventListener(
    "click",
    function() {

        chat.innerHTML = "";

        addMessage(
            `Chat cleared. 👋

What would you like help with today?`,
            "ai"
        );

    }
);


/* =====================================================
   CONSOLE
===================================================== */

console.log(
    "%cStudyPilot AI Assistant",
    "font-size:22px;font-weight:bold;color:#6748e8;"
);

console.log(
    "Personalized AI Study Assistant initialized."
);
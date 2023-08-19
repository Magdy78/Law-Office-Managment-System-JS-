const sessionForm = document.getElementById("session-form");
const sessionCaseNameInput = document.getElementById("session-case-name");
const sessionDateInput = document.getElementById("session-date");
const sessionNumberInput = document.getElementById("session-number");
const sessionListContainer = document.getElementById("session-list-container");

sessionForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const sessionCaseName = sessionCaseNameInput.value;
    const sessionDate = sessionDateInput.value;
    const sessionNumber = sessionNumberInput.value;

    if (sessionCaseName && sessionDate && sessionNumber) {
        const newSession = { sessionCaseName, sessionDate, sessionNumber };
        sessions.push(newSession);
        saveSessionsToLocalStorage(); // Save to localStorage
        clearSessionFormInputs();
        renderSessionList();
    }
});

function clearSessionFormInputs() {
    sessionCaseNameInput.value = "";
    sessionDateInput.value = "";
    sessionNumberInput.value = "";
}

function renderSessionList() {
    // Load sessions from localStorage if available
    if (localStorage.getItem("sessions")) {
        sessions = JSON.parse(localStorage.getItem("sessions"));
    }

    sessionListContainer.innerHTML = "";

    sessions.forEach((session, index) => {
        const listItem = document.createElement("li");
        listItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center", "rtl");
        
        listItem.innerHTML = ` ${session.sessionCaseName} | ${session.sessionDate} | ${session.sessionNumber}
        <button class="btn btn-danger" data-index="${index}">حذف</button>`;
        
        sessionListContainer.appendChild(listItem);
    });

    addDeleteListeners(); // Call addDeleteListeners here
}

function addDeleteListeners() {
    console.log("Adding delete listeners...");

    const deleteButtons = document.querySelectorAll(".btn-danger");
    deleteButtons.forEach(button => {
        button.addEventListener("click", function () {
            console.log("Delete button clicked.");

            const index = parseInt(this.getAttribute("data-index"));
            sessions.splice(index, 1);
            saveSessionsToLocalStorage(); // Save to localStorage after deletion
            renderSessionList();
        });
    });
}

function saveSessionsToLocalStorage() {
    localStorage.setItem("sessions", JSON.stringify(sessions));
}

let sessions = [];

// Call renderSessionList() on page load
renderSessionList();

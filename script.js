const caseForm = document.getElementById("case-form");
const caseNameInput = document.getElementById("case-name");
const caseNumberInput = document.getElementById("case-number");
const caseYearInput = document.getElementById("case-year");
const caseTypeInput = document.getElementById("case-type");
const caseListContainer = document.getElementById("case-list-container");

caseForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const caseName = caseNameInput.value;
    const caseNumber = caseNumberInput.value;
    const caseYear = caseYearInput.value;
    const caseType = caseTypeInput.value;

    if (caseName && caseNumber && caseYear && caseType) {
        const newCase = { caseName, caseNumber, caseYear, caseType };
        cases.push(newCase);
        saveCasesToLocalStorage(); 
        clearFormInputs();
        renderCaseList();
    }
});

function clearFormInputs() {
    caseNameInput.value = "";
    caseNumberInput.value = "";
    caseYearInput.value = "";
    caseTypeInput.value = "";
}

function renderCaseList() {

    if (localStorage.getItem("cases")) {
        cases = JSON.parse(localStorage.getItem("cases"));
    }

    caseListContainer.innerHTML = "";

    cases.forEach((singleCase, index) => {
        const listItem = document.createElement("li");
        listItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center", "rtl");
        
        const caseTypeLabel = getCaseTypeLabel(singleCase.caseType);
        listItem.innerHTML = `
            ${singleCase.caseName} | ${singleCase.caseNumber} | ${singleCase.caseYear} | ${caseTypeLabel}
            <button class="btn btn-danger" data-index="${index}">حذف</button>`;
        
        caseListContainer.appendChild(listItem);
    });

    addDeleteListeners();
}

function saveCasesToLocalStorage() {
    localStorage.setItem("cases", JSON.stringify(cases));
}

function addDeleteListeners() {
    const deleteButtons = document.querySelectorAll(".btn-danger");
    deleteButtons.forEach(button => {
        button.addEventListener("click", function () {
            const index = parseInt(this.getAttribute("data-index"));
            cases.splice(index, 1);
            saveCasesToLocalStorage(); // Save to localStorage after deletion
            renderCaseList();
        });
    });
}

function getCaseTypeLabel(caseType) {
    switch (caseType) {
        case "1":
            return "مدني";
        case "2":
            return "مساكن";
        case "3":
            return "أحوال";
        default:
            return "غير معروف";
    }
}

let cases = []; 

renderCaseList();

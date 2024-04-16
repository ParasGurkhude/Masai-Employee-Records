
let Form = document.querySelector("form");
let tbody = document.querySelector("tbody");

loadLocalstorageData();

Form.addEventListener("submit", function(e) {
    e.preventDefault();
    let name = document.getElementById("name").value;
    let employeeID = document.getElementById("employeeID").value;
    let department = document.getElementById("department").value;
    let experience = document.getElementById("exp").value;
    let email = document.getElementById("email").value;
    let mobile = document.getElementById("mbl").value;

    let role = calculateRole(experience);

    let trow = document.createElement('tr');
    let td1 = document.createElement("td");
    td1.innerHTML = name;
    let td2 = document.createElement("td");
    td2.innerHTML = employeeID;
    let td3 = document.createElement("td");
    td3.innerHTML = department;
    let td4 = document.createElement("td");
    td4.innerHTML = experience;
    let td5 = document.createElement("td");
    td5.innerHTML = email;
    let td6 = document.createElement("td");
    td6.innerHTML = mobile;
    let td7 = document.createElement("td");
    td7.innerHTML = role;
    let td8 = document.createElement("td");
    let deleteButton = document.createElement("button");
    deleteButton.id = 'btn'
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", function(event) {
        deleteRow(event);
    });
    td8.append(deleteButton);
    trow.append(td1,td2,td3,td4,td5,td6,td7,td8);
    tbody.append(trow);

    savetoLocalStorage();
    Form.reset();
});

function calculateRole(experience) {
    if (experience > 5) {
        return "Senior";
    } else if (experience >= 2 && experience <= 5) {
        return "Junior";
    } else {
        return "Fresher";
    }
}

function deleteRow(event) {
    let row = event.target.closest("tr");
    row.remove();
    savetoLocalStorage();
}

function savetoLocalStorage() {
    let rows = tbody.querySelectorAll("tr");

    const data = [];

    rows.forEach((row) => {
        let rowData = {
            name: row.cells[0].textContent,
            employeeID: row.cells[1].textContent,
            department: row.cells[2].textContent,
            experience: row.cells[3].textContent,
            email: row.cells[4].textContent,
            mobile: row.cells[5].textContent,
            role: row.cells[6].textContent
        };
        data.push(rowData);
    });

    localStorage.setItem("employeeData", JSON.stringify(data));
}

function loadLocalstorageData() {
    let storeData = JSON.parse(localStorage.getItem("employeeData"));

    storeData.forEach(data => {
        let trow = document.createElement('tr');
        let td1 = document.createElement("td");
        td1.innerHTML = data.name;
        let td2 = document.createElement("td");
        td2.innerHTML = data.employeeID;
        let td3 = document.createElement("td");
        td3.innerHTML = data.department;
        let td4 = document.createElement("td");
        td4.innerHTML = data.experience;
        let td5 = document.createElement("td");
        td5.innerHTML = data.email;
        let td6 = document.createElement("td");
        td6.innerHTML = data.mobile;
        let td7 = document.createElement("td");
        td7.innerHTML = data.role;
        let td8 = document.createElement("td");
        let deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.id = 'btn'
        deleteButton.addEventListener("click", function(event) {
            deleteRow(event);
        });
        td8.append(deleteButton);
        trow.append(td1,td2,td3,td4,td5,td6,td7,td8);
        tbody.append(trow);
    });
}

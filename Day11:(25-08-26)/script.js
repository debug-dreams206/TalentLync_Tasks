
let students = localStorage.getItem("StudentList")
    ? JSON.parse(localStorage.getItem("StudentList"))
    : [];
let selectedStudentId = null;
function checkUsersCount() {
    document.getElementById("result-cnt").innerHTML ="Total users: " + students.length;
}
function createStudent() {
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const branch = document.getElementById("branch").value;
    const marks = document.getElementById("marks").value;
    const status = document.getElementById("status").value;
    if (!name || !age || !branch || !marks || !status) {
        alert("Please fill all fields");
        return;
    }
    const student = {
        id: Date.now(),
        name: name,
        age: Number(age),
        branch: branch,
        marks: Number(marks),
        status: status
    };
    students.push(student);
    localStorage.setItem("StudentList", JSON.stringify(students));
    alert("Student Registered Successfully");
    clearStudentForm();
    getAllStudents();
}
function clearStudentForm() {
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("branch").value = "";
    document.getElementById("marks").value = "";
    document.getElementById("status").value = "";
    selectedStudentId = null;
    document.getElementById("register").value = "Register";
    document.getElementById("register").onclick = createStudent;
}
function loadStudents() {
    return localStorage.getItem("StudentList")
        ? JSON.parse(localStorage.getItem("StudentList"))
        : [];
}
function getAllStudents() {
    students = loadStudents();
    const tableBody = document.getElementById("studentTable");
    tableBody.innerHTML = "";
    students.forEach((student, index) => {
        tableBody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${student.name}</td>
                <td>${student.age}</td>
                <td>${student.branch}</td>
                <td>${student.marks}</td>
                <td>${student.status}</td>
                <td>
                    <button onclick="getStudentById(${student.id})">Edit</button>
                    <button onclick="deleteStudent(${student.id})">Delete</button>
                </td>
            </tr>
        `;
    });
}
function getStudentById(id) {
    const student = loadStudents().find(student => student.id == id);

    if (student) {
        document.getElementById("name").value = student.name;
        document.getElementById("age").value = student.age;
        document.getElementById("branch").value = student.branch;
        document.getElementById("marks").value = student.marks;
        document.getElementById("status").value = student.status;
        selectedStudentId = student.id;
        document.getElementById("register").value = "Update";
        document.getElementById("register").onclick = updateStudent;
    }
}
function updateStudent() {
    const index = students.findIndex(
        student => student.id == selectedStudentId
    );
    if (index != -1) {
        students[index].name = document.getElementById("name").value;
        students[index].age = Number(document.getElementById("age").value);
        students[index].branch = document.getElementById("branch").value;
        students[index].marks = Number(document.getElementById("marks").value);
        students[index].status = document.getElementById("status").value;
        localStorage.setItem("StudentList", JSON.stringify(students));
        alert("Student Updated Successfully");
        clearStudentForm();
        getAllStudents();
    }
}
function deleteStudent(id) {
    if (confirm("Are you sure you want to delete this student?")) {
        students = students.filter(student => student.id != id);
        localStorage.setItem("StudentList", JSON.stringify(students));
        alert("Student Deleted Successfully");
        getAllStudents();
    }
}

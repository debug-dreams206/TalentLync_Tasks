let students = [];
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
        name: name,
        age: age,
        branch: branch,
        marks: marks,
        status: status
    };
    students.push(student);
    alert("Student Registered Successfully");
    clearStudentForm();
    displayStudents();
}
function displayStudents() {
    const table = document.getElementById("studentTable");
    table.innerHTML = "";
    students.forEach((student, index) => {
        table.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${student.name}</td>
                <td>${student.age}</td>
                <td>${student.branch}</td>
                <td>${student.marks}</td>
                <td>${student.status}</td>
                <td>
                    <button onclick="editStudent(${index})">Edit</button>
                    <button onclick="deleteStudent(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}
function editStudent(index) {
    const student = students[index];
    document.getElementById("name").value = student.name;
    document.getElementById("age").value = student.age;
    document.getElementById("branch").value = student.branch;
    document.getElementById("marks").value = student.marks;
    document.getElementById("status").value = student.status;

    deleteStudent(index);
}
function deleteStudent(index) {
    students.splice(index, 1);
    displayStudents();
}
function clearStudentForm() {
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("branch").value = "";
    document.getElementById("marks").value = "";
    document.getElementById("status").value = "";
}
function checkStudentsCount() {
    console.log("Total Students:", students.length);
    console.table(students);
}


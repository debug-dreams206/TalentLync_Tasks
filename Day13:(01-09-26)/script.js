let students = localStorage.getItem("StudentsList")
    ? JSON.parse(localStorage.getItem("StudentsList"))
    : [];
function resetErrorMessages() {
    document.getElementById("nameError").innerHTML = "";
    document.getElementById("ageError").innerHTML = "";
    document.getElementById("branchError").innerHTML = "";
    document.getElementById("marksError").innerHTML = "";
    document.getElementById("statusError").innerHTML = "";
}
function clearStudentForm() {
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("branch").value = "";
    document.getElementById("marks").value = "";
    document.getElementById("status").value = "";
    document.getElementById("studentID").value = "";
    document.getElementById("formTitle").innerHTML = "Student Registration Form";
    document.getElementById("submitButton").value = "Register";
    resetErrorMessages();
}
function createStudent() {
    resetErrorMessages();
    const name = document.getElementById("name").value.trim();
    const age = document.getElementById("age").value;
    const branch = document.getElementById("branch").value;
    const marks = document.getElementById("marks").value;
    const status = document.getElementById("status").value;
    const namePattern = /^[A-Za-z ]{2,30}$/;
    const numberPattern = /^[0-9]+$/;
    let validationApprovalStatus = true;
    if (name === "") {
        document.getElementById("nameError").innerHTML = "Please enter student name";
        validationApprovalStatus = false;
    } else if (!namePattern.test(name)) {
        document.getElementById("nameError").innerHTML = "Only alphabets are allowed";
        validationApprovalStatus = false;
    }
    if (age === "") {
        document.getElementById("ageError").innerHTML = "Please enter age";
        validationApprovalStatus = false;
    } else if (!numberPattern.test(age)) {
        document.getElementById("ageError").innerHTML = "Only numbers are allowed";
        validationApprovalStatus = false;
    } else if (Number(age) < 18) {
        document.getElementById("ageError").innerHTML = "Minimum age should be 18";
        validationApprovalStatus = false;
    } else if (Number(age) > 100) {
        document.getElementById("ageError").innerHTML = "Age should be less than 100";
        validationApprovalStatus = false;
    }
    if (branch === "") {
        document.getElementById("branchError").innerHTML = "Please select department";
        validationApprovalStatus = false;
    }
    if (marks === "") {
        document.getElementById("marksError").innerHTML = "Please enter marks";
        validationApprovalStatus = false;
    } else if (!numberPattern.test(marks)) {
        document.getElementById("marksError").innerHTML = "Only numbers are allowed";
        validationApprovalStatus = false;
    } else if (Number(marks) < 0 || Number(marks) > 100) {
        document.getElementById("marksError").innerHTML = "Marks should be between 0 and 100";
        validationApprovalStatus = false;
    }
    if (status === "") {
        document.getElementById("statusError").innerHTML = "Please select status";
        validationApprovalStatus = false;
    }
    if (validationApprovalStatus) {
        const studentID = document.getElementById("studentID").value;
        if (studentID === "") {
            const student = {
                id: Date.now(),
                name: name,
                age: Number(age),
                branch: branch,
                marks: Number(marks),
                status: status
            };
            students.push(student);
            localStorage.setItem("StudentsList", JSON.stringify(students));
            alert("Student Registered Successfully");
        } else {
            const studentIndex = students.findIndex(
                student => student.id == studentID
            );
            if (studentIndex !== -1) {
                students[studentIndex].name = name;
                students[studentIndex].age = Number(age);
                students[studentIndex].branch = branch;
                students[studentIndex].marks = Number(marks);
                students[studentIndex].status = status;
                localStorage.setItem(
                    "StudentsList",
                    JSON.stringify(students)
                );
                alert("Student Updated Successfully");
            }
        }
        clearStudentForm();
        getAllStudents();
    }
}

function getAllStudents() {
    students = localStorage.getItem("StudentsList")
        ? JSON.parse(localStorage.getItem("StudentsList"))
        : [];

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
                    <button onclick="editStudent(${student.id})">Edit</button>
                    <button onclick="deleteStudent(${student.id})">Delete</button>
                </td>
            </tr>
        `;
    });
}

function editStudent(studentID) {
    const student = students.find(
        student => student.id == studentID
    );

    if (student) {
        document.getElementById("name").value = student.name;
        document.getElementById("age").value = student.age;
        document.getElementById("branch").value = student.branch;
        document.getElementById("marks").value = student.marks;
        document.getElementById("status").value = student.status;
        document.getElementById("studentID").value = student.id;
        document.getElementById("formTitle").innerHTML = "Edit Student Form";
        document.getElementById("submitButton").value = "Update";
    }
}
function deleteStudent(studentID) {
    const confirmDelete = confirm("Are you sure you want to delete?");

    if (confirmDelete) {
        students = students.filter(
            student => student.id != studentID
        );

        localStorage.setItem(
            "StudentsList",
            JSON.stringify(students)
        );

        getAllStudents();
        alert("Student Deleted Successfully");
    }
}
function checkUsersCount() {
    document.getElementById("result-cnt").innerHTML =
        "Total Users: " + students.length;

    console.log("Total Students:", students.length);
    console.table(students);
}

<!DOCTYPE html>
<html>
<head>
    <title>Email Storage</title>
</head>
<body>
    <h2>Email Registration</h2>
    <input type="email" id="email" placeholder="Enter your email">
    <button onclick="saveEmail()">Save Email</button>
    <button onclick="displayEmail()">Get Email</button>
    <button onclick="deleteEmail()">Delete Email</button>
    <p id="message"></p>
    <script>
        function saveEmail() {
            let emailValue = document.getElementById("email").value;
            loalStorage.setItem("emailAddress", emailValue);
            document.getElementById("message").innerHTML =
                "Email saved!";
        }
        function displayEmail() {
            let emailValue = localStorage.getItem("emailAddress");
            document.getElementById("message").innerHTML =
                "Saved Email: " + emailValue;
        }
        function deleteEmail() {
            localStorage.removeItem("emailAddress");
            document.getElementById("message").innerHTML =
                "Email deleted!";
        }
    </script>
</body>
</html>

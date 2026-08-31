function doCalculations() {
    const num1 = Number(document.getElementById("param1").value);
    const num2 = Number(document.getElementById("param2").value);
    const operation = document.getElementById("calcOptions").value;
    let result;
    if (operation == "add") {
        result = num1 + num2;
    } else if (operation == "subtract") {
        result = num1 - num2;
    } else if (operation == "multiply") {
        result = num1 * num2;
    } else if (operation == "divide") {
        result = num2 == 0 ? "Cannot divide by zero" : num1 / num2;
    } else if (operation == "modulus") {
        result = num2 == 0 ? "Cannot divide by zero" : num1 % num2;
    }
    document.getElementById("output").innerText = "Result: " + result;
}

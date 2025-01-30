document.addEventListener("DOMContentLoaded", function () {
    const expenseForm = document.getElementById("expense-form");
    const expenseList = document.getElementById("expense-list");
    const totalAmount = document.getElementById("total-amount");

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    function updateUI() {
        expenseList.innerHTML = "";
        let total = 0;

        expenses.forEach((expense, index) => {
            total += expense.amount;

            const li = document.createElement("li");
            li.innerHTML = `
                ${expense.name} - ₹${expense.amount} (${expense.category}) [${expense.date}]
                <button class="delete-btn" onclick="deleteExpense(${index})">X</button>
            `;
            expenseList.appendChild(li);
        });

        totalAmount.textContent = total;
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }

    window.deleteExpense = function (index) {
        expenses.splice(index, 1);
        updateUI();
    };

    expenseForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("expense-name").value;
        const amount = parseFloat(document.getElementById("expense-amount").value);
        const category = document.getElementById("expense-category").value;
        const date = document.getElementById("expense-date").value;

        if (!name || !amount || !category || !date) {
            alert("Please fill all fields.");
            return;
        }

        expenses.push({ name, amount, category, date });
        updateUI();

        expenseForm.reset();
    });

    updateUI();
});

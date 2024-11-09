document.addEventListener("DOMContentLoaded", () => {
    const loanForm = document.getElementById("loan-form");
    const loanList = document.getElementById("loan-ul");
    const repaymentForm = document.getElementById("repayment-form");

    // Handle Loan Form Submission
    loanForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const amountRequired = document.getElementById("amount-required").value;
        const loanTerm = document.getElementById("loan-term").value;

        const response = await fetch("http://localhost:5000/api/loan", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amountRequired: amountRequired,
                loanTerm: loanTerm,
            }),
        });

        if (response.ok) {
            alert("Loan request submitted successfully.");
            loadLoans();
        } else {
            alert("Error submitting loan request.");
        }
    });

    // Handle Repayment Form Submission
    repaymentForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const loanId = document.getElementById("loan-id").value;
        const repaymentAmount = document.getElementById("repayment-amount").value;

        const response = await fetch("http://localhost:5000/api/repayment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                loanId: loanId,
                amount: repaymentAmount,
            }),
        });

        if (response.ok) {
            alert("Repayment submitted successfully.");
            loadLoans();
        } else {
            alert("Error submitting repayment.");
        }
    });

    // Load Loans from Backend
    async function loadLoans() {
        const response = await fetch("http://localhost:5000/api/loan");
        const loans = await response.json();

        loanList.innerHTML = "";
        loans.forEach((loan) => {
            const li = document.createElement("li");
            li.textContent = `Loan ID: ${loan._id}, Amount: $${loan.amountRequired}, Term: ${loan.loanTerm} weeks, Status: ${loan.status}`;
            loanList.appendChild(li);
        });
    }

    // Load loans when the page loads
    loadLoans();
});

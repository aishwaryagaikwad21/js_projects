(function () {
    function dataInput() {
        const form = document.querySelector('.form')
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const data = {};

            formData.forEach((value, key) => {data[key] = value});
            console.log(typeof(data.term))
            if(typeof(data.amount) === 'string'){ //convert string to number
                data.amount = Number(data.amount.replace(/,/g, ""))
            }
            console.log(data)
            displayResults(data);
        })
    }

    function month_calculation(data) {
        //console.log(typeof(data.amount))
        const amountInput = parseFloat(data.amount);
        console.log(amountInput)
        const amount = amountInput < 1000 ? amountInput * 1000 : amountInput;
        const term = parseFloat(data.term)
        console.log(typeof(term))
        const rate = parseFloat(data.rate)
        const mortgage_type = data.mortgage_type

        let monthlyPayment = 0;
        if (mortgage_type === "repayment") {
            const n = term * 12;
            const monthlyRate = (rate / 100) / 12;
            monthlyPayment = amount * monthlyRate / (1 - Math.pow(1 + monthlyRate, -n));
        } else if (mortgage_type === "interest") {
            monthlyPayment = amount * (rate / 100) / 12
        }
        return monthlyPayment.toLocaleString("en-GB", {
            style: "currency",
            currency: "GBP",
            minimumFractionDigits: 2
        });
    }

    function overtime_amount(term, monthly_amount) {
        let monthAmount = parseFloat(monthly_amount.replace(/£|,/g, ""));
        const termMonths = parseFloat(term) * 12;
        const overtime_amount = termMonths * monthAmount;

        return overtime_amount.toLocaleString("en-GB", {
            style: "currency",
            currency: "GBP",
            minimumFractionDigits: 2
        });
    }

    function displayResults(data) {
        const parent = document.getElementById("results");
        parent.innerHTML = "";

        const your_result = document.createElement("h3");
        your_result.textContent = "Your Results";
        parent.appendChild(your_result);

        const info = document.createElement("p");
        info.className = "info";
        info.textContent = "Your results are shown below based on the information you provided. To adjust the results, edit the form and click 'calculate repayments' again";
        parent.appendChild(info);

        const calculation_card = document.createElement("div");
        calculation_card.className = "calculation_card";
        parent.appendChild(calculation_card);

        const monthly_repayments = document.createElement("p");
        monthly_repayments.textContent = "Your monthly repayments";
        calculation_card.appendChild(monthly_repayments);

        const monthly_amount_tag = document.createElement("h1");
        const monthly_amount = month_calculation(data);
        monthly_amount_tag.innerHTML = monthly_amount;
        calculation_card.appendChild(monthly_amount_tag);

        const overtime_repayments = document.createElement("p");
        overtime_repayments.textContent = "Total you'll repay over the term";
        calculation_card.appendChild(overtime_repayments);

        const overtime_amount_tag = document.createElement("h3");
        const overtime_total = overtime_amount(data.term, monthly_amount);
        overtime_amount_tag.innerHTML = overtime_total;
        calculation_card.appendChild(overtime_amount_tag);
    }

    dataInput();
})();



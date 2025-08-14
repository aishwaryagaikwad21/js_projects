
function dataInput(){
   const form = document.querySelector('.form')
    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        
        const formData = new FormData(form);
        
        const data = {};
        
        formData.forEach((value,key) => {
            data[key] = value;
        })
        displayResults(data);
    })
}

function month_calculation(data){
    console.log(data);
    const amountInput = parseFloat(data.amount);
    const amount = amountInput < 1000 ? amountInput * 1000 : amountInput;

    const term = parseFloat(data.term)
    const rate = parseFloat(data.rate)
    const mortgage_type = data.mortgage_type

    let monthlyPayment = 0;

    if(mortgage_type === "repayment"){
        const n = term * 12; // total months
        const monthlyRate = (rate / 100) / 12;
        monthlyPayment = amount * monthlyRate / (1 - Math.pow(1 + monthlyRate, -n));
    }

    else if(mortgage_type === "interest"){
        monthlyPayment = amount * (rate/100)/12
       
    }
    //format to Pounds
    const formatted = monthlyPayment.toLocaleString("en-GB", {
        style: "currency",
        currency: "GBP",
        minimumFractionDigits: 2
    })
    return formatted
}

function overtime_amount( term, monthly_amount){
    //console.log(monthly_amount)
    let monthAmount = parseFloat(monthly_amount.replace(/£|,/g, ""));
    const termMonths = parseFloat(term) * 12;
    const overtime_amount = termMonths * monthAmount;

    const formatted = overtime_amount.toLocaleString("en-GB", {
        style: "currency",
        currency: "GBP",
        minimumFractionDigits: 2
    })

    return formatted
}

function displayResults(data){
    //console.log(data)

    //remove default display
    const parent  = document.getElementById("results");
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }

    //new displau
    const your_result = document.createElement("h3");
    const textNode = document.createTextNode("Your Results")
    your_result.appendChild(textNode)
    parent.appendChild(your_result)

    const info = document.createElement("p")
    info.className = "info"
    const textNode_info = document.createTextNode("Your results are shown below based on the information you provided. To adjust the results, edit the form and click 'calculate repayments' again");
    info.appendChild(textNode_info)
    parent.appendChild(info)

    //display calculation
    const calculation_card = document.createElement("div");
    calculation_card.className = "calculation_card"
    parent.appendChild(calculation_card)

    const monthly_repayments = document.createElement("p");
    const textNode_m_r = document.createTextNode("Your monthly repayments");
    monthly_repayments.appendChild(textNode_m_r);
    calculation_card.appendChild(monthly_repayments);

    const monthly_amount_tag = document.createElement("h1");
    const monthly_amount = month_calculation(data)
    console.log(`${monthly_amount}`)
    monthly_amount_tag.innerHTML = monthly_amount;
    calculation_card.appendChild(monthly_amount_tag);

    const overtime_repayments = document.createElement("p");
    const textNode_o_r = document.createTextNode("Total you'll repay over the term");
    overtime_repayments.appendChild(textNode_o_r);
    calculation_card.appendChild(overtime_repayments)

    const overtime_amount_tag = document.createElement("h3");
    const overtime_total = overtime_amount(data.term, monthly_amount)
    console.log(overtime_total)
    overtime_amount_tag.innerHTML = overtime_total;
    calculation_card.appendChild(overtime_amount_tag)

}
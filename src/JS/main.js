const arr = [];
arr.push({
    Company: "Samsung",
    Model: "a12",
    Memory: "64",
    Price: "11",
    Quantity: 50,
    Rating: 4
});
//Creating an element
function create() {
    const company = document.getElementById("companyInput").value;
    const model = document.getElementById("modelInput").value;
    const memory = document.getElementById("memoryInput").value;
    const price = document.getElementById("priceInput").value;
    const checkbox = document.querySelector("form");
    checkbox.addEventListener("click", checkboxClick, false);
    const valid1 = "^[a-zA-Z0-9_]*$";
    if (!(company.match(valid1))) {
        document.getElementById("error").innerHTML = "Invalid";
    } else if (!(model.match(valid1))) {
        document.getElementById("error").innerHTML = "Invalid";
    } else if (company == '' || model == '' || memory == '' || price == '') {
        document.getElementById("error").innerHTML = "Enter values in all the fields";
    } else if (price < 0) {
        document.getElementById("error").innerHTML = "Invalid";
    }
    else {
        document.getElementById("error").innerHTML = "";
        arr.push({
            Company: company,
            Model: model,
            Memory: memory,
            Price: price,
            Quantity: 50,
            Rating: 4
        })
        display();
        updateDropdown();
    }
    //Displaying a table
}
function display() {
    let data = "";
    let count = 0;
    for (i = 0; i < arr.length; i++) {
        data += "<tr><td>" + "<input type=checkbox id=check" + count + ">" + "</td><td>" + arr[i].Company + "</td><td>" + arr[i].Model + "</td><td>" + arr[i].Memory + "</td><td>" + arr[i].Price + "</td><td>" + arr[i].Quantity + "</td><td>" + arr[i].Rating + "</td></tr>";
        count++;
    }
    document.getElementById("tbody").innerHTML = data;
}
function checkboxClick(event) {
    event.preventDefault();
}
//Searching for an element
function searching() {
    const checkbox1 = document.querySelector("#searchForm");
    checkbox1.addEventListener("click", checkboxClick, false);
    const f1 = document.getElementById("searchD").value;
    const f2 = document.getElementById("searchInput").value;
    let data = "";
    for (i = 0; i < arr.length; i++) {
        if (arr[i][f1] === f2) {
            data += "<tr><td>" + "</td><td>" + arr[i].Company + "</td><td>" + arr[i].Model + "</td><td>" + arr[i].Memory + "</td><td>" + arr[i].Price + "</td><td>" + arr[i].Quantity + "</td><td>" + arr[i].Rating + "</td></tr>";
        }
    }
    document.getElementById("tbody").innerHTML = data;
}
//Sorting the table on one of the parameters
function sort() {
    const checkbox2 = document.querySelector("#sortForm");
    checkbox2.addEventListener("click", checkboxClick, false);
    const sel = document.getElementById("selectD").value;
    const srt = document.getElementById("sortD").value;
    if (srt == "Ascending" && sel == "Company") {
        arr.sort((a, b) => {
            const na = a.Company.toLowerCase();
            const nb = b.Company.toLowerCase();
            if (na < nb) {
                return -1;
            }
            if (na > nb) {
                return 1;
            }
            return 0;
        })
    } else if (srt == "Ascending" && sel == "Model") {
        arr.sort((a, b) => {
            const na = a.Model.toLowerCase();
            const nb = b.Model.toLowerCase();
            if (na < nb) {
                return -1;
            }
            if (na > nb) {
                return 1;
            }
            return 0;
        })
    } else if (srt == "Ascending" && sel == "Memory") {
        arr.sort((a, b) => a.Memory - b.Memory);
    } else if (srt == "Ascending" && sel == "Price") {
        arr.sort((a, b) => a.Price - b.Price);
    } else if (srt == "Descending" && sel == "Company") {
        arr.sort((a, b) => {
            const na = a.Company.toLowerCase();
            const nb = b.Company.toLowerCase();
            if (na < nb) {
                return 1;
            }
            if (na > nb) {
                return -1;
            }
            return 0;
        })
    } else if (srt == "Descending" && sel == "Model") {
        arr.sort((a, b) => {
            const na = a.Model.toLowerCase();
            const nb = b.Model.toLowerCase();
            if (na < nb) {
                return 1;
            }
            if (na > nb) {
                return -1;
            }
            return 0;
        })
    } else if (srt == "Descending" && sel == "Memory") {
        arr.sort((a, b) => b.Memory - a.Memory);
    } else if (srt == "Descending" && sel == "Price") {
        arr.sort((a, b) => b.Price - a.Price);
    }
    display();
}
//Deleting a row
function deleteRow() {
    const len = arr.length;
    for (let i = 0, j = 0; i < len; i++, j++) {
        const cc = document.querySelector("#check" + i);
        if (cc.checked) {
            arr.splice(j, 1);
            j--;
        }
    }
    display();
    updateDropdown();
}
//Creating dropdown for Company+Model
function updateDropdown() {
    const len = arr.length;
    let updateId = document.getElementById("billD");
    let ud = "";
    for (let i = 0; i < len; i++) {
        ud += "<option>" + arr[i].Company + " " + arr[i].Model + "</option>";
    }
    document.getElementById("billD").innerHTML = ud;
    document.getElementById("prodD").innerHTML = ud;
    document.getElementById("updateD").innerHTML = ud;
}
//Function to update quantity of a product
function update() {
    const checkbox3 = document.querySelector("#updateForm");
    checkbox3.addEventListener("click", checkboxClick, false);
    const len = arr.length;
    const dvalue = document.getElementById("updateD").value;
    const inputUpdate = document.getElementById("inputUpdateID").value;
    if (inputUpdate < 0) {
        document.getElementById("errorUpdate").innerHTML = "Please enter valid quantity!";
    } else {
        document.getElementById("errorUpdate").innerHTML = "";
        for (i = 0; i < len; i++) {
            const x = arr[i].Company + " " + arr[i].Model;
            if (dvalue == x) {
                arr[i].Quantity = inputUpdate;
            }
        }
        display();
    }
}

//Function to create cart
const bill = [];
let total = 0;
function billGenerationAdd() {
    const checkbox4 = document.querySelector("#generateBill");
    checkbox4.addEventListener("click", checkboxClick, false);
    let pq = document.getElementById("inputQuantity").value;
    const sp = document.getElementById("billD").value
    let flag = 0;
    pq = pq * 1;
    if(pq < 0){
        document.getElementById("errorBill").innerHTML = "Please enter valid quantity!";
    }
    for (i = 0; i < arr.length; i++) {
        const sim = arr[i].Company + " " + arr[i].Model;
        if (sim == sp && arr[i].Quantity < pq) {
            document.getElementById("errorBill").innerHTML = "Out of Stock!";
        }
        else if (sim == sp && pq <= arr[i].Quantity) {
            document.getElementById("errorBill").innerHTML ="";
            for (j = 0; j < bill.length; j++) {
                if (bill[j].Product == sim) {
                    flag = 1;
                    bill[j].Quan += pq;
                    total += pq * arr[i].Price;
                }
            }
            if (flag == 0) {
                bill.push({
                    Product: sim,
                    Quan: pq
                })
                total += arr[i].Price * pq;
            }
            arr[i].Quantity -= pq;
        }
    }
    display();
}
//Function to generate bill
function generateBill() {
    console.log(bill + " " + total);
    let billData = "";
    for (i = 0; i < bill.length; i++) {
        billData += "<tr><td>" + bill[i].Product + "</td><td>" + bill[i].Quan + "</td></tr>";
    }
    document.getElementById("billtbody").innerHTML = billData;
    document.getElementById("total").innerHTML = total;
}
//Function to set the rating of a product
function rating() {
    const checkbox5 = document.querySelector("#ratingForm");
    checkbox5.addEventListener("click", checkboxClick, false);
    const sp = document.getElementById("prodD").value;
    const sr = document.getElementById("ratingD").value;
    for (i = 0; i < arr.length; i++) {
        const prod = arr[i].Company + " " + arr[i].Model;
        if (sp == prod) {
            arr[i].Rating = sr;
        }
    }
    display();
}
//Function to filter the data on the basis of min and max price
function rangeFilter() {
    const checkbox6 = document.querySelector("#filterForm");
    checkbox6.addEventListener("click", checkboxClick, false);
    let min = document.getElementById("minp").value;
    let max = document.getElementById("maxp").value;
    if (min < 0 || max < 0) {
        document.getElementById("errorMessage").innerHTML = "Please enter valid price!"
    } else {
        min = min * 1;
        max = max * 1;
        let dataFilter = "";
        for (i = 0; i < arr.length; i++) {
            console.log(min + " " + max + " " + arr[i].Price);
            if (arr[i].Price > min && arr[i].Price < max) {
                dataFilter += "<tr><td>" + arr[i].Company + "</td><td>" + arr[i].Model + "</td><td>" + arr[i].Memory + "</td><td>" + arr[i].Price + "</td><td>" + arr[i].Quantity + "</td><td>" + arr[i].Rating + "</td></tr>";
            }
        }
        document.getElementById("tbodyFilter").innerHTML = dataFilter;
    }
}



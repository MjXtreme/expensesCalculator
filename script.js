// all objects storing all expenses properties are stored here
var expenses = [];

var o = "";
var row;
// Creates variable for cells of all tables
var categoryCell;
var amountCell;
var payeeCell;
var dateCell;    
var deleteCell;

var i = 0;

var deleteButton = document.createElement("button");
// Stops execution of a function if stopExecution = true;
var stopExecution = false;

// This function pushes all properties of expenses entered by the user into the expenses array after making sure
// that the input are valid
function pushInput_To_Expenses() {

    

    var category        = document.getElementById("category").value;
    var amount          = document.getElementById("amount").value;
    var payee           = document.getElementById("payee").value;
    var date            = document.getElementById("date").value;

    var dateSplit       = date.split("-");
    var yearDate        = dateSplit[0];
    var monthDate       = dateSplit[1];
    var dayDate         = dateSplit[2];
    
    var dateUnit        = yearDate + monthDate + dayDate;
    
    var netAmount       = parseFloat(amount).toFixed(2);
    
    if (category.length == 0)
    {
        alert("Select a Category");
        stopExecution = true;
        return;
    }

    else if (amount < 0 || isNaN(amount) == true || amount.length == 0)
    {
        alert("invalid amount");
        stopExecution = true;
        return;
    }

    else if (date.length == 0)
    {
        alert("Enter a Date");
        stopExecution = true;
        return;
    }

    else if (payee.length == 0 )
    {
        alert("Enter the payee");
        stopExecution = true;
    } 

    expenses.push({
        category1:      category,
        amount1:        netAmount,
        payee1:         payee,
        date1:          date,
        dateUnit1:      dateUnit
    });

    create_Row_Insert_Values();
    push_Array_Into_Cells();
}

// Function to create new cells and rows at the end of the table
function create_Row_Insert_Values() {

    if (stopExecution == true)
    {
        return;
    }
        var table = document.getElementById("table1");
        
        row = table.insertRow(-1);
        

        categoryCell =  row.insertCell(0);
        amountCell =    row.insertCell(1);
        payeeCell =     row.insertCell(2);
        dateCell =      row.insertCell(3);
        deleteCell =    row.insertCell(4);
        pictureCell =   row.insertCell(5);         
}

// function to insert values and images into each cells for each property of the expenses object, except for dateunit
function push_Array_Into_Cells()
{
    if (stopExecution == true)
    {
        return;
    }

    for(i = 0; i < expenses.length ; i++)
        {
        categoryCell.innerHTML =    expenses[i].category1;
        amountCell.innerHTML =      "$" + expenses[i].amount1;
        payeeCell.innerHTML =       expenses[i].payee1;
        dateCell.innerHTML =        expenses[i].date1;
        deleteCell.innerHTML =      "<button onclick=" + 'remove_update(this);' + '>Remove</button>';

        if  (document.getElementById("category").value == 'Transportation')
            {
            pictureCell.innerHTML = "<img src='images/transportation.jpg' alt='Transportation' height = 30 width = 30></img>"; //setting the image of this category and size
            }
            else if (document.getElementById("category").value == 'Food')
            {
            pictureCell.innerHTML = "<img src='images/food.jpg' alt='food' height = 30 width = 30></img>";
            }
            else if (document.getElementById("category").value == 'Bills')
            {
            pictureCell.innerHTML = "<img src='images/Bills.jpg' alt='Bills' height = 30 width = 30></img>";
            }
            else if (document.getElementById("category").value == 'Entertainment')
            {
            pictureCell.innerHTML = "<img src='images/Entertainment.jpg' alt='Entertainment' height = 30 width = 30></img>";
            }
            else if (document.getElementById("category").value == 'Education')
            {
            pictureCell.innerHTML = "<img src='images/Education.jpg' alt='Education' height = 30 width = 30></img>";
            }
            else if (document.getElementById("category").value == 'Charity')
            {
            pictureCell.innerHTML = "<img src='images/Charity.jpg' alt='Charity' height = 30 width = 30></img>";
            }
            else if (document.getElementById("category").value == 'Groceries')
            {
            pictureCell.innerHTML = "<img src='images/Groceries.jpg' alt='Groceries' height = 30 width = 30></img>";
            }
            else if (document.getElementById("category").value == 'Others')
            {
            pictureCell.innerHTML = "<img src='images/Others.jpg' alt='Others' height = 30 width = 30></img>";
            }
        }

        document.getElementById("category").value = "Food";
        document.getElementById("amount").value =       "";
        document.getElementById("payee").value =        "";
}

// This function calculates the total expenses input in the first table
function calculateExpense() 
{
    var totalExpenses   = 0;
    var times100        = 0;
    
    //calculate total expense
    for (var p = 0; p < expenses.length; p++)
    {
        times100                 += parseInt(expenses[p].amount1 * 100);
        totalExpenses            = times100 / 100;
    }
    document.getElementById("totalexpenses").innerHTML  = "$" + totalExpenses;
}

// This function removes the object from the table and the array when the user clicks on the "remove" button
function remove_update(r)
{
    var i = r.parentNode.parentNode.rowIndex;
      
    document.getElementById("table1").deleteRow(i);
    expenses.splice(i - 1,1);        
}

// This function displays all expenses in a time period which is specified by the user
function showExpense()
{
    // var sumExpenses is the sum of all expenses in the time period
    var sumExpenses         = 0;
    //Reset table
    var table2              = document.getElementById("table2");
    table2.innerHTML        = "";

    //Calculate the date unit of the start period 
    var startDate               = document.getElementById("startdate").value; //2019-10-23
    var startDateSplit          = startDate.split("-");

    var startYear               = startDateSplit[0];
    var startMonth              = startDateSplit[1];
    var startDay                = startDateSplit[2];

    var startDateUnit           = startYear + startMonth + startDay;

    //Calculate the date unit of the end period
    var endDate                 = document.getElementById("enddate").value;
    var endDateSplit            = endDate.split("-");

    var endYear                 = endDateSplit[0];
    var endMonth                = endDateSplit[1];
    var endDay                  = endDateSplit[2];

    var endDateUnit             = endYear + endMonth + endDay;
    
    //inserting the required values into the rows created in table 2
    for (i = 0; i < expenses.length; i++) 
    {

        if (expenses[i].dateUnit1 >= startDateUnit && expenses[i].dateUnit1 <= endDateUnit)
        {       
        sumExpenses += parseInt(expenses[i].amount1);

        row = table2.insertRow(-1); 

        categoryCell =  row.insertCell(0);
        amountCell =    row.insertCell(1);
        payeeCell =     row.insertCell(2);
        dateCell =      row.insertCell(3);

        categoryCell.innerHTML =    expenses[i].category1;
        amountCell.innerHTML =      "$" + expenses[i].amount1;
        payeeCell.innerHTML =       expenses[i].payee1;
        dateCell.innerHTML =        expenses[i].date1;
        }

    }
    // At the last row, create a row that displays the sum of all expenses in the specified period
    row = table2.insertRow(-1);

    expenseSumCellLabel =       row.insertCell(0);
    expenseSumCell =            row.insertCell(1);

    expenseSumCellLabel.innerHTML    = "Total Expenses:";
    expenseSumCell.innerHTML         = "$" + sumExpenses;
}



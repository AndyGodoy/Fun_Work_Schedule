// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
    $(".saveBtn").on("click", function () {
        var timeBlockId = $(this).closest(".time-block").attr("id");
        var userInput = $(this).siblings(".description").val();
        localStorage.setItem(timeBlockId, userInput);
    });


    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    $(".time-block").each(function () {
        var timeBlockId = $(this).attr("id"); 
        var currentHour = dayjs().format("H");
        

        // Assign different class (past, present, future
        // each eleement hour needs to be compared to the current time to enable CSS styles
        // Class of "past"
        if (parseInt(timeBlockId.split("-")[1]) < currentHour) {
            $(this).addClass("past");
            $(this).removeClass("present future");

        // Class of "present"
        } else if (parseInt(timeBlockId.split("-")[1]) === currentHour) {
            $(this).addClass("present");
            $(this).removeClass("past future");

        // CLass of "future"
        } else {
            $(this).addClass("future");
            $(this).removeClass("past present");
        }
    });


    //
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    // purpose is to retrieve the data the user inputted from the browsers local storage
    // AND Display it in the time blocks field. 
    $(".time-block").each(function () {
        var timeBlockId = $(this).attr("id");
        var userInput = localStorage.getItem(timeBlockId);

        if (userInput) {
            $(this).find(".description").val(userInput);
        }
    });

    //
    // TODO: Add code to display the current date in the header of the page.
    // using Day.js to update the text content of the element id "currentDay" to display the current date 
    var currentDate = dayjs().format("dddd, MMMM D, YYYY");
    $("#currentDay").text(currentDate);
}); 
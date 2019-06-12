(function ($) {
    $(function () {

        $('.sidenav').sidenav();
        $('.parallax').parallax();

    }); // end of document ready
})(jQuery); // end of jQuery name space
// Grab the articles as a json
$.getJSON("/articles", function(data) {
    // For each one
    $("#download-button").trigger("click");
    $("#pageHeading").text("Tech News");
    $("#subHeading").text("Welcome to the best article scraper \n");

});
////// rendering to DOM
$("#download-button").on("click", function () {
    $("#articles").empty();
    $.ajax({
        method: "GET",
        url: "/articles",
    }).done(function (data) {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            // Display the apropos information on the page
            // $("#articles").append("<p data-chicken='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
            $("#articles").append(`
    <div class="col s12 m6">
      <div class="card">
        <div class="card-image">
          <img src="https://images.unsplash.com/photo-1517061493161-6f312d1c36d0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80">
          <span class="card-title">${data[i].title}</span>
          <a class="btn-floating btn-large halfway-fab waves-effect waves-light red"><i class="material-icons" data-chicken="${data[i]._id}" id="save">add</i></a>
        </div>
        <div class="card-content">
          <p class="truncate">${data[i].summary}</p>
                  <a class="waves-effect waves-light btn-small mt10" href="${data[i].link}"><i class="material-icons right">insert_link</i>Read More</a>

        </div>
                

      </div>
    </div>`)

        }
    });
});
/// Scraping new articles
$("#scrape").on("click", function () {
    $.ajax({
        method: "GET",
        url: "/scrape",
    }).done(function (data) {
        console.log(data);
        $("#download-button").trigger("click");
    })
});

/*
$("#save").on("click", function () {
    var thisId = $(this).attr("data-chicken");
    $.ajax({
        method: "POST",
        url: "/articles/save/" + thisId
    }).done(function (data) {
        window.location = "/"
    })
});
*/


// Whenever someone clicks a p tag   //// click---->>> button save article
$(document).on("click", "#save", function () {
    // Empty the notes from the note section
    // $("#notes").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-chicken");
    console.log(thisId);
    // Now make an ajax call for the Article
    $.ajax({
        method: "POST",
        url: "/articles/save/" + thisId
    })
    // With that done, add the note information to the page
        .done(function (data) {
            // console.log("after promise in update" + data);
            // window.location = "/";
            $("#download-button").trigger("click");
            /*// The title of the article
            $("#notes").append("<h2>" + data.title + "</h2>");
            // An input to enter a new title
            $("#notes").append("<input id='titleinput' name='title' >");
            // A textarea to add a new note body
            $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
            // A button to submit a new note, with the id of the article saved to it
            $("#notes").append("<button data-chicken='" + data._id + "' id='savenote'>Save Note</button>");

            // If there's a note in the article
            if (data.note) {
                // Place the title of the note in the title input
                $("#titleinput").val(data.note.title);
                // Place the body of the note in the body textarea
                $("#bodyinput").val(data.note.body);
            }
        });*/
        });
});

// Saved Articles page =======================>
$("#savedArticles").on("click", function () {
    $("#pageHeading").text("Saved Articles");
    $("#subHeading").text("You can add notes to your articles \nto keep track of them");
    $("#articles").empty();
    $.ajax({
        method: "GET",
        url: "/saved",
    }).done(function (data) {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            // Display the apropos information on the page
            // $("#articles").append("<p data-chicken='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
            $("#articles").append(`
    <div class="col s12 m6">
      <div class="card">
        <div class="card-image">
          <img src="https://images.unsplash.com/photo-1517061493161-6f312d1c36d0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80">
          <span class="card-title">${data[i].title}</span>
          <a class="btn-floating btn-large halfway-fab waves-effect waves-light red modal-trigger" href="#modal1"><i class="material-icons" data-chicken="${data[i]._id}" id="addNote">edit</i></a>
        </div>
        <div class="card-content">
          <p class="truncate">${data[i].summary}</p>
                  <a class="waves-effect waves-light btn-small mt10" href="${data[i].link}"><i class="material-icons right">insert_link</i>Read More</a>
                  <a class="waves-effect waves-light btn-small mt10 materialize-red right" href="${data[i].link}" id="deleteBtn"><i class="material-icons">delete_forever</i></a>

        </div>
                

      </div>
    </div>`)

        }
    });
});

//_-------__-_---__-_--_-_-__-_---_-__-_-__-_-_-_--_---_-__>>>>> //$('.modal-trigger').leanModal(); //,______
$(document).on("click", "#addNote", function (){
 // console.log($(this).attr("data-chicken"));

    let thisId = $(this).attr("data-chicken");


    $.ajax({
        method: "GET",
        url: "/notes/" + thisId,
        data: {
            text: $("#article_note").val().trim()
        }
    }).done(function(data) {
        // Log the response
        console.log("=====================================");
        // console.log(data[0]);
        let arrParsed = JSON.parse(data);
        arrParsed = arrParsed[0].notes;
        arrParsed.forEach((element) => {

            $(".saved_notes").append(element.body);
            $(".saved_notes").append("\n");
            console.log(element.body);
        });


        // Empty the notes section
        // $(".saved_notes").text(data);
        /*$("#article_note").val("");
        $("#modal1").modal().modal("close");
        $("#savedArticles").trigger("click");*/
        $('#modal1').modal().modal("open");
    });



// When you click the savenote button
$(document).on("click", "#saveNoteModal", () => {
    // Grab the id associated with the article from the submit button

    console.log("on modal id" + thisId);
    // Run a POST request to change the note, using what's entered in the inputs
    if (!$("#article_note")) {
        alert("please enter a note to save")
    }else {
        $.ajax({
            method: "POST",
            url: "/notes/save/" + thisId,
            data: {
                text: $("#article_note").val().trim()
            }
        }).done(function(data) {
            // Log the response
            console.log("response from server" + data);
            // Empty the notes section
            $("#article_note").val("");
            $("#modal1").modal().modal("close");
            $("#savedArticles").trigger("click");
        });
    }
    // Also, remove the values entered in the input and textarea for note entry
   /* $("#titleinput").val("");
    $("#bodyinput").val("");*/

});
});
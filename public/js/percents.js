// Get references to page elements
var $submitPercent = $("#submitPercent");
var $submitPercent = $("#submitPercent");
var $percentSource = $("#inputPercentSource");
var $percentAmount = $("#inputPercentAmount");
var $percentList = $("#percent-list");

// The API object contains methods for each kind of request we'll make
var API = {
  savePercent: function(percent) {
      console.log("savePercent function ran")
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/percents",
      data: JSON.stringify(percent)
    });
  },
  getPercent: function() {
      console.log("get percent function ran")
    return $.ajax({
      url: "api/percents",
      type: "GET"
    });
  },
  deletePercent: function(id) {
    return $.ajax({
      url: "api/percents/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshPercents = function() {
  location.reload();
    }


// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();
  console.log("handleFormSubmit function ran")

  var percent = {
    source: $("#inputPercentSource")
      .val()
      .trim(),
    amount: $("#inputPercentAmount")
      .val()
      .trim()
  };

  if (!(percent.source && percent.amount)) {
    alert("You must enter a percent source and amount.");
    return;
  }

  API.savePercent(percent).then(function() {
      refreshPercents();
  });
  
  $percentSource.val("");
  $percentAmount.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deletePercent(idToDelete).then(function() {
    refreshPercents();
  });
};

// Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);
$submitPercent.on("click", handleFormSubmit);
$percentList.on("click", ".delete", handleDeleteBtnClick);


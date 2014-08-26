/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.SubmitTicket.DateSubmitted_postRender = function (element, contentItem) {
    // Write code here.
    contentItem.dataBind("value", function (value) {
        if (value) {
            $(element).text(moment(value).format("MMM Do YYYY, h:mm a"));
        }
    });
};
myapp.SubmitTicket.ShowDevice_Tap_canExecute = function (screen) {
    // Write code here.
    return screen.Ticket.Category == "Hardware";
};
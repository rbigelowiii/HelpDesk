/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.AddTicket.DateSubmitted_postRender = function (element, contentItem) {
    // Write code here.
    contentItem.dataBind("value", function (value) {
        if (value) {
            $(element).text(moment(value).format("MMM Do YYYY, h:mm a"));
        }
    });
};
myapp.AddTicket.Details_postRender = function (element, contentItem) {
    // Write code here.
    $(element).closest("[data-role='page']").find(
        ".msls-close-button").hide();
};

myapp.AddTicket.Cancel_execute = function (screen) {
    // Write code here.
    myapp.cancelChanges();
};
myapp.AddTicket.ShowComments_Tap_execute = function (screen) {
    // Write code here.
    myapp.activeDataWorkspace.RCCHelpDeskInventoryData.saveChanges().then(function () {
        myapp.showAddEditTicketComment(null, {
            beforeShown: function (CommentDialog) {
                CommentDialog.TicketComment = new myapp.TicketComment();
                CommentDialog.TicketComment.Ticket = screen.Ticket;
            },
            afterClosed: function () {
                myapp.commitChanges();
            }
        });
    });
};
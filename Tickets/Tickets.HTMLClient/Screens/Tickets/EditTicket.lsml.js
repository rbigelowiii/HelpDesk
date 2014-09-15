/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.EditTicket.Details_postRender = function (element, contentItem) {
    // Write code here.
    $(element).closest("[data-role='page']").find(
            ".msls-close-button").hide();
};
myapp.EditTicket.Cancel_execute = function (screen) {
    // Write code here.
    myapp.cancelChanges();
};
myapp.EditTicket.ShowAddEditTicketComment_Tap_execute = function (screen) {
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
    })
};
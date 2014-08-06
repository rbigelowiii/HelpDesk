/// <reference path="~/GeneratedArtifacts/viewModel.js" />


myapp.AddEditTicket.DateSubmitted_postRender = function (element, contentItem) {
    // Write code here.
    contentItem.dataBind("value", function (value) {
        if (value) {
            $(element).text(moment(value).format("MMM Do YYYY, h:mm a"));
        }
    });
};
myapp.AddEditTicket.ShowAddEditTicketComment_Tap_execute = function (screen) {
    // Write code here.
    myapp.showAddEditTicketComment(null, {
        beforeShown: function (CommentDialog) {
            CommentDialog.TicketComment = new myapp.TicketComment();
            CommentDialog.TicketComment.Ticket = screen.Ticket;
        }, 
        afterClosed: function () {
            myapp.commitChanges();
        }
    });
};
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
    return screen.Ticket.Category == "Hardware" && (screen.DeviceType);
};
myapp.SubmitTicket.ShowDevice_Tap_execute = function (screen) {
    // Write code here.
    screen.showTab("Device");
};

myapp.SubmitTicket.Device_postRender = function (element, contentItem) {
    // Write code here.
    contentItem.screen.findContentItem(contentItem.screen.DeviceType).isVisible = true;
    contentItem.screen.details.displayName = "Select " + contentItem.screen.DeviceType;
};

myapp.SubmitTicket.ShowTicketComments1_Tap_canExecute = function (screen) {
    // Write code here.
    return screen.Ticket.Category != "Hardware";
};

myapp.SubmitTicket.ShowTicketComments1_Tap_execute = function (screen) {
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

myapp.SubmitTicket.Category_postRender = function (element, contentItem) {
    // Write code here.
    $(element).change(function () {
        contentItem.screen.findContentItem("DeviceType").isVisible = (contentItem.value == "Hardware");
    });
};
myapp.SubmitTicket.BackToDetails_execute = function (screen) {
    // Write code here.
    screen.showTab("Details");
};
myapp.SubmitTicket.ShowTicketComments_Tap_execute = function (screen) {
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
myapp.SubmitTicket.DeviceType_postRender = function (element, contentItem) {
    // Write code here.
    $(element).change(function () {
        contentItem.screen.findContentItem("ShowDevice").displayName = "Select " + contentItem.value;
    });
};
myapp.SubmitTicket.Roy_render = function (element, contentItem) {
    // Write code here.
    element.innerHTML = "<img src='Content/Images/Roy.jpg'>";
};
myapp.SubmitTicket.Yes_execute = function (screen) {
    // Write code here.
    screen.showTab("Details");
};
myapp.SubmitTicket.Cancel_execute = function (screen) {
    // Write code here.
    myapp.cancelChanges();
};
myapp.SubmitTicket.Splash_postRender = function (element, contentItem) {
    // Write code here.
    $(element).closest("[data-role='page']").find(
            ".msls-close-button").hide();
};

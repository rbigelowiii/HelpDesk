/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.ViewTicket.Details_postRender = function (element, contentItem) {
    // Write code here.
    var name = contentItem.screen.Ticket.details.getModel()[':@SummaryProperty'].property.name;
    contentItem.dataBind("screen.Ticket." + name, function (value) {
        contentItem.screen.details.displayName = moment(value).format("MMM Do YYYY, h:mm a");
    });
}


myapp.ViewTicket.DateSubmitted_postRender = function (element, contentItem) {
    // Write code here.
    contentItem.dataBind("value", function (value) {
        if (value) {
            $(element).text(moment(value).format("MMM Do YYYY, h:mm a"));
        }
    });
};

myapp.ViewTicket.created = function (screen) {
    // Write code here.
    screen.getCanUpdateTicket().then(function success() {
        screen.findContentItem("EditTicket").isVisible = true;
    }, function error() {
        screen.findContentItem("EditTicket").isVisible = false;
    });

    screen.getCanDelTicket().then(function success() {
        screen.findContentItem("DeleteTicket").isVisible = true;
    }, function error() {
        screen.findContentItem("DeleteTicket").isVisible = false;
    });

    screen.getCanAssignTicket().then(function success() {
        screen.findContentItem("AssignTicket").isVisible = true;
    }, function error() {
        screen.findContentItem("AssignTicket").isVisible = false;
    });

    screen.getCanCloseTicket().then(function success() {
        screen.findContentItem("CloseTicket").isVisible = true;
    }, function error() {
        screen.findContentItem("CloseTicket").isVisible = false;
    });

};

myapp.ViewTicket.Comments_postRender = function (element, contentItem) {
    // Write code here.
    element.innerHTML = contentItem.stringValue;
};
myapp.ViewTicket.CommentDate_postRender = function (element, contentItem) {
    // Write code here.
    contentItem.dataBind("value", function (value) {
        if (value) {
            $(element).text(moment(value).format("MMM Do YYYY, h:mm a"));
        }
    });
};
myapp.ViewTicket.DeleteTicket_execute = function (screen) {
    // Write code here.
    screen.Ticket.deleteEntity();
    screen.details.dataWorkspace.RCCHelpDeskInventoryData.saveChanges().then(function () {
        myapp.showScreen(screen.CallingScreen);
    });
};
myapp.ViewTicket.AssignTicket_execute = function (screen) {
    // Write code here.
    $(window).on("popupcreate", function (e) {
        $(e.target).popup({
            positionTo: "window"
        });
    });
    screen.showPopup("SelectTech");
};
myapp.ViewTicket.TechAssigned_execute = function (screen) {
    // Write code here.
    screen.Ticket.Tech = screen.Techs.selectedItem;
    screen.details.dataWorkspace.RCCHelpDeskInventoryData.saveChanges().then(function () {
        screen.closePopup("SelectTech");
        myapp.showScreen(screen.CallingScreen);
    });    
};
myapp.ViewTicket.CloseTicket_execute = function (screen) {
    // Write code here.
    screen.Ticket.Status = "Resolved";
    screen.details.dataWorkspace.RCCHelpDeskInventoryData.saveChanges().then(function () {
        myapp.showScreen(screen.CallingScreen);
    });
};
myapp.ViewTicket.EditTicket_Tap_execute = function (screen) {
    // Write code here.
    myapp.showAddEditTicket(screen.Ticket, {
        afterClosed: function () {
            myapp.showViewTicket(screen.Ticket, screen.CallingScreen);
        }
    });
};
myapp.ViewTicket.ShowAddEditTicketComment_Tap_execute = function (screen) {
    // Write code here.
    
    myapp.showAddEditTicketComment(null, {
        beforeShown: function (CommentDialog) {
            CommentDialog.TicketComment = new myapp.TicketComment();
            CommentDialog.TicketComment.Ticket = screen.Ticket;
        },
        afterClosed: function () {
            myapp.showViewTicket(screen.Ticket, screen.CallingScreen);
        }
    });
};
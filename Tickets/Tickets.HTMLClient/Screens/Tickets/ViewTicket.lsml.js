/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.ViewTicket.Details_postRender = function (element, contentItem) {
    // Write code here.
    var name = contentItem.screen.Ticket.details.getModel()[':@SummaryProperty'].property.name;
    contentItem.dataBind("screen.Ticket." + name, function (value) {
        contentItem.screen.details.displayName = moment(value).format("MMM Do YYYY, h:mm a");
    });
    $(element).closest("[data-role='page']").find(
        ".msls-back-button-contain").prepend(
        '<div class="subControl msls-back-button msls-large-icon msls-tap ui-btn ui-shadow ui-btn-corner-all ui-btn-icon-notext ui-btn-up-a" tabindex="0" data-icon="msls-back" data-iconpos="notext" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="a" title="Back"><span class="ui-btn-inner"><span class="ui-btn-text"><a class="id-element ui-btn ui-btn-up-a ui-shadow ui-btn-corner-all ui-mini" data-role="button" data-mini="true" data-theme="a" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span"><span class="ui-btn-inner"><span class="ui-btn-text">Back</span></span></a></span><span class="ui-icon ui-icon-msls-back ui-icon-shadow">&nbsp;</span></span></div>').click(
        function () {
            parent.history.back();
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
    $.getJSON("../Perms/UserPermissions/", function (data) {
        myapp.permissions = data;
    }).then(function () {

        screen.findContentItem("EditTicket").isVisible = myapp.permissions["LightSwitchApplication:UpdateTicket"];

        screen.findContentItem("DeleteTicket").isVisible = myapp.permissions["LightSwitchApplication:DeleteTicket"];

        screen.findContentItem("AssignTicket").isVisible = myapp.permissions["LightSwitchApplication:AssignTicket"];

        screen.findContentItem("CloseTicket").isVisible = myapp.permissions["LightSwitchApplication:UpdateTicket"];

    });

    if (screen.Ticket.EndUser) {
        screen.findContentItem("EndUser").isVisible = true;
    } else {
        screen.findContentItem("EndUser").isVisible = false;
    }

    if (screen.Ticket.KnowledgeBase) {
        screen.findContentItem("KnowledgeBase").isVisible = true;
    } else {
        screen.findContentItem("KnowledgeBase").isVisible = false;
    }
    if (screen.Ticket.Desktop) {
        screen.findContentItem("Desktop").isVisible = true;
    } else {
        screen.findContentItem("Desktop").isVisible = false;
    }
    if (screen.Ticket.Laptop) {
        screen.findContentItem("Laptop").isVisible = true;
    } else {
        screen.findContentItem("Laptop").isVisible = false;
    }
    if (screen.Ticket.Printer) {
        screen.findContentItem("Printer").isVisible = true;
    } else {
        screen.findContentItem("Printer").isVisible = false;
    }
    if (screen.Ticket.Tablet) {
        screen.findContentItem("Tablet").isVisible = true;
    } else {
        screen.findContentItem("Tablet").isVisible = false;
    }
    if (screen.Ticket.Tech) {
        screen.findContentItem("Tech").isVisible = true;
    } else {
        screen.findContentItem("Tech").isVisible = false;
    }
    if (screen.CallingScreen == "") {
        screen.CallingScreen = "Home";
    }
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
    screen.Ticket.Status = "Assigned";
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
    myapp.showEditTicket(screen.Ticket, {
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
myapp.ViewTicket.EndUser_postRender = function (element, contentItem) {
    // Write code here.
    $(element).find("div").css("color", "blue");
};
myapp.ViewTicket.KnowledgeBase_postRender = function (element, contentItem) {
    // Write code here.
    $(element).find("div").css("color", "blue");
};
myapp.ViewTicket.Desktop_postRender = function (element, contentItem) {
    // Write code here.
    $(element).find("div").css("color", "blue");
};
myapp.ViewTicket.Laptop_postRender = function (element, contentItem) {
    // Write code here.
    $(element).find("div").css("color", "blue");
};
myapp.ViewTicket.Printer_postRender = function (element, contentItem) {
    // Write code here.
    $(element).find("div").css("color", "blue");
};
myapp.ViewTicket.Tablet_postRender = function (element, contentItem) {
    // Write code here.
    $(element).find("div").css("color", "blue");
};
myapp.ViewTicket.Tech_postRender = function (element, contentItem) {
    // Write code here.
    $(element).find("div").css("color", "blue");
};
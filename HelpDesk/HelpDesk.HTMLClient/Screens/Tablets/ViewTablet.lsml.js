/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.ViewTablet.Details_postRender = function (element, contentItem) {
    // Write code here.
    var name = contentItem.screen.Tablet.details.getModel()[':@SummaryProperty'].property.name;
    contentItem.dataBind("screen.Tablet." + name, function (value) {
        contentItem.screen.details.displayName = value;
    });
}


myapp.ViewTablet.Delete_execute = function (screen) {
    // Write code here.
    screen.Tablet.deleteEntity();
    screen.details.dataWorkspace.RCCHelpDeskInventoryData.saveChanges().then(function () {
        myapp.cancelChanges();
    });
};

myapp.ViewTablet.Recycle_execute = function (screen) {
    // Write code here.
    screen.Tablet.Recycled = true;
    screen.details.dataWorkspace.RCCHelpDeskInventoryData.saveChanges().then(function () {
        myapp.showBrowseTablets();
    });
};
myapp.ViewTablet.ShowAddEditTicket_Tap_execute = function (screen) {
    // Write code here.
    myapp.showAddEditTicket(null, {
        beforeShown: function (TicketScreen) {
            var newTicket = new myapp.Ticket();
            TicketScreen.Ticket = newTicket;
            newTicket.Tablet = screen.Tablet;
            msls.promiseOperation(CallGetUserName).then(function PromiseSuccess(PromiseResult) {
                myapp.activeDataWorkspace.RCCHelpDeskInventoryData.Techs_SingleOrDefault(PromiseResult)
                    .execute()
                    .then(function (result) {
                        newTicket.Tech = result.results[0];
                    });
            });
        }, afterClosed: function (addEditScreen, navigationAction) {
            if (navigationAction === msls.NavigateBackAction.commit) {
                var newTicket = addEditScreen.Ticket;
                myapp.showViewTicket(newTicket, "BrowseLaptops");
            }
        }
    });
};

function CallGetUserName(operation) {
    $.ajax({
        type: 'post',
        data: {},
        url: '../GetUserName.ashx',
        success: operation.code(function AjaxSuccess(AjaxResult) {
            operation.complete(AjaxResult);
        })
    });
}
myapp.ViewTablet.Tickets1_ItemTap_execute = function (screen) {
    // Write code here.
    myapp.showViewTicket(screen.Tickets.selectedItem, "BrowseTickets", {
        afterClosed: function () {
            screen.Tickets.load();
        }
    });
};
myapp.ViewTablet.DateSubmitted_postRender = function (element, contentItem) {
    // Write code here.
    contentItem.dataBind("value", function (value) {
        if (value) {
            $(element).text(moment(value).format("MMM Do YYYY, h:mm a"));
        }
    });
};
myapp.ViewTablet.created = function (screen) {
    // Write code here.
    screen.getCanUpdateDevice().then(function success() {
        screen.findContentItem("EditTablet").isVisible = true;
    }, function error() {
        screen.findContentItem("EditTablet").isVisible = false;
    });

    if (!screen.Tablet.Recycled) {
        screen.getCanRecycleDevice().then(function success() {
            screen.findContentItem("Recycle").isVisible = true;
        }, function error() {
            screen.findContentItem("Recycle").isVisible = false;
        });
    }

    screen.getCanDelDevice().then(function success() {
        screen.findContentItem("Delete").isVisible = true;
    }, function error() {
        screen.findContentItem("Delete").isVisible = false;
    });

};
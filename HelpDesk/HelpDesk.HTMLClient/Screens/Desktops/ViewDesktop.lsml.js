/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.ViewDesktop.Details_postRender = function (element, contentItem) {
    // Write code here.
    myapp.ac
    var name = contentItem.screen.Desktop.details.getModel()[':@SummaryProperty'].property.name;
    contentItem.dataBind("screen.Desktop." + name, function (value) {
        contentItem.screen.details.displayName = value;
    });
}


myapp.ViewDesktop.ShipDate_postRender = function (element, contentItem) {
    // Write code here.
    contentItem.dataBind("value", function (value) {
        if (value) {
            $(element).text(moment(value).format("MMM Do YYYY"));
        }
    });
};
myapp.ViewDesktop.WarrantyExp_postRender = function (element, contentItem) {
    // Write code here.
    contentItem.dataBind("value", function (value) {
        if (value) {
            $(element).text(moment(value).format("MMM Do YYYY"));
        }
    });
};
myapp.ViewDesktop.Tickets1_ItemTap_execute = function (screen) {
    // Write code here.
    myapp.showViewTicket(screen.Tickets.selectedItem, "BrowseTickets", {
        afterClosed: function () {
            screen.Tickets.load();
        }
    });
};
myapp.ViewDesktop.DateSubmitted_postRender = function (element, contentItem) {
    // Write code here.
    contentItem.dataBind("value", function (value) {
        if (value) {
            $(element).text(moment(value).format("MMM Do YYYY, h:mm a"));
        }
    });
};
myapp.ViewDesktop.created = function (screen) {
    // Write code here.
    screen.getCanUpdateDevice().then(function success() {
        screen.findContentItem("EditDesktop").isVisible = true;
    }, function error() {
        screen.findContentItem("EditDesktop").isVisible = false;
    });

    screen.getCanDelDevice().then(function success() {
        screen.findContentItem("Delete").isVisible = true;
    }, function error() {
        screen.findContentItem("Delete").isVisible = false;
    });

    if (!screen.Desktop.Recycled) {
        screen.getCanRecycleDevice().then(function success() {
            screen.findContentItem("Recycle").isVisible = true;
        }, function error() {
            screen.findContentItem("Recycle").isVisible = false;
        });
    }

    if (screen.Desktop.Brand.indexOf("Dell") != -1) {
        screen.findContentItem("SupportURL").isVisible = true;
        screen.SupportURL = "http://www.dell.com/support/my-support/us/en/04/product-support/servicetag/" + screen.Desktop.Serial;
    }
};
myapp.ViewDesktop.Recycle_execute = function (screen) {
    // Write code here.
    screen.Desktop.Recycled = true;
    screen.details.dataWorkspace.RCCHelpDeskInventoryData.saveChanges().then(function () {
        myapp.showBrowseDesktops();
    });
};
myapp.ViewDesktop.Delete_execute = function (screen) {
    // Write code here.
    screen.Desktop.deleteEntity();
    screen.details.dataWorkspace.RCCHelpDeskInventoryData.saveChanges().then(function () {
        myapp.cancelChanges();
    });
};
myapp.ViewDesktop.ShowAddEditTicket_Tap_execute = function (screen) {
    // Write code here.
    myapp.showAddEditTicket(null, {
        beforeShown: function (TicketScreen) {
            var newTicket = new myapp.Ticket();
            TicketScreen.Ticket = newTicket;
            newTicket.Desktop = screen.Desktop;
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
                myapp.showViewTicket(newTicket, "BrowseDesktops");
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

myapp.ViewDesktop.SupportURL_postRender = function (element, contentItem) {
    // Write code here.
    element.innerHTML = '<a href="' + contentItem.screen.SupportURL + '" target="_blank">' + contentItem.screen.SupportURL + '</a>';
};
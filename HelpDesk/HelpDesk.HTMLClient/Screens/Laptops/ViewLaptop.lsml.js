/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.ViewLaptop.Details_postRender = function (element, contentItem) {
    // Write code here.
    var name = contentItem.screen.Laptop.details.getModel()[':@SummaryProperty'].property.name;
    contentItem.dataBind("screen.Laptop." + name, function (value) {
        contentItem.screen.details.displayName = value;
    });
}


myapp.ViewLaptop.ShipDate_postRender = function (element, contentItem) {
    // Write code here.
    contentItem.dataBind("value", function (value) {
        if (value) {
            $(element).text(moment(value).format("MMM Do YYYY"));
        }
    });
};
myapp.ViewLaptop.WarrantyExp_postRender = function (element, contentItem) {
    // Write code here.
    contentItem.dataBind("value", function (value) {
        if (value) {
            $(element).text(moment(value).format("MMM Do YYYY"));
        }
    });
};
myapp.ViewLaptop.Delete_execute = function (screen) {
    // Write code here.
    screenscreen.Laptop.deleteEntity();
    screen.details.dataWorkspace.RCCHelpDeskInventoryData.saveChanges().then(function () {
        myapp.cancelChanges();
    });
};
myapp.ViewLaptop.Recycle_execute = function (screen) {
    // Write code here.
    screen.Laptop.Recycled = true;
    screen.details.dataWorkspace.RCCHelpDeskInventoryData.saveChanges().then(function () {
        myapp.showBrowseLaptops();
    });
};
myapp.ViewLaptop.DateSubmitted_postRender = function (element, contentItem) {
    // Write code here.
    contentItem.dataBind("value", function (value) {
        if (value) {
            $(element).text(moment(value).format("MMM Do YYYY, h:mm a"));
        }
    });
};
myapp.ViewLaptop.created = function (screen) {
    // Write code here.
    screen.getCanDelDevice().then(function success() {
        screen.findContentItem("Delete").isVisible = true;
    }, function error() {
        screen.findContentItem("Delete").isVisible = false;
    });
    if (!screen.Laptop.Recycled) {
        screen.getCanRecycleDevice().then(function success() {
            screen.findContentItem("Recycle").isVisible = true;
        }, function error() {
            screen.findContentItem("Recycle").isVisible = false;
        });
    }

    screen.getCanUpdateDevice().then(function success() {
        screen.findContentItem("EditLaptop").isVisible = true;
    }, function error() {
        screen.findContentItem("EditLaptop").isVisible = false;
    });

    if (screen.Laptop.Brand.indexOf("Dell") != -1) {
        screen.findContentItem("SupportURL").isVisible = true;
        screen.SupportURL = "http://www.dell.com/support/my-support/us/en/04/product-support/servicetag/" + screen.Laptop.Serial;
    }
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

myapp.ViewLaptop.ShowAddEditTicket_Tap_execute = function (screen) {
    // Write code here.
    myapp.showAddEditTicket(null, {
        beforeShown: function (TicketScreen) {
            var newTicket = new myapp.Ticket();
            TicketScreen.Ticket = newTicket;
            newTicket.Laptop = screen.Laptop;
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
myapp.ViewLaptop.SupportURL_postRender = function (element, contentItem) {
    // Write code here.
    element.innerHTML = '<a href="' + contentItem.screen.SupportURL + '" target="_blank">' + contentItem.screen.SupportURL + '</a>';
};
myapp.ViewLaptop.Tickets1_ItemTap_execute = function (screen) {
    // Write code here.
    myapp.showViewTicket(screen.Tickets.selectedItem, "BrowseLaptops", {
        afterClosed: function () {
            screen.Tickets.load();
        }
    });
};
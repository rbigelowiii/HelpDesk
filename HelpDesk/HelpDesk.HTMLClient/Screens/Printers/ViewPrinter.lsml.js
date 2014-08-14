/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.ViewPrinter.Details_postRender = function (element, contentItem) {
    // Write code here.
    var name = contentItem.screen.Printer.details.getModel()[':@SummaryProperty'].property.name;
    contentItem.dataBind("screen.Printer." + name, function (value) {
        contentItem.screen.details.displayName = value;
    });
}


myapp.ViewPrinter.Delete_execute = function (screen) {
    // Write code here.
    screen.Printer.deleteEntity();
    screen.details.dataWorkspace.RCCHelpDeskInventoryData.saveChanges().then(function () {
        myapp.cancelChanges();
    });
};
myapp.ViewPrinter.DateSubmitted_postRender = function (element, contentItem) {
    // Write code here.
    contentItem.dataBind("value", function (value) {
        if (value) {
            $(element).text(moment(value).format("MMM Do YYYY, h:mm a"));
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

myapp.ViewPrinter.created = function (screen) {
    // Write code here.
    screen.findContentItem("Delete").isVisible = myapp.permissions["LightSwitchApplication:DeleteDevice"];

    if (!screen.Printer.Recycled) {
        screen.findContentItem("Recycle").isVisible = myapp.permissions["LightSwitchApplication:RecycleDevice"];
    }

    screen.findContentItem("EditPrinter").isVisible = myapp.permissions["LightSwitchApplication:UpdateDevice"];
    
};
myapp.ViewPrinter.Recycle_execute = function (screen) {
    // Write code here.
    screen.Printer.Recycled = true;
    screen.details.dataWorkspace.RCCHelpDeskInventoryData.saveChanges().then(function () {
        myapp.showBrowsePrinters();
    });
};
myapp.ViewPrinter.ShowAddEditTicket_Tap_execute = function (screen) {
    // Write code here.
    myapp.showAddEditTicket(null, {
        beforeShown: function (TicketScreen) {
            var newTicket = new myapp.Ticket();
            TicketScreen.Ticket = newTicket;
            newTicket.Printer = screen.Printer;
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
                myapp.showViewTicket(newTicket, "BrowsePrinters");
            }
        }
    });
};
myapp.ViewPrinter.Tickets1_ItemTap_execute = function (screen) {
    // Write code here.
    myapp.showViewTicket(screen.Tickets.selectedItem, "BrowsePrinters", {
        afterClosed: function () {
            screen.Tickets.load();
        }
    });
};
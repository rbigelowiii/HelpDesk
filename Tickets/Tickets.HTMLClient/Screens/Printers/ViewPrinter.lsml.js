/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.ViewPrinter.Details_postRender = function (element, contentItem) {
    // Write code here.
    var name = contentItem.screen.Printer.details.getModel()[':@SummaryProperty'].property.name;
    contentItem.dataBind("screen.Printer." + name, function (value) {
        contentItem.screen.details.displayName = value;
    });
    $(element).closest("[data-role='page']").find(
        ".msls-back-button-contain").prepend(
        '<div class="subControl msls-back-button msls-large-icon msls-tap ui-btn ui-shadow ui-btn-corner-all ui-btn-icon-notext ui-btn-up-a" tabindex="0" data-icon="msls-back" data-iconpos="notext" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="a" title="Back"><span class="ui-btn-inner"><span class="ui-btn-text"><a class="id-element ui-btn ui-btn-up-a ui-shadow ui-btn-corner-all ui-mini" data-role="button" data-mini="true" data-theme="a" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span"><span class="ui-btn-inner"><span class="ui-btn-text">Back</span></span></a></span><span class="ui-icon ui-icon-msls-back ui-icon-shadow">&nbsp;</span></span></div>').click(
        function () {
            parent.history.back();
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
    $.getJSON("../Perms/UserPermissions/", function (data) {
        myapp.permissions = data;
    }).then(function () {
        screen.findContentItem("Delete").isVisible = myapp.permissions["LightSwitchApplication:DeleteDevice"];

        if (!screen.Printer.Recycled) {
            screen.findContentItem("Recycle").isVisible = myapp.permissions["LightSwitchApplication:RecycleDevice"];
        }

        screen.findContentItem("EditPrinter").isVisible = myapp.permissions["LightSwitchApplication:UpdateDevice"];
    });
    
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
    myapp.showAddTicket(null, {
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
myapp.ViewPrinter.EquipID_postRender = function (element, contentItem) {
    // Write code here.
    if ((contentItem.value) && contentItem.value.length == 5){
        element.innerHTML = '<a href="http://supplies.pacificoffice.com/rcc/search.php?search_query=' + contentItem.value + '" target="_blank">' + contentItem.value + '</a>';
    }
};
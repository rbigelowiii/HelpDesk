/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.ViewDesktop.Details_postRender = function (element, contentItem) {
    // Write code here.
    var name = contentItem.screen.Desktop.details.getModel()[':@SummaryProperty'].property.name;
    contentItem.dataBind("screen.Desktop." + name, function (value) {
        contentItem.screen.details.displayName = value;
    });
    $(element).closest("[data-role='page']").find(
        ".msls-back-button-contain").prepend(
        '<div class="subControl msls-back-button msls-large-icon msls-tap ui-btn ui-shadow ui-btn-corner-all ui-btn-icon-notext ui-btn-up-a" tabindex="0" data-icon="msls-back" data-iconpos="notext" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="a" title="Back"><span class="ui-btn-inner"><span class="ui-btn-text"><a class="id-element ui-btn ui-btn-up-a ui-shadow ui-btn-corner-all ui-mini" data-role="button" data-mini="true" data-theme="a" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span"><span class="ui-btn-inner"><span class="ui-btn-text">Back</span></span></a></span><span class="ui-icon ui-icon-msls-back ui-icon-shadow">&nbsp;</span></span></div>').click(
        function () {
            parent.history.back();
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
    screen.findContentItem("EditDesktop").isVisible = myapp.permissions["LightSwitchApplication:UpdateDevice"];

    screen.findContentItem("Delete").isVisible = myapp.permissions["LightSwitchApplicationDeleteDevice"];
    
    if (!screen.Desktop.Recycled) {
        screen.findContentItem("Recycle").isVisible = myapp.permissions["LightSwitchApplication:RecycleDevice"];
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
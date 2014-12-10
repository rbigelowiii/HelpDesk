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
    $.getJSON("../Perms/UserPermissions/", function (data) {
        myapp.permissions = data;
    }).then(function () {
        screen.findContentItem("EditDesktop").isVisible = myapp.permissions["LightSwitchApplication:UpdateDevice"];

        screen.findContentItem("Delete").isVisible = myapp.permissions["LightSwitchApplicationDeleteDevice"];

        if (!screen.Desktop.Recycled) {
            screen.findContentItem("Recycle").isVisible = myapp.permissions["LightSwitchApplication:RecycleDevice"];
        }
    });

    if (screen.Desktop.Brand.indexOf("Dell") != -1) {
        screen.findContentItem("SupportURL").isVisible = true;
        screen.SupportURL = "http://www.dell.com/support/my-support/us/en/04/product-support/servicetag/" + screen.Desktop.Serial;
    }
    screen.Brand = true;
    screen.ComputerName = true;
    screen.CPU = true;
    screen.EndUser = true;
    screen.HDD = true;
    screen.Location = true;
    screen.Model = true;
    screen.OS = true;
    screen.RAM = true;
    screen.Serial = true;
    screen.ShipDate = true;
    screen.WarrantyExp = true;
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
    myapp.showAddTicket(null, {
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
myapp.ViewDesktop.DetailReport_canExecute = function (screen) {
    // Write code here.
    return myapp.permissions["LightSwitchApplication:GenerateReport"];
};
myapp.ViewDesktop.DetailReport_execute = function (screen) {
    // Write code here.
    screen.showPopup("ReportFields");
};
myapp.ViewDesktop.PopupName_postRender = function (element, contentItem) {
    // Write code here.
    element.textContent = "Select Fields to include in report";
};
myapp.ViewDesktop.GenerateReport_execute = function (screen) {
    // Write code here.
    var fieldList = "";
    if (screen.Brand) { fieldList = fieldList.concat("&fields=Brand"); }
    if (screen.ComputerName) { fieldList = fieldList.concat("&fields=ComputerName"); }
    if (screen.CPU) { fieldList = fieldList.concat("&fields=CPU"); }
    if (screen.EndUser) { fieldList = fieldList.concat("&fields=EndUser1"); }
    if (screen.HDD) { fieldList = fieldList.concat("&fields=HDD"); }
    if (screen.Location) { fieldList = fieldList.concat("&fields=LocationName"); }
    if (screen.Model) { fieldList = fieldList.concat("&fields=Model"); }
    if (screen.OS) { fieldList = fieldList.concat("&fields=OperatingSystem1"); }
    if (screen.RAM) { fieldList = fieldList.concat("&fields=RAM"); }
    if (screen.Serial) { fieldList = fieldList.concat("&fields=Serial"); }
    if (screen.ShipDate) { fieldList = fieldList.concat("&fields=ShipDate"); }
    if (screen.WarrantyExp) { fieldList = fieldList.concat("&fields=WarrantyExp"); }

    window.open("..//reports/ExportToWord/Desktops/" + screen.Desktop.Serial + "?" + fieldList);
    screen.closePopup();
};
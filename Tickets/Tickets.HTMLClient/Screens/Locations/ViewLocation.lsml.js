/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.ViewLocation.Details_postRender = function (element, contentItem) {
    // Write code here.
    var name = contentItem.screen.Location.details.getModel()[':@SummaryProperty'].property.name;
    contentItem.dataBind("screen.Location." + name, function (value) {
        contentItem.screen.details.displayName = value;
    });
    $(element).closest("[data-role='page']").find(
        ".msls-back-button-contain").prepend(
        '<div class="subControl msls-back-button msls-large-icon msls-tap ui-btn ui-shadow ui-btn-corner-all ui-btn-icon-notext ui-btn-up-a" tabindex="0" data-icon="msls-back" data-iconpos="notext" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="a" title="Back"><span class="ui-btn-inner"><span class="ui-btn-text"><a class="id-element ui-btn ui-btn-up-a ui-shadow ui-btn-corner-all ui-mini" data-role="button" data-mini="true" data-theme="a" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span"><span class="ui-btn-inner"><span class="ui-btn-text">Back</span></span></a></span><span class="ui-icon ui-icon-msls-back ui-icon-shadow">&nbsp;</span></span></div>').click(
        function () {
            parent.history.back();
        });
}

myapp.ViewLocation.ShowAddEditDesktop_Tap_execute = function (screen) {
    // Write code here.
    myapp.showAddEditDesktop(null, {
        beforeShown: function (addEditScreen) {
            addEditScreen.Desktop = new myapp.Desktop();
            addEditScreen.Desktop.Location = screen.Location;
        },
        afterClosed: function (addEditScreen, navigationAction) {
            if (navigationAction === msls.NavigateBackAction.commit) {
                myapp.showViewDesktop(addEditScreen.Desktop);
            }
        }
    });
};

myapp.ViewLocation.ShowAddEditPrinter_Tap_execute = function (screen) {
    // Write code here.
    myapp.showAddEditPrinter(null, {
        beforeShown: function (addEditScreen) {
            addEditScreen.Printer = new myapp.Printer();
            addEditScreen.Printer.Location = screen.Location;
        },
        afterClosed: function (addEditScreen, navigationAction) {
            if (navigationAction === msls.NavigateBackAction.commit) {
                myapp.showViewPrinter(addEditScreen.Printer);
            }
        }
    });
};


myapp.ViewLocation.Desktops1_ItemTap_execute = function (screen) {
    // Write code here.
    myapp.showViewDesktop(screen.Desktops.selectedItem, {
        afterClosed: function () {
            screen.Desktops.load();
        }
    });
};

myapp.ViewLocation.Printers1_ItemTap_execute = function (screen) {
    // Write code here.
    myapp.showViewPrinter(screen.Printers.selectedItem, {
        afterClosed: function () {
            screen.Printers.load();
        }
    });
};
myapp.ViewLocation.created = function (screen) {
    // Write code here.
    $.getJSON("../Perms/UserPermissions/", function (data) {
        myapp.permissions = data;
    }).then(function () {
        screen.findContentItem("EditLocation").isVisible = myapp.permissions["LightSwitchApplication:UpdateLocation"];

        screen.findContentItem("ShowAddEditDesktop").isVisible = myapp.permissions["LightSwitchApplication:AddDevice"];

        screen.findContentItem("ShowAddEditPrinter").isVisible = myapp.permissions["LightSwitchApplication:AddDevice"];
    });
};
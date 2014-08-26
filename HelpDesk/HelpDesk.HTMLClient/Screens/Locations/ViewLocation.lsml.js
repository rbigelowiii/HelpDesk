/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.ViewLocation.Details_postRender = function (element, contentItem) {
    // Write code here.
    var name = contentItem.screen.Location.details.getModel()[':@SummaryProperty'].property.name;
    contentItem.dataBind("screen.Location." + name, function (value) {
        contentItem.screen.details.displayName = value;
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
    screen.findContentItem("EditLocation").isVisible = myapp.permissions["LightSwitchApplication:UpdateLocation"];

    screen.findContentItem("ShowAddEditDesktop").isVisible = myapp.permissions["LightSwitchApplication:AddDevice"];

    screen.findContentItem("ShowAddEditPrinter").isVisible = myapp.permissions["LightSwitchApplication:AddDevice"];
};
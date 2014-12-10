/// <reference path="~/GeneratedArtifacts/viewModel.js" />
/// <reference path="../GeneratedArtifacts/viewModel.js" />

var OSChoices = [];

myapp.AddDesktopShipment.Details_postRender = function (element, contentItem) {
    // Write code here.
    $(element).closest("[data-role='page']").find(
                ".msls-close-button").hide();
};
myapp.AddDesktopShipment.Save_execute = function (screen) {
    // Write code here.
    var serialArray = screen.Serials.split("\n");
    var i = 0;

    var addNewDesktop = function() {
        if (serialArray[i]) {
            var newDesktop = myapp.activeDataWorkspace.RCCHelpDeskInventoryData.Desktops.addNew();
            newDesktop.Serial = serialArray[i];
            newDesktop.Brand = screen.Brand;
            newDesktop.CPU = screen.CPU;
            newDesktop.HDD = screen.HDD;
            newDesktop.Model = screen.Model;
            newDesktop.RAM = screen.RAM;
            newDesktop.Recycled = false;
            newDesktop.ShipDate = screen.ShipDate;
            newDesktop.WarrantyExp = screen.WarrantyExp;
            myapp.activeDataWorkspace.RCCHelpDeskInventoryData.saveChanges().then(function () {
                i++;
                addNewDesktop();
            });
        } else {
            myapp.commitChanges();
        }
    };
    addNewDesktop();
};

myapp.AddDesktopShipment.Cancel_execute = function (screen) {
    // Write code here.
    myapp.cancelChanges();
};
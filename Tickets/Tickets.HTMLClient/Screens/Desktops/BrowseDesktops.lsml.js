/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.BrowseDesktops.SearchText_postRender = function (element, contentItem) {
    // Write code here.
    $searchBox = $("input", $(element));
    setTimeout(function () {
        $searchBox.focus();
    }, 1);

    onInputAsYouType(element, 1, function (text) {
        contentItem.screen.SearchText = text;
    });

    function onInputAsYouType(element, numberOfRequiredChars, done) {
        var inputbox = $("input", $(element));
        inputbox.on("input", function (e) {
            var text = $(this).val();
            if (text.length >= numberOfRequiredChars)
                done(text);
        });
    };
};
myapp.BrowseDesktops.SearchDesktops_ItemTap_execute = function (screen) {
    // Write code here.
    myapp.showViewDesktop(screen.SearchDesktops.selectedItem, {
        afterClosed: function () {
            screen.SearchDesktops.load();
        }
    });
};
myapp.BrowseDesktops.ShowAddEditDesktop_Tap_execute = function (screen) {
    // Write code here.
    myapp.showAddEditDesktop(null, {
        beforeShown: function (addEditScreen) {
            addEditScreen.Desktop = new myapp.Desktop();
        },
        afterClosed: function (addEditScreen, navigationAction) {
            if (navigationAction === msls.NavigateBackAction.commit) {
                myapp.showViewDesktop(addEditScreen.Desktop);
            }
        }
    });
};
myapp.BrowseDesktops.ShowAddEditDesktop_Tap_canExecute = function (screen) {
    // Write code here.
    return myapp.permissions["LightSwitchApplication:AddDevice"];
};
myapp.BrowseDesktops.DesktopList_postRender = function (element, contentItem) {
    // Write code here.
    $(element).closest("[data-role='page']").find(
        ".msls-back-button-contain").prepend(
        '<div class="subControl msls-back-button msls-large-icon msls-tap ui-btn ui-shadow ui-btn-corner-all ui-btn-icon-notext ui-btn-up-a" tabindex="0" data-icon="msls-back" data-iconpos="notext" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="a" title="Back"><span class="ui-btn-inner"><span class="ui-btn-text"><a class="id-element ui-btn ui-btn-up-a ui-shadow ui-btn-corner-all ui-mini" data-role="button" data-mini="true" data-theme="a" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span"><span class="ui-btn-inner"><span class="ui-btn-text">Back</span></span></a></span><span class="ui-icon ui-icon-msls-back ui-icon-shadow">&nbsp;</span></span></div>').click(
        function () {
            parent.history.back();
        });
    $(element).closest("[data-role='page']").find(".msls-home-button").hidden = true;
};
myapp.BrowseDesktops.GenerateReport_execute = function (screen) {
    // Write code here.
    screen.showPopup("ReportFields");
};
myapp.BrowseDesktops.GenerateReport_canExecute = function (screen) {
    // Write code here.
    return myapp.permissions["LightSwitchApplication:GenerateReport"];
};
myapp.BrowseDesktops.SelectFields_execute = function (screen) {
    // Write code here.
    var query = "";
    var fieldList = "";
    if (screen.SearchText) {
        query = "query=" + screen.SearchText;
    }
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

    window.open("..//reports/ExportToWord/Desktops?" + query + fieldList);
    screen.closePopup();
};
myapp.BrowseDesktops.created = function (screen) {
    // Write code here.
    $.getJSON("../Perms/UserPermissions/", function (data) {
        myapp.permissions = data;
    }).then(function () {
        screen.Brand = true;
        screen.Model = true;
        screen.Serial = true;
        screen.ComputerName = true;
        screen.Location = true;
    });
};
myapp.BrowseDesktops.PopUpName_postRender = function (element, contentItem) {
    // Write code here.
    element.textContent = "Select Fields to include in report";
};
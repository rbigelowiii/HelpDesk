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
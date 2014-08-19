/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.BrowseHelpFiles.AddHelpFiles_Tap_execute = function (screen) {
    // Write code here.
    myapp.showAddEditHelpFile(null, {
        beforeShown: function (addEditScreen) {
            addEditScreen.HelpFile = new myapp.HelpFile();
        },
        afterClosed: function (addEditScreen, navigationAction) {
            if (navigationAction === msls.NavigateBackAction.commit) {
                myapp.showViewHelpFile(addEditScreen.HelpFile);
            }
        }
    });
};
myapp.BrowseHelpFiles.HelpFiles_ItemTap_execute = function (screen) {
    // Write code here.
    myapp.showViewHelpFile(screen.HelpFiles.selectedItem, {
        afterClosed: function () {
            screen.HelpFiles.load();
        }
    });
};
myapp.BrowseHelpFiles.created = function (screen) {
    // Write code here.
    screen.getCanAddHelpFile().then(function success() {
        screen.findContentItem("AddHelpFile").isVisible = true;
    }, function error() {
        screen.findContentItem("AddHelpFile").isVisible = false;
    });
};
/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.BrowseOperatingSystems.created = function (screen) {
    // Write code here.
    screen.getCanAddOS().then(function success() {
        screen.findContentItem("AddOperatingSystem").isVisible = true;
    }, function error() {
        screen.findContentItem("AddOperatingSystem").isVisible = false;
    });
};

myapp.BrowseOperatingSystems.SearchText_postRender = function (element, contentItem) {
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
myapp.BrowseOperatingSystems.AddOperatingSystem_Tap_execute = function (screen) {
    // Write code here.
    myapp.showAddEditOperatingSystem(null, {
        beforeShown: function (addEditScreen) {
            addEditScreen.OperatingSystem = new myapp.OperatingSystem();
        },
        afterClosed: function (addEditScreen, navigationAction) {
            if (navigationAction === msls.NavigateBackAction.commit) {
                myapp.showViewOperatingSystem(addEditScreen.OperatingSystem);
            }
        }
    });
};
myapp.BrowseOperatingSystems.SearchOS_ItemTap_execute = function (screen) {
    // Write code here.
    myapp.showViewOperatingSystem(screen.SearchOS.selectedItem, {
        afterClosed: function () {
            screen.SearchOS.load();
        }
    });
};
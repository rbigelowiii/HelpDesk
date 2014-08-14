/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.BrowseLocations.created = function (screen) {
    // Write code here.
    screen.findContentItem("AddLocation").isVisible = myapp.permissions["LightSwitchApplication:AddLocation"];
};
myapp.BrowseLocations.SearchText_postRender = function (element, contentItem) {
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
myapp.BrowseLocations.AddLocation_Tap_execute = function (screen) {
    // Write code here.
    myapp.showAddEditLocation(null, {
        beforeShown: function (addEditScreen) {
            addEditScreen.Location = new myapp.Location();
        },
        afterClosed: function (addEditScreen, navigationAction) {
            if (navigationAction === msls.NavigateBackAction.commit) {
                myapp.showViewLocation(addEditScreen.Location);
            }
        }
    });
};
myapp.BrowseLocations.SearchLocations_ItemTap_execute = function (screen) {
    // Write code here.
    myapp.showViewLocation(screen.SearchLocations.selectedItem, {
        afterClosed: function () {
            screen.SearchLocations.load();
        }
    });
};
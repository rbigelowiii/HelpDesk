/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.BrowseEndUsers.SearchText_postRender = function (element, contentItem) {
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
myapp.BrowseEndUsers.created = function (screen) {
    // Write code here.
    screen.findContentItem("AddEndUser").isVisible = myapp.permissions["LightSwitchApplication:AddEndUser"];
};
myapp.BrowseEndUsers.AddEndUser_Tap_execute = function (screen) {
    // Write code here.
    myapp.showAddEditEndUser(null, {
        beforeShown: function (addEditScreen) {
            addEditScreen.EndUser = new myapp.EndUser();
        },
        afterClosed: function (addEditSCreen, navigationAction) {
            if (navigationAction === msls.NavigateBackAction.commit) {
                myapp.showViewEndUser(addEditScreen.EndUser);
            }
        }
    });
};
myapp.BrowseEndUsers.SearchEndUsers_ItemTap_execute = function (screen) {
    // Write code here.
    myapp.showViewEndUser(screen.SearchEndUsers.selectedItem, {
        afterclosed: function () {
            screen.SearchEndUsers.load();
        }
    });
};
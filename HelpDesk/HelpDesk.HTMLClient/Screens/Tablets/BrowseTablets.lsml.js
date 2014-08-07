/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.BrowseTablets.SearchText_postRender = function (element, contentItem) {
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
myapp.BrowseTablets.created = function (screen) {
    // Write code here.
    screen.getCanAddDevice().then(function success() {
        screen.findContentItem("AddTablet").isVisible = true;
    }, function error() {
        screen.findContentItem("AddTablet").isVisible = false;
    })
};
myapp.BrowseTablets.AddTablet_Tap_execute = function (screen) {
    // Write code here.
    myapp.showAddEditTablet(null, {
        beforeShown: function (addEditScreen) {
            addEditScreen.Tablet = new myapp.Tablet();
        },
        afterClosed: function (addEditScreen, navigationAction) {
            if (navigationAction === msls.NavigateBackAction.commit) {
                myapp.showViewTablet(addEditScreen.Tablet);
            }
        }
    });
};
myapp.BrowseTablets.SearchTablets_ItemTap_execute = function (screen) {
    // Write code here.
    myapp.showViewTablet(screen.SearchTablets.selectedItem, {
        afterClosed: function () {
            screen.SearchTablets.load();
        }
    });
};
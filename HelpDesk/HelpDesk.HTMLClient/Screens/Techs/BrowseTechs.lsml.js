/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.BrowseTechs.SearchText_postRender = function (element, contentItem) {
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
myapp.BrowseTechs.AddTech_Tap_execute = function (screen) {
    // Write code here.
    myapp.showAddEditTech(null, {
        beforeShown: function (addEditScreen) {
            addEditScreen.Tech = new myapp.Tech();
        },
        afterClosed: function (addEditScreen, navigationAction) {
            if (navigationAction === msls.NavigateBackAction.commit) {
                myapp.showViewTech(addEditScreen.Tech);
            }
        }
    });
};
myapp.BrowseTechs.created = function (screen) {
    // Write code here.
    screen.findContentItem("AddTech").isVisible = myapp.permissions["LightSwitchApplication:AddTech"];
};
myapp.BrowseTechs.SearchTechs_ItemTap_execute = function (screen) {
    // Write code here.
    myapp.showViewTech(screen.SearchTechs.selectedItem, {
        afterClosed: function () {
            screen.SearchTechs.load();
        }
    });
};
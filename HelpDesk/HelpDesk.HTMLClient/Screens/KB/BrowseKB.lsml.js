/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.BrowseKB.SearchText_postRender = function (element, contentItem) {
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
myapp.BrowseKB.AddKBItem_Tap_execute = function (screen) {
    // Write code here.
    myapp.showAddEditKBItem(null, {
        beforeShown: function (addEditScreen) {
            addEditScreen.KnowledgeBase = new myapp.KnowledgeBase();
        },
        afterClosed: function (addEditScreen, navigationAction) {
            if (navigationAction === msls.NavigateBackAction.commit) {
                myapp.showViewKBItem(addEditScreen.KnowledgeBase);
            }
        }
    });
};
myapp.BrowseKB.SearchKB_ItemTap_execute = function (screen) {
    // Write code here.
    myapp.showViewKBItem(screen.SearchKB.selectedItem, {
        afterClosed: function () {
            screen.SearchKB.load();
        }
    });
};
myapp.BrowseKB.created = function (screen) {
    // Write code here.
    screen.findContentItem("AddKBItem").isVisible = myapp.permissions["LightSwitchApplication:AddKnowledgeBase"];
};
/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.BrowsePrinters.AddPrinter_Tap_execute = function (screen) {
    // Write code here.
    myapp.showAddEditPrinter(null, {
        beforeShown: function (addEditScreen) {
            addEditScreen.Printer = new myapp.Printer();
        },
        afterClosed: function (addEditScreen, navigationAction) {
            if (navigationAction === msls.NavigateBackAction.commit) {
                myapp.showViewPrinter(addEditScreen.Printer);
            }
        }
    });
};
myapp.BrowsePrinters.SearchText_postRender = function (element, contentItem) {
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
myapp.BrowsePrinters.created = function (screen) {
    // Write code here.
    screen.findContentItem("AddPrinter").isVisible = myapp.permissions["LightSwitchApplication:AddDevice"];
};
myapp.BrowsePrinters.SearchPrinters_ItemTap_execute = function (screen) {
    // Write code here.
    myapp.showViewPrinter(screen.SearchPrinters.selectedItem, {
        afterClosed: function () {
            screen.SearchPrinters.load();
        }
    });
};
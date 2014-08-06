/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.BrowseLaptops.SearchText_postRender = function (element, contentItem) {
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
myapp.BrowseLaptops.created = function (screen) {
    // Write code here.
    screen.getCanAddDevice().then(function success() {
        screen.findContentItem("AddLaptop").isVisible = true;
    }, function error() {
        screen.findContentItem("AddLaptop").isVisible = false;
    });
};
myapp.BrowseLaptops.AddLaptop_Tap_execute = function (screen) {
    // Write code here.
    myapp.showAddEditLaptop(null, {
        beforeShown: function (addEditScreen) {
            addEditScreen.Laptop = new myapp.Laptop();
        },
        afterClosed: function (addEditScreen, navigationAction) {
            if (navigationAction === msls.NavigateBackAction.commit) {
                myapp.showViewLaptop(addEditScreen.Laptop);
            }
        }
    });
};
myapp.BrowseLaptops.SearchLaptops_ItemTap_execute = function (screen) {
    // Write code here.
    myapp.showViewLaptop(screen.SearchLaptops.selectedItem, {
        afterClosed: function () {
            screen.SearchLaptops.load();
        }
    });
};
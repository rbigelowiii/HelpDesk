/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.BrowseDeptHeads.SearchDeptHeads_ItemTap_execute = function (screen) {
    // Write code here.
    myapp.showViewDeptHead(screen.SearchDeptHeads.selectedItem, {
        afterClosed: function () {
            screen.SearchDeptHeads.load();
        }
    });
};
myapp.BrowseDeptHeads.SearchText_postRender = function (element, contentItem) {
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
myapp.BrowseDeptHeads.AddDeptHead_Tap_execute = function (screen) {
    // Write code here.
    myapp.showAddEditDeptHead(null, {
        beforeShown: function (addEditScreen) {
            addEditScreen.DeptHead = new myapp.DeptHead;
        },
        afterClosed: function (addEditScreen, navigationAction) {
            if (navigationAction === msls.NavigateBackAction.commit) {
                myapp.showViewDeptHead(addEditScreen.DeptHead);
            }
        }
    });
};
myapp.BrowseDeptHeads.created = function (screen) {
    // Write code here.
    screen.getCanAddDeptHead().then(function success() {
        screen.findContentItem("AddDeptHead").isVisible = true;
    }, function error() {
        screen.findContentItem("AddDeptHead").isVisible = false;
    });
};
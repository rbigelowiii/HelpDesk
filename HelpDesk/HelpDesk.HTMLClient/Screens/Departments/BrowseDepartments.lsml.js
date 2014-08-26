/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.BrowseDepartments.AddDepartment_Tap_execute = function (screen) {
    // Write code here.
    myapp.showAddEditDepartment(null, {
        beforeShown: function (addEditScreen) {
            addEditScreen.Department = new myapp.Department();
        },
        afterClosed: function (addEditScreen, navigationAction) {
            if (navigationAction === msls.NavigateBackAction.commit) {
                myapp.showViewDepartment(addEditScreen.Department);
            }
        }
    });
};
myapp.BrowseDepartments.SearchDepartments_ItemTap_execute = function (screen) {
    // Write code here.
    myapp.showViewDepartment(screen.SearchDepartments.selectedItem, {
        afterClosed: function () {
            screen.SearchDepartments.load();
        }
    });
};
myapp.BrowseDepartments.created = function (screen) {
    // Write code here.
    screen.findContentItem("AddDepartment").isVisible = myapp.permissions["LightSwitchApplication:AddDepartment"];
    
};
myapp.BrowseDepartments.SearchText_postRender = function (element, contentItem) {
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
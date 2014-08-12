/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.SelectEndUser.created = function (screen) {
    // Write code here.
    var endusersVC = screen.SearchEndUsers, department = screen.Department;
    if (department) {
        endusersVC.addChangeListener("selectedItem", function () {
            endusersVC.selectedItem.Department = screen.Department;
            myapp.commitChanges();
        });
    }
};
myapp.SelectEndUser.SearchText_postRender = function (element, contentItem) {
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
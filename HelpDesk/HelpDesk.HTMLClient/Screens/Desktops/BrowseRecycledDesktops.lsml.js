/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.BrowseRecycledDesktops.SearchText_postRender = function (element, contentItem) {
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


myapp.BrowseRecycledDesktops.RecycledDesktops_ItemTap_execute = function (screen) {
    // Write code here.
    myapp.showViewDesktop(screen.RecycledDesktops.selectedItem, {
        afterClosed: function () {
            screen.RecycledDesktops.load();
        }
    })
};
/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.BrowseRecycledTablets.RecycledTablets_ItemTap_execute = function (screen) {
    // Write code here.
    myapp.showViewTablet(screen.RecycledTablets.selectedItem, {
        afterClosed: function () {
            screen.RecycledTablets.load();
        }
    });
};
myapp.BrowseRecycledTablets.SearchText_postRender = function (element, contentItem) {
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
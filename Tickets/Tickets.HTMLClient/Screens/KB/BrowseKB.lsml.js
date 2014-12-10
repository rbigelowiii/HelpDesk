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
    $.getJSON("../Perms/UserPermissions/", function (data) {
        myapp.permissions = data;
    }).then(function () {
        screen.findContentItem("AddKBItem").isVisible = myapp.permissions["LightSwitchApplication:AddKnowledgeBase"];
    });
};
myapp.BrowseKB.KBItemList_postRender = function (element, contentItem) {
    // Write code here.
    $(element).closest("[data-role='page']").find(
            ".msls-back-button-contain").prepend(
            '<div class="subControl msls-back-button msls-large-icon msls-tap ui-btn ui-shadow ui-btn-corner-all ui-btn-icon-notext ui-btn-up-a" tabindex="0" data-icon="msls-back" data-iconpos="notext" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="a" title="Back"><span class="ui-btn-inner"><span class="ui-btn-text"><a class="id-element ui-btn ui-btn-up-a ui-shadow ui-btn-corner-all ui-mini" data-role="button" data-mini="true" data-theme="a" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span"><span class="ui-btn-inner"><span class="ui-btn-text">Back</span></span></a></span><span class="ui-icon ui-icon-msls-back ui-icon-shadow">&nbsp;</span></span></div>').click(
            function () {
                parent.history.back();
            });
};
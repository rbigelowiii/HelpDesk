/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.ViewKBItem.Details_postRender = function (element, contentItem) {
    // Write code here.
    var name = contentItem.screen.KnowledgeBase.details.getModel()[':@SummaryProperty'].property.name;
    contentItem.dataBind("screen.KnowledgeBase." + name, function (value) {
        contentItem.screen.details.displayName = value;
    });
}

myapp.ViewKBItem.ArticleText_postRender = function (element, contentItem) {
    // Write code here.
    element.innerHTML = contentItem.stringValue;
};

myapp.ViewKBItem.created = function (screen) {
    // Write code here.
    screen.findContentItem("EditKBItem").isVisible = myapp.permissions["LightSwitchApplication:UpdateKnowledgeBase"];
};
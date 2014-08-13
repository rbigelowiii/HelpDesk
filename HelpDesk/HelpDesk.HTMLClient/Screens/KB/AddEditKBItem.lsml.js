/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.AddEditKBItem.ArticleText_postRender = function (element, contentItem) {
    // Write code here.
    var textArea = $(element).find("textarea");
    textArea.htmlarea({
        toolbar: [
                ["bold", "italic", "underline", "forecolor"],
                ["h1", "h2", "h3"],
                ["indent", "outdent"],
                ["image", "link", "unlink", "horizontalrule"]
        ]
    });
    $(element).find("div").width(1024);
    var textFrame = $(element).find("iframe");
    textFrame.height(768);
    textFrame.width(1024);
};
myapp.AddEditKBItem.beforeApplyChanges = function (screen) {
    // Write code here.
    screen.KnowledgeBase.ArticleText = $("textarea").htmlarea("html");
};
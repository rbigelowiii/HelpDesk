/// <reference path="~/GeneratedArtifacts/viewModel.js" />
/// <reference path="../GeneratedArtifacts/data.js" />
/// <reference path="/Scripts/jHtmlArea-0.8.min.js"/>

myapp.AddEditTicketComment.CommentDate_postRender = function (element, contentItem) {
    // Write code here.
    contentItem.dataBind("value", function (value) {
        if (value) {
            $(element).text(moment(value).format("MMM Do YYYY, h:mm a"));
        }
    });
};
myapp.AddEditTicketComment.Comments_postRender = function (element, contentItem) {
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
    $(element).find("div").width(400);
    var textFrame = $(element).find("iframe");
    textFrame.height(350);
    textFrame.width(400);
};
myapp.AddEditTicketComment.beforeApplyChanges = function (screen) {
    // Write code here.
    screen.TicketComment.Comments = $("textarea").htmlarea("html");
};
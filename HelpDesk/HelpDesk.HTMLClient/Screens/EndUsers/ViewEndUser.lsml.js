/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.ViewEndUser.Details_postRender = function (element, contentItem) {
    // Write code here.
    var name = contentItem.screen.EndUser.details.getModel()[':@SummaryProperty'].property.name;
    contentItem.dataBind("screen.EndUser." + name, function (value) {
        contentItem.screen.details.displayName = value;
    });
}


myapp.ViewEndUser.DateSubmitted_postRender = function (element, contentItem) {
    // Write code here.
    contentItem.dataBind("value", function (value) {
        if (value) {
            $(element).text(moment(value).format("MMM Do YYYY, h:mm a"));
        }
    });
};

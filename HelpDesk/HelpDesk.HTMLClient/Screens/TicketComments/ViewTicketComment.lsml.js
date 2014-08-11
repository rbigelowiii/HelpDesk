/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.ViewTicketComment.Details_postRender = function (element, contentItem) {
    // Write code here.
    var name = contentItem.screen.TicketComment.details.getModel()[':@SummaryProperty'].property.name;
    contentItem.dataBind("screen.TicketComment." + name, function (value) {
        contentItem.screen.details.displayName = moment(value).format("MMM Do YYYY, h:mm a");
    });
}


myapp.ViewTicketComment.Comments_postRender = function (element, contentItem) {
    // Write code here.
    element.innerHTML = contentItem.stringValue;
};
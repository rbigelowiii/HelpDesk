/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.ViewOperatingSystem.Details_postRender = function (element, contentItem) {
    // Write code here.
    var name = contentItem.screen.OperatingSystem.details.getModel()[':@SummaryProperty'].property.name;
    contentItem.dataBind("screen.OperatingSystem." + name, function (value) {
        contentItem.screen.details.displayName = value;
    });
}


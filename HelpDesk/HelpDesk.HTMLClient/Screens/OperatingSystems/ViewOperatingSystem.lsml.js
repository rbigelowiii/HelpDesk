/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.ViewOperatingSystem.Details_postRender = function (element, contentItem) {
    // Write code here.
    var name = contentItem.screen.OperatingSystem.details.getModel()[':@SummaryProperty'].property.name;
    contentItem.dataBind("screen.OperatingSystem." + name, function (value) {
        contentItem.screen.details.displayName = value;
    });
}


myapp.ViewOperatingSystem.created = function (screen) {
    // Write code here.
    screen.findContentItem("EditOperatingSystem").isVisible = myapp.permissions["LightSwitchApplication:UpdateOS"];

    screen.findContentItem("Delete").isVisible = myapp.permissions["LightSwitchApplication:DeleteOS"];
};
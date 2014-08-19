/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.ViewHelpFiles.Details_postRender = function (element, contentItem) {
    // Write code here.
    var name = contentItem.screen.HelpFile.details.getModel()[':@SummaryProperty'].property.name;
    contentItem.dataBind("screen.HelpFile." + name, function (value) {
        contentItem.screen.details.displayName = value + " Help File";
    });
}

myapp.ViewHelpFile.Body_postRender = function (element, contentItem) {
    // Write code here.
    element.innerHTML = contentItem.stringValue;
};

myapp.ViewHelpFile.created = function (screen) {
    // Write code here.
    screen.findContentItem("EditHelpFile").isVisible = myapp.permissions["LightSwitchApplication:UpdateHelpFile"];
};
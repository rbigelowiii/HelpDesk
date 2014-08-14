/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.ViewDeptHead.Details_postRender = function (element, contentItem) {
    // Write code here.
    var name = contentItem.screen.DeptHead.details.getModel()[':@SummaryProperty'].property.name;
    contentItem.dataBind("screen.DeptHead.EndUser", function (value) {
        contentItem.screen.details.displayName = value.UserFirstName + " " + value.UserLastName;
    });
}

myapp.ViewDeptHead.Departments1_ItemTap_execute = function (screen) {
    // Write code here.
    myapp.showViewDepartment(screen.Departments.selectedItem, {
        afterClosed: function () {
            screen.Departments.load();
        }
    });
};
myapp.ViewDeptHead.created = function (screen) {
    // Write code here.
    screen.findContentItem("EditDeptHead").isVisible = myapp.permissions["LightSwitchApplicationUpdateDeptHead"];
};
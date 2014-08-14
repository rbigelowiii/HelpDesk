/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.ViewDepartment.Details_postRender = function (element, contentItem) {
    // Write code here.
    var name = contentItem.screen.Department.details.getModel()[':@SummaryProperty'].property.name;
    contentItem.dataBind("screen.Department." + name, function (value) {
        contentItem.screen.details.displayName = value;
    });
}


myapp.ViewDepartment.created = function (screen) {
    // Write code here.
    if(myapp.permissions["LightSwitchApplication:UpdateDepartment"]) {
        screen.findContentItem("EditDepartment").isVisible = true;
        screen.findContentItem("ShowAddEditEndUser").isVisible = true;
    }else{
        screen.findContentItem("EditDepartment").isVisible = false;
        screen.findContentItem("ShowAddEditEndUser").isVisible = false;
    }
    screen.DeptHeadLabel = "Department Head";
};
myapp.ViewDepartment.EndUsers1_ItemTap_execute = function (screen) {
    // Write code here.
    myapp.showViewEndUser(screen.EndUsers.selectedItem, {
        afterClosed: function () {
            screen.EndUsers.load();
        }
    });
};
myapp.ViewDepartment.EndUserAdd_execute = function (screen) {
    // Write code here.
    myapp.showSelectEndUser(screen.Department, {
        afterClosed: function () {
            screen.EndUsers.load();
        }
    });
};
myapp.ViewDepartment.DeptHeadLabel_postRender = function (element, contentItem) {
    // Write code here.
    $(element).css("font-weight", 700);
};
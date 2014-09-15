/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.ViewDepartment.Details_postRender = function (element, contentItem) {
    // Write code here.
    var name = contentItem.screen.Department.details.getModel()[':@SummaryProperty'].property.name;
    contentItem.dataBind("screen.Department." + name, function (value) {
        contentItem.screen.details.displayName = value;
    });
    $(element).closest("[data-role='page']").find(
        ".msls-back-button-contain").prepend(
        '<div class="subControl msls-back-button msls-large-icon msls-tap ui-btn ui-shadow ui-btn-corner-all ui-btn-icon-notext ui-btn-up-a" tabindex="0" data-icon="msls-back" data-iconpos="notext" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="a" title="Back"><span class="ui-btn-inner"><span class="ui-btn-text"><a class="id-element ui-btn ui-btn-up-a ui-shadow ui-btn-corner-all ui-mini" data-role="button" data-mini="true" data-theme="a" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span"><span class="ui-btn-inner"><span class="ui-btn-text">Back</span></span></a></span><span class="ui-icon ui-icon-msls-back ui-icon-shadow">&nbsp;</span></span></div>').click(
        function () {
            parent.history.back();
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

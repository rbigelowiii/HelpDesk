/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.ViewDeptHead.Details_postRender = function (element, contentItem) {
    // Write code here.
    var name = contentItem.screen.DeptHead.details.getModel()[':@SummaryProperty'].property.name;
    contentItem.dataBind("screen.DeptHead.EndUser", function (value) {
        contentItem.screen.details.displayName = value.UserFirstName + " " + value.UserLastName;
    });
    $(element).closest("[data-role='page']").find(
        ".msls-back-button-contain").prepend(
        '<div class="subControl msls-back-button msls-large-icon msls-tap ui-btn ui-shadow ui-btn-corner-all ui-btn-icon-notext ui-btn-up-a" tabindex="0" data-icon="msls-back" data-iconpos="notext" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="a" title="Back"><span class="ui-btn-inner"><span class="ui-btn-text"><a class="id-element ui-btn ui-btn-up-a ui-shadow ui-btn-corner-all ui-mini" data-role="button" data-mini="true" data-theme="a" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span"><span class="ui-btn-inner"><span class="ui-btn-text">Back</span></span></a></span><span class="ui-icon ui-icon-msls-back ui-icon-shadow">&nbsp;</span></span></div>').click(
        function () {
            parent.history.back();
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
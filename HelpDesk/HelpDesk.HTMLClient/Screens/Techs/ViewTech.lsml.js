/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.ViewTech.Details_postRender = function (element, contentItem) {
    // Write code here.
    var name = contentItem.screen.Tech.details.getModel()[':@SummaryProperty'].property.name;
    contentItem.dataBind("screen.Tech", function (value) {
        contentItem.screen.details.displayName = value.EndUser.UserLastName + ", " + value.EndUser.UserFirstName + " - " + value.EndUser.Department.DeptName + " Tech";
    });
}


myapp.ViewTech.created = function (screen) {
    // Write code here.
    screen.getCanUpdateTech().then(function success() {
        screen.findContentItem("EditTech").isVisible = true;
    }, function error() {
        screen.findContentItem("EditTech").isVisible = false;
    });
};
myapp.ViewTech.Delete_execute = function (screen) {
    // Write code here.
    screen.Tech.deleteEntity();
    screen.details.dataWorkspace.RCCHelpDeskInventoryData.saveChanges().then(function () {
        myapp.cancelChanges();
    });
};
myapp.ViewTech.ShowAddEditTicket_Tap_execute = function (screen) {
    // Write code here.
    myapp.showAddEditTicket(null, {
        beforeShown: function (TicketScreen) {
            var newTicket = new myapp.Ticket();
            TicketScreen.Ticket = newTicket;
            msls.promiseOperation(CallGetUserName).then(function PromiseSuccess(PromiseResult) {
                myapp.activeDataWorkspace.RCCHelpDeskInventoryData.Techs_SingleOrDefault(PromiseResult)
                    .execute()
                    .then(function (result) {
                        newTicket.Tech = result.results[0];
                    });
            });
        }, afterClosed: function (addEditScreen, navigationAction) {
            if (navigationAction === msls.NavigateBackAction.commit) {
                var newTicket = addEditScreen.Ticket;
                myapp.showViewTicket(newTicket, "BrowseOpenTickets");
            }
        }
    });
};
function CallGetUserName(operation) {
    $.ajax({
        type: 'post',
        data: {},
        url: '../GetUserName.ashx',
        success: operation.code(function AjaxSuccess(AjaxResult) {
            operation.complete(AjaxResult);
        })
    });
}
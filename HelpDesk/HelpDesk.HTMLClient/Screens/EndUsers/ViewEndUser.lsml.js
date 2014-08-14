/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.ViewEndUser.Details_postRender = function (element, contentItem) {
    // Write code here.
    var name = contentItem.screen.EndUser.details.getModel()[':@SummaryProperty'].property.name;
    contentItem.dataBind("screen.EndUser", function (value) {
        contentItem.screen.details.displayName = value.UserLastName + ", " + value.UserFirstName;
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

myapp.ViewEndUser.created = function (screen) {
    // Write code here.
    screen.findContentItem("EditEndUser").isVisible = myapp.permissions["LightSwitchApplication:UpdateEndUser"];

    screen.findContentItem("Delete").isVisible = myapp.permissions["LightSwitchApplication:DeleteEndUser"];

    if (myapp.permissions["LightSwitchApplication:AddDevice"]) {
        screen.findContentItem("ShowAddEditDesktop").isVisible = true;
        screen.findContentItem("ShowAddEditLaptop").isVisible = true;
        screen.findContentItem("ShowAddEditTablet").isVisible = true;
    } else {
        screen.findContentItem("ShowAddEditDesktop").isVisible = false;
        screen.findContentItem("ShowAddEditLaptop").isVisible = false;
        screen.findContentItem("ShowAddEditTablet").isVisible = false;
    }
};
myapp.ViewEndUser.Delete_execute = function (screen) {
    // Write code here.
    screen.EndUser.deleteEntity();
    screen.details.dataWorkspace.RCCHelpDeskInventoryData.saveChanges().then(function () {
        myapp.cancelChanges();
    });
};
myapp.ViewEndUser.ShowAddEditTicket_Tap_execute = function (screen) {
    // Write code here.
    myapp.showAddEditTicket(null, {
        beforeShown: function (TicketScreen) {
            var newTicket = new myapp.Ticket();
            TicketScreen.Ticket = newTicket;
            newTicket.EndUser = screen.EndUser;
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
                myapp.showViewTicket(newTicket, "BrowseEndUsers");
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
myapp.ViewEndUser.ShowAddEditDesktop_Tap_execute = function (screen) {
    // Write code here.
    myapp.showAddEditDesktop(null, {
        beforeShown: function (addEditScreen) {
            addEditScreen.Desktop = new myapp.Desktop();
            addEditScreen.Desktop.EndUser = screen.EndUser;
        },
        afterClosed: function (addEditScreen, navigationAction) {
            if (navigationAction === msls.NavigateBackAction.commit) {
                myapp.showViewDesktop(addEditScreen.Desktop);
            }
        }
    });
};
myapp.ViewEndUser.ShowAddEditLaptop_Tap_execute = function (screen) {
    // Write code here.
    myapp.showAddEditLaptop(null, {
        beforeShown: function (addEditScreen) {
            addEditScreen.Laptop = new myapp.Laptop();
            addEditScreen.Laptop.EndUser = screen.EndUser;
        },
        afterClosed: function (addEditScreen, navigationAction) {
            if (navigationAction === msls.NavigateBackAction.commit) {
                myapp.showViewLaptop(addEditScreen.Laptop);
            }
        }
    });
};
myapp.ViewEndUser.ShowAddEditTablet_Tap_execute = function (screen) {
    // Write code here.
    myapp.showAddEditTablet(null, {
        beforeShown: function (addEditScreen) {
            addEditScreen.Tablet = new myapp.Tablet();
            addEditScreen.Tablet.EndUser = screen.EndUser;
        },
        afterClosed: function (addEditScreen, navigationAction) {
            if (navigationAction === msls.NavigateBackAction.commit) {
                myapp.showViewTablet(addEditScreen.Tablet);
            }
        }
    });

};
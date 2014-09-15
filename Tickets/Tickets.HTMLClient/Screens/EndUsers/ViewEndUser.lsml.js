/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.ViewEndUser.Details_postRender = function (element, contentItem) {
    // Write code here.
    var name = contentItem.screen.EndUser.details.getModel()[':@SummaryProperty'].property.name;
    contentItem.dataBind("screen.EndUser", function (value) {
        contentItem.screen.details.displayName = value.UserLastName + ", " + value.UserFirstName;
    });
    $(element).closest("[data-role='page']").find(
        ".msls-back-button-contain").prepend(
        '<div class="subControl msls-back-button msls-large-icon msls-tap ui-btn ui-shadow ui-btn-corner-all ui-btn-icon-notext ui-btn-up-a" tabindex="0" data-icon="msls-back" data-iconpos="notext" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="a" title="Back"><span class="ui-btn-inner"><span class="ui-btn-text"><a class="id-element ui-btn ui-btn-up-a ui-shadow ui-btn-corner-all ui-mini" data-role="button" data-mini="true" data-theme="a" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span"><span class="ui-btn-inner"><span class="ui-btn-text">Back</span></span></a></span><span class="ui-icon ui-icon-msls-back ui-icon-shadow">&nbsp;</span></span></div>').click(
        function () {
            parent.history.back();
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
/// <reference path="~/GeneratedArtifacts/viewModel.js" />



myapp.Home.created = function (screen) {
    // Write code here.

    screen.getViewTechOnlyScreens().then(function success() {
        screen.ScreenName = "RCC Help Desk Ticketing & Inventory System";
        screen.details.displayName = screen.ScreenName;
        screen.findContentItem("ShowBrowseTickets").isVisible = true;
        screen.findContentItem("Inventory").isVisible = true;
        screen.findContentItem("Users").isVisible = true;
        screen.findContentItem("EnterTicket").isVisible = true;
        screen.findContentItem("SubmitTicket").isVisible = false;
        screen.findContentItem("ShowBrowseMyTickets").isVisible = false;
        screen.findContentItem("ShowBrowseOpenTickets").isVisible = true;
    }, function error() {
        screen.ScreenName = "RCC Help Desk Ticketing System";
        screen.details.displayName = screen.ScreenName;
        screen.findContentItem("ShowBrowseTickets").isVisible = false;
        screen.findContentItem("Inventory").isVisible = false;
        screen.findContentItem("Users").isVisible = false;
        screen.findContentItem("EnterTicket").isVisible = false;
        screen.findContentItem("SubmitTicket").isVisible = true;
        screen.findContentItem("ShowBrowseMyTickets").isVisible = true;
        screen.findContentItem("ShowBrowseOpenTickets").isVisible = false;
    });

    screen.getCanAddDevice().then(function success() {
        screen.findContentItem("ShowAddEditDesktop").isVisible = true;
        screen.findContentItem("ShowAddEditLaptop").isVisible = true;
    }, function error() {
        screen.findContentItem("ShowAddEditDesktop").isVisible = false;
        screen.findContentItem("ShowAddEditLaptop").isVisible = false;
    });

    
};

myapp.Home.EnterTicket_execute = function (screen) {
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
                myapp.showViewTicket(newTicket);
            }
        }
    });
};

function CallGetUserName(operation) {
    $.ajax({
        type: 'post',
        data: {},
        url: 'GetUserName.ashx',
        success: operation.code(function AjaxSuccess(AjaxResult) {
            operation.complete(AjaxResult);
        })
    });
};

myapp.Home.SubmitTicket_execute = function (screen) {
    // Write code here.
    myapp.showAddEditTicket(null, {
        beforeShown: function (TicketScreen) {
            var newTicket = new myapp.Ticket();
            TicketScreen.Ticket = newTicket;
            msls.promiseOperation(CallGetUserName).then(function PromiseSuccess(PromiseResult) {
                myapp.activeDataWorkspace.RCCHelpDeskInventoryData.EndUsers_SingleOrDefault(PromiseResult)
                    .execute()
                    .then(function (result) {
                        newTicket.EndUser = result.results[0];
                    });
            });
        }, afterClosed: function (addEditScreen, navigationAction) {
            if (navigationAction === msls.NavigateBackAction.commit) {
                myapp.showViewTicket(addEditScreen.Ticket);
            }
        }
    });
};

myapp.Home.HelpFile_Body_postRender = function (element, contentItem) {
    // Write code here.
    contentItem.dataBind("screen.HelpFile.Body", function (value) {
        element.innerHTML = value;
    });
};

myapp.Home.ShowAddEditDesktop_Tap_execute = function (screen) {
    // Write code here.
    myapp.showAddEditDesktop(null, {
        beforeShown: function (addEditScreen) {
            addEditScreen.Desktop = new myapp.Desktop();
        },
        afterClosed: function (addEditScreen, navigationAction) {
            if(navigationAction === msls.NavigateBackAction.commit){
                myapp.showViewDesktop(addEditScreen.Desktop);
            }
        }
    });
};

myapp.Home.ShowAddEditLaptop_Tap_execute = function (screen) {
    // Write code here.
    myapp.showAddEditLaptop(null, {
        beforeShown: function (addEditScreen) {
            addEditScreen.Laptop = new myapp.Laptop();
        },
        afterClosed: function (addEditScreen, navigationAction) {
            if (navigationAction === msls.NavigateBackAction.commit) {
                myapp.showViewLaptop(addEditScreen.Laptop);
            }
        }
    });
};
myapp.Home.CurrentUser_postRender = function (element, contentItem) {
    // Write code here.
    msls.promiseOperation(CallGetUserName).then(function PromiseSuccess(PromiseResult) {
        myapp.activeDataWorkspace.RCCHelpDeskInventoryData.EndUsers_SingleOrDefault(PromiseResult)
            .execute()
            .then(function (result) {
                $(element).find(".ui-icon").remove();
                element.innerHTML = " - Welcome, " + result.results[0].UserFirstName + " " + result.results[0].UserLastName;
                contentItem.screen.findContentItem("CurrentUser").isVisible = true;
            });
    });
};

myapp.Home.ShowHelp_Tap_execute = function (screen) {
    // Write code here.
    $(window).on("popupcreate", function (e) {
        $(e.target).popup({
            positionTo: "window"
        });
    });
    screen.showPopup("Help");
};
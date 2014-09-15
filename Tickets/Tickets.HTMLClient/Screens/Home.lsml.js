/// <reference path="~/GeneratedArtifacts/viewModel.js" />



myapp.Home.created = function (screen) {
    // Write code here.
    $.getJSON("../Perms/UserPermissions/", function (data) {
        myapp.permissions = data;
    }).then(function () {

        if (myapp.permissions["LightSwitchApplication:ViewTechOnlyScreens"]) {
            screen.details.displayName = "RCC Help Desk Ticketing & Inventory System";
            screen.ScreenName = screen.details.displayName;
            screen.findContentItem("ShowBrowseTickets").isVisible = true;
            screen.findContentItem("Inventory").isVisible = true;
            screen.findContentItem("Users").isVisible = true;
            screen.findContentItem("EnterTicket").isVisible = true;
            screen.findContentItem("SubmitTicket").isVisible = false;
            screen.findContentItem("EnterTicket1").isVisible = true;
            screen.findContentItem("SubmitTicket1").isVisible = false;
            screen.findContentItem("ShowBrowseMyTickets").isVisible = false;
            screen.findContentItem("ShowBrowseOpenTickets").isVisible = true;
            screen.findContentItem("ShowBrowseKB").isVisible = true;
        } else {
            screen.details.displayName = "RCC Help Desk Ticketing System";
            screen.ScreenName = screen.details.displayName;
            screen.findContentItem("ShowBrowseTickets").isVisible = false;
            screen.findContentItem("Inventory").isVisible = false;
            screen.findContentItem("Users").isVisible = false;
            screen.findContentItem("EnterTicket").isVisible = false;
            screen.findContentItem("SubmitTicket").isVisible = true;
            screen.findContentItem("EnterTicket1").isVisible = false;
            screen.findContentItem("SubmitTicket1").isVisible = true;
            screen.findContentItem("ShowBrowseMyTickets").isVisible = true;
            screen.findContentItem("ShowBrowseOpenTickets").isVisible = false;
            screen.findContentItem("ShowBrowseKB").isVisible = true;
        }

        if (myapp.permissions["LightSwitchApplication:AddDevice"]) {

            screen.findContentItem("ShowAddEditDesktop").isVisible = true;
            screen.findContentItem("ShowAddEditLaptop").isVisible = true;
            screen.findContentItem("ShowAddEditPrinter").isVisible = true;
            screen.findContentItem("ShowAddEditTablet").isVisible = true;
        } else {
            screen.findContentItem("ShowAddEditDesktop").isVisible = false;
            screen.findContentItem("ShowAddEditLaptop").isVisible = false;
            screen.findContentItem("ShowAddEditPrinter").isVisible = false;
            screen.findContentItem("ShowAddEditTablet").isVisible = false;
        }

        screen.findContentItem("ShowAddEditEndUser").isVisible = myapp.permissions["LightSwitchApplication:AddEndUser"];

        screen.findContentItem("ShowAddEditTech").isVisible = myapp.permissions["LightSwitchApplication:AddTech"];

        screen.findContentItem("ShowAddEditDepartment").isVisible = myapp.permissions["LightSwitchApplication:AddDepartment"];

        screen.findContentItem("ShowAddEditDeptHead").isVisible = myapp.permissions["LightSwitchApplication:AddDeptHead"];

        screen.findContentItem("ShowBrowseHelpFiles").isVisible = myapp.permissions["LightSwitchApplication:AddHelpFile"];

        screen.findContentItem("ShowAddEditLocation").isVisible = myapp.permissions["LightSwitchApplication:AddLocation"];

        screen.findContentItem("ShowAddEditKBItem").isVisible = myapp.permissions["LightSwitchApplication:AddKnowledgeBase"];

        screen.findContentItem("ShowAddEditOperatingSystem").isVisible = myapp.permissions["LightSwitchApplication:AddOS"];

        screen.findContentItem("SecurityAdministration").isVisible = myapp.permissions["Microsoft.LightSwitch.Security:SecurityAdministration"];
    });
};

myapp.Home.EnterTicket_execute = function (screen) {
    // Write code here.
    myapp.showAddTicket(null, {
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
        url: 'GetUserName.ashx',
        success: operation.code(function AjaxSuccess(AjaxResult) {
            operation.complete(AjaxResult);
        })
    });
};

myapp.Home.SubmitTicket_execute = function (screen) {
    // Write code here.
    myapp.showSubmitTicket(null, {
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
                myapp.showViewTicket(addEditScreen.Ticket, "BrowseMyTickets");
            }
        }
    });
};

myapp.Home.ShowAddEditDesktop_Tap_execute = function (screen) {
    // Write code here.
    myapp.showAddEditDesktop(null, {
        beforeShown: function (addEditScreen) {
            addEditScreen.Desktop = new myapp.Desktop();
        },
        afterClosed: function (addEditScreen, navigationAction) {
            if (navigationAction === msls.NavigateBackAction.commit) {
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

myapp.Home.ShowAddEditPrinter_Tap_execute = function (screen) {
    // Write code here.
    myapp.showAddEditPrinter(null, {
        beforeShown: function (addEditScreen) {
            addEditScreen.Printer = new myapp.Printer();
        },
        afterClosed: function (addEditScreen, navigationAction) {
            if (navigationAction === msls.NavigateBackAction.commit) {
                myapp.showViewPrinter(addEditScreen.Printer);
            }
        }
    });
};
myapp.Home.ShowAddEditTablet_Tap_execute = function (screen) {
    // Write code here.
    myapp.showAddEditTablet(null, {
        beforeShown: function (addEditScreen) {
            addEditScreen.Tablet = new myapp.Tablet();
        },
        afterClosed: function (addEditScreen, navigationAction) {
            if (navigationAction === msls.NavigateBackAction.commit) {
                myapp.showViewTablet(addEditScreen.Tablet);
            }
        }
    });
};
myapp.Home.ShowAddEditEndUser_Tap_execute = function (screen) {
    // Write code here.
    myapp.showAddEditEndUser(null, {
        beforeShown: function (addEditScreen) {
            addEditScreen.EndUser = new myapp.EndUser();
        },
        afterClosed: function (addEditScreen, navigationAction) {
            if (navigationAction === msls.NavigateBackAction.commit) {
                myapp.showViewEndUser(addEditScreen.EndUser);
            }
        }
    });
};
myapp.Home.ShowAddEditTech_Tap_execute = function (screen) {
    // Write code here.
    myapp.showAddEditTech(null, {
        beforeShown: function (addEditScreen) {
            addEditScreen.Tech = new myapp.Tech();
        },
        afterClosed: function (addEditScreen, navigationAction) {
            if (navigationAction === msls.NavigateBackAction.commit) {
                myapp.showViewTech(addEditScreen.Tech);
            }
        }
    });
};
myapp.Home.Tickets_postRender = function (element, contentItem) {
    // Write code here.
    msls.promiseOperation(CallGetUserName).then(function PromiseSuccess(PromiseResult) {
        myapp.activeDataWorkspace.RCCHelpDeskInventoryData.EndUsers_SingleOrDefault(PromiseResult)
            .execute()
            .then(function (result) {
                $(element).closest("[data-role='page']").find(
                    ".msls-title-area").append(
                    "<div style='color:dimgray;font-size:15px;'>Welcome, " + result.results[0].UserFirstName + " " + result.results[0].UserLastName + "</div>");
            }, function () {
                myapp.activeDataWorkspace.RCCHelpDeskInventoryData.EndUsers.addNew();
                myapp.activeDataWorkspace.RCCHelpDeskInventoryData.saveChanges();
            });
    });

    msls.promiseOperation(CallGetUserName).then(function PromiseSuccess(PromiseResult) {
        myapp.activeDataWorkspace.RCCHelpDeskInventoryData.Techs_SingleOrDefault(PromiseResult)
            .execute()
            .then(function (result) {
            }, function () {
                myapp.activeDataWorkspace.RCCHelpDeskInventoryData.Techs.addNew();
                myapp.activeDataWorkspace.RCCHelpDeskInventoryData.saveChanges();
            });
    });
};

myapp.Home.ShowAddEditDepartment_Tap_execute = function (screen) {
    // Write code here.
    myapp.showAddEditDepartment(null, {
        beforeShown: function (addEditScreen) {
            addEditScreen.Department = new myapp.Department();
        },
        afterClosed: function (addEditScreen, navigationAction) {
            if (navigationAction === msls.NavigateBackAction.commit) {
                myapp.showViewDepartment(addEditScreen.Department);
            }
        }
    });
};
myapp.Home.ShowAddEditDeptHead_Tap_execute = function (screen) {
    // Write code here.
    myapp.showAddEditDeptHead(null, {
        beforeShown: function (addEditScreen) {
            addEditScreen.DeptHead = new myapp.DeptHead();
        },
        afterClosed: function (addEditScreen, navigationAction) {
            if (navigationAction === msls.NavigateBackAction.commit) {
                myapp.showViewDeptHead(addEditScreen.DeptHead);
            }
        }
    });
};

myapp.Home.ShowHelp_Tap_execute = function (screen) {
    // Write code here.
    screen.getHelpFile().then(function (helpfile) {
        myapp.showHelpDialog(helpfile);
    });
};

myapp.Home.ShowAddEditKBItem_Tap_execute = function (screen) {
    // Write code here.
    myapp.showAddEditKBItem(null, {
        beforeShown: function (addEditScreen) {
            addEditScreen.KnowledgeBase = new myapp.KnowledgeBase();
        },
        afterClosed: function (addEditScreen, navigationAction) {
            if (navigationAction === msls.NavigateBackAction.commit) {
                myapp.showViewKBItem(addEditScreen.KnowledgeBase);
            }
        }
    });
};
myapp.Home.ShowAddEditLocation_Tap_execute = function (screen) {
    // Write code here.
    myapp.showAddEditLocation(null, {
        beforeShown: function (addEditScreen) {
            addEditScreen.Location = new myapp.Location();
        },
        afterClosed: function (addEditScreen, navigationAction) {
            if (navigationAction === msls.NavigateBackAction.commit) {
                myapp.showViewLocation(addEditScreen.Location);
            }
        }
    });
};
myapp.Home.SecurityAdministration_postRender = function (element, contentItem) {
    // Write code here.
    $(element).find("div").wrap("<a href='http://triton-rwc1:83/Tickets/desktopclient' target='_blank'></a>");
};
myapp.Home.ShowHelpDialog_Tap_execute = function (screen) {
    // Write code here.
    screen.getHelpFile().then(function () {
        myapp.showHelpDialog(screen.HelpFile);
    });
};
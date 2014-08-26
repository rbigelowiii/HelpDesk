/// <reference path="~/GeneratedArtifacts/viewModel.js" />



myapp.Home.created = function (screen) {
    // Write code here.
    msls.promiseOperation(CallGetUserName).then(function PromiseSuccess(PromiseResult) {
        myapp.currentUser = PromiseResult;
    });

    
    $.getJSON("../Perms/UserPermissions/", function (data) {
        myapp.permissions = data;
    }).then(function () {
        screen.findContentItem("Inventory").isVisible = myapp.permissions["LightSwitchApplication:ViewTechOnlyScreens"];
        screen.findContentItem("Users").isVisible = myapp.permissions["LightSwitchApplication:ViewTechOnlyScreens"];

        if (myapp.permissions["LightSwitchApplication:ViewTechOnlyScreens"]) {
            screen.details.displayName = "RCC Help Desk Ticketing & Inventory System";
        }

        screen.ScreenName = screen.details.displayName;
    });
};

myapp.Home.EnterTicket_execute = function (screen) {
    // Write code here.
    myapp.showAddEditTicket(null, {
        beforeShown: function (TicketScreen) {
            var newTicket = new myapp.Ticket();
            TicketScreen.Ticket = newTicket;
            activeDataWorkspace.RCCHelpDeskInventoryData.Techs_SingleOrDefault(myapp.currentUser)
                    .execute()
                    .then(function (result) {
                        newTicket.Tech = result.results[0];
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
            myapp.activeDataWorkspace.RCCHelpDeskInventoryData.EndUsers_SingleOrDefault(myapp.currentUser)
                    .execute()
                    .then(function (result) {
                        newTicket.EndUser = result.results[0];
                    });
        }, afterClosed: function (addEditScreen, navigationAction) {
            if (navigationAction === msls.NavigateBackAction.commit) {
                myapp.showViewTicket(addEditScreen.Ticket);
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
    
    myapp.activeDataWorkspace.RCCHelpDeskInventoryData.EndUsers_SingleOrDefault(myapp.currentUser)
            .execute()
            .then(function (result) {
                $(element).closest("[data-role='page']").find(
                    ".msls-title-area").append(
                    "<div style='color:dimgray;font-size:15px;'>Welcome, " + result.results[0].UserFirstName + " " + result.results[0].UserLastName + "</div>");
            }, function () {
                myapp.activeDataWorkspace.RCCHelpDeskInventoryData.EndUsers.addNew();
                myapp.activeDataWorkspace.RCCHelpDeskInventoryData.saveChanges();
            });

    myapp.activeDataWorkspace.RCCHelpDeskInventoryData.Techs_SingleOrDefault(myapp.currentUser)
            .execute()
            .then(function () {
            }, function () {
                myapp.activeDataWorkspace.RCCHelpDeskInventoryData.Techs.addNew();
                myapp.activeDataWorkspace.RCCHelpDeskInventoryData.saveChanges();
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
    $(element).find("div").wrap("<a href='http://triton-rwc1:83/Tickets/desktopclient' target='_blank'></a>")
};
myapp.Home.ShowBrowseTickets_Tap_execute = function (screen) {
    // Write code here.
    myapp.showBrowseTickets();
};
myapp.Home.ShowBrowseOpenTickets_Tap_execute = function (screen) {
    // Write code here.
    myapp.showBrowseOpenTickets();
};
myapp.Home.ShowBrowseHelpFiles_Tap_execute = function (screen) {
    // Write code here.
    myapp.showBrowseHelpFiles();
};
myapp.Home.SecurityAdministration_execute = function (screen) {
    // Write code here.

};
myapp.Home.EnterTicket_canExecute = function (screen) {
    // Write code here.
    return myapp.permissions["LightSwitchApplication:ViewTechOnlyScreens"];
};
myapp.Home.SecurityAdministration_canExecute = function (screen) {
    // Write code here.
    return myapp.permissions["Microsoft.LightSwitch.Security:SecurityAdministration"];
};
myapp.Home.ShowAddEditDepartment_Tap_canExecute = function (screen) {
    // Write code here.
    return myapp.permissions["LightSwitchApplication:AddDepartment"];
};
myapp.Home.ShowAddEditDeptHead_Tap_canExecute = function (screen) {
    // Write code here.
    return myapp.permissions["LightSwitchApplication:AddDeptHead"];
};
myapp.Home.ShowAddEditDesktop_Tap_canExecute = function (screen) {
    // Write code here.
    return myapp.permissions["LightSwitchApplication:AddDevice"];
};
myapp.Home.ShowAddEditEndUser_Tap_canExecute = function (screen) {
    // Write code here.
    return myapp.permissions["LightSwitchApplication:AddEndUser"];
};
myapp.Home.ShowAddEditKBItem_Tap_canExecute = function (screen) {
    // Write code here.
    return myapp.permissions["LightSwitchApplication:AddKnowledgeBase"];
};
myapp.Home.ShowAddEditLaptop_Tap_canExecute = function (screen) {
    // Write code here.
    return myapp.permissions["LightSwitchApplication:AddDevice"];
};
myapp.Home.ShowAddEditLocation_Tap_canExecute = function (screen) {
    // Write code here.
    return myapp.permissions["LightSwitchApplication:AddLocation"];
};
myapp.Home.ShowAddEditOperatingSystem_Tap_canExecute = function (screen) {
    // Write code here.
    return myapp.permissions["LightSwitchApplication:AddOS"];
};
myapp.Home.ShowAddEditPrinter_Tap_canExecute = function (screen) {
    // Write code here.
    return myapp.permissions["LightSwitchApplication:AddDevice"];
};
myapp.Home.ShowAddEditTablet_Tap_canExecute = function (screen) {
    // Write code here.
    return myapp.permissions["LightSwitchApplication:AddDevice"];
};
myapp.Home.ShowAddEditTech_Tap_canExecute = function (screen) {
    // Write code here.
    return myapp.permissions["LightSwitchApplication:AddTech"];
};
myapp.Home.ShowBrowseHelpFiles_Tap_canExecute = function (screen) {
    // Write code here.
    return myapp.permissions["LightSwitchApplication:AddHelpFile"];
};
myapp.Home.ShowBrowseMyTickets_Tap_canExecute = function (screen) {
    // Write code here.
    return !myapp.permissions["LightSwitchApplication:ViewTechOnlyScreens"];
};
myapp.Home.ShowBrowseOpenTickets_Tap_canExecute = function (screen) {
    // Write code here.
    return myapp.permissions["LightSwitchApplication:ViewTechOnlyScreens"];
};
myapp.Home.ShowBrowseTickets_Tap_canExecute = function (screen) {
    // Write code here.
    return myapp.permissions["LightSwitchApplication:ViewTechOnlyScreens"];
};
myapp.Home.SubmitTicket_canExecute = function (screen) {
    // Write code here.
    return !myapp.permissions["LightSwitchApplication:ViewTechOnlyScreens"];
};
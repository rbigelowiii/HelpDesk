/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.BrowseMyTickets.TicketSearchText_postRender = function (element, contentItem) {
    // Write code here.
    $searchBox = $("input", $(element));
    setTimeout(function () {
        $searchBox.focus();
    }, 1);

    onInputAsYouType(element, 1, function (text) {
        contentItem.screen.TicketSearchText = text;
    });
    function onInputAsYouType(element, numberOfRequiredChars, done) {
        var inputbox = $("input", $(element));
        inputbox.on("input", function (e) {
            var text = $(this).val();
            if (text.length >= numberOfRequiredChars)
                done(text);
        });
    };
};

myapp.BrowseMyTickets.NewTicket_execute = function (screen) {
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
        }, afterClosed: function (addEditScreen, navigationAction){
            if (navigationAction === msls.NavigateBackAction.commit) {
                myapp.showViewTicket(addEditScreen.Ticket, "BrowseMyTickets");
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


myapp.BrowseMyTickets.created = function (screen) {
    // Write code here.
    screen.TicketEndDate = new Date();
};
myapp.BrowseMyTickets.MyTickets_ItemTap_execute = function (screen) {
    // Write code here.
    myapp.showViewTicket(screen.MyTickets.selectedItem, "BrowseMyTickets",{
        afterClosed: function () {
            screen.MyTickets.load();
        }
    });
};
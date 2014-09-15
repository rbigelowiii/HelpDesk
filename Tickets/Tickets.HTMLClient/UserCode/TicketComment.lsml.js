/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.TicketComment.created = function (entity) {
    // Write code here.
    entity.CommentDate = new Date();
    msls.promiseOperation(CallGetUserName).then(function PromiseSuccess(PromiseResult) {
        myapp.activeDataWorkspace.RCCHelpDeskInventoryData.EndUsers_SingleOrDefault(PromiseResult)
            .execute()
            .then(function (result) {
                entity.EndUser = result.results[0];
            });
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
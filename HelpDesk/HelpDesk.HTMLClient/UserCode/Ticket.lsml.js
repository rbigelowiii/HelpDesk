/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.Ticket.created = function (entity) {
    // Write code here.
    entity.DateSubmitted = new Date();
    entity.Status = "Open";
    entity.Category = "Other";
    entity.Priority = "Normal";
};

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.LightSwitch;
using Microsoft.LightSwitch.Security.Server;
namespace LightSwitchApplication
{
    public partial class RCCHelpDeskInventoryDataService
    {

        partial void MyTickets_PreprocessQuery(string SearchText, string Category, string Priority, string Status, DateTime? BeginDate, DateTime? EndDate, ref IQueryable<Ticket> query)
        {
            String currentUserName = this.Application.User.Name.Split(new string[] { "\\" }, System.StringSplitOptions.None)[1];
            query = query.Where(t => t.EndUser.UserName == currentUserName);
        }

        partial void TicketComments_Inserting(TicketComment entity)
        {
            entity.EndUser = DataWorkspace.RCCHelpDeskInventoryData.EndUsers_SingleOrDefault(this.Application.User.Name.Substring(this.Application.User.Name.LastIndexOf("\\") + 1));
        }

        
        partial void EndUsers_Inserting(EndUser entity)
        {
            entity.UserFirstName = this.Application.User.FullName.Split(new string[] { " " }, System.StringSplitOptions.None)[0];
            entity.UserLastName = this.Application.User.FullName.Split(new string[] { " " }, System.StringSplitOptions.None)[1];
            entity.UserName = this.Application.User.Name.Split(new string[] { "\\" }, System.StringSplitOptions.None)[1];
        }

        partial void Techs_Inserting(Tech entity)
        {
            entity.EndUser = DataWorkspace.RCCHelpDeskInventoryData.EndUsers_SingleOrDefault(this.Application.User.Name.Split(new string[] { "\\" }, System.StringSplitOptions.None)[1]);
            entity.UserName = entity.EndUser.UserName;
        }

        
    }
}

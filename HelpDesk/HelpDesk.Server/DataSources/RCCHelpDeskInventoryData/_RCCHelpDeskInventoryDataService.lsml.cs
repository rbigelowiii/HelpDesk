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
        partial void ViewTechOnlyScreens_CanExecute(ref bool result)
        {
            result = this.Application.User.HasPermission(Permissions.ViewTechOnlyScreens);
        }

        partial void ViewTechOnlyScreens_PreprocessQuery(ref IQueryable<Tech> query)
        {
            query = (from c in query where 0 == 1 select c);
        }

        partial void CanAddDept_CanExecute(ref bool result)
        {
            result = this.Application.User.HasPermission(Permissions.AddDepartment);
        }

        partial void CanAddDept_PreprocessQuery(ref IQueryable<Department> query)
        {
            query = (from c in query where 0 == 1 select c);
        }

        partial void CanUpdateDept_CanExecute(ref bool result)
        {
            result = this.Application.User.HasPermission(Permissions.UpdateDepartment);
        }

        partial void CanUpdateDept_PreprocessQuery(ref IQueryable<Department> query)
        {
            query = (from c in query where 0 == 1 select c);
        }

        partial void CanDelDept_CanExecute(ref bool result)
        {
            result = this.Application.User.HasPermission(Permissions.DeleteDepartment);
        }

        partial void CanAddDeptHead_CanExecute(ref bool result)
        {
            result = this.Application.User.HasPermission(Permissions.AddDeptHead);
        }

        partial void CanDelDept_PreprocessQuery(ref IQueryable<Department> query)
        {
            query = (from c in query where 0 == 1 select c);
        }

        partial void CanAddDeptHead_PreprocessQuery(ref IQueryable<DeptHead> query)
        {
            query = (from c in query where 0 == 1 select c);
        }

        partial void CanDelDeptHead_CanExecute(ref bool result)
        {
            result = this.Application.User.HasPermission(Permissions.DeleteDeptHead);
        }

        partial void CanDelDeptHead_PreprocessQuery(ref IQueryable<DeptHead> query)
        {
            query = (from c in query where 0 == 1 select c);
        }

        partial void CanUpdateDeptHead_CanExecute(ref bool result)
        {
            result = this.Application.User.HasPermission(Permissions.UpdateDeptHead);
        }

        partial void CanUpdateDeptHead_PreprocessQuery(ref IQueryable<DeptHead> query)
        {
            query = (from c in query where 0 == 1 select c);
        }

        partial void CanAddEndUser_CanExecute(ref bool result)
        {
            result = this.Application.User.HasPermission(Permissions.AddEndUser);
        }

        partial void CanAddEndUser_PreprocessQuery(ref IQueryable<EndUser> query)
        {
            query = (from c in query where 0 == 1 select c);
        }

        partial void CanAddDevice_CanExecute(ref bool result)
        {
            result = this.Application.User.HasPermission(Permissions.AddDevice);
        }

        partial void CanAddDevice_PreprocessQuery(ref IQueryable<Tech> query)
        {
            query = (from c in query where 0 == 1 select c);
        }

        partial void CanUpdateDevice_CanExecute(ref bool result)
        {
            result = this.Application.User.HasPermission(Permissions.UpdateDevice);
        }

        partial void CanUpdateDevice_PreprocessQuery(ref IQueryable<Tech> query)
        {
            query = (from c in query where 0 == 1 select c);
        }

        partial void CanDelDevice_CanExecute(ref bool result)
        {
            result = this.Application.User.HasPermission(Permissions.DeleteDevice);
        }

        partial void CanDelDevice_PreprocessQuery(ref IQueryable<Tech> query)
        {
            query = (from c in query where 0 == 1 select c);
        }

        partial void CanUpdateEndUser_CanExecute(ref bool result)
        {
            result = this.Application.User.HasPermission(Permissions.UpdateEndUser);
        }

        partial void CanUpdateEndUser_PreprocessQuery(ref IQueryable<EndUser> query)
        {
            query = (from c in query where 0 == 1 select c);
        }

        partial void CanDelEndUser_CanExecute(ref bool result)
        {
            result = this.Application.User.HasPermission(Permissions.DeleteEndUser);
        }

        partial void CanAddHelpFile_CanExecute(ref bool result)
        {
            result = this.Application.User.HasPermission(Permissions.AddHelpFile);
        }

        partial void CanAddHelpFile_PreprocessQuery(ref IQueryable<HelpFile> query)
        {
            query = (from c in query where 0 == 1 select c);
        }

        partial void CanUpdateHelpFile_CanExecute(ref bool result)
        {
            result = this.Application.User.HasPermission(Permissions.UpdateHelpFile);
        }

        partial void CanUpdateHelpFile_PreprocessQuery(ref IQueryable<HelpFile> query)
        {
            query = (from c in query where 0 == 1 select c);
        }

        partial void CanDeleteHelpFile_CanExecute(ref bool result)
        {
            result = this.Application.User.HasPermission(Permissions.DeleteHelpFile);
        }

        partial void CanDeleteHelpFile_PreprocessQuery(ref IQueryable<HelpFile> query)
        {
            query = (from c in query where 0 == 1 select c);
        }

        partial void CanAddKnowledgeBase_CanExecute(ref bool result)
        {
            result = this.Application.User.HasPermission(Permissions.AddKnowledgeBase);
        }

        partial void CanAddKnowledgeBase_PreprocessQuery(ref IQueryable<KnowledgeBase> query)
        {
            query = (from c in query where 0 == 1 select c);
        }

        partial void CanUpdateKnowledgeBase_CanExecute(ref bool result)
        {
            result = this.Application.User.HasPermission(Permissions.UpdateKnowledgeBase);
        }

        partial void CanDeleteKnowledgeBase_CanExecute(ref bool result)
        {
            result = this.Application.User.HasPermission(Permissions.DeleteKnowledgeBase);
        }

        partial void CanUpdateKnowledgeBase_PreprocessQuery(ref IQueryable<KnowledgeBase> query)
        {
            query = (from c in query where 0 == 1 select c);
        }

        partial void CanDeleteKnowledgeBase_PreprocessQuery(ref IQueryable<KnowledgeBase> query)
        {
            query = (from c in query where 0 == 1 select c);
        }

        partial void CanAddLocation_CanExecute(ref bool result)
        {
            result = this.Application.User.HasPermission(Permissions.AddLocation);
        }

        partial void CanAddLocation_PreprocessQuery(ref IQueryable<Location> query)
        {
            query = (from c in query where 0 == 1 select c);
        }

        partial void CanUpdateLocation_CanExecute(ref bool result)
        {
            result = this.Application.User.HasPermission(Permissions.UpdateLocation);
        }

        partial void CanUpdateLocation_PreprocessQuery(ref IQueryable<Location> query)
        {
            query = (from c in query where 0 == 1 select c);
        }

        partial void CanDeleteLocation_CanExecute(ref bool result)
        {
            result = this.Application.User.HasPermission(Permissions.DeleteLocation);
        }

        partial void CanDeleteLocation_PreprocessQuery(ref IQueryable<Location> query)
        {
            query = (from c in query where 0 == 1 select c);
        }

        partial void CanAddOS_CanExecute(ref bool result)
        {
            result = this.Application.User.HasPermission(Permissions.AddOS);
        }

        partial void CanAddOS_PreprocessQuery(ref IQueryable<OperatingSystem> query)
        {
            query = (from c in query where 0 == 1 select c);
        }

        partial void CanUpdateOS_CanExecute(ref bool result)
        {
            result = this.Application.User.HasPermission(Permissions.UpdateOS);
        }

        partial void CanUpdateOS_PreprocessQuery(ref IQueryable<OperatingSystem> query)
        {
            query = (from c in query where 0 == 1 select c);
        }

        partial void CanDeleteOS_CanExecute(ref bool result)
        {
            result = this.Application.User.HasPermission(Permissions.DeleteOS);
        }

        partial void CanDeleteOS_PreprocessQuery(ref IQueryable<OperatingSystem> query)
        {
            query = (from c in query where 0 == 1 select c);
        }

        partial void CanAddTech_CanExecute(ref bool result)
        {
            result = this.Application.User.HasPermission(Permissions.AddTech);
        }

        partial void CanAddTech_PreprocessQuery(ref IQueryable<Tech> query)
        {
            query = (from c in query where 0 == 1 select c);
        }

        partial void CanUpdateTech_CanExecute(ref bool result)
        {
            result = this.Application.User.HasPermission(Permissions.UpdateTech);
        }

        partial void CanUpdateTech_PreprocessQuery(ref IQueryable<Tech> query)
        {
            query = (from c in query where 0 == 1 select c);
        }

        partial void CanDelTech_CanExecute(ref bool result)
        {
            result = this.Application.User.HasPermission(Permissions.DeleteTech);
        }

        partial void CanDelTech_PreprocessQuery(ref IQueryable<Tech> query)
        {
            query = (from c in query where 0 == 1 select c);
        }

        partial void CanUpdateComment_CanExecute(ref bool result)
        {
            result = this.Application.User.HasPermission(Permissions.UpdateComment);
        }

        partial void CanUpdateComment_PreprocessQuery(ref IQueryable<TicketComment> query)
        {
            query = (from c in query where 0 == 1 select c);
        }

        partial void CanDelComment_CanExecute(ref bool result)
        {
            result = this.Application.User.HasPermission(Permissions.DeleteComment);
        }

        partial void CanDelComment_PreprocessQuery(ref IQueryable<TicketComment> query)
        {
            query = (from c in query where 0 == 1 select c);
        }

        partial void CanAssignTicket_CanExecute(ref bool result)
        {
            result = this.Application.User.HasPermission(Permissions.AssignTicket);
        }

        partial void CanAssignTicket_PreprocessQuery(ref IQueryable<Ticket> query)
        {
            query = (from c in query where 0 == 1 select c);
        }

        partial void CanCloseTicket_CanExecute(ref bool result)
        {
            result = this.Application.User.HasPermission(Permissions.CloseTicket);
        }

        partial void CanCloseTicket_PreprocessQuery(ref IQueryable<Ticket> query)
        {
            query = (from c in query where 0 == 1 select c);
        }

        partial void CanUpdateTicket_CanExecute(ref bool result)
        {
            result = this.Application.User.HasPermission(Permissions.UpdateTicket);
        }

        partial void CanUpdateTicket_PreprocessQuery(ref IQueryable<Ticket> query)
        {
            query = (from c in query where 0 == 1 select c);
        }

        partial void CanDelTicket_CanExecute(ref bool result)
        {
            result = this.Application.User.HasPermission(Permissions.DeleteTicket);
        }

        partial void CanDelTicket_PreprocessQuery(ref IQueryable<Ticket> query)
        {
            query = (from c in query where 0 == 1 select c);
        }

        partial void MyTickets_PreprocessQuery(string SearchText, string Category, string Priority, string Status, DateTime? BeginDate, DateTime? EndDate, ref IQueryable<Ticket> query)
        {
            String currentUserName = this.Application.User.Name.Split(new string[] { "\\" }, System.StringSplitOptions.None)[1];
            query = query.Where(t => t.EndUser.UserName == currentUserName);
        }

        partial void TicketComments_Inserting(TicketComment entity)
        {
            entity.EndUser = DataWorkspace.RCCHelpDeskInventoryData.EndUsers_SingleOrDefault(this.Application.User.Name.Substring(this.Application.User.Name.LastIndexOf("\\") + 1));
        }

        partial void CanRecycleDevice_CanExecute(ref bool result)
        {
            result = this.Application.User.HasPermission(Permissions.RecycleDevice);
        }

        partial void CanRecycleDevice_PreprocessQuery(ref IQueryable<Tech> query)
        {
            query = (from c in query where 0 == 1 select c);
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

        partial void SecurityAdmin_PreprocessQuery(ref IQueryable<Tech> query)
        {
            query = (from c in query where 0 == 1 select c);
        }

        partial void SecurityAdmin_CanExecute(ref bool result)
        {
            result = this.Application.User.HasPermission(Permissions.SecurityAdministration);
        }         
    }
}

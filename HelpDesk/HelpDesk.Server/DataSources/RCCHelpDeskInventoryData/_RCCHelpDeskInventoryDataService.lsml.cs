using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.LightSwitch;
using Microsoft.LightSwitch.Security.Server;
using Microsoft.Exchange.WebServices.Data;
using System.Xml.Linq;

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

        partial void Tickets_Inserted(Ticket entity)
        {
            this.SendTicketNotification(entity);
        }
        static bool RedirectionCallback(string url)
        {
            return true;
        }
        private void SendTicketNotification(Ticket entity)
        {
            try
            {
                ExchangeService service = new ExchangeService(ExchangeVersion.Exchange2010);
                service.Credentials = new WebCredentials("hdticket@roguecc.edu", "t1ck3t@RCC");
                service.AutodiscoverUrl("hdticket@roguecc.edu", RedirectionCallback);
                string endUserEmail = "";
                string techEmail = "IT-HelpDesk@roguecc.edu";
                DateTime ticketDate = (DateTime)entity.DateSubmitted;
                string comments = entity.TicketComments.First().Comments;
                string text = "";
                string ticketURL = "http://triton-rwc1:83/Tickets/htmlclient/" + "?entity=RCCHelpDeskInventoryData/Tickets(" + entity.Id + ")";
                EmailMessage message = new EmailMessage(service);
                
                if (entity.EndUser != null)
                {
                    endUserEmail = entity.EndUser.UserName + "@roguecc.edu";
                    message.ToRecipients.Add(endUserEmail);
                    text = XDocument.Parse(
                    @"<html>
                        <body>
                            --------------<br/>Please keep all replies above this line<br/>
                            A ticket was entered on " + ticketDate.ToLongDateString() + " at " + ticketDate.ToShortTimeString() + @".<br/>
                            EndUser: " + entity.EndUser.UserFirstName + " " + entity.EndUser.UserLastName + @"<br/>
                            Comments: " + comments + @" <br/> Reply to this message to add a comment or click the below link to view / edit the ticket and comment on it. <br/>
                            <a href='" + ticketURL + "'>" + ticketURL + @"</a>
                        </body>
                    </html>").ToString();
                }
                else
                {
                    text = XDocument.Parse(
                    @"<html>
                        <body>
                            --------------<br/>Please keep all replies above this line<br/>
                            A ticket was entered on " + ticketDate.ToLongDateString() + " at " + ticketDate.ToShortTimeString() + @".<br/>
                            Comments: " + comments + @" <br/> Reply to this message to add a comment or click the below link to view / edit the ticket and comment on it. <br/>
                            <a href='" + ticketURL + "'>" + ticketURL + @"</a>
                        </body>
                    </html>").ToString();
                }

                if (entity.Tech != null)
                {
                    techEmail = entity.Tech.UserName + "@roguecc.edu";
                }

                MessageBody body = new MessageBody(BodyType.HTML, text);
                message.Body = body;
                message.Subject = "Ticket #" + entity.Id + " created";
                message.ToRecipients.Add(techEmail);
                message.SendAndSaveCopy();
            }
            catch(Exception ex)
            {
                throw new InvalidOperationException("Wah, wah", ex);
            }
        }
        
        private void SendTicketClosedNotification(Ticket entity)
        {
            try
            {
                ExchangeService service = new ExchangeService(ExchangeVersion.Exchange2010);
                service.Credentials = new WebCredentials("hdticket@roguecc.edu", "t1ck3t@RCC");
                service.AutodiscoverUrl("hdticket@roguecc.edu", RedirectionCallback);
                string endUserEmail = "";
                string techEmail = "IT-HelpDesk@roguecc.edu";
                string comments = entity.TicketComments.Last().Comments;
                string text = "";
                string ticketURL = "http://triton-rwc1:83/Tickets/htmlclient/" + "?entity=RCCHelpDeskInventoryData/Tickets(" + entity.Id + ")";
                EmailMessage message = new EmailMessage(service);

                if (entity.EndUser != null)
                {
                    endUserEmail = entity.EndUser.UserName + "@roguecc.edu";
                    message.ToRecipients.Add(endUserEmail);
                }

                text = XDocument.Parse(
                    @"<html>
                        <body>
                            Ticket #" + entity.Id + " was Closed on " + DateTime.Now.ToLongDateString() + " at " + DateTime.Now.ToShortTimeString() + " by " + this.Application.User.FullName + @"<br/>
                            Comments: " + comments + @" <br/>
                        </body>
                    </html>").ToString();

                if (entity.Tech != null)
                {
                    techEmail = entity.Tech.UserName + "@roguecc.edu";
                }

                MessageBody body = new MessageBody(BodyType.HTML, text);
                message.Body = body;
                message.Subject = "Ticket #" + entity.Id + " closed";
                message.ToRecipients.Add(techEmail);
                message.SendAndSaveCopy();
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException("Wah, wah", ex);
            }
        }

        private void SendTicketAssignedNotification(Ticket entity)
        {
            if (entity.Tech != null)
            {
                try
                {
                    ExchangeService service = new ExchangeService(ExchangeVersion.Exchange2010);
                    service.Credentials = new WebCredentials("hdticket@roguecc.edu", "t1ck3t@RCC");
                    service.AutodiscoverUrl("hdticket@roguecc.edu", RedirectionCallback);
                    string techEmail = entity.Tech.UserName + "@roguecc.edu";
                    DateTime now = new DateTime();
                    string comments = entity.TicketComments.Last().Comments;
                    string text = "";
                    string ticketURL = "http://triton-rwc1:83/Tickets/htmlclient/" + "?entity=RCCHelpDeskInventoryData/Tickets(" + entity.Id + ")";
                    EmailMessage message = new EmailMessage(service);

                    text = XDocument.Parse(
                        @"<html>
                        <body>
                            Ticket #" + entity.Id + " has been assigned to you on " + DateTime.Now.ToLongDateString() + " at " + DateTime.Now.ToShortTimeString() + " by " + this.Application.User.FullName + @"<br/>
                            Comments: " + comments + @" <br/>
                        </body>
                    </html>").ToString();

         
                    MessageBody body = new MessageBody(BodyType.HTML, text);
                    message.Body = body;
                    message.Subject = "Ticket #" + entity.Id + " assigned to you";
                    message.ToRecipients.Add(techEmail);
                    message.SendAndSaveCopy();
                }
                catch (Exception ex)
                {
                    throw new InvalidOperationException("Wah, wah", ex);
                }
            }
        }

        private void SendCommentNotification(TicketComment entity)
        {
            if (entity.Ticket.TicketComments.Count() > 1)
            {
                try
                {
                    ExchangeService service = new ExchangeService(ExchangeVersion.Exchange2010);
                    service.Credentials = new WebCredentials("hdticket@roguecc.edu", "t1ck3t@RCC");
                    service.AutodiscoverUrl("hdticket@roguecc.edu", RedirectionCallback);
                    string endUserEmail = "";
                    string techEmail = "IT-HelpDesk@roguecc.edu";
                    DateTime commentDate = (DateTime)entity.CommentDate;
                    string comments = entity.Comments;
                    string text = "";
                    string ticketURL = "http://triton-rwc1:83/Tickets/htmlclient/" + "?entity=RCCHelpDeskInventoryData/Tickets(" + entity.Ticket.Id + ")";
                    EmailMessage message = new EmailMessage(service);

                    if (entity.EndUser != null)
                    {
                        endUserEmail = entity.EndUser.UserName + "@roguecc.edu";
                        message.ToRecipients.Add(endUserEmail);
                    }

                    text = XDocument.Parse(
                         @"<html>
                        <body>
                            --------------<br/>Please keep all replies above this line<br/>
                            " + this.Application.User.FullName + " commented on Ticket #" + entity.Ticket.Id + " on " + commentDate.ToLongDateString() + " at " + commentDate.ToShortTimeString() + @".<br/>
                            Comments: " + comments + @" <br/> Reply to this message to add a comment or click the below link to view / edit the ticket and comment on it. <br/>
                            <a href='" + ticketURL + "'>" + ticketURL + @"</a>
                        </body>
                    </html>").ToString();
                    if (entity.Ticket.Tech != null)
                    {
                        techEmail = entity.Ticket.Tech.UserName + "@roguecc.edu";
                    }

                    MessageBody body = new MessageBody(BodyType.HTML, text);
                    message.Body = body;
                    message.Subject = "New comment on Ticket #" + entity.Ticket.Id;
                    message.ToRecipients.Add(techEmail);
                    message.SendAndSaveCopy();
                }
                catch (Exception ex)
                {
                    throw new InvalidOperationException("Wah, wah", ex);
                }
            }
        }
        partial void Tickets_Updated(Ticket entity)
        {
            switch (entity.Status)
            {
                case "Resolved":
                    this.SendTicketClosedNotification(entity);
                    break;
                case "Assigned":
                    this.SendTicketAssignedNotification(entity);
                    break;
            }
        }

        partial void TicketComments_Inserted(TicketComment entity)
        {
            this.SendCommentNotification(entity);
        }
    }
}

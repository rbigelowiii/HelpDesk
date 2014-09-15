using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using LightSwitchApplication;

namespace LightSwitchApplication
{
    /// <summary>
    /// Summary description for GetUserName
    /// </summary>
    public class GetUserName : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            using (var serverContext = ServerApplicationContext.CreateContext())
            {
                context.Response.ContentType = "text/plain";
                context.Response.Write(serverContext.Application.User.Name.Split(new string[] { "\\" }, System.StringSplitOptions.None)[1]);
            }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}
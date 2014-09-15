using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.LightSwitch;
namespace LightSwitchApplication
{
    public partial class Desktop
    {
        partial void LocationName_Compute(ref string result)
        {
            // Set result to the desired field value
            if (this.Location == null)
            {
                result = null;
            }
            else
            {
                result = this.Location.LocationName;
            }
        }
    }
}

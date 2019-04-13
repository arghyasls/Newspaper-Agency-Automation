using System.Runtime.Serialization;

namespace my_new_app.Models
{
    
    public class Delivery
    {   public Delivery(string name, string address , string magazineName)
        {
            this.name = name;
            this.address = address;
            this.magazineName = magazineName;
        }
        public string name { get; set; }
        public string address { get; set; }
        public string magazineName { get; set; }
    }
}
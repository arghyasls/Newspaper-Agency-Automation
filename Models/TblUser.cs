using System;
using System.Collections.Generic;

namespace my_new_app.Models
{
    public partial class TblUser
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
    }
}

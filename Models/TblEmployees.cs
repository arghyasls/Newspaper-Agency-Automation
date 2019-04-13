using System;
using System.Collections.Generic;

namespace my_new_app.Models
{
    public partial class TblEmployees
    {
        public int EmployeeId { get; set; }
        public string Name { get; set; }
        public string Pincode { get; set; }
        public decimal Salary { get; set; }
        public string Address { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }
}

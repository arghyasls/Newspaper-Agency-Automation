using System;
using System.Collections.Generic;

namespace my_new_app.Models
{
    public partial class TblCustomers
    {
        public int CustomerId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string PinCode { get; set; }
        public string MagazineName { get; set; }
        public DateTime? IssueDate { get; set; }
        public DateTime? EndDate { get; set; }
        public DateTime? BillDate { get; set; }
        public string PaymentMode { get; set; }
        public string PaymentStatus { get; set; }
        public string SubscriptionStatus { get; set; }
        public string Email { get; set; }
    }
}

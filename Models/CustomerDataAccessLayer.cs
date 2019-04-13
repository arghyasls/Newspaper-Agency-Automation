using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace my_new_app.Models
{
    public class CustomerDataAccessLayer
    { 
             NewspaperContext db = new NewspaperContext();
             public IEnumerable<TblCustomers> GetAllCustomers()
         {
             try
             {
                 return db.TblCustomers.ToList();
             }
             catch
             {
                 throw;
             }
         }
         //To Add new employee record     
         public int AddCustomer(TblCustomers customer)
         {
             try
             {
                 db.TblCustomers.Add(customer);
                 db.SaveChanges();
                 return 1;
             }
             catch
             {
                 throw;
             }
         }

        public string GetSummary(string id)
        {   //total count
            var q1 = (from e in db.TblCustomers
                      where Convert.ToDateTime(id) >= e.IssueDate && Convert.ToDateTime(id) <= e.EndDate
                      select e).Count();
            var q2 = (from e in db.TblCustomers
                      where Convert.ToDateTime(id) >= e.IssueDate && Convert.ToDateTime(id) <= e.EndDate
                      select e.MagazineName).ToList();
            string combindedString = string.Join(",", q2.Distinct().ToArray());
            string delivery = "";
            for (int i = 0; i < q2.Count; i++)
                delivery += q2[i] + ',';
           var q3= GetMBill(delivery,id);
            return "Total Customers=" + q1 + '\n' + "Magazines Subscribed=" + combindedString+ '\n' + "Monthly Sales Amount= Rs" + q3;
        }

        public string GetReminder(int id)
        {
            TblCustomers customer = GetCustomerData(id);
            DateTime t =(DateTime)customer.BillDate;
            DateTime x = DateTime.Today;
            var c = (x - t).TotalDays;
            if (c >= 31)

            { string delivery = customer.MagazineName;

              string  body = "Payment Over Due by a month !!" + "\n" + "Customer Name=" + customer.Name + "\n" + "Magazine Subsribed=" + customer.MagazineName + "\n" + "Amount due=" + GetMBillC(delivery,(DateTime)customer.BillDate);
                sendmail(body,customer.Email);
                return "yes";
                
            }
            else
                return "no";
        }

        private async void sendmail(string body,string email)
        {
            var message = new MailMessage();
            message.To.Add(new MailAddress(email));  // replace with valid value 
            message.From = new MailAddress("arghyasls@outlook.com");  // replace with valid value
            message.Subject = "Clear Dues";
            message.Body = body;


            using (var smtp = new SmtpClient())
            {
                var credential = new NetworkCredential
                {
                    UserName = "arghyasls@outlook.com",  // replace with valid value
                    Password = "8-6-1996arg"  // replace with valid value
                };
                smtp.Credentials = credential;
                smtp.Host = "smtp-mail.outlook.com";
                smtp.Port = 587;
                smtp.EnableSsl = true;
                await smtp.SendMailAsync(message);


            }
        }

        public double GetMBillC(string cus,DateTime dt)
        {
            string[] values = cus.Split(',').Select(sValue => sValue.Trim()).ToArray();
            double sum = 0;
            for (int i = 0; i < values.Length; i++)
            {
                var ans = (from m in db.TblMagazines
                           where m.MagazineName == values[i]
                           select m.MagazinePrice).Sum();
                sum += (double)ans;
            }
            var year = Convert.ToDateTime(dt).Year;
            var month = Convert.ToDateTime(dt).Month;
            return sum * DateTime.DaysInMonth(year, month);

        }
        public double GetMBill(string cus,string id)
        {
            string[] values = cus.Split(',').Select(sValue => sValue.Trim()).ToArray();
            double sum = 0;
            for (int i = 0; i < values.Length; i++)
            {
                var ans = (from m in db.TblMagazines
                           where m.MagazineName == values[i]
                           select m.MagazinePrice).Sum();
                sum += (double)ans;
            }
            var year = Convert.ToDateTime(id).Year;
            var month = Convert.ToDateTime(id).Month;
            return sum * DateTime.DaysInMonth(year, month);
            
        }

        public string GetBill(int id)
        {
            TblCustomers customer = GetCustomerData(id);
            decimal ans = GetBillC(customer.MagazineName);
            return "Name="+customer.Name+'\n'+"Magazine Subscribed="+customer.MagazineName+'\n'+"Amount Payable = Rs"+ans;
        }
        public decimal GetBillC(string cus)
        {
            string[] values = cus.Split(',').Select(sValue => sValue.Trim()).ToArray();
            decimal sum = 0;
            for (int i = 0; i < values.Length; i++)
            {
                var ans = (from m in db.TblMagazines
                           where m.MagazineName == values[i]
                           select m.MagazinePrice).Sum();
                sum += ans;
            }
            return sum;

        }
        //To Update the records of a particluar employee    
        public int UpdateCustomers(TblCustomers customer)
         {
             try
             {
                 db.Entry(customer).State = EntityState.Modified;
                 db.SaveChanges();
                 return 1;
             }
             catch
             {
                 throw;
             }
         }
         //Get the details of a particular employee    
         public TblCustomers GetCustomerData(int id)
         {
             try
             {
                 TblCustomers customer = db.TblCustomers.Find(id);
                 return customer;
             }
             catch
             {
                 throw;
             }
         }
         //To Delete the record of a particular employee    
         public int DeleteCustomer(int id)
         {
             try
             {
                 TblCustomers customers = db.TblCustomers.Find(id);
                 db.TblCustomers.Remove(customers);
                 db.SaveChanges();
                 return 1;
             }
             catch
             {
                 throw;
             }
         }
         
    }
}

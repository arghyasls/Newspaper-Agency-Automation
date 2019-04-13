using Microsoft.EntityFrameworkCore;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace my_new_app.Models
{
    public class EmployeeDataAccessLayer
    { 
       NewspaperContext db = new NewspaperContext();
        public IEnumerable<TblEmployees> GetAllEmployees()
        {
            try
            {
                return db.TblEmployees.ToList();
            }
            catch
            {
                throw;
            }
        }
        public IEnumerable<Delivery> GetDeliveries(string empName)
        {
            DateTime startDateTime = DateTime.Today;
            try
            {
               
               var ans = from e in db.TblEmployees
                          from c in db.TblCustomers

                          where c.PinCode == e.Pincode && e.Username==empName && c.SubscriptionStatus.ToLower()=="active" && startDateTime>= c.IssueDate && startDateTime <= c.EndDate
                         select  new Delivery
                          (  
                             c.Name,
                             c.Address,
                             c.MagazineName
                );
                return ans;
            }
            catch
            {
                throw;
            }
          
        }
        public double Salary(string empName)
            
        {
            DateTime startDateTime = DateTime.Today;
            try
            {

                var ans = (from e in db.TblEmployees
                          from c in db.TblCustomers

                          where c.PinCode == e.Pincode && e.Username == empName && c.SubscriptionStatus.ToLower() == "active" && startDateTime >= c.IssueDate && startDateTime <= c.EndDate
                           select c.MagazineName).ToList();
                string delivery = "";
                for (int i = 0; i < ans.Count; i++)
                    delivery += ans[i]+',';
                return GetSalary(delivery);
            }
            catch
            {
                throw;
            }

        }

       public IEnumerable<TblEmployees> GetUsername()
        {
            List<TblEmployees> lstMag = new List<TblEmployees>();
            lstMag = (from magList in db.TblEmployees select magList).ToList();
            return lstMag;
        }

        public double GetSalary(string cus)
        {
            string[] values = cus.Split(',').Select(sValue => sValue.Trim()).ToArray();
            double sum = 0;
            for (int i=0;i<values.Length;i++)
            { var ans = (from m in db.TblMagazines where m.MagazineName == values[i]
                        select m.MagazinePrice).Sum();
                sum +=(double)ans;
            }
            return 0.025*sum;

        }
        //To Add new employee record     
        public int AddEmployee(TblEmployees employee)
        {
            try
            {
                db.TblEmployees.Add(employee);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
        //To Update the records of a particluar employee    
        public int UpdateEmployee(TblEmployees employee)
        {
            try
            {
                db.Entry(employee).State = EntityState.Modified;
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
        //Get the details of a particular employee    
        public TblEmployees GetEmployeeData(int id)
        {
            try
            {
                TblEmployees employee = db.TblEmployees.Find(id);
                return employee;
            }
            catch
            {
                throw;
            }
        }
        //To Delete the record of a particular employee    
        public int DeleteEmployee(int id)
        {
            try
            {
                TblEmployees emp = db.TblEmployees.Find(id);
                db.TblEmployees.Remove(emp);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
        
      
        //Get the details of a particular employee  
      

        public int Check(String username )
        {
           
            try
            {
                bool whatever = db.TblEmployees.Any(u => u.Username== username);
                if (whatever)
                    return 1;
                
                    return 0;
            }
            catch
            {
                throw;
            }
        }
     
    }
}
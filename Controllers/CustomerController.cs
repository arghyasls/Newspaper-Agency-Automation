using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using my_new_app.Models;

namespace my_new_app.Controllers
{
    public class CustomerController: Controller
{
        CustomerDataAccessLayer objcustomer = new CustomerDataAccessLayer();
        [HttpGet]
        [Route("api/Customer/Index")]
        public IEnumerable<TblCustomers> Index()
        {
            return objcustomer.GetAllCustomers();
        }
        [HttpGet]
        [Route("api/Customer/Bill/{id}")]
        public string Bill(int id)
        {
            return objcustomer.GetBill(id);
        }
        [HttpGet]
        [Route("api/Customer/Summary/{id}")]
        public string summary(string id)
        {
            return objcustomer.GetSummary(id);
        }
        [HttpGet]
        [Route("api/Customer/Reminder/{id}")]
        public string reminder(int id)
        {
            return objcustomer.GetReminder(id);
        }
        [HttpPost]
        [Route("api/Customer/Create")]
        public int Create(TblCustomers customer)
        {
            return objcustomer.AddCustomer(customer);
        }
        [HttpGet]
        [Route("api/Customer/Details/{id}")]
        public TblCustomers Details(int id)
        {
            return objcustomer.GetCustomerData(id);
        }
        [HttpPut]
        [Route("api/Customer/Edit")]
        public int Edit(TblCustomers customer)
        {
            return objcustomer.UpdateCustomers(customer);
        }
        [HttpDelete]
        [Route("api/Customer/Delete/{id}")]
        public int Delete(int id)
        {
            return objcustomer.DeleteCustomer(id);
        }
     
    }

}

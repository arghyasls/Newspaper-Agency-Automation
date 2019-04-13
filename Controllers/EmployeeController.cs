using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using my_new_app.Models;
namespace my_new_app.Controllers
{
    public class EmployeeController : Controller
    {
        EmployeeDataAccessLayer objemployee = new EmployeeDataAccessLayer();
        [HttpGet]
        [Route("api/Employee/Index")]
        public IEnumerable<TblEmployees> Index()
        {
            return objemployee.GetAllEmployees();
        }
        [HttpGet]
        [Route("api/Employee/Delivery/{empName}")]
        public IEnumerable<Delivery> Delivery(string empName)
        {
            return objemployee.GetDeliveries(empName);
        }
        [HttpGet]
        [Route("api/Employee/Salary/{empName}")]
        public string Salary(string empName)
        {
            return objemployee.Salary(empName).ToString();
        }
        [HttpPost]
        [Route("api/Employee/Create")]
        public int Create(TblEmployees employee)
        {
            return objemployee.AddEmployee(employee);
        }
        [HttpGet]
        [Route("api/Employee/Details/{id}")]
        public TblEmployees Details(int id)
        {
            return objemployee.GetEmployeeData(id);
        }
        [HttpPut]
        [Route("api/Employee/Edit")]
        public int Edit(TblEmployees employee)
        {
            return objemployee.UpdateEmployee(employee);
        }
        [HttpDelete]
        [Route("api/Employee/Delete/{id}")]
        public int Delete(int id)
        {
            return objemployee.DeleteEmployee(id);
        }
       

            [HttpPost]
            [Route("api/loginD")]
            public int Login([FromBody]Response employee)
            {
                return objemployee.Check(employee.username);
            }
        [HttpGet]
        [Route("api/Employee/GetUserName")]
        public IEnumerable<TblEmployees> Details()
        {
            return objemployee.GetUsername();
        }

    }
    }

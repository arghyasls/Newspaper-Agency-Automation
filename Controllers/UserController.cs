using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using my_new_app.Models;

namespace my_new_app.Controllers
{
    public class UserController : Controller

    {
        UserDataAccessLayer objus = new UserDataAccessLayer();

        [HttpGet]
        [Route("api/User/Index")]
        public IEnumerable<TblUser> Index()
        {
            return objus.GetAllUser();
        }
        [HttpPost]
        [Route("api/User/Create")]
        public int Create(TblUser us)
        {
            return objus.AddUser(us);
        }
       
        [HttpPut]
        [Route("api/User/Edit")]
        public int Edit(TblUser us)
        {
            return objus.UpdateUser(us);
        }
        [HttpPost]
        [Route("api/login")]
        public int Login([FromBody]Response employee)
        {
            return (objus.Check(employee.username, employee.password));
        }


    }
}

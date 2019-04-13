using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using my_new_app.Models;

namespace my_new_app.Controllers { 
    public class MagazineController : Controller

{
        MagazineDataAccessLayer objmag = new MagazineDataAccessLayer();

          [HttpGet]
        [Route("api/Magazine/Index")]
        public IEnumerable<TblMagazines> Index()
        {
            return objmag.GetAllMagazines();
        }
        [HttpPost]
        [Route("api/Magazine/Create")]
        public int Create(TblMagazines Magazine)
        {
            return objmag.AddMagazine(Magazine);
        }
        [HttpGet]
        [Route("api/Magazine/Details/{id}")]
        public TblMagazines Details(int id)
        {
            return objmag.GetMagazineData(id);
        }
        [HttpPut]
        [Route("api/Magazine/Edit")]
        public int Edit(TblMagazines Magazine)
        {
            return objmag.UpdateMagazine(Magazine);
        }
        [HttpDelete]
        [Route("api/Magazine/Delete/{id}")]
        public int Delete(int id)
        {
            return objmag.DeleteMagazine(id);
        }
        [HttpGet]
        [Route("api/Magazine/GetMagList")]
        public IEnumerable<TblMagazines> Details()
        {
            return objmag.GetMag();
        }
    }
}

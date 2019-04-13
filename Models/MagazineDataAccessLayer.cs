using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace my_new_app.Models
{
    public class MagazineDataAccessLayer
    {
        NewspaperContext db = new NewspaperContext();
        public IEnumerable<TblMagazines> GetAllMagazines()
        {
            try
            {
                return db.TblMagazines.ToList();
            }
            catch
            {
                throw;
            }
        }
        //To Add new Magazine record     
        public int AddMagazine(TblMagazines Magazine)
        {
            try
            {
                db.TblMagazines.Add(Magazine);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
        //To Update the records of a particluar Magazine    
        public int UpdateMagazine(TblMagazines Magazine)
        {
            try
            {
                db.Entry(Magazine).State = EntityState.Modified;
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
        //Get the details of a particular Magazine    
        public TblMagazines GetMagazineData(int id)
        {
            try
            {
                TblMagazines Magazine = db.TblMagazines.Find(id);
                return Magazine;
            }
            catch
            {
                throw;
            }
        }
        //To Delete the record of a particular Magazine    
        public int DeleteMagazine(int id)
        {
            try
            {
                TblMagazines emp = db.TblMagazines.Find(id);
                db.TblMagazines.Remove(emp);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        public List<TblMagazines> GetMag()
        {
            List<TblMagazines> lstMag = new List<TblMagazines>();
            lstMag = (from magList in db.TblMagazines select magList).ToList();
            return lstMag;
        }
    }
}

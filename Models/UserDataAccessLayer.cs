using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace my_new_app.Models
{
    public class UserDataAccessLayer
{
        NewspaperContext db = new NewspaperContext();
        public IEnumerable<TblUser> GetAllUser()
        {
            try
            {
                return db.TblUser.ToList();
            }
            catch
            {
                throw;
            }
        }
        //To Add new Magazine record     
        public int AddUser(TblUser user)
        {
            try
            {
                db.TblUser.Add(user);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
        //To Update the records of a particluar Magazine    
        public int UpdateUser(TblUser user)
        {
            try
            {
                db.Entry(user).State = EntityState.Modified;
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
        public int Check(String username, String password)
        {

            try
            {
                bool whatever = db.TblUser.Any(u => u.Username == username && u.Password == password);
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

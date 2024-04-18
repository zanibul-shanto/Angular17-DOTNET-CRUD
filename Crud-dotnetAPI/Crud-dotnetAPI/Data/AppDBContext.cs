using Microsoft.EntityFrameworkCore;

namespace Crud_dotnetAPI.Data
{
  public class AppDBContext: DbContext
  {
    public AppDBContext(DbContextOptions<AppDBContext> options): base(options) { }
    public DbSet<Employee> Employees { get; set; }
  }
}

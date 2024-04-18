using Microsoft.EntityFrameworkCore;

namespace Crud_dotnetAPI.Data
{
  public class EmployeeRepository
  {
    private readonly AppDBContext _appDBContext;

    public EmployeeRepository(AppDBContext appDBContext)
    {
      _appDBContext = appDBContext;
    }

    public async Task AddEmployee(Employee employee)
    {
      await _appDBContext.Set<Employee>().AddAsync(employee);
      await _appDBContext.SaveChangesAsync();
    }
    public async Task<List<Employee>> GetEmployeeList()
    {
      return await _appDBContext.Employees.ToListAsync();
    }

    public async Task<Employee> GetEmployeeById(int id)
    {
      return await _appDBContext.Employees.FindAsync(id);
    }

    public async Task UpdateEmployeeAsync(int id, Employee model)
    {
      var employee = await _appDBContext.Employees.FindAsync(id);
      if (employee == null)
      {
        throw new Exception("Employee not found");
      }
      employee.Name = model.Name;
      employee.Email = model.Email;
      employee.Phone = model.Phone;
      employee.Age = model.Age;
      employee.Salary = model.Salary;

      await _appDBContext.SaveChangesAsync();
    }

    public async Task DeleteEmployeeByIdAsync(int id)
    {
      var employee = await _appDBContext.Employees.FindAsync(id);
      if (employee == null)
      {
        throw new Exception("Employee not found");
      }
      _appDBContext.Employees.Remove(employee);
      await _appDBContext.SaveChangesAsync();
    }

  }
}

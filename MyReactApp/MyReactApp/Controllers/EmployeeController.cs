using Microsoft.AspNetCore.Mvc;
using MyReactApp.Models;

namespace MyReactApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EmployeeController : ControllerBase
{
    [HttpGet]
    public JsonResult Get()
    {
        var employees = Employees;
        return new JsonResult(employees);
    }

    [HttpPost]
    public JsonResult Post(Employee employee)
    {
        var employees = Employees;
        employees.Add(employee);
        return new JsonResult(employees);
    }

    [HttpPut]
    public IActionResult Put(Employee employee)
    {
        var employees = Employees;
        var dbEmployee = employees.FirstOrDefault(x => x.Id == employee.Id);
        if (dbEmployee == null)
            return NotFound();

        employees.Remove(dbEmployee);
        employees.Add(employee);

        return new JsonResult(employees);
    }

    [HttpDelete("{id:int}")]
    public IActionResult Delete(int id)
    {
        var employees = Employees;
        var dbEmployee = employees.FirstOrDefault(x => x.Id == id);
        if (dbEmployee == null)
            return NotFound();

        employees.Remove(dbEmployee);
        return new JsonResult(employees);
    }

    private static List<Employee> Employees =>
        new List<Employee>
        {
            new () {Id = 1, Name = "Employee 1",DateOfJoining = DateTime.Now.ToShortDateString(),Department = "Dep 1"},
            new () {Id = 1, Name = "Employee 2",DateOfJoining = DateTime.Now.ToShortDateString(),Department = "Dep 3"},
            new () {Id = 1, Name = "Employee 3",DateOfJoining = DateTime.Now.ToShortDateString(),Department = "Dep 2"},
            new () {Id = 1, Name = "Employee 4",DateOfJoining = DateTime.Now.ToShortDateString(),Department = "Dep 4"},
        };

}
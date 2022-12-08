using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyReactApp.Models;

namespace MyReactApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EmployeeController : ControllerBase
{
    private readonly IWebHostEnvironment _env;

    public EmployeeController(IWebHostEnvironment env)
    {
        _env = env;
    }

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
    [Route("SaveFile")]
    [HttpPost]
    public async Task<JsonResult> SaveFile([FromForm]IFormFile uploadedFile)
    {
        try
        {
            var fileName = uploadedFile.FileName;
            var physicalPath = _env.ContentRootPath + "/Photos/" + fileName;

            await using (var stream = new FileStream(physicalPath,FileMode.Create))
            {
                await uploadedFile.CopyToAsync(stream);
            }

            return new JsonResult(fileName);
        }
        catch (Exception e)
        {
            return new JsonResult("anonymous.png");
        }
    }
    
    private static List<Employee> Employees =>
        new List<Employee>
        {
            new () {Id = 1, Name = "Employee 1",DateOfJoining = DateTime.Now.ToShortDateString(),Department = "Department 1"},
            new () {Id = 2, Name = "Employee 2",DateOfJoining = DateTime.Now.ToShortDateString(),Department = "Department 3"},
            new () {Id = 3, Name = "Employee 3",DateOfJoining = DateTime.Now.ToShortDateString(),Department = "Department 2"},
            new () {Id = 4, Name = "Employee 4",DateOfJoining = DateTime.Now.ToShortDateString(),Department = "Department 4"},
        };

}
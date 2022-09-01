using Microsoft.AspNetCore.Mvc;
using MyReactApp.Models;

namespace MyReactApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DepartmentController : ControllerBase
{
    [HttpGet]
    public JsonResult Get()
    {
        var departments = Departments;
        return new JsonResult(departments);
    }

    [HttpPost]
    public JsonResult Post(Department department)
    {
        var departments = Departments;
        departments.Add(department);
        return new JsonResult(Departments);
    }

    [HttpPut]
    public IActionResult Put(Department department)
    {
        var departments = Departments;
        var dbDepartment = departments.FirstOrDefault(x=>x.Id == department.Id);
        if (dbDepartment == null)
            return NotFound();

        departments.Remove(dbDepartment);
        departments.Add(department);

        return new JsonResult(departments);
    }

    [HttpDelete("{id:int}")]
    public IActionResult Delete(int id)
    {
        var departments = Departments;
        var dbDepartment = departments.FirstOrDefault(x => x.Id == id);
        if (dbDepartment == null)
            return NotFound();

        departments.Remove(dbDepartment);
        return new JsonResult(departments);
    }

    private static List<Department> Departments =>
        new List<Department>
        {
            new () {Id = 1, Name = "Department 1"},
            new () {Id = 2, Name = "Department 2"},
            new () {Id = 3, Name = "Department 3"},
            new () {Id = 4, Name = "Department 4"}
        };
}
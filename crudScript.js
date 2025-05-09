let table = document.querySelector('table');

//accessing fields from add student modal
let addForm = document.querySelector('.add-stu-form');
let nameField = document.querySelector('.name');
let rollNoField = document.querySelector('.roll-no');
let phoneNoField = document.querySelector('.phone-no');
let departmentField = document.querySelector('.department');
let addButton = document.querySelector('.add-btn');

//accessing fields from update student data modal
let updateForm = document.querySelector('.update-stu-form');
let stuName = document.querySelector('.stu-name');
let stuRollNo = document.querySelector('.stu-roll-no');
let stuPhoneNo = document.querySelector('.stu-phone-no');
let stuDepartment = document.querySelector('.stu-department');
let updateButton = document.querySelector('.update-btn');



//stores students only if initaily localStorage not have students key
if (!localStorage.getItem('students')) {
    localStorage.setItem('students', JSON.stringify([]));
}




//store student data in local storage
addButton.addEventListener('click', () => {
    //acessing values from form fields
    let name = nameField.value;
    let rollNo = rollNoField.value;
    let phoneNumber = phoneNoField.value;
    let department = departmentField.value;

    //storing values in object
    const data = {
        Name: name,
        RollNo: rollNo,
        PhoneNumber: phoneNumber,
        Department: department
    }

    if (data.Name && data.RollNo && data.PhoneNumber && data.Department) {

        let studentArray = JSON.parse(localStorage.getItem('students'));
        //pushing object in array
        studentArray.push(data);

        //storing array in localStorage
        localStorage.setItem('students', JSON.stringify(studentArray));
        addForm.reset();
        addStudentRow(data);
    }
    else {
        alert('Fill out all the form fields');
    }

})




//display students data on web page
function addStudentRow(stuInfo) {
    let tr = document.createElement('tr');
    tr.innerHTML = `
        <td>${stuInfo.Name}</td>
        <td>${stuInfo.RollNo}</td>
        <td>${stuInfo.PhoneNumber}</td>
        <td>${stuInfo.Department}</td>
        <td>
        <i class="fa-solid fa-eye text-success mx-3 fs-4" data-bs-toggle="modal" data-bs-target="#view-update"></i>
        <i class="fa-solid fa-trash text-danger mx-3 fs-4"></i>
        </td>
        `
    table.append(tr);
}
window.addEventListener('DOMContentLoaded', () => {
    let studentsData = JSON.parse(localStorage.getItem('students'));
    studentsData.forEach((element) => {
        addStudentRow(element);
    })
})




//view  update and delete student data
table.addEventListener('click', (e) => {
    if (e.target.classList.contains("fa-eye")) {
        let parentTr = e.target.parentElement.parentElement;
        let childTd = parentTr.children;
        stuName.value = childTd[0].innerText;
        stuRollNo.value = childTd[1].innerText;
        stuPhoneNo.value = childTd[2].innerText;
        stuDepartment.value = childTd[3].innerText;
    }
    //remove student
    else if ((e.target.classList.contains("fa-trash"))) {
        let confirmation = confirm('Are you sure, You want to delete this student?');
        if (confirmation) {
            let rowData = e.target.parentElement.parentElement;
            let name = rowData.firstElementChild.innerText;
            let array = JSON.parse(localStorage.getItem('students'));
            let stuDataIndex = array.findIndex((student) => student.Name === name);
            array.splice(stuDataIndex, 1);
            localStorage.setItem('students', JSON.stringify(array));
            location.reload();
        }
    }
});
//update data
updateButton.addEventListener('click', () => {
    let name = stuName.value;
    let rollNo = stuRollNo.value;
    let phone = stuPhoneNo.value;
    let depart = stuDepartment.value;
    let array = JSON.parse(localStorage.getItem('students'));
    let stuIndex = array.findIndex((student) => student.RollNo === rollNo);
    let stu = array.find((student) => student.RollNo === rollNo);
    if (stu) {
        stu.Name = name;
        stu.RollNo = rollNo;
        stu.PhoneNumber = phone;
        stu.Department = depart;
    }
    array.splice(stuIndex, stu);
    localStorage.setItem('students', JSON.stringify(array));
    updateForm.reset();
    location.reload();

})
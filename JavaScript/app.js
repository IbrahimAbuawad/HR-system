'use strict';

// let formDiv = document.getElementById('formDiv');
let form = document.getElementById('form');
let tableDiv = document.getElementById('tableDiv');
let totalSum = 0;
let table = document.createElement('table');
tableDiv.appendChild(table);

function getRandomInt(min, max) {

  return Math.floor(Math.random() * (max - min + 1) + min);
}

function Employee(name, email, department) {

  this.name = name;
  this.email = email;
  this.department = department;
  this.salary = 0;

  Employee.all.push(this);
}
Employee.all = [];

Employee.prototype.randomSalary = function () {
  this.salary = getRandomInt(100, 500);
};

Employee.prototype.render = function () {

  let tr = document.createElement('tr');
  table.appendChild(tr);

  let tdNameValue = document.createElement('td');
  tr.appendChild(tdNameValue);
  tdNameValue.textContent = this.name;

  let tdEmailValue = document.createElement('td');
  tr.appendChild(tdEmailValue);
  tdEmailValue.textContent = this.email;

  let tdDepartValue = document.createElement('td');
  tr.appendChild(tdDepartValue);
  tdDepartValue.textContent = this.department;

  let tdSalaryValue = document.createElement('td');
  tr.appendChild(tdSalaryValue);
  tdSalaryValue.textContent = this.salary;
  totalSum = totalSum + this.salary;

  localSet();
};

function getRender() {
  for (let i = 0; i < Employee.all.length; i++) {
    let tr = document.createElement('tr');
    table.appendChild(tr);

    let tdNameValue = document.createElement('td');
    tr.appendChild(tdNameValue);
    tdNameValue.textContent = Employee.all[i].name;

    let tdEmailValue = document.createElement('td');
    tr.appendChild(tdEmailValue);
    tdEmailValue.textContent = Employee.all[i].email;

    let tdDepartValue = document.createElement('td');
    tr.appendChild(tdDepartValue);
    tdDepartValue.textContent = Employee.all[i].department;

    let tdSalaryValue = document.createElement('td');
    tr.appendChild(tdSalaryValue);
    tdSalaryValue.textContent = Employee.all[i].salary;
    totalSum = totalSum + Employee.all[i].salary;


  }
  localSet();
}

function localSet() {
  localStorage.setItem('employee', JSON.stringify(Employee.all));
  localStorage.setItem('salary',JSON.stringify(totalSum));
}

function localGet() {
  let convert = localStorage.getItem('employee');
  if (convert) {
    Employee.all = JSON.parse(convert);

    getRender();
  }
  let convertSalary = localStorage.getItem('salary');
  if (convertSalary) {
    totalSum = JSON.parse(convertSalary);
    tableFooter();
  }
}

function tableHeader() {
  let trHeader = document.createElement('tr');
  table.appendChild(trHeader);

  let tdName = document.createElement('th');
  trHeader.appendChild(tdName);
  tdName.textContent = 'Name';

  let tdEmail = document.createElement('th');
  trHeader.appendChild(tdEmail);
  tdEmail.textContent = 'Email';

  let tdDepart = document.createElement('th');
  trHeader.appendChild(tdDepart);
  tdDepart.textContent = 'Department';

  let tdSalary = document.createElement('th');
  trHeader.appendChild(tdSalary);
  tdSalary.textContent = 'Salary';

}

tableHeader();

function tableFooter() {
    
  let totalParag = document.createElement('p');
  tableDiv.appendChild(totalParag);
  totalParag.id = 'tableParag';
  totalParag.textContent = `Total = ${totalSum}`;
  
}

// tableFooter();

form.addEventListener('submit', addNewEmployee);

function addNewEmployee(event) {
  event.preventDefault();

  let nameValue = event.target.Name.value;
  let emailValue = event.target.Email.value;
  let departValue = event.target.depart.value;

  let employee = new Employee(nameValue, emailValue, departValue);


  employee.randomSalary();
  employee.render();
  console.log(totalSum);


}
localGet();

/**
* Treehouse Techdegree:
* FSJS Project 2 - Data Pagination and Filtering
* Filters through a list of students and creates pagination of list.
* Uses search functionality to search through list of students.
* written by Jessica Hunter 2022
**/



/**
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
**/

//items to be displayed per page
const itemsPerPage = 9;

/**
* `showPage` function:
* gets 9 students based on the provided page. Appends student objects to studentList innerHTML to be shown on the provided page.
*
*  @param {array} list - array of student objects
*  @param {number} page - page number to display
**/

function showPage (list, page) {
  const startIndex = (page * itemsPerPage) - itemsPerPage;
  const endIndex = (page * itemsPerPage);
  const studentList = document.querySelector('.student-list');
  studentList.innerHTML = '';
  for (let i = 0; i < list.length; i++){
    if ( i >= startIndex && i < endIndex ){
      let html = `
        <li class="student-item cf">
          <div class="student-details">
            <img class="avatar" src=${list[i].picture.medium} alt="Profile Picture">
            <h3>${list[i].name.first} ${list[i].name.last}</h3>
            <span class="email">${list[i].email}</span>
          </div>
          <div class="joined-details">
            <span class="date">${list[i].registered.date}</span>
          </div>
        </li> `;
      studentList.insertAdjacentHTML('beforeend', html);
    }
  }
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/



// Call functions

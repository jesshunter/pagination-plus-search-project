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

/**
* `addPagination` function
* creates pagination buttons, highlights button of current page selected
* and listens for page button clicks to display students for a given page when clicked
*
* @param {array} list - list of students
**/

function addPagination(list) {
  const paginationButtons = Math.ceil(list.length / itemsPerPage);
  const linkList = document.querySelector('.link-list');
  linkList.innerHTML = '';

  //creates html list of page buttons
  for (let i = 1; i <= paginationButtons; i++ ){
    let html = `
    <li>
      <button type="button">${i}</button>
    </li>
    `;
    linkList.insertAdjacentHTML('beforeend', html);
  }

  //select first page button and assign it a class of active
  let currentActiveButton = document.querySelector('.link-list li').firstElementChild;
  currentActiveButton.className = 'active';

  //event listener for clicks on pagination listener
  linkList.addEventListener('click', (e) => {
    //runs only on button click, not clciking space between
      if (e.target.type === 'button'){
        //removes active class from currentActiveButton
        currentActiveButton.className = '';
        //gets button that was clicked
        currentActiveButton = e.target;
        //sets clicked button classname to active
        currentActiveButton.className = 'active';
        //show list of students for designated showPage
        showPage(data, e.target.textContent);
    }
  });
}

// Call functions
showPage(data, 1);
addPagination(data);

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

/**
* `addSearchBar` function
* dynamically creates search bar and adds it to the page
**/
function addSearchBar(){
  const header = document.querySelector('header');
  const searchBarHTML = `<label for="search" class="student-search">
    <span>Search by name</span>
    <input id="search" placeholder="Search by name...">
    <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
  </label>`;
  header.insertAdjacentHTML('beforeend', searchBarHTML);
}

//adds search bar to page
addSearchBar();


//students to be displayed per page
const itemsPerPage = 9;

/**
* `showPage` function:
* gets # students objects based on the provided page.
* appends student objects to studentList innerHTML to be shown on the provided page.
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

/**
* `studentFilter` function
* @param {array} list - list of students
*
**/
function studentFilter(list){

  const searchBar = document.querySelector('#search');
  //listen for input
  searchBar.addEventListener('keyup', (e) => {

    let searchResults = [];

    //get current input and convert to lowercase
    //compare input with list of students
      //must compare each letter in students first and last name with input
    for (const student of list ){
      if (student.name.first.toLowerCase().includes(e.target.value.toLowerCase()) || student.name.last.toLowerCase().includes(e.target.value.toLowerCase()) ){
        //add to list of search results
        searchResults.push(student);
        //display page of filtered students
        showPage(searchResults, 1);

        //update pagination
        addPagination(searchResults);
      }
    }
    if (searchResults.length === 0){
      //if no match display no students or pagination
      const studentList = document.querySelector('.student-list');
      studentList.innerHTML = '';
      document.querySelector('.pagination').style.display = 'none';
      //display No Results message
      const div = document.createElement('div');
      const noResultsMessage = document.createElement('p');
      noResultsMessage.textContent = "No results found";
      noResultsMessage.className = 'no-results';
      document.querySelector('div').append(noResultsMessage);
      document.querySelector('body').append(div);
    }
  });
}

studentFilter(data);

// Call functions
showPage(data, 1);
addPagination(data);

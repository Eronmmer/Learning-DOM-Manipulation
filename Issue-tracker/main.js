if(document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
}else {
  ready();
}

function ready() {
  let modal = document.querySelector('.modal');

  let issueLists = document.querySelector('.issue-lists');

  let addOneHere = document.querySelector('.add-one-here');
  addOneHere.addEventListener('click', showModal);

  let closeButton = document.querySelector('.close-button');
  closeButton.addEventListener('click', hideModal);

  window.addEventListener('click', outsideClose);

  let newIssueButton = document.querySelector('.new-issue-button');

  let count = 0;

  newIssueButton.addEventListener('click', function() {
    modal.style.display = 'block';
  })

  let form = document.querySelector('.form');
  form.addEventListener('submit', appendIssue);


  function appendIssue(e) {
    e.preventDefault();

    let issueTitle = document.querySelector('#issue-title').value;
    let description = document.querySelector('#description').value;
    let recommendation = document.querySelector('#recommendation').value;

    let newIssue = document.createElement('li');
    newIssue.className = 'new-issue';
    let issueHeader = document.createElement('p');
    let issueHeaderText = document.createTextNode(issueTitle);
    issueHeader.appendChild(issueHeaderText);
    newIssue.appendChild(issueHeader);
    let closeButton = document.createElement('button');
    let closeButtonText = document.createTextNode('Close');
    closeButton.className = "close-btn";
    closeButton.appendChild(closeButtonText);
    newIssue.appendChild(closeButton);
    let deleteButton = document.createElement('button');
    let deleteButtonText = document.createTextNode('Delete');
    deleteButton.className = "delete-btn";
    deleteButton.appendChild(deleteButtonText);
    newIssue.appendChild(deleteButton);
    issueLists.appendChild(newIssue);

    newIssueButton.style.display = 'block';
    modal.style.display = 'none';

    let helloMessage = document.querySelector('.add-fresh-issue');
    helloMessage.style.display = 'none';

    let issueCount = document.querySelector('.issue-count');
    issueCount.style.display = 'block';

    let openIssues = document.querySelectorAll('.new-issue').length;
    let openSpan = document.querySelector('.open');

    openSpan.textContent = openIssues;
  }

  // let newIssue = document.querySelector('.new-issue');
  issueLists.addEventListener('click', closeOrDelete);

  function showModal(e) {
    modal.style.display = 'block';
  }


  function hideModal() {
    modal.style.display = 'none';
  }

  function outsideClose(e) {
    if(e.target == modal) {
      modal.style.display = 'none';
    }
  }

  function closeOrDelete(e) {
    if(e.target.classList.contains('close-btn')) {
      if(confirm('Are you sure you wanna close this issue?')) {
        let li = e.target.parentElement;
        issueLists.removeChild(li);
        let openIssues = document.querySelectorAll('.new-issue').length;
        let openSpan = document.querySelector('.open');
        openSpan.textContent = openIssues;

        let closedSpan = document.querySelector('.closed');
        count++;
        closedSpan.textContent = count;
      }
    }
    if(e.target.classList.contains('delete-btn')) {
      if(confirm('Are you sure you want to permanently delete this issue and everything associated with it??')) {
        let li = e.target.parentElement;
        issueLists.removeChild(li);
        let openIssues = document.querySelectorAll('.new-issue').length;
        let openSpan = document.querySelector('.open');
        openSpan.textContent = openIssues;
      }
    }
  }
}

var form = document.getElementById('my-form');
var itemList = document.getElementById('items');

// form submit
form.addEventListener('submit', onsubmit);
// delete event
itemList.addEventListener('click', deleteItem);
// edit event
itemList.addEventListener('click', editItem);

// Load items on initial page load
loadItems();

function onsubmit(e) {
    e.preventDefault();
    // get the value
    var newExpn = document.getElementById('expensive').value;
    var newDis = document.getElementById('discription').value;
    var newSpend = document.getElementById('spend').value;

    // create li
    var li = document.createElement('li');
    li.className = 'list-group';
    // Add text node with input value
    li.appendChild(document.createTextNode(newExpn));
    li.appendChild(document.createTextNode(" " + newDis));
    li.appendChild(document.createTextNode(" " + newSpend));

    // create a button
    var deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
    deleteBtn.appendChild(document.createTextNode('delete'));
    li.appendChild(deleteBtn);

    // create edit btn
    var editBtn = document.createElement('button');
    editBtn.className = 'btn btn-danger btn-sm float-right edit';
    editBtn.appendChild(document.createTextNode('edit'));
    li.appendChild(editBtn);
    itemList.appendChild(li);

    var userDetails = {
        newExpn: newExpn,
        newDis: newDis,
        newSpend: newSpend,
    };

    // Retrieve existing items from localStorage
    var existingItems = JSON.parse(localStorage.getItem("userDetailsList")) || [];

    // Add the new item to the list
    existingItems.push(userDetails);

    // Store the updated list in localStorage
    localStorage.setItem("userDetailsList", JSON.stringify(existingItems));
}

function deleteItem(e) {
    if (e.target.classList.contains('delete')) {
        if (confirm('Are you Sure?')) {
            var li = e.target.parentElement;
            itemList.removeChild(li);

            var existingItems = JSON.parse(localStorage.getItem("userDetailsList")) || [];

            // Filter out the deleted item from the list
            existingItems = existingItems.filter(item => item.newExpn !== li.childNodes[0].textContent.trim());

            // Update localStorage with the updated list
            localStorage.setItem("userDetailsList", JSON.stringify(existingItems));
        }
    }
}

function editItem(e) {
    if (e.target.classList.contains('edit')) {
        var li = e.target.parentElement;

        var expn = li.childNodes[0];
        var dis = li.childNodes[1];
        var spend = li.childNodes[2];

        var newEx = prompt('new Expensive:', expn.textContent);
        var newDi = prompt('new Discription:', dis.textContent);
        var newSp = prompt('new spend:', spend.textContent);

        if (newEx !== null && newDi !== null && newSp !== null) {
            li.childNodes[0].textContent = newEx;
            li.childNodes[1].textContent = " " + newDi;
            li.childNodes[2].textContent = " " + newSp;

            // Update the local storage data with the edited values
            var existingItems = JSON.parse(localStorage.getItem("userDetailsList")) || [];
            var index = Array.from(itemList.children).indexOf(li);
            existingItems[index].newExpn = newEx;
            existingItems[index].newDis = newDi;
            existingItems[index].newSpend = newSp;
            localStorage.setItem("userDetailsList", JSON.stringify(existingItems));
        }
    }
}

function loadItems() {
    var existingItems = JSON.parse(localStorage.getItem("userDetailsList")) || [];

    existingItems.forEach(function (item) {
        // Create and append the list item for each stored item
        var li = document.createElement('li');
        li.className = 'list-group';
        li.appendChild(document.createTextNode(item.newExpn));
        li.appendChild(document.createTextNode(" " + item.newDis));
        li.appendChild(document.createTextNode(" " + item.newSpend));

        var deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
        deleteBtn.appendChild(document.createTextNode('delete'));
        li.appendChild(deleteBtn);

        var editBtn = document.createElement('button');
        editBtn.className = 'btn btn-danger btn-sm float-right edit';
        editBtn.appendChild(document.createTextNode('edit'));
        li.appendChild(editBtn);

        itemList.appendChild(li);
    });
}

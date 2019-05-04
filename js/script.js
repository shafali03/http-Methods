// gets elements
const itemList = document.querySelector(".items");
const httpForm = document.getElementById('httpForm');
const itemInput = document.getElementById('itemInput');
const imageInput = document.getElementById('imageInput');
const feedback = document.querySelector('.feedback');
// const items = document.querySelector('.items');
const submitBtn = document.getElementById('submitBtn');
let editedItemID = 0;


// const url = 'https://5ccaf9ad54c8540014835196.mockapi.io/foodItems';


httpForm.addEventListener('submit', submitItem);
//submit function
function submitItem(event) {
    event.preventDefault();

    const itemValue = itemInput.value;
    const imageValue = imageInput.value;

    if (itemValue.length === 0 || imageValue.length === 0) {
        showFeedback('please enter correct values')

    } else {
        postItemAPI(imageValue, itemValue);
        imageInput.value = '';
        itemInput.value = '';
    }
}




//load items ==============================================
document.addEventListener('DOMContentLoaded', function () {

    getItemsAPI(showItems);
});

//show Feedback
function showFeedback(text) {
    feedback.classList.add('showItem');
    feedback.innerHTML = `<p>${text}</p>`;
    setTimeout(() => {
        feedback.classList.remove("showItem")
    }, 3000);
}



//get items =================================================
function getItemsAPI(cb) {
    const url = 'https://5ccaf9ad54c8540014835196.mockapi.io/foodItems';
    const ajax = new XMLHttpRequest();

    ajax.open("GET", url, true);

    ajax.onload = function () {
        if (this.status === 200) {
            cb(this.responseText);
        } else {
            console.log('something went wrong')
        }
    };

    ajax.onerror = function () {
        console.log('there was an error');
    };

    ajax.send();
}

//show items =================================================
function showItems(data) {
    const items = JSON.parse(data);
    console.log(items);

    let info = '';

    items.forEach(item => {
        info += `
        <li class="list-group-item d-flex align-items-center justify-content-between flex-wrap item my-2">
                            <img src="img/${item.image}" id='itemImage' class='itemImage img-thumbnail' alt="">
                            <h6 id="itemName" class="text-capitalize itemName">${item.name}</h6>
                            <div class="icons">

                                <a href='#' class="itemIcon mx-2 edit-icon" data-id='${item.id}'>
                                    <i class="fas fa-edit"></i>
                                </a>
                                <a href='#' class="itemIcon mx-2 delete-icon" data-id='${item.id}'>
                                    <i class="fas fa-trash"></i>
                                </a>
                            </div>
                        </li>
        `
    });

    itemList.innerHTML = info;
    // get Icons
    getIcons();
}


//post items =======================================================
function postItemAPI(img, itemName) {
    const image = `${img}.jpg`;
    const name = itemName;

    const url = 'https://5ccaf9ad54c8540014835196.mockapi.io/foodItems';

    // function getItemsAPI(cb) {
    //     const url = 'https://5ccaf9ad54c8540014835196.mockapi.io/foodItems';
    const ajax = new XMLHttpRequest();
    ajax.open("POST", url, true);

    ajax.setRequestHeader('Content-Type',
        'application/x-www-form-urlencoded');

    ajax.onload = function () {
        // console.log(this.responseText);
        getItemsAPI(showItems);
    };

    ajax.onerror = function () {
        console.log('there was an error');
    };

    ajax.send(`image=${image}&name=${name}`);

    // }
}

//get icons =========================================================
function getIcons() {
    const editIcon = document.querySelectorAll('.edit-icon');
    const deleteIcon = document.querySelectorAll('.delete-icon');


    // add event listener to edit icon
    deleteIcon.forEach(icon => {
        const itemID = icon.dataset.id;
        icon.addEventListener('click', function (event) {
            event.preventDefault();
            // console.log(itemID);
            deleteItemAPI(itemID)
        });
    });

    editIcon.forEach(icon => {
        const itemID = icon.dataset.id;
        icon.addEventListener('click', function (event) {
            event.preventDefault();
            //target parent element 
            const parent = event.target.parentElement.parentElement.parentElement;
            const img = parent.querySelector('.itemImage').src;
            const name = parent.querySelector('.itemName').textContent;
            // console.log(parent, img, name, itemID);
            editItemUI(parent, img, name, itemID);

        })
    })
}




//delete user =====================================================
function deleteItemAPI(id) {
    const url = `https://5ccaf9ad54c8540014835196.mockapi.io/foodItems/${id}`;

    const ajax = new XMLHttpRequest();

    ajax.open("DELETE", url, true);

    ajax.onload = function () {
        if (this.status === 200) {
            // console.log(this.responseText);
            getItemsAPI(showItems);
        } else {
            console.log('something went wrong')
        }
    };

    ajax.onerror = function () {
        console.log('there was an error');
    };

    ajax.send();
}
// edit user
function editItemUI(parent, itemImg, name, itemID) {
    event.preventDefault();

    itemList.removeChild(parent);




}

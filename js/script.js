
// gets elements

const itemList = document.querySelector(".items");
const httpForm = document.getElementById('httpForm');
const itemInput = document.getElementById('itemInput');
const imageInput = document.getElementById('imageInput');
const feedback = document.querySelector('.feedback');
const items = document.querySelector('.items');
const submitBtn = document.getElementById('submitBtn');
let editedItemID = 0;


const url = ''



//load items

document.addEventListener('DOMContentLoaded', function () {



})

//get items

function getItemsAPI(cb) {
    const url =
    const ajax = new XMLHttpRequest();

    ajax.open('GET', url, true);


    ajax.send()
}
//show items
function animateNumbers() {
    /* find everything that needs animation */
    let slides = document.getElementsByClassName("counter-count");
    let interval_ids = new Array(slides.length);
    let values = [...slides].map(element => element.innerHTML);
    let min_value = Math.min(...values);
    [...slides].forEach((element, index) => {
        let max_value = element.innerHTML;
        element.innerHTML = 0;
        interval_ids[index] = setInterval(() => {updated(element, max_value, min_value, index, interval_ids)})
    });
}

function updated(element, max_value, min_value, index, interval_ids){
    //console.log(element.innerHTML);
    element.innerHTML = String(Number(element.innerHTML) + Math.round(Number(max_value)/min_value));
    if (Number(element.innerHTML) >= max_value) {
        element.innerHTML = max_value;
        clearInterval(interval_ids[index]);
    }
}

animateNumbers();

/*card manipulation for news feed*/
let cardContainer;

let createCard = (task) => {

let card = document.createElement('div');
card.className = 'card m-2';

let cardBody = document.createElement('div');
cardBody.className = 'card-body';

let subtitle = document.createElement('h6');
subtitle.innerText = task.date;
subtitle.className = 'card-subtitle mb-2 text-muted';

let title = document.createElement('h5');
title.innerText = task.title;
title.className = 'card-title';

let content = document.createElement('p');
content.innerText = task.content;
content.className = 'card-text text-justify';

cardBody.appendChild(subtitle);
cardBody.appendChild(title);
cardBody.appendChild(content);
card.appendChild(cardBody);
cardContainer.appendChild(card);

}

let initListOfTasks = () => {
if (cardContainer) {
    document.getElementById('cardID').replaceWith(cardContainer);
    return;
}

cardContainer = document.getElementById('cardID');
fetch('http://localhost:3001/')
.then(response => response.json())
.then(data => {
    console.log(data);
    let data_length = 3;
    for(let i=0; i<data_length; i++){
        createCard(data[i]);
    }
    
    
});

};

initListOfTasks();
/*subscribe newsletter */

function subscribeFunction() {
    let mailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    let emailCheck = document.getElementById("email").value;
    if(emailCheck == "" || !(emailCheck.match(mailformat)))
    {
        document.getElementById("thankyou").style.color = "red";
        document.getElementById("thankyou").innerHTML = "Please enter a valid email id";
    }
    else
    {
        document.getElementById("thankyou").style.color = "green";
        document.getElementById("thankyou").innerHTML = "Thank you for your subscription."
    }
}

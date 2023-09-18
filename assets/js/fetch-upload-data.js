document.getElementById("appointmentform").addEventListener("submit", function (e) {
    e.preventDefault();
    getData(e.target);
});

function getData(form) {
    var formData = new FormData(form);
    // var pair = formData.entries();
    // let name = pair[1];
    // let from = pair[2];
    // console.log(name)
    // console.log(from)

    let obj = Object.fromEntries(formData)
    // let phone = pair[3];
    // let date = pair[4];
    // let msg = pair[5];

    // let jsonBody = JSON.stringify({
    //     title: name,
    //     body: from,
    //     userId: 1,
    // });
    const root = 'http://jsonplaceholder.typicode.com/';
    let uri = root + 'posts';

    let options = {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(obj),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }
    let req = new Request(uri, options);
    fetch(req)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Bad HTTP!')
            }
        })
        .then((j) => {
            // console.log(j);
            document.getElementById("sent-message").style.display = "block"
        })
        .catch((err) => {
            document.getElementById("error-message").style.display = "block"
            console.log('ERROR:', err.message);
        });
}


function book() {




    // let formdata = new FormData();
    // formdata.append("userId", 3);
    // formdata.append('title','This is my title');
    // formdata.append('body','This is the body text of the post');



}


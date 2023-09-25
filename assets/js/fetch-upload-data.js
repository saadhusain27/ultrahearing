document.getElementById("appointmentform").addEventListener("submit", function (e) {
    e.preventDefault();
    getData(e.target);
});

function getData(form) {
    var formData = new FormData(form);
    let obj = Object.fromEntries(formData)
    const uri = 'https://contactultrahearing-dhcmuqnkaq-uc.a.run.app';
    
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
            document.getElementById("sent-message").style.display = "block"
        })
        .catch((err) => {
            document.getElementById("error-message").style.display = "block"
            console.log('ERROR:', err.message);
        });
}
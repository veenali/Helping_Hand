const contributeBtn = document.getElementById('contributeBtn')
    // const contributeForm = document.getElementById('contributeForm')
    // console.log(email);

async function uploadServerDetails(contributionAmount) {
    await fetch(`/event/contribute/${eventId}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                raisedAmount: contributionAmount,
                email: email
            })
        })
        .then(res => res.json())
        .then(res => {
            if (res.success) document.getElementById('contributionAmount').value = ''
            else alert("Some error occurred!! Contact admin if payment deducted")
        })
        // .then(res=>)
}

contributeBtn.addEventListener('click', (e) => {
    let contributionAmount = document.getElementById('contributionAmount').value
    var options = {
        "key": "rzp_test_LkRU0G4AqoYEib", // Enter the Key ID generated from the Dashboard
        "amount": parseInt(contributionAmount) * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Helping Hand",
        "description": "Test Transaction",
        "image": "/images/HH-logo.png",
        // "callback_url": "/",
        "handler": async function(response) {
            alert("Your contribution was successfull. Thank you for spreading smile :)")
            await uploadServerDetails(contributionAmount)
                // window.location.reload()
        },
        "prefill": {
            "name": username,
            "email": email,
            "contact": contact
        },
        // "notes": {
        //     "address": "Razorpay Corporate Office"
        // },
        "theme": {
            "color": "#5aaca8"
        }
    };
    var rzp1 = new Razorpay(options);



    if (contributionAmount !== '' && parseInt(contributionAmount) <= goalAmount) {
        rzp1.open();
        e.preventDefault();
    } else if (parseInt(contributionAmount) > goalAmount) {
        alert("Amount entered must be less than the goal amount")
    } else {
        alert("Enter payment amount")
    }
})
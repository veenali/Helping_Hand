let socket = io.connect('http://localhost:5000')

async function donation(event) {
    event.preventDefault()
    const NGOName = document.getElementById('NGOName').value
    const username = document.getElementById('username').value
    const email = document.getElementById('email').value
    const pickupAddress = document.getElementById('pickupAddress').value
    const category = document.getElementById('category').value
    const additionalDetails = document.getElementById('additionalDetails').value

    const data = {
        NGOName,
        username,
        email,
        pickupAddress,
        category,
        additionalDetails
    }

    let apiData = await fetch('/donate', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    }).then(res => res.json())

    // apiData = await apiData.json()
    console.log("API DATA = ", apiData);

    socket.emit('donation_initiated', { data })
}


socket.on('donation_start', data => {
    // let li = document.createElement('li')
    // li.textContent = data.NGOName
    // document.getElementsById('socket-div').appendChild(li)
    console.log("donation-start : ", data);
})
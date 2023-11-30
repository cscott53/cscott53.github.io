function fizzBuzzSubmit() {
    let firstName = document.getElementById('first-name').value
    let middleInitial = document.getElementById('middle-initial').value
    let lastName = document.getElementById('last-name').value
    let fizz = document.getElementById('first-divisor').value
    let fizzOutput = document.getElementById('first-output').value
    let buzz = document.getElementById('second-divisor').value
    let buzzOutput = document.getElementById('second-output').value
    let bang = document.getElementById('third-divisor').value
    let bangOutput = document.getElementById('third-output').value
    let count = document.getElementById('count').value
    let defaultOutput = document.getElementById('default-output').value
    document.getElementById('welcome').textContent = `Welcome to Scripts Galore, ${firstName} ${middleInitial}. ${lastName}!`
    let fizzBuzz = fizz * buzz
    let fizzBang = fizz * bang
    let buzzBang = buzz * bang
    let fizzBuzzBang = fizzBuzz * bang
    for (let i = 1; i <= count; i++) {
        let fizzbuzzList = document.getElementById('fizzbuzz')
        let status = ''
        if (!(i % fizzBuzzBang))
            status = `${fizzOutput} ${buzzOutput} ${bangOutput}`
        else if (!(i % fizzBuzz))
            status = `${fizzOutput} ${buzzOutput}`
        else if (!(i % buzzBang))
            status = `${buzzOutput} ${bangOutput}`
        else if (!(i % fizzBang))
            status = `${fizzOutput} ${bangOutput}`
        else if (!(i % bang))
            status = bangOutput
        else if (!(i % buzz))
            status = buzzOutput
        else if (!(i % fizz))
            status = fizzOutput
        else
            status = defaultOutput
        fizzbuzzList.innerHTML += `<li class="fizzbuzz-list">&#0009; ${status}</li>`
    }
}
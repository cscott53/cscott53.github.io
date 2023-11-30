function checkDivision(a,b) {
    return (Math.max(a,b) % Math.min(a,b) === 0)
}
function fizzBuzzSubmit() {
    let firstName = document.getElementById('first-name').value
    let middleInitial = document.getElementById('middle-initial').value
    let lastName = document.getElementById('last-name').value
    document.getElementById('welcome').textContent = `Welcome to Scripts Galore, ${firstName} ${middleInitial}. ${lastName}!`
    let count = 140
    let fizz = prompt('Enter first divisor')
    let buzz = prompt('Enter second divisor')
    let bang = prompt('Enter third divisor')
    let gcf = (a, b) => b === 0 ? a : gcf(b, a % b)
    let fizzBuzz = fizz * buzz
    if (!checkDivision(fizz,buzz))
        fizzBuzz /= gcf(fizz,buzz)
    let fizzBang = fizz * bang
    let buzzBang = buzz * bang
    let fizzBuzzBang = fizzBuzz * bang
    for (let i = 1; i <= count; i++) {
        let fizzbuzzList = document.getElementById('fizzbuzz')
        let status = ''
        if (!(i % fizzBuzzBang))
            status = 'Clear scripts unwrapped'
        else if (!(i % fizzBuzz))
            status = 'Scripts unwrapped'
        else if (!(i % buzzBang))
            status = 'Clear unwrapped'
        else if (!(i % fizzBang))
            status = 'Clear scripts'
        else if (!(i % bang))
            status = 'Clear'
        else if (!(i % buzz))
            status = 'Unwrapped'
        else if (!(i % fizz))
            status = 'Scripts'
        else
            status = 'JS'
        fizzbuzzList.innerHTML += `<li class="fizzbuzz-list">(${i})&#0009; ${status}</li>`
    }
}
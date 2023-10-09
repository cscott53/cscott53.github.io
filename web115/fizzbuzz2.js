document.getElementById('submit').onclick = () => {
    let firstName = document.getElementById('first-name').value
    let middleInitial = document.getElementById('middle-initial').value
    let lastName = document.getElementById('last-name').value
    document.getElementById('welcome').textContent = `Welcome to Scripts Galore, ${firstName} ${middleInitial}. ${lastName}`
    let count = 140
    let fizz = prompt('Enter first divisor')
    let buzz = prompt('Enter seconde divisor')
    let gcf = (a, b) => b === 0 ? a : gcf(b, a % b)
    let fb = (fizz * buzz)/gcf(fizz,buzz)
    for (let i = 1; i <= count; i++) {
        let fizzbuzz = document.getElementById('fizzbuzz')
        let status = ''
        if (!(i % fb)) {
            status = 'Scripts unwrapped'
        } else if (!(i % buzz)) {
            status = 'Unwrapped'
        } else if (!(i % fizz)) {
            status = 'Scripts'
        } else {
            status = 'JS'
        }
        fizzbuzz.innerHTML += `<li class="fizzbuzz-list">(${i})&#0009; ${status}</li>`
    }
}
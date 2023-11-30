function fizzBuzzSubmit() {
    let firstName = document.getElementById('first-name').value
    let middleInitial = document.getElementById('middle-initial').value
    let lastName = document.getElementById('last-name').value
    document.getElementById('welcome').textContent = `Welcome to Scripts Galore, ${firstName} ${middleInitial}. ${lastName}!`
    let count = 140
    for (let i = 1; i <= count; i++) {
        let fizzbuzz = document.getElementById('fizzbuzz')
        let status = ''
        if (!(i % 15)) {
            status = 'Scripts unwrapped'
        } else if (!(i % 5)) {
            status = 'Unwrapped'
        } else if (!(i % 3)) {
            status = 'Scripts'
        } else {
            status = 'JS'
        }
        fizzbuzz.innerHTML += `<li class="fizzbuzz-list">&#0009; ${status}</li>`
    }
}
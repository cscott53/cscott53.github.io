function fizzBuzzSubmit() {
    let firstName = document.getElementById('first-name').value
    let middleInitial = document.getElementById('middle-initial').value
    let lastName = document.getElementById('last-name').value
    document.getElementById('welcome').textContent = `Welcome to Scripts Galore, ${firstName} ${middleInitial}. ${lastName}!`
    let count = prompt(`How high do you want to count, ${firstName}?`)
    for (let i = 1; i <= count; i++) {
        let fizzbuzz = document.getElementById('fizzbuzz')
        let status = ''
        if (i % 2) {
            status = 'odd'
        } else {
            status = 'even'
        }
        fizzbuzz.innerHTML += `<li class="fizzbuzz-list"> Scripts Unwrapped - The number is ${status}</li>`
    }
}
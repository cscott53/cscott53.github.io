let links = document.querySelectorAll('.links')
links.forEach(ele => {
    ele.addEventListener('mouseenter',() => {
        ele.style.backgroundColor = 'black'
        ele.style.color = 'white'
        ele.style.borderColor = black
    })
    ele.addEventListener('mouselead',() => {
        ele.style.backgroundColor = 'orange'
        ele.style.color = 'cyan'
        ele.style.borderColor = black
    })
})
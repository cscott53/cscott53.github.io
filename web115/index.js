let links = document.querySelectorAll('.links')
links.forEach(ele => {
    ele.addEventListener('mouseenter',() => ele.style.backgroundColor = 'black')
    ele.addEventListener('mouseleave',() => ele.style.backgroundColor = 'orange')
})
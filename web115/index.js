let links,pagename, headerLinks // so that I can access them within console
setInterval(() => { // this makes sure that it updates depending on
                    // the current content in  the <main> element
    links = document.querySelectorAll('.links')
    pageName = document.querySelector('.page-name').textContent
    links.forEach(link => link.classList.remove("current"))
    switch(pageName) {
        case 'Home':
            links[0].classList.add("current");break
        case 'Introduction':
            links[1].classList.add("current");break
        case 'Course Contract':
            links[2].classList.add("current");break
        case 'Scripts Galore':
            links[3].classList.add("current");break
        case 'Fizzbuzz 0':
            links[4].classList.add("current");break
        case 'Fizzbuzz 1':
            links[5].classList.add("current");break
        case 'Fizzbuzz 2':
            links[6].classList.add("current");break
    }
},100)
setTimeout(() => { // this makes sure it waits until my
                   // other script loads in the content
    headerLinks = document.querySelectorAll('.links a')
    headerLinks.forEach(link => {
        link.addEventListener('click', () => document.getElementById('data-include').innerHTML = `<div data-include="components/${link.id}.html">`)
    })
}, 500)
let links,pagename, headerLinks // so that I can access them within console
let script = document.createElement(script)
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
    headerLinks = document.querySelectorAll('.links a');
    headerLinks.forEach(link => {
        link.addEventListener('click', () => {
            document.getElementById('data-include').innerHTML = `<div data-include="components/${link.id}.html">`
            loadContent(window,document)
            if (link.id == 'brand') {
                document.head.innerHTML += `<link href="https://fonts.googleapis.com/css2?family=Didact+Gothic&display=swap" rel="stylesheet" />`
            } else {
                document.head.innerHTML = document.head.innerHTML.replace(`<link href="https://fonts.googleapis.com/css2?family=Didact+Gothic&display=swap" rel="stylesheet" />`,'')
            }
            if (link.id == 'fizzbuzz0') {
                document.head.innerHTML += '<script src="fizzbuzz0.js" defer></script>'
            } else {
                document.head.innerHTML = document.head.innerHTML.replace('<script src="fizzbuzz0.js" defer></script>','')
            }
            if (link.id == 'fizzbuzz1') {
                document.head.innerHTML += '<script src="fizzbuzz1.js" defer></script>'
            } else {
                document.head.innerHTML = document.head.innerHTML.replace('<script src="fizzbuzz1.js" defer></script>','')
            }
            if (link.id == 'fizzbuzz2') {
                document.head.innerHTML += '<script src="fizzbuzz2.js" defer></script>'
            } else {
                document.head.innerHTML = document.head.innerHTML.replace('<script src="fizzbuzz2.js" defer></script>','')
            }
        })
    })
}, 500)
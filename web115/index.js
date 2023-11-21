let links,pagename, headerLinks // so that I can access them within console
setInterval(() => { // this makes sure that it updates depending on
                    // the current content in the <main> element
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
setTimeout(() => { // this makes sure it waits until the
                   // other script loads in the content
    headerLinks = document.querySelectorAll('.links a');
    headerLinks.forEach(link => {
        link.addEventListener('click', () => {
            window.location.href = window.location.href.split('#')[0] + link.id
            document.getElementById('data-include').innerHTML = `<div data-include="components/${link.id != 'intro' ? link.id : 'introduction'/*for the introduction link on homepage and contract page*/}.html">`
            loadContent(window,document)
            if (link.id == 'brand') {
                document.head.innerHTML += `<link href="https://fonts.googleapis.com/css2?family=Didact+Gothic&display=swap" rel="stylesheet" />`
            } else {
                document.head.innerHTML = document.head.innerHTML.replace(`<link href="https://fonts.googleapis.com/css2?family=Didact+Gothic&display=swap" rel="stylesheet" />`,'')
            }
        })
    })
}, 500)
setTimeout(() => {
    if(window.location.href.includes('#')) {
        let pageToLoad = window.location.href.split('#')[1]
        document.getElementById('data-include').innerHTML = `<div data-include="components/${pageToLoad}.html">`
        loadContent(window,document)
        if (pageToLoad == 'brand') {
            document.head.innerHTML += `<link href="https://fonts.googleapis.com/css2?family=Didact+Gothic&display=swap" rel="stylesheet" />`
        } else {
            document.head.innerHTML = document.head.innerHTML.replace(`<link href="https://fonts.googleapis.com/css2?family=Didact+Gothic&display=swap" rel="stylesheet" />`,'')
        }
    }
}, 100)
setTimeout(()=>{ /* 
                  * waits until after my other script
                  * adds in the links and content
                  */
    let links = document.getElementsByClassName('links')
    let pageName = document.querySelector('.page-name').textContent
    links.foreach(link=>link.classList.remove("current"))
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
    let headerLinks = document.querySelectorAll('.links a')
    headerLinks.forEacfh(link => {
        link.addEventListener('click', () => document.getElementById('data-include').setAttribute('dta-include',`components/${link.id}.html`))
    })
},500)
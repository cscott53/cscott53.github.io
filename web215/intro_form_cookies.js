let main = document.querySelector('main'),
    submit = document.getElementById('submit'),
    read = document.getElementById('read')
function setCookie(obj) {
    for (var key in obj) {
        document.cookie = `${key}=${obj[key]}; expires=${(date=>{
            date.setDate(date.getDate() + 5) //makes it expire in 5 days (for now)
            return date
        })(new Date)};`
    }
}
function getCookies() {
    let cookieObj = {}
    document.cookie.split(';').forEach(item=>{
        let [key,value] = item.split('=')
        cookieObj[key] = value
    })
    return cookieObj
}
function getInput(id) { //shorthand form of document.getElementById(id).value
    let input = document.getElementById(id)
    if (input.getAttribute('type') == 'file') {
        return new Promise((resolve, reject) => {
            let file = input.files[0]
            let reader = new FileReader()
            reader.onload = e => {
                resolve(e.target.result)
            }
            reader.readAsDataURL(file)
        })
    }
    return input.value
}
function radioChecked() {
    let radioButtons = Array.from(document.getElementsByName('radio'))
    let checked
    for (var button of radioButtons) {
        if (button.checked) {
            checked = button.value
        }
    }
    return checked
}
function getCheckedBoxes() {
    let checked = []
    for (var checkbox of document.querySelectorAll('input[type="checkbox"]')) {
        if (checkbox.checked) {
            checked.push(checkbox.value)
        }
    }
    return checked
}
submit.onclick = async () => { //using async to await the photo with reader.onload
    let photo,
        caption = getInput('caption'),
        fullName = getInput('name'),
        personalBackgd = getInput('personalBackground'),
        profBackgd = getInput('profBackground'),
        academicBackgd = getInput('academicBackground'),
        primaryPlatform = getInput('primaryPlatform'),
        courses = getInput('courses'),
        coursesList = courses.split('\n').filter(line=>/\w/.test(line)), //to make sure it doesnt have an empty line to avoid "undefined" issues
        funnyItem = getInput('funnyItem'),
        alsoShare = getInput('alsoShare'),
        timeStamp = new Date,
        [version,browser] = navigator.userAgent.split('Version/')[1].split('/')[0].split(' ')
    try {
        photo = await getInput('photoInput')
    } catch (error) {
        photo = '' //just to make sure the form still submits in case no file is selected
    }
    main.innerHTML = `
    <figure>
        <img id="photo" src="${photo}">
        <figcaption>${caption}</figcaption>
    </figure>
    <h2>Introduction form results</h2>
    <h3>${fullName}</h3>
    <ul>
        <li><strong>Personal Background:</strong> ${personalBackgd}</li>
        <li><strong>Professional Background:</strong> ${profBackgd}</li>
        <li><strong>Academic Background:</strong> ${academicBackgd}</li>
        <li><strong>Primary Computer Platform:</strong> Intel Macbook Air 2020 on macOS Sonoma 14</li>
        <li><strong>Courses I'm Taking & Why:</strong>
            <ul>${(()=>{
                let content = ''
                for (var course of coursesList) {
                    let split = course.split(': ')
                    content+=`
                    <li><strong>${split[0]}:</strong> ${split[1]}`
                }
                return content
            })()}
            </ul>
            <li><strong>Funny/Interesting Item to Remember me by:</strong> ${funnyItem}</li>
            <li><strong>I'd Also Like to Share:</strong> ${alsoShare}</li>
            <li><strong>How did you hear about us?:</strong> ${radioChecked()}</li>
            <li><strong>Programming languages:</strong> ${getCheckedBoxes().join(', ')}</li>
            <li><strong>Timestamp:</strong>${timeStamp}</li>
            <li><strong>Browser:</strong>${browser} ${version}</li>
        </li>
    </ul>
    `
    let cookie = {
        fullName,photo,caption,personalBackgd,profBackgd,academicBackgd,
        courses: JSON.stringify(coursesList),
        funnyItem,alsoShare,
        hearAboutUs: radioChecked(),
        progLangs: JSON.stringify(getCheckedBoxes()).
        timeStamp,
        browserInfo: browser+' '+version
    }
    for (var key in cookie) {
        cookie[key] = encodeURIComponent(cookie[key])
    }
    setCookie(cookie)
}
read.onclick = ()=>{
    let data = getCookies()
    for (var key in data) {
        data[key] = decodeURIComponent(data[key])
    }
    let {
        fullName,photo,caption,personalBackgd,profBackgd,academicBackgd,
        courses,funnyItem,alsoShare,hearAboutUs,progLangs,browserInfo
    } = data,
        coursesList = JSON.parse(courses),
        timeStamp = new Date
    progLangs = JSON.parse(progLangs)
    main.innerHTML = `
    <figure>
        <img id="photo" src="${photo}">
        <figcaption>${caption}</figcaption>
    </figure>
    <h2>Results from previous form</h2>
    <h3>${fullName}</h3>
    <ul>
        <li><strong>Personal Background:</strong> ${personalBackgd}</li>
        <li><strong>Professional Background:</strong> ${profBackgd}</li>
        <li><strong>Academic Background:</strong> ${academicBackgd}</li>
        <li><strong>Primary Computer Platform:</strong> Intel Macbook Air 2020 on macOS Sonoma 14</li>
        <li><strong>Courses I'm Taking & Why:</strong>
            <ul>${(()=>{
                let content = ''
                for (var course of courses) {
                    let split = course.split(': ')
                    content+=`
                    <li><strong>${split[0]}:</strong> ${split[1]}`
                }
                return content
            })()}
            </ul>
            <li><strong>Funny/Interesting Item to Remember me by:</strong> ${funnyItem}</li>
            <li><strong>I'd Also Like to Share:</strong> ${alsoShare}</li>
            <li><strong>How did you hear about us?:</strong> ${hearAboutUs}</li>
            <li><strong>Programming languages:</strong> ${progLangs.join(', ')}</li>
            <li><strong>Timestamp:</strong>${timeStamp}</li>
            <li><strong>Browser:</strong>${browser} ${version}</li>
        </li>
    </ul>
    `
}
let main = document.querySelector('main'),
    submit = document.getElementById('submit'),
    read = document.getElementById('read'),
    edit = document.getElementById('edit'),
    reset = document.getElementById('reset')
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
        cookieObj[key.trim()] = value
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
submit.onclick = async()=>{ //using async to await the photo with reader.onload
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
    let cookie = {
        fullName,photo,caption,personalBackgd,profBackgd,academicBackgd,
        courses: JSON.stringify(coursesList),
        primaryPlatform,funnyItem,alsoShare,
        hearAboutUs: radioChecked(),
        progLangs: JSON.stringify(getCheckedBoxes()),
        timeStamp,
        browserInfo: browser+' '+version
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
            <li><strong>Timestamp:</strong> ${timeStamp}</li>
            <li><strong>Browser:</strong> ${browser} ${version}</li>
        </li>
    </ul>
    `
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
    if (!data.fullName) { //cookie not set
        alert('Previous data unavailable or not set. Try submitting new data')
        return
    }
    let {
        fullName,photo,caption,personalBackgd,profBackgd,academicBackgd,
        courses,funnyItem,alsoShare,hearAboutUs,progLangs,browserInfo
    } = data,
        coursesList = JSON.parse(courses),
        timeStamp = new Date,
        [browser,version] = browserInfo.split` `
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
                for (var course of coursesList) {
                    let split = course.split(': ')
                    content += `
                    <li><strong>${split[0]}:</strong> ${split[1]}`
                }
                return content
            })()}
            </ul>
            <li><strong>Funny/Interesting Item to Remember me by:</strong> ${funnyItem}</li>
            <li><strong>I'd Also Like to Share:</strong> ${alsoShare}</li>
            <li><strong>How did you hear about us?:</strong> ${hearAboutUs}</li>
            <li><strong>Programming languages:</strong> ${progLangs.join(', ')}</li>
            <li><strong>Timestamp:</strong> ${timeStamp}</li>
            <li><strong>Browser:</strong> ${browser} ${version}</li>
        </li>
    </ul>
    `
}
edit.onclick = ()=>{
    let data = getCookies()
    for (var key in data) {
        data[key] = decodeURIComponent(data[key])
    }
    if (!data.hasOwnProperty('fullName')) { //cookie not set
        alert('Previous data unavailable or not set. Try submitting new data')
        return
    }
    let photo = document.getElementById('photo')
        caption = document.getElementById('caption'),
        fullName = document.getElementById('name'),
        personalBackgd = document.getElementById('personalBackground'),
        profBackgd = document.getElementById('profBackground'),
        academicBackgd = document.getElementById('academicBackground'),
        primaryPlatform = document.getElementById('primaryPlatform'),
        courses = document.getElementById('courses'),
        funnyItem = document.getElementById('funnyItem'),
        alsoShare = document.getElementById('alsoShare')
    caption.value = data.caption
    fullName.value = data.fullName
    personalBackgd.innerHTML = data.personalBackgd
    profBackgd.innerHTML = data.profBackgd
    academicBackgd.innerHTML = data.academicBackgd
    primaryPlatform.value = data.primaryPlatform
    courses.innerHTML = JSON.parse(data.courses).join`\n`
    funnyItem.value = data.funnyItem
    alsoShare.innerHTML = data.alsoShare
    let radioButton = data.hearAboutUs,
        progLangs = JSON.parse(data.progLangs)
    Array.from(document.getElementsByName('radio')).forEach(e=>{
        if (radioButton == e.value) e.checked = true
    })
    document.querySelectorAll('input[type="checkbox"]').forEach(e=>{
        if (progLangs.includes(e.value)) {
            e.checked = true
        }
    })
    document.querySelector('h3').innerHTML = '(values filled in from previous data)'
}
reset.onclick = ()=>{
    document.querySelector('form').innerHTML = `
                    <div class="formrow"><label for="photoInput">Insert photo here (can be a photo of you or anything):</label>
                    <input type="file" id="photoInput"></div>
                    <div class="formrow"><label for="caption">Enter photo caption here:</label>
                    <input type="text" id="caption" value="Photo caption"></div>
                    <div class="formrow"><label for="name">Enter full name here:</label>
                    <input type="text" id="name" value='Charles W. "Will" Scott'></div>
                    <div class="formrow"><label for="personalBackground">Personal background:</label>
                    <textarea id="personalBackground" rows="10" cols="48">I was born in Grand Rapids, Michigan but was then adopted and have lived in Charlotte, NC ever since then (since I was a few weeks old). I started with the boy scouts in 6th grade and went to Manus Academy (a school for students on the Autism spectrum, now called Ignite Achievement Academy since the owner retired (I think)) from grade 6-10 and went to Myers Park from grade 11-12 but in my senior year they took a couple classes out of that semester and replaced them with electives (to make it less stressful) and moved the remaining2 classes required for graduation into the next semester. I achieved the rank of Eagle Scout in September 2021 after turning 18 and one of my teachers (from a class I took in my (first) senior year) told me about Year Up (in the final semester before graduation) since she knew I was interested in computers. I started applying for it and had orientation with that group at CPCC but my dad and I found out I needed accommodations like sitting in the front row in an in person class and stuff like that but when the accommodations finally came it was too late and it was already the first day of Year Up classes (3/14/22) so I just enrolled in CPCC like most students normally would and started taking general courses like biology and psychology (since I was interested in those in high school and wanted to get a "feel" for what classes at CPCC would be like) and then started wanting to pursue computer programming and wanted to become either a software developer for Apple or a game developer (i never ended up taking game dev classes) or web development/programming (I started getting interested in that in the next spring (2023) when I took WEB110)</textarea></div>
                    <div class="formrow"><label for="profBackground">Professional background:</label>
                    <textarea id="profBackground" rows="8" cols="48">I recently started working for a friend to help him with programming for the first two sensors for a robotic helicopter (I still have to finish a ROS2 course I'm taking online (not at CPCC)). He works for the Dept of Defence and takes one-man helicopters and takes out the insides and puts computers in them to turn them into robotic helicopters so they end up being similar to drones but instead of having a controller to control them they run off of a computer program to go from point a to point b and picksomething up then to point c to drop it off then back to point a and land for example.</textarea></div>
                    <div class="formrow"><label for="academicBackground">Academic background:</label>
                    <textarea id="academicBackground" rows="5" cols="40">I graduated from Myers Park HS mid-year (Feb 2022) and started taking classes at CPCC in summer of that same year. I started getting interested in computer programming in the fall and wanted to become a software developer for Apple but I'm mostly interested in just programming (mostly web programming and graphics)</textarea></div>
                    <div class="formrow"><label for="primaryPlatform">Primary computer platform</label>
                    <input type="text" id="primaryPlatform" value="Intel Macbook Air 2020 on macOS Sonoma 14"></div>
                    <div class="formrow"><label for="courses">Courses I'm taking and why: </label>
                    <textarea id="courses" rows="9" cols="48">
WEB215 - Advanced Markup and Scripting: I wanted to learn server side JS, also it's a major requirement
CSC121 - Python Programming: Requirement for  my major
DBA120 - Database Programming 1: Another major requirement (also might come in handy in case this class covers databases for websites etc)
CIS115 - Intro to Programming and Logic: Should have taken this earlier but seats fill up super fast, also a requisite for most programming courses and a major requirement</textarea></div>
                    <div class="formrow"><label for="funnyItem">Funny/Interesting Item to Remember me by</label>
                    <input type="text" id="funnyItem" value="The tallest person in my family (6'4''')"></div>
                    <div class="formrow"><label for="alsoShare">Anything else you'd like to share?</label>
                    <textarea id="alsoShare" cols="21">I like doing recreational projects with programming stuff</textarea></div>
                    <div class="formrow"><label>How did you hear about us?</label>
                    <input type="radio" name="radio" value="TV"> TV &nbsp; <input type="radio" name="radio" value="Internet"> Internet &nbsp; <input type="radio" name="radio" value="Other"> Other</div>
                    <div class="formrow"><label>What programming languages do you know?</label>
                    <input type="checkbox" name="checkboxes" value="HTML"> HTML &nbsp; <input type="checkbox" name="checkboxes" value="CSS"> CSS &nbsp; <input type="checkbox" name="checkboxes" value="JS"> JS &nbsp;
                    <input type="checkbox" name="checkboxes" value="Python"> Python &nbsp; <input type="checkbox" name="checkboxes" value="C/C++"> C/C++ &nbsp; <input type="checkbox" name="checkboxes" value="Java"> Java &nbsp;
                    <input type="checkbox" name="checkboxes" value="Other"> Other</div>
                    <button type="button" id="submit">Submit</button>
                    <button type="button" id="read">Read previous</button>
                    <button type="button" id="edit">Update/edit previous</button>
                    <button type="button" id="reset">Reset previous</button>
                    <script src="intro_form_cookies.js"></script>
            `
    let caption = getInput('caption'),
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
        [version,browser] = navigator.userAgent.split('Version/')[1].split('/')[0].split(' '),
        cookie = {
            fullName,photo,caption,personalBackgd,profBackgd,academicBackgd,
            courses: JSON.stringify(coursesList),
            primaryPlatform,funnyItem,alsoShare,
            hearAboutUs: radioChecked(),
            progLangs: JSON.stringify(getCheckedBoxes()),
            timeStamp,
            browserInfo: browser+' '+version
        }
    for (var key in cookie) {
        cookie[key] = encodeURIComponent(cookie[key])
    }
    setCookie(cookie)
}
let submit = document.getElementById('submit')
function getInput(id) {// shorthand form of document.getElementById(eleId).value
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
submit.onclick = async () => {//using async to await the photo with reader.onload
    let photo,
        caption = getInput('caption'),
        fullName = getInput('name'),
        personalBackgd = getInput('personalBackground'),
        profBackgd = getInput('profBackground'),
        academicBackgd = getInput('academicBackground'),
        primaryPlatform = getInput('primaryPlatform'),
        courses = getInput('courses'),
        funnyItem = getInput('funnyItem'),
        alsoShare = getInput('alsoShare')
    try {
        photo = await getInput('photoInput')
    } catch (error) {
        photo = ''// just to make sure the form still submits in case no file is selected
    }
    document.querySelector('main').innerHTML=`
    <figure style="width:30%;">
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
                let coursesList = courses.split('\n')
                let content = ''
                for (var course of coursesList) {
                    let split = course.split(/\s+-\s+/)
                    content+=`
                <li><strong>${split[0]}</strong> - ${split[1]}`
                }
                return content
            })()}
            </ul>
            <li><strong>Funny/Interesting Item to Remember me by:</strong> ${funnyItem}</li>
            <li><strong>I'd Also Like to Share:</strong> ${alsoShare}</li>
    </ul>
    `
}
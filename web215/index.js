let headerContent = `
<h1>Charles Scott - Curious Squirrel - WEB215</h1>
<span class="links header"><a href="index.html">Home</a></span>
<span class="links header"><a href="introduction.html">Introduction</a></span>
<span class="links header"><a href="contract.html">Contract</a></span>
<span class="links header"><a href="brand.html">Brand</a></span>
<span class="links header"><a href="introduction_form.html">Intro form</a></span>
<span class="links header"><a href="https://web215-mern.onrender.com">MERN stack</a></span>
<span class="links header"><a href="https://web215-m11-login.onrender.com">Login page</a></span>
`, footerContent = `
<span class="links"><a href="https://github.com/cscott53">Github</a></span>
<span class="links"><a href="https://cscott53.github.io/">Github.io</a></span>
<span class="links"><a href="https://cscott53.github.io/web215/">WEB215.io</a></span>
<span class="links"><a href="https://www.freecodecamp.org/cscott53">freeCodeCamp</a></span>
<span class="links"><a href="https://www.codecademy.com/profiles/method4794308211">Codecademy</a></span>
<span class="links"><a href="https://jsfiddle.net/user/cscott53">JSFiddle</a></span>
<span class="links"><a href="https://www.linkedin.com/in/charles-scott-545b4228a/">Linkedin</a></span><br>
<br><em>MindMingle: Connect, create, collaborate</em><br>
<p>Page built by Scripts Galore</p>
<a href="https://validator.w3.org/check?uri=${location.href}"><img src="images/validate_html.png" class="validate" alt="Validate HTML"></a>
<a href="https://jigsaw.w3.org/css-validator/check/${location.href}"><img src="images/validate_css.png" class="validate" alt="Validate CSS"></a>
`
document.querySelector('header').innerHTML = headerContent
document.querySelector('footer').innerHTML = footerContent
if(location.href.includes('loggedin=true')) {
    document.cookie = `loggedin=true; expires=${(date=>(date.setDate(date.getDate()+7),date.toString()))(new Date)}; path=/`
    document.querySelectorAll('header .links a').forEach(a=>a.href+='?loggedin=true')
}
else if(!document.cookie.includes('loggedin')) document.cookie = `loggedin=false; expires=${(date=>(date.setDate(date.getDate()+7),date.toString()))(new Date)}; path=/`
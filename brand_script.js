function showClock() {
    let now = new Date();
    let today = (now.getMonth() + 1) + '/' + now.getDays() + '/' + now.getYear();
    let hours = now.getHours();
    let mins = now.getMinutes();
    let time = (hours % 12 + (hours === 0 ? 12 : 0)) + ':' + (mins < 10 ? '0' : '') + minutes + (hours > 12 ? 'PM' : 'AM');
    document.getElementById('time').textContent = date + ' ' + time;
} 
setInterval(showClock, 1000);
document.body.append(
    document.createRange().createContextualFragment(`
    <link href="https://fonts.googleapis.com/css2?family=Didact+Gothic&display=swap" rel="stylesheet" />
    `)
  );
  

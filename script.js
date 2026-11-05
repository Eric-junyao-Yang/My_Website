let email_box = document.querySelector(".email")
email_box.onclick = function(){
    if(window.innerWidth <= 1170){
        window.open("mailto:mail@ericyang.phd")
    } else {
        navigator.clipboard.writeText("mail@ericyang.phd")
    }
}
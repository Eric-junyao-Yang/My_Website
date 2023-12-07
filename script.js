// Menu Controls
let text_box = document.querySelector(".slide-out-menu")
let text_box_text = document.querySelector(".slide-out-menu span")

let menu_wrapper = document.querySelector(".menu-btn-wrapper")
menu_wrapper.addEventListener("mouseover", event =>{
    text_box.style.width = "13rem"
    if (event.target == document.querySelector(".menu-btn.home-btn")){
        text_box_text.innerHTML = "HOME"
    }
    if (event.target == document.querySelector(".menu-btn.science-btn")){
        text_box_text.innerHTML = "SCIENCE"
    }
    if (event.target == document.querySelector(".menu-btn.others-btn")){
        text_box_text.innerHTML = "OTHERS"
    }
    if (event.target == document.querySelector(".menu-btn.contact-btn")){
        text_box_text.innerHTML = "CONTACT"
    }
})

menu_wrapper.addEventListener("mouseleave", event =>{
    text_box.style.width = "0"
})

// Photo viewer
let image_slices = document.querySelectorAll(".my_image_slice")

function func_U(n){
    return ((1/16) + (1/8)*n)
}

function norm_dist(x, w, n){ //This is a normal distribution function I'm using to spread the panels apart, tweak w for optimal spread.
    return (1/(w*(2*Math.PI)**0.5)) * Math.exp(-0.5*(((x-func_U(n))/w)**2))
}

let image_container = document.querySelector(".image-container")

image_container.addEventListener("mousemove", event => {
    const bondingbox = image_container.getBoundingClientRect();
    perc_x = (event.clientX - bondingbox.left)/bondingbox.width; //This is global variable now
    for (let n = 0; n < image_slices.length; n++){
        image_slices[n].style.flexBasis = norm_dist(perc_x, 0.1, n) * 50 + "%"
        let current_slice = image_slices[n].getBoundingClientRect()
        let to_shift = current_slice.left - bondingbox.left
        image_slices[n].querySelector('.my_image').style.transform = "translateX(" + -(to_shift - 8) + "px)"
    }
})

// Text-bubble
let text_bubble_arrow = document.getElementsByClassName("text-bubble-arrow")[0]
let bubble_text = document.getElementById("bubble-text")
let interest2 = "SynBio"
slide("SynBio")
text_bubble_arrow.classList.add("arrow-transition");
function slide(interest){
    interest2 = interest
    var element = document.getElementById(interest);
    const box = element.getBoundingClientRect();
    const xCenter = (box.left + box.right) / 2;
    text_bubble_arrow.style.left = xCenter - 10 + "px";
    text_bubble_arrow.style.top = (box.bottom + window.scrollY) + "px";
    if (interest == "SynBio"){
        bubble_text.innerHTML = "I screened for new plant constitutive promoters (promoters that are on in all the tissues at all times) and used them to build genetic logic gates.";
    } else if (interest == "Circuits"){
        bubble_text.innerHTML = "By introducing 2 unique gRNA target sequences into the constitutive promoters, they can be independently targeted by dCas9-guided repressors, such a system works as a logic NOR gate.";
    } else if (interest == "DataSci"){
        bubble_text.innerHTML = "By analyzing hundreds of publicly available RNAseq datasets across multiple plant species I was able to identify sets of evolutionary related promoters and track their expression pattern and promoter architecture over evolutionary time.";
    } else if (interest == "DataVis"){
        bubble_text.innerHTML = "I am passionate about using concise figures to tell scientific stories. Apart from the figures in the manuscripts, I also build interactve and animated figures you can check out below!";
    } else if (interest == "ML"){
        bubble_text.innerHTML = "I used Machine Learning to predict protein function and stability by using primary sequence as inputs and flow cytometry measurements as outputs";
    }
}
window.onresize = function(){ //Kind of hacky code that makes window resizing not trigger transition of the text-bubble arrow
    text_bubble_arrow.classList.remove("arrow-transition");
    slide(interest2);
    setTimeout(function(){text_bubble_arrow.classList.add("arrow-transition")},300);
}

//Rotating manuscripts
let mn1 = document.getElementById("manuscript1")
let mn2 = document.getElementById("manuscript2")
let mn_icon = document.getElementById("manuscript-icon")
let logic_shadow = document.querySelector(".pipeline-right-col")
let core_shadow = document.querySelector(".coretype-right video")

let rotation_state = 0
let animationFinished = true

function rotate(){
    if (animationFinished == true & rotation_state == 0) {
        mn_icon.classList.add("icon-rotate-click")
        FlipCube('show-right')
        logic_shadow.classList.add("no_shadow")
        core_shadow.classList.remove("no_shadow")

        animationFinished = false
        mn1.style.transform = "rotate(-90deg) translateX(-70px) translateY(100px) rotate(90deg)"
        mn1.style.zIndex = 2
        mn2.style.zIndex = 3
        mn2.style.transform = "rotate(-90deg) translateX(0px) translateY(0px) rotate(90deg)"

        mn2.style.fontSize = "30px"
        mn2.style.fontWeight = "bold"
        mn2.style.color = "var(--action-color)"

        mn1.style.fontSize = "20px"
        mn1.style.fontWeight = "lighter"
        mn1.style.color = "#1d27590e"

        setTimeout(function(){
            mn_icon.classList.remove("icon-rotate-click")
        },1000);

        setTimeout(function(){
            animationFinished = true
            rotation_state = 1
        },1500);
    }

    else if (animationFinished == true & rotation_state == 1) {
        mn_icon.classList.add("icon-rotate-click")
        FlipCube('show-front')
        logic_shadow.classList.remove("no_shadow")
        core_shadow.classList.add("no_shadow")

        animationFinished = false
        mn1.style.transform = "rotate(-180deg) translateX(0px) translateY(0px) rotate(180deg)"
        mn1.style.zIndex = 3
        mn2.style.zIndex = 2
        mn2.style.transform = "rotate(-180deg) translateX(-100px) translateY(-50px) rotate(180deg)"

        mn1.style.fontSize = "30px"
        mn1.style.fontWeight = "bold"
        mn1.style.color = "var(--action-color)"

        mn2.style.fontSize = "20px"
        mn2.style.fontWeight = "lighter"
        mn2.style.color = "#1d27590e"

        setTimeout(function(){
            mn2.classList.remove("manuscript-transition")
            mn1.style.transform = ""; 
            mn2.style.transform = "rotate(0deg) translateX(100px) translateY(50px) rotate(0deg)";
            mn_icon.classList.remove("icon-rotate-click")
        },1000);
        setTimeout(function(){
            animationFinished = true
            mn2.classList.add("manuscript-transition")
            rotation_state = 0
        },1500);
    }
}

mn1.onclick = rotate
mn2.onclick = rotate
mn_icon.onclick = rotate

let cube = document.querySelector('.cube')
currentClass = ""
// Cube rotation
function FlipCube(side){
    if (currentClass){
        cube.classList.remove(currentClass);
    }
    cube.classList.add(side)
    currentClass = side
}

let x_button = document.querySelector(".fa-circle-xmark")

// Check Logic status and animate
const highlight_box = document.getElementById("highlightbox")
const rep1 = document.getElementById("rep1")
const rep2 = document.getElementById("rep2")
const gRNA_orange = document.getElementById("gRNA_orange")
const gRNA_pink = document.getElementById("gRNA_pink")
const replinelong = document.getElementById("replinelong")
const replineshort = document.getElementById("replineshort")

changeLogic("radio-1")

function changeLogic(value){
    const logic_row1 = document.getElementById("table-r1")
    const logic_row2 = document.getElementById("table-r2")
    const logic_row3 = document.getElementById("table-r3")
    const logic_row4 = document.getElementById("table-r4")
    radiobtn = document.getElementById(value)
    radiobtn.checked = true
    if (value == "radio-1"){
        logic_row1.classList.add('logic_ON')
        logic_row2.classList.remove("logic_OFF")
        logic_row3.classList.remove("logic_OFF")
        logic_row4.classList.remove("logic_OFF")
        highlight_box.style.border = "5px dashed rgba(0, 128, 0, 0.43)"
        highlight_box.style.left = "58px"
        rep1.style.top = "0%"
        rep2.style.top = "0%"
        gRNA_orange.style.opacity = "0"
        gRNA_pink.style.opacity = "0"
        replinelong.style.visibility = "hidden"
        replineshort.style.visibility = "hidden"
    }
    if (value == "radio-2"){
        logic_row1.classList.remove("logic_ON")
        logic_row2.classList.add("logic_OFF")
        logic_row3.classList.remove("logic_OFF")
        logic_row4.classList.remove("logic_OFF")
        highlight_box.style.border = "5px dashed rgba(255, 0, 0, 0.43)"
        highlight_box.style.left = "97px"
        rep1.style.top = "30%"
        rep2.style.top = "0%"
        gRNA_orange.style.opacity = "1"
        gRNA_pink.style.opacity = "0"
        replinelong.style.visibility = "visible"
        replineshort.style.visibility = "hidden"
    }
    if (value == "radio-3"){
        logic_row1.classList.remove("logic_ON")
        logic_row2.classList.remove("logic_OFF")
        logic_row3.classList.add("logic_OFF")
        logic_row4.classList.remove("logic_OFF")
        highlight_box.style.border = "5px dashed rgba(255, 0, 0, 0.43)"
        highlight_box.style.left = "138px"
        rep1.style.top = "0%"
        rep2.style.top = "30%"
        gRNA_orange.style.opacity = "0"
        gRNA_pink.style.opacity = "1"
        replinelong.style.visibility = "hidden"
        replineshort.style.visibility = "visible"
    }
    if (value == "radio-4"){
        logic_row1.classList.remove("logic_ON")
        logic_row2.classList.remove("logic_OFF")
        logic_row3.classList.remove("logic_OFF")
        logic_row4.classList.add("logic_OFF")
        highlight_box.style.border = "5px dashed rgba(255, 0, 0, 0.43)"
        highlight_box.style.left = "178px" 
        rep1.style.top = "30%"
        rep2.style.top = "30%"
        gRNA_orange.style.opacity = "1"
        gRNA_pink.style.opacity = "1"
        replinelong.style.visibility = "hidden"
        replineshort.style.visibility = "visible"
    }
}

// Copy email!
let email_box = document.querySelector(".email")
email_box.onclick = function(){
    navigator.clipboard.writeText("mail@ericyang.phd")
}
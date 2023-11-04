// Menu Controls
let menuBtn = document.getElementById("menuBtn")
let sideNav = document.getElementById("sideNav")
sideNav.style.right =  "-250px";
menuBtn.onclick = function(){
    if(sideNav.style.right == "-250px"){
        sideNav.style.right = "0";
        menuBtn.style.transform = "rotate(90deg)";
    }
    else{
        sideNav.style.right = "-250px";
        menuBtn.style.transform = "rotate(0)";
    }
}

// Photo viewer
const change = src => document.getElementById('cur-img').src = src
const resetimg = () => document.getElementById('cur-img').src = "images/MyPics/1_Original.png"

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

let rotation_state = 0
let animationFinished = true

function rotate(){
    if (animationFinished == true & rotation_state == 0) {
        mn_icon.classList.add("icon-rotate-click")
        FlipCube('show-right')

        animationFinished = false
        mn1.style.transform = "rotate(-90deg) translateX(-70px) translateY(150px) rotate(90deg)"
        mn1.style.zIndex = 1
        mn2.style.zIndex = 2
        mn2.style.transform = "rotate(-90deg) translateX(0px) translateY(0px) rotate(90deg)"

        mn2.style.fontSize = "30px"
        mn2.style.fontWeight = "bold"
        mn2.style.color = "var(--action-color)"

        mn1.style.fontSize = "20px"
        mn1.style.fontWeight = "lighter"
        mn1.style.color = "#b4b4b387"

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

        animationFinished = false
        mn1.style.transform = "rotate(-180deg) translateX(0px) translateY(0px) rotate(180deg)"
        mn1.style.zIndex = 2
        mn2.style.zIndex = 1
        mn2.style.transform = "rotate(-180deg) translateX(-100px) translateY(-50px) rotate(180deg)"

        mn1.style.fontSize = "30px"
        mn1.style.fontWeight = "bold"
        mn1.style.color = "var(--action-color)"

        mn2.style.fontSize = "20px"
        mn2.style.fontWeight = "lighter"
        mn2.style.color = "#b4b4b387"

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

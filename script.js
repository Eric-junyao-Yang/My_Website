const email_box = document.querySelector(".email")
const email_hint = email_box.querySelector(".email__hint")
const email = email_box.dataset.email

email_box.onclick = async function(){
    // Phones/tablets: open the mail app. Desktop: copy the address.
    if (window.matchMedia("(pointer: coarse)").matches || !navigator.clipboard) {
        window.location.href = `mailto:${email}`
        return
    }
    try {
        await navigator.clipboard.writeText(email)
        email_hint.textContent = "Copied!"
    } catch {
        window.location.href = `mailto:${email}`
        return
    }
    email_box.classList.add("is-copied")
    setTimeout(() => {
        email_hint.textContent = "Click to copy"
        email_box.classList.remove("is-copied")
    }, 1600)
}

document.getElementById("year").textContent = new Date().getFullYear()

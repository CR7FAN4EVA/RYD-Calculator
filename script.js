let prev = null
let curr = "0"
let op = null
let overwrite = true

const form = document.getElementById("calc_form")
const output = document.getElementById("output")


function updateDisplay(val = curr) {
    output.value = val
}

function clearActiveOps() {
    document.querySelectorAll(`[data-type="operator"].btn-orange`)
        .forEach(btn => btn.classList.remove("active"));
}

function inputDigit(d) {
    clearActiveOps()
    if (overwrite) {
        curr = (d === ".") ? "0." : d
        overwrite = false
    }
    else {
        if (d === "." && curr.includes(".")) return
        curr = (curr === "0" && d !== ".") ? d : curr + d 
 }
 updateDisplay(curr)
}


form.addEventListener("click", (e) => {
    const t = e.target;
    if (!(t instanceof HTMLButtonElement)) return;
    e.preventDefault()


    const value = (t.getAttribute("value"))
    const type = (t.getAttribute("data-type"))

    if (type === "operand") {
        inputDigit(value)
    }

})

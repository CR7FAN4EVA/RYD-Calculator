let prev = null
let curr = "0"
let op = null
let overwrite = true

const form = document.getElementById("calc_form")
const output = document.getElementById("output") 

form.addEventListener("click", (e) => {
    e.preventDefault()
    const value = (e.target.getAttribute("value"))
    const type = (e.target.getAttribute("data-type"))
    output.value = value 

})

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


function setOperator(nextOp) {

    if (["+", "-", "*", "/"].includes(nextOp)) {
        if(op && !overwrite) compute()
        prev = curr
        op = nextOp
        overwrite = true
        clearActiveOps()

        const btn = document.querySelector(`[data-type="operator"][value="${op}"]`)
        if (btn && btn.classList.contains("btn-orange")) btn.classList.add("active")
    }
}

function compute(){
    if (prev === null || op === null) return
    const A = parseFloat(prev)
    const B = parseFloat(curr)
    let result 
    
   switch (op){
    case "+": result = A + B; break
    case "-": result = A - B; break
    case "*": result = A * B; break
    case "/":
        if (B === 0){
            curr = "error"
            updateDisplay(curr)
            prev = null
            op = null
            overwrite = true
            return
        }
        result = A / B; break
   }
   curr = (typeof result === "number") ? result.toString() : String(result)
   updateDisplay(curr)
   prev = null; op = null; overwrite = true
   clearActiveOps() 
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
    if (type === "operator" && ["+", "-", "*", "/"].includes(value)) {
        setOperator(value);
        console.log(`Operator set to ${value}`);
        return;
    }
    if (type === "equals"){
        compute()
        return
    }

})

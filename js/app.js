"use strict"

let a = "";		//first number
let b = "";		// second number
let sign = "";		// operation sign
let finish = false;	//equal flag
let memory = ""; 	// Memory

const digit = ["0", "00", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "π", "e", "Rand", ];
const action = ["-", "+", "x", "÷", "%", "x!", "x2", "x3", "xy", "yx", "ex", "2x", "10x", "1/x", "2√x", "3√x", "y√x", "ln", "log2", "log10", "logy", "EE", "sin", "cos", "tan", "sinh", "cosh", "tanh", "sin-1", "cos-1", "tan-1", "sinh-1", "cosh-1", "tanh-1"];
const out = document.querySelector(".screen-calc p");   //output screen
const type = document.querySelector(".type");	// Rad/Deg

window.addEventListener("click", function (e) {
	if (!e.target.closest(".button")) return;
	if (e.target.closest(".ac")) {
		clearAll();
	}
	out.textContent = 0;
	let prop = e.target.textContent;
	if (prop === "+/-") {	// Change the sign
		a = -a;
		b = -b;
		out.textContent = a, b;
	}
  	// Digit - Numbers 0-9, Constant π, e ...
	if (digit.includes(prop)) {
		if (prop === "π") {
			if (a === "" && b === "") {
				a = Math.PI.toFixed(8);
				prop = "";
				finish = false;
				out.textContent = a;
			} else if (a !== "" && sign === "") {
				clearAll();
				a = Math.PI.toFixed(8);
				prop = "";
				finish = false;
				out.textContent = a;
			} else if (a !== "" && sign !== "") {
				b = Math.PI.toFixed(8);
				prop = "";
				finish = false;
				out.textContent = b;
			} else if (a !== "" && b !== "") {
				prop = "";
				a = calculate();
				b = Math.PI.toFixed(8);
				finish = true;
				out.textContent = a, b;
			}
		}
		if (prop === "e") {
			if (a === "" && b === "" ) {
				a = Math.E.toFixed(8);
				prop = "";
				finish = false;
				out.textContent = a;
			} else if (a !== "" && sign === "") {
				clearAll();
				a = Math.E.toFixed(8);
				prop = "";
				finish = false;
				out.textContent = a;
			} else if (a !== "" && sign !== "") {
				b = Math.E.toFixed(8);
				prop = "";
				finish = false;
				out.textContent = b;
			} else {
				prop = "";
				a = calculate();
				b = Math.E.toFixed(8);
				finish = true;
				out.textContent = a, b;
			}
		}
		if (prop === "Rand") {
			if (a === "" && b === "") {
				a = Math.random().toFixed(8);
				prop = "";
				finish = false;
				out.textContent = a;
			} else if (a !== "" && sign === "") {
				clearAll();
				a = Math.random().toFixed(8);
				prop = "";
				finish = false;
				out.textContent = a;
			} else if (a !== "" && sign !== "") {
				b = Math.random().toFixed(8);
				prop = "";
				finish = false;
				out.textContent = b;
			}  else {
				prop = "";
				a = calculate();
				finish = true;
				b = Math.random().toFixed(8);
				out.textContent = b;
			}
		}
		if (b === "" && sign === "") {
			a += prop;
			out.textContent = a;
		} else if (a !== "" && b !== "" && finish) {
			b = prop;
			finish = false;
			out.textContent = b;
		} else {
			b += prop;
			out.textContent = b;
		}
		return;
	}
	
	// Actions +, -, /, * ...
	if (action.includes(prop)) {
		sign = prop;
		if (sign === "%") {
			if (a !== "" && b !== "" && sign !== "") {
				a = calculate();
				finish = true;
				out.textContent = a;
			}
		a = calculate();
      a = a / 100;
		finish = true;
      out.textContent = a;
		} else if (sign === "x!") {
				a = factorial(a);
				finish = true;
				out.textContent = a;
		} else if (a !== "" && b !== "") {
			a = calculate();
			b = "";
			finish = true;
			out.textContent = prop;
		} else {
      out.textContent = sign;
		}
		return;
	}
  	// если нажат =
	if (prop === "=") {
		if (b === "") b = a;
		if (a === "") a = 0;
		a = calculate();
		b = "";
		finish = true;
		out.textContent = a;
	}
	addBrace(e);
	calcMemory(e);  // Memory
	toggleType(e);  // Rad/Deg
	toggle2nd(e);   // togge 2nd button
});
function calculate() {
	switch (sign) {
		case "+":
			a = parseFloat((+a + +b).toFixed(8).toString());
		break;
		case "-":
			a = parseFloat((a - b).toFixed(8).toString());
		break;
		case "x":
			a = parseFloat((a * b).toFixed(8).toString());
		break;
		case "÷":
			if (b === "0" || b === "00") {
				divByZero().out.textContent;
			return;
			}
			a = parseFloat((a / b).toFixed(8).toString());
		break;
		case "x2":
			a = parseFloat((Math.pow(a, 2)).toFixed(8).toString());
		break;
		case "x3":
			a = parseFloat((Math.pow(a, 3)).toFixed(8).toString());
		break; 
		case "xy":
			a = parseFloat((Math.pow(a, b)).toFixed(8).toString());
		break;  
		case "yx":
			a = parseFloat((Math.pow(b, a)).toFixed(8).toString());
		break; 
		case "ex":
			a = parseFloat((Math.pow(Math.E.toFixed(8), a)).toFixed(8).toString());
		break; 
		case "10x":
			a = parseFloat((Math.pow(10, a)).toFixed(8).toString());
		break; 
		case "2x":
			a = parseFloat((Math.pow(2, a)).toFixed(8).toString());
		break; 
		case "1/x":
			a = parseFloat((Math.pow(a, -1)).toFixed(8).toString());
		break; 
		case "2√x":
			a = parseFloat((Math.sqrt(a)).toFixed(8).toString());
		break; 
		case "3√x":
			a = parseFloat((Math.cbrt(a)).toFixed(8).toString());
		break; 
		case "y√x":
			if (a === "0" || b === "0") {
				return error().out.textContent;
			} else if (a === "00" || b === "00") {
				return error().out.textContent;
			}
			a = parseFloat((Math.pow(a, 1 / b)).toFixed(8).toString());
		break; 
		case "ln":
			a = parseFloat((Math.log(a)).toFixed(8).toString());
		break; 
		case "log10":
			a = parseFloat((Math.log10(a)).toFixed(8).toString());
		break; 
		case "logy":
			a = parseFloat((Math.log(a) / Math.log(b)).toFixed(8).toString());
		break; 
		case "log2":
			a = parseFloat((Math.log2(a)).toFixed(8).toString());
		break;  
		case "EE":
			a = parseFloat((a * Math.pow(10, b)).toFixed(8).toString());
		break; 
	}
	calculateSinCos();
	finish = true;
	return a;
}
function calculateSinCos() {
	if (type.classList.contains("rad")) {
		switch(sign) {
			//Radian
			case "sin":  
			a = parseFloat((Math.sin(a)).toFixed(8).toString());
			break;
			case "cos":  
				a = parseFloat((Math.cos(a)).toFixed(8).toString());
			break;
			case "tan":  
				a = parseFloat((Math.tan(a)).toFixed(8).toString());
			break;
			case "sinh":  
				a = parseFloat((Math.sinh(a)).toFixed(8).toString());
			break;
			case "cosh":  
				a = parseFloat((Math.cosh(a)).toFixed(8).toString());
			break;
			case "tanh":  
				a = parseFloat((Math.tanh(a)).toFixed(8).toString());
			break;
			// Rad Arc
			case "sin-1":  
				a = parseFloat((Math.asin(a)).toFixed(8).toString());
			break;
			case "cos-1":  
				a = parseFloat((Math.acos(a)).toFixed(8).toString());
			break;
			case "tan-1":  
				a = parseFloat((Math.atan(a)).toFixed(8).toString());
			break;
			case "sinh-1":  
				a = parseFloat((Math.asinh(a)).toFixed(8).toString());
			break;
			case "cosh-1":  
				a = parseFloat((Math.acosh(a)).toFixed(8).toString());
			break;
			case "tanh-1":  
				a = parseFloat((Math.atanh(a)).toFixed(8).toString());
			break;
		}
		finish = true;
		return a;
	} else {
		switch(sign) {
			//Degrees
			case "sin":  
				a = parseFloat(((Math.sin(a)) / 180 * Math.PI).toFixed(8).toString());
			break;
			case "cos":  
				a = parseFloat((Math.cos(a)).toFixed(8).toString());
			break;
			case "tan":  
				a = parseFloat((Math.tan(a)).toFixed(8).toString());
			break;
			case "sinh":  
				a = parseFloat((Math.sinh(a)).toFixed(8).toString());
			break;
			case "cosh":  
				a = parseFloat((Math.cosh(a)).toFixed(8).toString());
			break;
			case "tanh":  
				a = parseFloat((Math.tanh(a)).toFixed(8).toString());
			break;
			// Deg Arc
			case "sin-1":  
				a = parseFloat((Math.asin(a)).toFixed(8).toString());
			break;
			case "cos-1":  
				a = parseFloat((Math.acos(a)).toFixed(8).toString());
			break;
			case "tan-1":  
				a = parseFloat((Math.atan(a)).toFixed(8).toString());
			break;
			case "sinh-1":  
				a = parseFloat((Math.asinh(a)).toFixed(8).toString());
			break;
			case "cosh-1":  
				a = parseFloat((Math.acosh(a)).toFixed(8).toString());
			break;
			case "tanh-1":  
				a = parseFloat((Math.atanh(a)).toFixed(8).toString());
			break;
		}
		finish = true;
		return a;
	}
}
function factorial(n) {
	return n ? n * factorial(n - 1) : 1;
}
function calcMemory(e) {		// Memory
	let mrButton = document.querySelector(".mr");	// Rewrite Memory
	let mrTarget = e.target.closest(".mr");
	if (e.target.closest(".mc")) {		// Clean Memory
		memory = "";	
		mrButton.classList.remove("action");
		clearAll();
	}
	if (mrTarget) {									
		a = memory;
		out.textContent = a;
	}
	if (e.target.closest(".m-")) {
		if (memory !== "") {
			a = memory - a;
			return out.textContent = a;
		}
	}
	if (e.target.closest(".m-plus")) {
		memory = +memory + +a;
		if (memory !== "") {
			console.log(`Memory: ${memory}`);
			mrButton.classList.add("action");
		} else {
			mrButton.classList.remove("action");
		}
		clearAll();
	}
}
function clearAll() {
	a = "";
	b = "";
	sign = "";
	finish = false;
	out.textContent = 0;
}
function divByZero() {
	a = "";
	b = "";
	sign = "";
	finish = false;
	out.textContent = "Делить на ноль нельзя";
}
function error() {
	a = "";
	b = "";
	sign = "";
	finish = false;
	out.textContent = "Ошибочка";
}
function toggleType(e) {		// Rad/Deg
	if (e.target.closest(".type")) {
		type.classList.toggle("rad");
		type.classList.toggle("action");
		if (type.classList.contains("rad")) {
			type.textContent = "Deg";
		} else {
			type.textContent = "Rad";
		}
	}
}
function toggle2nd(e) {
	const firstGroup = document.querySelectorAll(".first-group");
	const secondGroup = document.querySelectorAll(".second-group");
	const secondButton = document.querySelector(".second-btn");
	if (e.target.closest(".second-btn")) {
		secondButton.classList.toggle("action");
		firstGroup.forEach(function (key) {
		key.classList.toggle("hidden");
		});
		secondGroup.forEach(function (key) {
		key.classList.toggle("hidden");
		});
	}
}
function addBrace(e) {
	if (e.target.closest(".left-brace")) {
		out.textContent = "(";
	}
	if (e.target.closest(".right-brace")) {
		out.textContent = ")";
	}
}

"use strict"

let a = ""; //first number
let b = ""; // second number
let sign = ""; // operation sign
let finish = false;

const digit = [
	"0",	"00",	"1",	"2",	"3",	"4",	"5",	"6",	"7",	"8",	"9",	".",	"π",	"e", "Rand",
];
const action = ["-", "+", "x", "÷", "+/-", "%"];
const out = document.querySelector(".screen-calc p");

window.addEventListener("click", function (e) {
	if (!e.target.closest(".button")) return;
	if (e.target.closest(".ac")) {
		clearAll();
	}
	out.textContent = 0;
	let prop = e.target.textContent;
  	// Digit - клавиши 0-9, π, e ...
	if (digit.includes(prop)) {
		if (prop === "π") {
			console.log(typeof prop);
			if (a === "" && b === ""  ) {
				a = Math.PI.toFixed(8);
				prop = "";
				finish = false;
				out.textContent = a;
			} else if (a !== "") {
				b = Math.PI.toFixed(8);
				prop = "";
				finish = false;
				out.textContent = b;
			} else if (a !== "" && b !== "") {
				prop = "";
				a = +a + +b;
				b = Math.PI.toFixed(8);
				finish = true;
				out.textContent = a, b;
			}
		}
		if (prop === "e") {
			console.log(typeof prop);
			if (a === "" && b === ""  ) {
				a = Math.E.toFixed(8);
				prop = "";
				finish = false;
				out.textContent = a;
			} else if (a !== "") {
				b = Math.E.toFixed(8);
				prop = "";
				finish = false;
				out.textContent = b;
			} else if (a !== "" && b !== "") {
				prop = "";
				a = +a + +b;
				b = Math.E.toFixed(8);
				finish = true;
				out.textContent = a, b;
			}
		}
		if (prop === "Rand") {
			if (a === "" && b === "") {
				a = Math.random().toFixed(8);
				prop = "";
				out.textContent = a;
			} else if (a !== "" && b === "") {
				b = Math.random().toFixed(8);
				prop = "";
				out.textContent = b;
			} else {
				prop = "";
				a = calculate();
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
		console.log(a, b, sign);
		return;
	}
	// если нажата клавиша +, -, /, * ...
	if (action.includes(prop)) {
		sign = prop;
		if (sign === "+/-") {
			a = -a;
			b = -b;
			out.textContent = a, b;
		} else if (sign === "%") {
			if (a !== "" && b !== "" && sign !== "") {
				a = calculate();
				console.log(a);
				a = a / 100;
				out.textContent = a;
			}
		a = calculate();
      a = a / 100;
      out.textContent = a;
		} else if (a !== "" && b !== "") {
			
		} else {
      out.textContent = sign;
		}
		console.log(a, b, sign);
		return;
	}
  // если нажат =
	if (prop === "=") {
		if (b === "") b = a;
		if (a === "") a = 0;
		calculate();
		finish = true;
		out.textContent = a;
		console.log(a, b, sign);
	}
  	// togge 2nd button
	toggle2nd(e);
});

function calculate() {
	switch (sign) {
		case "+":
			a = +a + +b;
			break;
		case "-":
			a = a - b;
			break;
		case "x":
			a = a * b;
			break;
		case "÷":
			if (b === "0" || b === "00") {
			divByZero();
			return;
		}
		a = a / b;
		break;
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
function cuttingText() {
	for(let i = 0; i < out.length; i++) {
		out[i].innerText = out[i].innerText.slice(0, 30) + '...';
		if (out.length > 20) out.length === 20;
	}
};
cuttingText();

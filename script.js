/* TODO: Build up the HTML document by using JavaScript DOM manipulation functions.
 * Do not rely on changes you may have made to index.html because the grader won't use that file.
 */
function hdiv(){ //creates the head div
	//creates a div with the neeeded style
	var headDiv = document.createElement('div');
	headDiv.id = "headDiv";
	headDiv.className = "red stuff-box shadowed";
	//create the explainer title
	var header = document.createElement('h1');
	header.id = "header";
	header.textContent = "Javascript Calculator";
	header.style = "color:blue";
	headDiv.appendChild(header);
	document.body.appendChild(headDiv);
	//create the insructions
	var para = document.createElement('p');
	para.id = "para";
	para.textContent = "Please enter an expression to be calculated via this page"
	para.style += " text-align:center";
	header.appendChild(para);
	//create first number box
	var num1 = document.createElement('input');
	num1.id = "num1";
	num1.rows = 1;
	num1.type = "number";
	headDiv.appendChild(num1);
	//create the drop down for the calculations
	var op = document.createElement('select');
	op.id = "operator"
	var add = document.createElement('option');
	add.text = "+";
	op.add(add);
	var sub = document.createElement('option');
	sub.text = "-";
	op.add(sub);
	var mul = document.createElement('option');
	mul.text = "*";
	op.add(mul);
	var div = document.createElement('option');
	div.text = "/";
	op.add(div);
	var mod = document.createElement('option');
	mod.text = "%";
	op.add(mod);
	var exp = document.createElement('option');
	exp.text = "**";
	op.add(exp);
	headDiv.appendChild(op);
	//create a second nu,ber box
	var num2 = document.createElement('input');
	num2.id = "num2";
	num2.rows = 1;
	num2.type = "number";
	headDiv.appendChild(num2);
	//create a color picker for child divs
	var color = document.createElement('input');
	color.id = "color"
	color.type = "color"
	headDiv.appendChild(color);
	//make a compute button that runs the computation using calc()
	var compute = document.createElement('input');
	compute.type = "button";
	compute.value = "Compute";
	compute.addEventListener('click', calc);
	headDiv.appendChild(compute);
	//create a div that follows head so we have a place to add the children too
	var tailDiv = document.createElement('div');
	tailDiv.id = "tailDiv";
	document.body.append(tailDiv);
}

function calc(){ //used to run the calculation
	//get the elements on the page we care about
	var num1 = document.getElementById("num1");
	var num2 = document.getElementById("num2");
	var op = document.getElementById("operator");
	var color = document.getElementById("color");
	var newDiv = document.createElement('div');
	//create a new div for the answer
	newDiv.className = "stuff-box shadowed";
	newDiv.style.color = "white";
	//get the date and parse it to match what Erik had on his example
	var rawDate = new Date();
	var parsedDate = (rawDate.getMonth() + 1) + "/" + rawDate.getDate() + "/" + rawDate.getFullYear() + " " + rawDate.toLocaleTimeString('en-US');
	if(num1.value && num2.value){ //there are numbers in both of the inputs
		//fill the div with the date and the commputation and set color to the inputted color
		var fin = parsedDate + " " + num1.value + " " + op.value + " " + num2.value + " = " + eval(num1.value + op.value + num2.value);
		newDiv.style.backgroundColor = color.value;
		newDiv.innerHTML += fin;
	}
	else //used to throw the error
	{
		//fill the div with the error message and set color to red
		var fin = parsedDate + " " + "Error! Missing one or more operands!";
		newDiv.style.backgroundColor = "red";
		newDiv.innerHTML += fin;
	}
	//create a listener to delete the new div on click
	newDiv.addEventListener('click', function(){
		this.remove();
	});
	//add the new div right after tail befor any of the other children
	tailDiv.prepend(newDiv);
}
//change the doc title
document.title = "This is a very special title";
//run the function to create the header
hdiv();

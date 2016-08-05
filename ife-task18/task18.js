//处理不同浏览器事件兼容差距
//跨浏览器事件处理
function addEventHandle(ele, type, handle){
  if (ele.addEventListener){
    ele.addEventListener(type, handle, false);
  }else if (ele.attachEvent){
    ele.attachEvent("on" + type, handle);
  }else {
    ele["on" + type] = handle;
  }
}

var inputNum = [];
var inp = document.querySelector("input");
var container = document.querySelector(".container");

//渲染div将数字装入
function renderNum() {
	
	var str = "";
	for (var i = 0; i < inputNum.length; i++) {
		str +='<div>'+ inputNum[i] +'</div>';
	}

	container.innerHTML = str;
}

//录入数据
function testNum(inp) {
	if(inp!=null){
		if(!inp.match(/^\d+$/)){
			alert("请输入正整数!");
			return false;
		}
		return true;
	}
	return false;
}

//定义队列的方式
function leftIn() {
	inputNum.unshift(inp.value);
	renderNum();
}

function rightIn() {
	inputNum.push(inp.value);
	renderNum();
}

function leftOut() {
	var removeValue = inputNum.shift();
	alert("你移除的数据为"+removeValue);
	renderNum();
}

function rightOut() {
	var removeValue = inputNum.pop();
	alert("你移除的数据为"+removeValue);
	renderNum();
}

//为按钮绑定事件 使用事件委托
function btnOn() {
	var buttonList = document.querySelector(".button-click");
	addEventHandle(buttonList,'click',function(event){
		var target = event.target;
		switch(target.className){
			case "btn-leftIn":
			if(testNum(inp.value))
				leftIn();
				break;
			case "btn-rightIn":
			if(testNum(inp.value))
				rightIn();
				break;
			case "btn-leftOut":
			if(testNum(inp.value))
				leftOut();
				break;
			case "btn-rightOut":
			if(testNum(inp.value))
				rightOut();
				break;
		}
	});	
}

//为每个div绑定事件
function divOn(){
	addEventHandle(container,'click',function(event){
		var target = event.target;
		var divNum = target.innerHTML;
		for (var i = 0; i < inputNum.length; i++) {
			if(inputNum[i] == divNum){
				inputNum.splice(i,1);
				renderNum();
			}
		}
	});
}
btnOn();
divOn();
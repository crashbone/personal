function start(){
	const totalPriceString1 = 'Total price: '
	const totalPriceString2 = ' TL'
	const clickedColor = '#E0E0E0'
	const decimalFix = 2
	
	let c = 0
	let sum = 0.0
	
	itemsDiv.addEventListener('click', clickOnItem)
	inputItemAddButton.addEventListener('click', inputItemAddButtonFunction)
	inputItemName.addEventListener('focus', ()=>inputItemName.select())
	inputItemPrice.addEventListener('focus', ()=>inputItemPrice.select())
	
	function inputItemAddButtonFunction(event){
		
		let itemCash = parseFloat(parseFloat(inputItemPrice.value.replace(/,/g, '.')).toFixed(decimalFix))
		if (isNaN(itemCash)){
			inputItemPrice.select()
		}
		
		else{
			const itemMainDiv = document.createElement('div')
			const itemDiv = document.createElement('div')
			const itemLabelSpan = document.createElement('span')
			const itemCashSpan = document.createElement('span')
			const isSelected = document.createElement('span')
			
			itemsDiv.appendChild(itemMainDiv)
			itemMainDiv.appendChild(itemDiv)			
			itemDiv.appendChild(itemLabelSpan)
			itemDiv.appendChild(itemCashSpan)
			itemDiv.appendChild(isSelected)
			
			
			itemMainDiv.setAttribute('class', 'item_main_div')
			isSelected.setAttribute('class', 'isSelected')
			isSelected.setAttribute('boolean', 'false')
			itemDiv.setAttribute('class', 'item_div')
			
			itemLabelSpan.innerHTML = inputItemName.value
			itemCashSpan.innerHTML = itemCash.toFixed(decimalFix) + ' TL'
			c++
			inputItemName.select()
		}
	}
	
	function refreshTotalPrice(){
		
		totalPriceSpan.innerHTML = totalPriceString1 + sum.toFixed(decimalFix) + totalPriceString2
	}
	
	function clickOnItem(event){
		var theNameSpan
		var thePriceSpan
		var theItemDiv
		var isSelected
		if(event.target.parentElement.getAttribute('class') == 'item_div'){
			theItemDiv = event.target.parentElement
		}
		if(event.target.getAttribute('class')=='item_div'){
			theItemDiv = event.target
		}
		if (typeof theItemDiv != 'undefined'){
			theNameSpan = theItemDiv.children[0]
			thePriceSpan = theItemDiv.children[1]
			isSelected = theItemDiv.children[2]
			
			const cash = parseFloat(thePriceSpan.innerHTML.substr(0, thePriceSpan.innerHTML.indexOf(' ')))
			if(isSelected.getAttribute('boolean') == 'false'){
				isSelected.setAttribute('boolean', 'true');
				theItemDiv.style.backgroundColor = clickedColor
				sum+=cash
			}
			else{
				isSelected.setAttribute('boolean', 'false');
				theItemDiv.style.backgroundColor = 'white'
				sum-=cash
				
			}
			
			refreshTotalPrice()
		}
	}
	
	
	
}
document.addEventListener('DOMContentLoaded', start)



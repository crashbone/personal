var mainContainerDiv
var topContainerDiv
var inputDiv
var inputFirstLineDiv
var inputItemName
var inputItemPrice
var inputItemAddButton
var bottomContainerDiv
var totalPriceSpan
var itemsDiv

function start(){
	mainContainerDiv = document.getElementById('main_container_div')
	topContainerDiv = document.getElementById('top_container_div')
	inputDiv = document.getElementById('input_div')
	inputFirstLineDiv = document.getElementById('input_first_line_div')
	inputItemName = document.querySelector('#input_first_line_div input:nth-of-type(1)')
	inputItemPrice = document.querySelector('#input_first_line_div input:nth-of-type(2)')
	inputItemAddButton = document.querySelector('#input_first_line_div button[name="item_add_button"]')
	bottomContainerDiv = document.getElementById('bottom_container_div')
	totalPriceSpan = document.querySelector('#bottom_container_div span:nth-of-type(1)')
	itemsDiv = document.getElementById('items_div')
}
document.addEventListener('DOMContentLoaded', start)
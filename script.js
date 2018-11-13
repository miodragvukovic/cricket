// Dear Programmer:
// When i wrote this code only god and
// i knew how it worked.
// Now, only the god knows it!
// 
// Therefore, if u're trying to optimise
// this routine and it fails ( most surely ),
// please increase this counter as a
// warning for the next person: 
// 
// total_hours_wasted_here: 11
// 
var playerValue
var gameValue
var string = ""
var click = 3
var numberz = 0
var currentScoreValue
var count = 0
// GLOBALNE VARIJABLE
var player = document.getElementsByClassName('player')
// VARIJABLE GLOBALNIH SELEKTORA
for ( var i = 0; i < document.getElementsByClassName('player-val').length; i++ ) {
	document.getElementsByClassName('player-val')[i].addEventListener('click', function(){
		playerValue = this.value
	})
}
// ODREDJIVANJE VREDNOSTI IZABRANOG BROJA IGRACA
document.querySelector('.player-ok').addEventListener('click', function(){
	var stringGlob = ""
	if ( playerValue === undefined ) {
		playerValue = document.querySelector('.checked').value
		for ( var i = 0; i < playerValue; i++ ) {
			stringGlob += "<ul class='player'></ul>"
		}
	}
	else {
		for ( var i = 0; i < playerValue; i++ ) {
			stringGlob += "<ul class='player'></ul>"
		}
	}
	document.getElementById('players').innerHTML = stringGlob
	document.querySelector('.player-setup').style.display = "none"
	document.getElementById('buttonz').style.opacity = "1"
	fillItUp()
})
// DODAVANJE IZABRANOG BROJA IGRACA I POZIV NA FUNKCIJU KOJA PRAVI TEMPLATE


// for ( var i = 0; i < document.getElementsByClassName('game-val').length; i++ ) {
// 	document.getElementsByClassName('game-val')[i].addEventListener('click', function(){
// 		gameValue = this.value
// 	})
// }
// document.querySelector('.game-ok').addEventListener('click', function(){
// 	for ( var i = 0; i < document.getElementsByClassName('player').length; i++ ) {
// 		document.getElementsByClassName('player')[i].setAttribute("data-value", gameValue)
// 		document.getElementsByClassName('player')[i].innerHTML = gameValue
// 		if ( gameValue === undefined ) {
// 			document.getElementsByClassName('player')[i].setAttribute("data-value", checkedValue)
// 			document.getElementsByClassName('player')[i].innerHTML = checkedValue
// 			gameValue = checkedValue
// 		}
// 	}
// 	document.querySelector('.game').style.display = "none"
// 	document.querySelector('.player').classList.add('active')
// })
function fillItUp() {
	for ( var i = 0; i < player.length; i++ ) {
		var playerLoop = player[i]
		var stringPl = ""
		for ( var u = 15; u <= 20; u++ ) {
			stringPl += "<li data-value='" + u + "' score-value='0' class='num num" + u + "'>" + u + ""
			for ( var t = 0; t < 3; t++ ) {
				stringPl += "<span class='point'></span>"
			}
			stringPl += "</li>"
		}
		stringPl += "<li data-value='25' score-value='0' class='num num25'>25"
		for ( var t = 0; t < 3; t++ ) {
			stringPl += "<span class='point'></span>"
		}
		stringPl += "</li>"
		stringPl += "<li class='negative-score' score-value='0'>0</li>"
		stringPl += "<li class='darts-left'>"
		for ( var t = 0; t < 3; t++ ) {
			stringPl += "<span class='darts-icon'></span>"
		}
		stringPl += "</li>"
		playerLoop.innerHTML = stringPl
	}
	document.querySelector('.player').classList.add('active')
	dartsLeft()
}
// TEMPLATE ZA IGRACE
for ( var i = 15; i <= 20; i++ ) {
	string += "<span data-value='"+ i +"' class='score-value'>"+ i +"</span>"
}
//  DODAVANJE ELEMENATA U BROJCANIK

document.querySelector('#numbers').insertAdjacentHTML('afterbegin', string)
// DODAVANJE ACTIVE KLASE AKTIVNIM IGRICIMA
Array.from(document.getElementsByClassName('score-value')).forEach(function(el) {
	el.addEventListener('click', function(e){
		click = click - 1
		document.querySelector('.active').children[8].children[click].style.opacity = "0"
		// LOOPOVANJE KROZ BROJCANIK I DODAVANJE EVENT HANDLERA
		var hits = Number(e.target.getAttribute("data-value"))
		Array.from(document.getElementsByClassName('num')).forEach(function(elm) {
			// LOOPOVANJE KROZ SVE BROJEVE SA VREDNOSCU SELEKTOVANOG BROJA
		var currentScore = Number(elm.getAttribute('data-value'))
		currentScoreValue = Number(elm.getAttribute('score-value'))
			if ( hits == currentScore ) {
				// USLOV DA SE PRONADJE VREDNOST IGRACA JEDNAKA SELEKTOVANOM BROJU
				if ( elm.parentElement.classList.contains('active') ) {
					// USLOV DA DELUJE SAMO NA IGRACA KOJI JE AKTIVAN
					elm.setAttribute('score-value', currentScoreValue + hits)
					// DODAVANJE SEKUNDARNE VREDNOSTI NA AKTIVNOG IGRACA
					var scoreCalculate = currentScoreValue / hits
					var eachScoreNumber = elm.classList[1]
					if ( elm.parentElement.classList.contains('double') ) {
						elm.setAttribute('score-value', currentScoreValue + hits * 2)
						elm.parentElement.classList.remove('double')
						document.querySelector('.double').classList.remove('double-active')
						if ( elm.getAttribute('score-value') >= hits * 3 ) {
							charge()
							// POZIV NA FUNKCIJU KOJA CE RASPOREDJIVATI NEGATIVNI REZULTAT IZ DOUBLE-A
							elm.classList.add('full')
							// DODAVANJE KLASE NAKON DOUBLEA, POZNAT BUG U CONSOL LOGU ZA POKUSAJ DODAVANJA NEPOSTOJECE KLASE
						}
						if ( scoreCalculate >= 3 ) {
							return false
						} else {
							elm.children[scoreCalculate].classList.add('scored')
							elm.children[scoreCalculate+1].classList.add('scored')
						}
					}
					// DODAVANJE DOUBLE VREDNOSTI I SCORE-A
					if ( elm.parentElement.classList.contains('tripple') ) {
						elm.setAttribute('score-value', currentScoreValue + hits * 3)
						elm.parentElement.classList.remove('tripple')
						document.querySelector('.tripple').classList.remove('tripple-active')
						if ( elm.getAttribute('score-value') >= hits * 3 ) {
							charge()
							// POZIV NA FUNKCIJU KOJA CE RASPOREDJIVATI NEGATIVNI REZULTAT IZ TRIPPLE-A
							elm.classList.add('full')
							// DODAVANJE KLASE NAKON TRIPPLE-A
						}
						if ( scoreCalculate >= 3 ) {
							return false
						} else {
							for ( var i = 0; i <= 2; i++ ) {
								elm.children[i].classList.add('scored')
							}
						}
					}
					// DODAVANJE TRIPPLE VREDNOSTI I SCORE-A
					else {
						if ( elm.getAttribute('score-value') >= hits * 3 ) {
							charge()
							// POZIV NA FUNKCIJU KOJA CE RASPOREDJIVATI NEGATIVNI REZULTAT
							elm.classList.add('full')
							// USLOV ZA POREPOZNAVANJE POPUNJENOG BROJA I PROSLEDJIVANJE VREDNOSTI OSTALIMA
						}
						if ( scoreCalculate >= 3 ) {
							return false
						} else {
							elm.children[scoreCalculate].classList.add('scored')
						}
					}
					//  DODAVANJE VIZUELNE VIDLJIVOSTI UNESENE VREDNOSTI
				}
			}
			function charge() {
				if ( !elm.classList.contains('full') ) {
					scoreDifference = elm.getAttribute('score-value') - hits * 3
					for ( var o = 0; o < document.getElementsByClassName(""+eachScoreNumber+"").length; o++ ) {
						var playerElo = document.getElementsByClassName(""+eachScoreNumber+"")[o]
						var playerEloCurrent = Number(playerElo.parentElement.children[7].innerHTML)
						if ( !playerElo.classList.contains('full') ) {
							if ( playerElo.parentElement.children[7] == elm.parentElement.children[7] ) {
								elm.parentElement.children[7].innerHTML = elm.parentElement.children[7].getAttribute('score-value')
							}
							// USLOV ZA TACAN REZULTAT AKTIVNOG IGRACA
							else {
								playerElo.parentElement.children[7].setAttribute('score-value', playerEloCurrent + scoreDifference)
								playerElo.parentElement.children[7].innerHTML = playerEloCurrent + scoreDifference
							}
							// PROMENA REZULTATA U SLUCAJU DOUBLE PREKO NULE
						}
					}
					scoreDifference = 0
				}
				else {
					for ( var p = 0; p < document.getElementsByClassName(""+eachScoreNumber+"").length; p++ ) {
						// LOOPOVANJE KROZ SVE KLASE NA STRANI IGRACA ZA SELEKTOVANI BROJ I SELEKTOVANJE SEKUNDARNE KLASE
						var playerEl = document.getElementsByClassName(""+eachScoreNumber+"")[p]
						var newCurrentScoreValue = elm.getAttribute('score-value') -  currentScoreValue
						var negativeValue = Number(playerEl.parentElement.children[7].getAttribute('score-value'))
						if ( !playerEl.classList.contains('full') ) {
							if ( elm.getAttribute('score-value') == 3 * hits ) {
								return false
							}
							// USLOV ZA PREVENCIJU DODAVANJA SCOREA AKO SE POPUNI DOUBLEOM
							else {
								playerEl.parentElement.children[7].setAttribute('score-value', negativeValue + newCurrentScoreValue + scoreDifference)
								playerEl.parentElement.children[7].innerHTML = negativeValue + newCurrentScoreValue +scoreDifference
							}
							// USLOV ZA DODAVANJE NEGATIVNOG REZULTATA SVIM IGRACIMA KOJI NEMAJU POPUNJENU VREDNOST
						}
					}
				}
			}
		})
		if ( click == 0 ) {
			nextPlayer()
			click = 3
		}
		// AUTOMATSKO PREBACIVANJE NA SLEDECEG IGRACA
	})
})
document.querySelector('.double').addEventListener('click', function(){
	if ( this.classList.contains('double-active') ) {
		this.classList.remove('double-active')
	}
	else {
		this.classList.add('double-active')
	}
	if ( document.querySelector('.active').classList.contains('double') ) {
		document.querySelector('.active').classList.remove('double')
	}
	else {
		document.querySelector('.active').classList.add('double')
	}
	if ( document.querySelector('.active').classList.contains('tripple') ) {
		document.querySelector('.active').classList.remove('tripple')
		document.querySelector('.tripple').classList.remove('tripple-active')
	}
})
// ODUZIMANJE I DODAVANJE DOUBLE
document.querySelector('.tripple').addEventListener('click', function(){
	if ( this.classList.contains('tripple-active') ) {
		this.classList.remove('tripple-active')
	}
	else {
		this.classList.add('tripple-active')
	}
	if ( document.querySelector('.active').classList.contains('tripple') ) {
		document.querySelector('.active').classList.remove('tripple')
	}
	else {
		document.querySelector('.active').classList.add('tripple')
	}
	if ( document.querySelector('.active').classList.contains('double') ) {
		document.querySelector('.active').classList.remove('double')
		document.querySelector('.double').classList.remove('double-active')
	}

})
// ODUZIMANJE I DODAVANJE TRIPPLE
document.querySelector('.next').addEventListener('click', function(){
	document.querySelector('.active').classList.remove('double')
	document.querySelector('.double').classList.remove('double-active')
	document.querySelector('.active').classList.remove('tripple')
	document.querySelector('.tripple').classList.remove('tripple-active')
	nextPlayer()
})
// FUNKCIONALNOST NEXT DUGMETA
function nextPlayer() {
	for ( var z = 0; z < document.querySelector('.active').children[8].children.length; z++ ) {
		document.querySelector('.active').children[8].children[z].style.opacity = "0"
	}
	click = 3
	if ( count >= playerValue - 1 ) {
		player[count].classList.remove('active')
		count = 0
		player[count].classList.add('active')
		dartsLeft()
	} 
	else {
		player[count].classList.remove('active')
		count = count+1
		player[count].classList.add('active')
		dartsLeft()
	}
}
// FUNKCIJA ZA PREBACIVANJE NA SLEDECEG IGRACA
function dartsLeft() {
	for ( var z = 0; z < document.querySelector('.active').children[8].children.length; z++ ) {
		document.querySelector('.active').children[8].children[z].style.opacity = "1"
	}
}







// var string = ""
// var clicks = 0
// var playerValue
// var gameValue
// var checkedValue = document.querySelector('.checked').value
// for ( var i = 0; i < document.getElementsByClassName('player-val').length; i++ ) {
// 	document.getElementsByClassName('player-val')[i].addEventListener('click', function(){
// 		playerValue = this.value
// 	})
// }
// document.querySelector('.player-ok').addEventListener('click', removal)
// function removal() {
// 	var playerNum = document.getElementsByClassName('player')
// 	if ( playerValue > 3 | playerValue === undefined) {
// 		document.querySelector('.player-setup').style.display = "none"
// 		document.querySelector('.game').style.display = "flex"
// 		document.querySelector('.container').style.opacity = "1"
// 		playerValue = 4
// 	}
// 	if ( playerValue <= 3 ) {
// 		playerNum[playerValue].remove()
// 		if (playerNum[playerValue]) {
// 			removal()
// 		}
// 			document.querySelector('.player-setup').style.display = "none"
// 			document.querySelector('.game').style.display = "flex"
// 			document.querySelector('.container').style.opacity = "1"
// 	} 
// }
// for ( var i = 0; i < document.getElementsByClassName('game-val').length; i++ ) {
// 	document.getElementsByClassName('game-val')[i].addEventListener('click', function(){
// 		gameValue = this.value
// 	})
// }
// document.querySelector('.game-ok').addEventListener('click', function(){
// 	for ( var i = 0; i < document.getElementsByClassName('score-number').length; i++ ) {
// 		document.getElementsByClassName('score-number')[i].setAttribute("data-value", gameValue)
// 		document.getElementsByClassName('score-number')[i].innerHTML = gameValue
// 		if ( gameValue === undefined ) {
// 			document.getElementsByClassName('score-number')[i].setAttribute("data-value", checkedValue)
// 			document.getElementsByClassName('score-number')[i].innerHTML = checkedValue
// 			gameValue = checkedValue
// 		}
// 	}
// 	document.querySelector('.game').style.display = "none"
// 	document.querySelector('.player').classList.add('player-active')
// })
// for ( var i = 1; i <= 20; i++ ) {
// 	string += "<span data-value='"+ i +"' class='score-value'>"+ i +"</span>";
// }
// for ( var i = 0; i < document.getElementsByClassName('player').length; i++ ) {
// 	document.getElementsByClassName('numbers')[i].insertAdjacentHTML('afterbegin', string)
// 	document.getElementsByClassName('numbers')[i].insertAdjacentHTML('beforeend', "<span data-value='25' class='score-value'>25</span>")
// 	document.getElementsByClassName('numbers')[i].addEventListener('click', function(e) {
// 		var sc = this.parentElement.previousElementSibling.children[0]
// 		var hits = e.target.getAttribute("data-value")
// 		var score =  sc.getAttribute("data-value")
// 		clicks = clicks+1
// 		if ( clicks == 3 ) {
// 			this.nextElementSibling.children[2].classList.add('grey')
// 		}
// 		if ( sc.getAttribute("data-value") > 0 ) {
// 			if ( this.classList.contains('double') ) {
// 			  	sc.setAttribute("data-value", score - hits*2)
// 				sc.innerHTML = score - hits*2
// 			}
// 			if ( this.classList.contains('tripple') ) {
// 				if ( hits == 25 ) {
// 					return false
// 				} else {
// 			  	sc.setAttribute("data-value", score - hits*3)
// 				sc.innerHTML = score - hits*3
// 				}
// 			}
// 			if ( !this.classList.contains('double') & !this.classList.contains('tripple') )  {
// 				sc.setAttribute("data-value", score - hits)
// 				sc.innerHTML = score - hits
// 			}
// 		} else {
// 			return false
// 		}
// 		if ( sc.getAttribute("data-value") < 0 ) {
// 			sc.setAttribute("data-value", score)
// 			sc.innerHTML = score
// 		}
// 		this.classList.remove('double')
// 		Array.from(document.getElementsByClassName('x2')).forEach( el => el.classList.remove('active') )
// 		this.classList.remove('tripple')
// 		Array.from(document.getElementsByClassName('x3')).forEach( el => el.classList.remove('active') )
// 		var res = score - sc.getAttribute("data-value")
// 		if ( res == 0 ) {
// 			return false
// 		}
// 		this.nextElementSibling.nextElementSibling.children[1].insertAdjacentHTML('afterbegin', "<div data-value='"+ res +"' class='last-results'>"+ res +"</div>")
// 		this.nextElementSibling.nextElementSibling.classList.add('has-scores')
// 		// if ( sc.getAttribute("data-value") <= 40 ) {
// 		// 	this.nextElementSibling.children[0].style.color = "red"
// 		// 	this.nextElementSibling.children[0].style.border = "1px solid red"
// 		// }
// 		if ( sc.getAttribute("data-value") == 0 ) {
// 			this.parentElement.previousElementSibling.children[1].style.display = "block"
// 			var currentScore = Number(this.parentElement.previousElementSibling.children[1].children[0].innerHTML)
// 			this.parentElement.previousElementSibling.children[1].children[0].innerHTML = currentScore + 1
// 			Array.from(document.getElementsByClassName('score-number')).forEach(function(el) {
// 				el.setAttribute('data-value', gameValue)
// 				el.innerHTML = gameValue
// 			})
// 		}

// 	})
// }
// Array.from(document.getElementsByClassName('x2')).forEach(function(el) {
// 	el.addEventListener('click', function(){
// 	if ( this.parentElement.previousElementSibling.classList.contains('double') ) {
// 		this.parentElement.previousElementSibling.classList.remove('double')
// 	} else 
// 	this.parentElement.previousElementSibling.classList.add('double')
// 	if ( this.parentElement.previousElementSibling.classList.contains('tripple') ) {
// 		this.parentElement.previousElementSibling.classList.remove('tripple')
// 		this.parentElement.previousElementSibling.classList.add('double')
// 		this.nextElementSibling.classList.remove('active')
// 	}
// 	if ( this.classList.contains('active') ) {
// 		this.classList.remove('active')
// 	} else 
// 	this.classList.add('active')
// 	})
// })
// Array.from(document.getElementsByClassName('x3')).forEach(function(el) {
// 	el.addEventListener('click', function(){
// 	if ( this.parentElement.previousElementSibling.classList.contains('tripple') ) {
// 		this.parentElement.previousElementSibling.classList.remove('tripple')
// 	} else
// 	this.parentElement.previousElementSibling.classList.add('tripple')
// 	if ( this.parentElement.previousElementSibling.classList.contains('double') ) {
// 		this.parentElement.previousElementSibling.classList.remove('double')
// 		this.parentElement.previousElementSibling.classList.add('tripple')
// 		this.previousElementSibling.classList.remove('active')
// 	}
// 	if ( this.classList.contains('active') ) {
// 		this.classList.remove('active')
// 	} else 
// 	this.classList.add('active')
// 	})
// })
// Array.from(document.getElementsByClassName('next')).forEach(function(el, index) {
//   el.addEventListener("click", function(){
//   	if ( index ==  playerValue - 1) {
//   		this.parentElement.parentElement.parentElement.classList.remove('player-active')
//   		document.getElementsByClassName('player')[0].classList.add('player-active')
//   		this.classList.remove('grey')
//   	}
//   	 else {
// 	  	this.parentElement.parentElement.parentElement.classList.remove('player-active')
// 	  	this.parentElement.parentElement.parentElement.nextElementSibling.classList.add('player-active')
// 		this.classList.remove('grey')
//     }
//     clicks = 0
//     Array.from(document.querySelectorAll('.x2, .x3')).forEach( el => el.classList.remove('active') )
//     Array.from(document.getElementsByClassName('numbers')).forEach( el => el.classList.remove("double", "tripple") )
//   })
// })
// Array.from(document.getElementsByClassName('return-score')).forEach(function(el) {
// 	 el.addEventListener('click', function(){
// 	 	if ( this.parentElement.classList.contains('has-scores') ) {
// 	 		var clicked = parseInt(this.nextElementSibling.children[0].getAttribute("data-value"))
// 	 		var val = parseInt(this.parentElement.parentElement.previousElementSibling.children[0].getAttribute("data-value"))
// 	 		this.parentElement.parentElement.previousElementSibling.children[0].setAttribute("data-value", +val + +clicked)
// 	 		this.parentElement.parentElement.previousElementSibling.children[0].innerHTML = val + clicked
// 	 		var removal = this.parentNode.children[1].children[0]
// 	 		removal.parentNode.removeChild(removal)
// 	 	}
// 	 	if ( document.getElementsByClassName('last-results').length < 1 ) {
// 	 		this.parentElement.classList.remove('has-scores')
// 	 	}
// 	 })
// })
// Array.from(document.getElementsByClassName('next')).forEach(function(el, index) {
// 	el.addEventListener("click", function(){
// 		var thaIndex = index + 1
// 		var left = "-" + thaIndex + "00%"
// 		if ( thaIndex == document.getElementsByClassName('next').length ) {
// 		  	document.querySelector('.container').style.left = "0"
// 		} else {
// 		  	document.querySelector('.container').style.left = left
// 		}
// 	})
// })
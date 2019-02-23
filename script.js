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
// total_hours_wasted_here: 17
// 
document.addEventListener('contextmenu', function(e){
	e.preventDefault()
})
var playerValue
var gameValue
var string = ""
var click = 3
var numberz = 0
var currentScoreValue
var count = 0
// GLOBALNE VARIJABLE
var player = document.getElementsByClassName('player')
var players = document.querySelector('#players')
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
			// stringGlob += "<ul data-full='0' class='player player-"+(i+1)+"'></ul>"
		}
	}
	else {
		for ( var i = 0; i < playerValue; i++ ) {
			stringGlob += "<ul class='player'></ul>"
			// stringGlob += "<ul data-full='0' class='player player-"+(i+1)+"'></ul>"
		}
	}
	players.innerHTML = stringGlob
	document.querySelector('.player-setup').style.display = "none"
	fillItUp()
	if ( playerValue == 4 || playerValue === undefined ) {
		document.querySelector('.game').style.display = "flex"
	} else {
		players.classList.add('solo')
		document.getElementById('players').style.opacity = "1"
		document.getElementById('buttonz').style.opacity = "1"
	}
	// USLOV ZA VRSTU IGRE U ZAVISNOSTI OD BROJA IGRACA
})
// DODAVANJE IZABRANOG BROJA IGRACA I POZIV NA FUNKCIJU KOJA PRAVI TEMPLATE
for ( var i = 0; i < document.getElementsByClassName('game-val').length; i++ ) {
	document.getElementsByClassName('game-val')[i].addEventListener('click', function(){
		gameValue = this.value
	})
}
document.querySelector('.game-ok').addEventListener('click', function(){
	if ( gameValue == "team" ) {
		players.classList.add('team')
		document.getElementsByClassName('player')[0].classList.add('team-1')
		document.getElementsByClassName('player')[1].classList.add('team-2')
		document.getElementsByClassName('player')[2].classList.add('team-1')
		document.getElementsByClassName('player')[3].classList.add('team-2')
		var stringTeam = ""
		stringTeam += "<div class='team-scores'>"
		stringTeam += "<span class='team-one'>0</span>"
		stringTeam += "<span class='team-two'>0</span>"
		stringTeam += "</div>"
		document.getElementById('players').insertAdjacentHTML('afterend', stringTeam)
		// UNDER CONSTRUCTION TEAM
	} else {
		players.classList.add('solo')
	}
	document.querySelector('.game').style.display = "none"
	players.style.opacity = "1"
	document.getElementById('buttonz').style.opacity = "1"
	document.querySelector('.player').classList.remove('active')
	document.querySelector('.player').classList.add('active')
})
// SOLO ILI TEAM IGRA
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
 // DODAVANJE ELEMENATA U BROJCANIK
document.querySelector('#numbers').insertAdjacentHTML('afterbegin', string)
document.querySelector('#numbers').insertAdjacentHTML('beforeend', "<span data-value='25' class='score-value bull'></span>")

// DODAVANJE ACTIVE KLASE AKTIVNIM IGRICIMA
Array.from(document.getElementsByClassName('score-value')).forEach(function(el) {
	el.addEventListener('click', function(e){
		// LOOPOVANJE KROZ BROJCANIK I DODAVANJE EVENT HANDLERA
		if ( el.getAttribute('data-value') == 25 ) {
			if ( document.querySelector('.active').classList.contains('tripple') ) {
				return false
			}
		}
		// NE POSTOJI TRIPPLE 25 :)
		click = click - 1
		document.querySelector('.active').children[8].children[click].style.opacity = "0"
		// FUNKCIJA ZA ODUZIMANJE BROJA STRELICA
		var hits = Number(e.target.getAttribute("data-value"))
		Array.from(document.getElementsByClassName('num')).forEach(function(elm, index) {
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
							if ( players.classList.contains('solo') ) {
								charge()
								// POZIV NA FUNKCIJU KOJA CE RASPOREDJIVATI NEGATIVNI REZULTAT
								elm.classList.add('full')
								// USLOV ZA POREPOZNAVANJE POPUNJENOG BROJA I PROSLEDJIVANJE VREDNOSTI OSTALIMA
							} else {
								teamCharge()
								elm.classList.add('team-full')
								if ( elm.classList.contains('team-full') ) {
									elm.parentElement.classList.add(""+elm.classList[1]+"-full")
								}
							}
						}
						if ( scoreCalculate >= 3 ) {
							return false
						} else {
							// if ( click == 0 ) {
							// 	nextPlayer()
							// }
							elm.children[scoreCalculate].classList.add('scored')
							if ( scoreCalculate <= 1 ) {
								elm.children[scoreCalculate+1].classList.add('scored')
							} else {
								return false
							}

						}

					}
					// DODAVANJE DOUBLE VREDNOSTI I SCORE-A
					if ( elm.parentElement.classList.contains('tripple') ) {
						elm.setAttribute('score-value', currentScoreValue + hits * 3)
						elm.parentElement.classList.remove('tripple')
						document.querySelector('.tripple').classList.remove('tripple-active')
						if ( elm.getAttribute('score-value') >= hits * 3 ) {
							if ( players.classList.contains('solo') ) {
								charge()
								// POZIV NA FUNKCIJU KOJA CE RASPOREDJIVATI NEGATIVNI REZULTAT
								elm.classList.add('full')
								// USLOV ZA POREPOZNAVANJE POPUNJENOG BROJA I PROSLEDJIVANJE VREDNOSTI OSTALIMA
							} else {
								teamCharge()
								elm.classList.add('team-full')
								if ( elm.classList.contains('team-full') ) {
									elm.parentElement.classList.add(""+elm.classList[1]+"-full")
								}
							}
							boom()
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
							if ( players.classList.contains('solo') ) {
								charge()
								// POZIV NA FUNKCIJU KOJA CE RASPOREDJIVATI NEGATIVNI REZULTAT
								elm.classList.add('full')
								// USLOV ZA POREPOZNAVANJE POPUNJENOG BROJA I PROSLEDJIVANJE VREDNOSTI OSTALIMA
							} else {
								teamCharge()
								elm.classList.add('team-full')
								if ( elm.classList.contains('team-full') ) {
									elm.parentElement.classList.add(""+elm.classList[1]+"-full")
								}
							}
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
			function teamCharge() {
				var teamMate = elm.parentElement.classList[1]
				var elmTeam = elm.parentElement.classList[1]
				if ( !elm.classList.contains('team-full') ) {
					sscoreDifference = elm.getAttribute('score-value') - hits * 3
					for ( var o = 0; o < document.getElementsByClassName(""+eachScoreNumber+"").length; o++ ) {
						var playerElo = document.getElementsByClassName(""+eachScoreNumber+"")[o]
						var playerEloCurrent = Number(playerElo.parentElement.children[7].innerHTML)
						if ( !playerElo.classList.contains('team-full') && !playerElo.parentElement.classList.contains("" +teamMate+ "") ) {
							// USLOV DA SE IGNORISE TIMSKI IGRAC
							if ( !document.getElementsByClassName("" + elmTeam + "")[0].classList.contains(""+elm.classList[1]+"-full") && document.getElementsByClassName("" + elmTeam + "")[1].classList.contains(""+elm.classList[1]+"-full") || document.getElementsByClassName("" + elmTeam + "")[0].classList.contains(""+elm.classList[1]+"-full") && !document.getElementsByClassName("" + elmTeam + "")[1].classList.contains(""+elm.classList[1]+"-full") ) {
								// USLOV ZA DODAVANJE VIZUELNOG REZULTATA PRE NEGO STO TIM IMA POPUNJEN BROJ, JEBOTEEEE!
								if ( playerElo.parentElement.children[7] == elm.parentElement.children[7] ) {
									elm.parentElement.children[7].innerHTML = elm.parentElement.children[7].getAttribute('score-value')
								}
								// USLOV ZA TACAN REZULTAT AKTIVNOG IGRACA
								else {
									playerElo.parentElement.children[7].setAttribute('score-value', playerEloCurrent + sscoreDifference)
									playerElo.parentElement.children[7].innerHTML = playerEloCurrent + sscoreDifference
									document.querySelector('.team-one').innerHTML = Number(document.getElementsByClassName('player')[0].children[7].getAttribute('score-value')) + Number(document.getElementsByClassName('player')[2].children[7].getAttribute('score-value'))
									document.querySelector('.team-two').innerHTML = Number(document.getElementsByClassName('player')[1].children[7].getAttribute('score-value')) + Number(document.getElementsByClassName('player')[3].children[7].getAttribute('score-value'))
								}
								// PROMENA REZULTATA U SLUCAJU DOUBLE PREKO NULE
							} else {
								return false
							}
						}
					}
					sscoreDifference = 0
				}
				else {
					for ( var p = 0; p < document.getElementsByClassName(""+eachScoreNumber+"").length; p++ ) {
						// LOOPOVANJE KROZ SVE KLASE NA STRANI IGRACA ZA SELEKTOVANI BROJ I SELEKTOVANJE SEKUNDARNE KLASE
						var playerEl = document.getElementsByClassName(""+eachScoreNumber+"")[p]
						var newCurrentScoreValue = elm.getAttribute('score-value') -  currentScoreValue
						var negativeValue = Number(playerEl.parentElement.children[7].getAttribute('score-value'))
						if ( !playerEl.classList.contains('team-full') && !playerEl.parentElement.classList.contains("" +teamMate+ "") ) {
							// USLOV DA SE IGNORISE TIMSKI IGRAC
							if ( document.getElementsByClassName("" + elmTeam + "")[0].classList.contains(""+elm.classList[1]+"-full") && document.getElementsByClassName("" + elmTeam + "")[1].classList.contains(""+elm.classList[1]+"-full") ) {
								// USLOV ZA RACUNANJE KAD TIM IMA POPUNJEN BROJ
								if ( elm.getAttribute('score-value') == 3 * hits ) {
									return false
								}
								// USLOV ZA PREVENCIJU DODAVANJA SCOREA AKO SE POPUNI DOUBLEOM
								else {
									playerEl.parentElement.children[7].setAttribute('score-value', negativeValue + newCurrentScoreValue + sscoreDifference)
									playerEl.parentElement.children[7].innerHTML = negativeValue + newCurrentScoreValue +sscoreDifference
									document.querySelector('.team-one').innerHTML = Number(document.getElementsByClassName('player')[0].children[7].getAttribute('score-value')) + Number(document.getElementsByClassName('player')[2].children[7].getAttribute('score-value'))
									document.querySelector('.team-two').innerHTML = Number(document.getElementsByClassName('player')[1].children[7].getAttribute('score-value')) + Number(document.getElementsByClassName('player')[3].children[7].getAttribute('score-value'))
								}
							// USLOV ZA DODAVANJE NEGATIVNOG REZULTATA SVIM IGRACIMA KOJI NEMAJU POPUNJENU VREDNOST
							} else {
								return false
							}
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
		// ending()
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
		round()
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
// FUNKCIJA ZA DODAVANJE STRELICA
var roundsc = 1
document.querySelector('#round').innerHTML = roundsc
function round() {
	roundsc = roundsc + 1
	document.querySelector('#round').innerHTML = roundsc
}
// FUNKCIJA ZA DODAVANJE RUNDI
function boom() {
	document.querySelector('#site-container').classList.add('shake')
	setTimeout(function(){
		document.querySelector('#site-container').classList.remove('shake')
	}, 300)
}
// BOOOM!
function ending() {
	for ( var pl = 0; pl < player.length; pl++ ) {
		var parent = player[pl]
		var parentHasClass = player[pl].getElementsByClassName("full").length
		var hasFull = player[pl].getAttribute("data-full")
		var max = player[0].getAttribute("data-full")
		parent.setAttribute('data-full', parentHasClass)
		if ( parentHasClass == 7 ) {
			document.querySelector('.victory-overlay').style.display = "flex"
			document.querySelector('.victory-message').innerHTML = ""+parent.classList[1]+" has won!"
		}
	}
	if ( Number(document.getElementById('round').innerHTML) > 20 ) {
		alert("Noone won!")
	}
}





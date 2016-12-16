import Stanzas from '../Stanzas.js'

export default class EditorScene {
	constructor(target = '.editorScene', themeChoice, rhymeChoice = 'AABB', verseChoice = 8) {

		this.ua = navigator.userAgent;
		this.isMobile = /IEMobile|Windows Phone|Lumia/i.test(this.ua) ? 'w' : /iPhone|iP[oa]d/.test(this.ua) ? 'i' : /Android/.test(this.ua) ? 'a' : /BlackBerry|PlayBook|BB10/.test(this.ua) ? 'b' : /Mobile Safari/.test(this.ua) ? 's' : /webOS|Mobile|Tablet|Opera Mini|\bCrMo\/|Opera Mobi/i.test(this.ua) ? 1 : 0;
		this.isTablet = /Tablet|iPad/i.test(this.ua);

		// console.log('START: EditorScene');
		this.themeChoice = themeChoice
		this.rhymeChoice = rhymeChoice
		this.verseChoice = verseChoice

		this.editor = document.querySelector(target)
		this.stanzasList = this.editor.querySelector('.editorScene__stanzasList')
		this.stanzas = this.stanzasList.querySelectorAll('.editorScene__stanzas')
		this.line = this.stanzasList.querySelectorAll('.editorScene__line')
		this.input = this.stanzasList.querySelectorAll('.editorScene__lineInput')

		this.moreButton = this.editor.querySelector('.editorScene__moreStanzasButton')
		this.progressBar = document.querySelector('.progressionBar')

		this.lineCount = this.input.length
		// State //
		this.focusLineIndex = -1
		this.isFocused = false
		this.nextStatus = false

		this.lastStanzasIndex = this.stanzas.length - 1
		this.animationTextCloud()
		this.initStanzasObject()
		this.addEventOnNewElem()
		this.applyTransformOnEditor(0)
	}

	animationTextCloud() {
		let themeChoice = this.themeChoice;
		console.log(themeChoice);
		let cloud1 = document.querySelector('.editorScene__cloud1');
		let cloud2 = document.querySelector('.editorScene__cloud2');
		let cloud3 = document.querySelector('.editorScene__cloud3');
		let cloud4 = document.querySelector('.editorScene__cloud4');
		let arrayNature = ["Saisons","Animaux","Fleurs","Verdure","Légumes","Fruits","Plage","Forêt","Montagne","Arbre"];

		let arrayEcole = ["Cartable","Maîtresse","Stylo","Craie","Tableaux","Devoirs","Copie","Bureaux","Ecriture"];

		let arrayCiel = ["Nuage","Soleil","Oiseaux","Espace","Avions","Fusée","Orage","Bleu","Pluie","Neige"];

		let arrayTerre = ["Vers","Herbe","Forêt","Jardin","Arbre","Fleur","Terreau","Taupe","Monde","Agriculture"];

		let arrayFamille = ["Papa","Maman","Frères","Soeurs","Enfants","Bébé","Grands-parents","Maison","Oncle","Tante"];

		let arrayNoel = ["Fête","Cadeaux","La joie","Chocolat","Père Noël","Pain d'épice","Sapin","Bûche","La neige"];

		let arrayAutomne = ["Feuille","Rouge","Couleurs","Froidure","Echarpe","Halloween","Rhume","Chocolat chaud","Gateaux"];

		if (themeChoice == "nature") {
			let randomArrayNature = arrayNature[Math.floor(Math.random() * arrayNature.length)];
			cloud1.insertAdjacentHTML('afterbegin', '<p class="editorScene__cloud--text">'+ randomArrayNature +'</p>');
			let randomArrayNature2 = arrayNature[Math.floor(Math.random() * arrayNature.length)];
			cloud2.insertAdjacentHTML('afterbegin', '<p class="editorScene__cloud--text">'+ randomArrayNature2 +'</p>');
			let randomArrayNature3 = arrayNature[Math.floor(Math.random() * arrayNature.length)];
			cloud3.insertAdjacentHTML('afterbegin', '<p class="editorScene__cloud--text">'+ randomArrayNature3 +'</p>');
			let randomArrayNature4 = arrayNature[Math.floor(Math.random() * arrayNature.length)];
			cloud4.insertAdjacentHTML('afterbegin', '<p class="editorScene__cloud--text">'+ randomArrayNature4 +'</p>');
		} else if (themeChoice == "ecole") {
			let randomArrayEcole = arrayEcole[Math.floor(Math.random() * arrayEcole.length)];
			cloud1.insertAdjacentHTML('afterbegin', '<p class="editorScene__cloud--text">'+ randomArrayEcole +'</p>');
			let randomArrayEcole2 = arrayEcole[Math.floor(Math.random() * arrayEcole.length)];
			cloud2.insertAdjacentHTML('afterbegin', '<p class="editorScene__cloud--text">'+ randomArrayEcole2 +'</p>');
			let randomArrayEcole3 = arrayEcole[Math.floor(Math.random() * arrayEcole.length)];
			cloud3.insertAdjacentHTML('afterbegin', '<p class="editorScene__cloud--text">'+ randomArrayEcole3 +'</p>');
			let randomArrayEcole4 = arrayEcole[Math.floor(Math.random() * arrayEcole.length)];
			cloud4.insertAdjacentHTML('afterbegin', '<p class="editorScene__cloud--text">'+ randomArrayEcole4 +'</p>');
		} else if (themeChoice == "ciel") {
			let randomArrayCiel = arrayCiel[Math.floor(Math.random() * arrayCiel.length)];
			cloud1.insertAdjacentHTML('afterbegin', '<p class="editorScene__cloud--text">'+ randomArrayCiel +'</p>');
			let randomArrayCiel2 = arrayCiel[Math.floor(Math.random() * arrayCiel.length)];
			cloud2.insertAdjacentHTML('afterbegin', '<p class="editorScene__cloud--text">'+ randomArrayCiel2 +'</p>');
			let randomArrayCiel3 = arrayCiel[Math.floor(Math.random() * arrayCiel.length)];
			cloud3.insertAdjacentHTML('afterbegin', '<p class="editorScene__cloud--text">'+ randomArrayCiel3 +'</p>');
			let randomArrayCiel4 = arrayCiel[Math.floor(Math.random() * arrayCiel.length)];
			cloud4.insertAdjacentHTML('afterbegin', '<p class="editorScene__cloud--text">'+ randomArrayCiel4 +'</p>');
		} else if (themeChoice == "terre") {
			let randomArrayTerre = arrayTerre[Math.floor(Math.random() * arrayTerre.length)];
			cloud1.insertAdjacentHTML('afterbegin', '<p class="editorScene__cloud--text">'+ randomArrayTerre +'</p>');
			let randomArrayTerre2 = arrayTerre[Math.floor(Math.random() * arrayTerre.length)];
			cloud2.insertAdjacentHTML('afterbegin', '<p class="editorScene__cloud--text">'+ randomArrayTerre2 +'</p>');
			let randomArrayTerre3 = arrayTerre[Math.floor(Math.random() * arrayTerre.length)];
			cloud3.insertAdjacentHTML('afterbegin', '<p class="editorScene__cloud--text">'+ randomArrayTerre3 +'</p>');
			let randomArrayTerre4 = arrayTerre[Math.floor(Math.random() * arrayTerre.length)];
			cloud4.insertAdjacentHTML('afterbegin', '<p class="editorScene__cloud--text">'+ randomArrayTerre4 +'</p>');
		} else if (themeChoice == "famille") {
			let randomArrayFamille = arrayFamille[Math.floor(Math.random() * arrayFamille.length)];
			cloud1.insertAdjacentHTML('afterbegin', '<p class="editorScene__cloud--text">'+ randomArrayFamille +'</p>');
			let randomArrayFamille2 = arrayFamille[Math.floor(Math.random() * arrayFamille.length)];
			cloud2.insertAdjacentHTML('afterbegin', '<p class="editorScene__cloud--text">'+ randomArrayFamille2 +'</p>');
			let randomArrayFamille3 = arrayFamille[Math.floor(Math.random() * arrayFamille.length)];
			cloud3.insertAdjacentHTML('afterbegin', '<p class="editorScene__cloud--text">'+ randomArrayFamille3 +'</p>');
			let randomArrayFamille4 = arrayFamille[Math.floor(Math.random() * arrayFamille.length)];
			cloud4.insertAdjacentHTML('afterbegin', '<p class="editorScene__cloud--text">'+ randomArrayFamille4 +'</p>');
		} else if (themeChoice == "noel") {
			let randomArrayNoel = arrayNoel[Math.floor(Math.random() * arrayNoel.length)];
			cloud1.insertAdjacentHTML('afterbegin', '<p class="editorScene__cloud--text">'+ randomArrayNoel +'</p>');
			let randomArrayNoel2 = arrayNoel[Math.floor(Math.random() * arrayNoel.length)];
			cloud2.insertAdjacentHTML('afterbegin', '<p class="editorScene__cloud--text">'+ randomArrayNoel2 +'</p>');
			let randomArrayNoel3 = arrayNoel[Math.floor(Math.random() * arrayNoel.length)];
			cloud3.insertAdjacentHTML('afterbegin', '<p class="editorScene__cloud--text">'+ randomArrayNoel3 +'</p>');
			let randomArrayNoel4 = arrayNoel[Math.floor(Math.random() * arrayNoel.length)];
			cloud4.insertAdjacentHTML('afterbegin', '<p class="editorScene__cloud--text">'+ randomArrayNoel4 +'</p>');
		} else if (themeChoice == "automne") {
			let randomArrayAutomne = arrayAutomne[Math.floor(Math.random() * arrayAutomne.length)];
			cloud1.insertAdjacentHTML('afterbegin', '<p class="editorScene__cloud--text">'+ randomArrayAutomne +'</p>');
			let randomArrayAutomne2 = arrayAutomne[Math.floor(Math.random() * arrayAutomne.length)];
			cloud2.insertAdjacentHTML('afterbegin', '<p class="editorScene__cloud--text">'+ randomArrayAutomne2 +'</p>');
			let randomArrayAutomne3 = arrayAutomne[Math.floor(Math.random() * arrayAutomne.length)];
			cloud3.insertAdjacentHTML('afterbegin', '<p class="editorScene__cloud--text">'+ randomArrayAutomne3 +'</p>');
			let randomArrayAutomne4 = arrayAutomne[Math.floor(Math.random() * arrayAutomne.length)];
			cloud4.insertAdjacentHTML('afterbegin', '<p class="editorScene__cloud--text">'+ randomArrayAutomne4 +'</p>');
		} else if (themeChoice == "vacance") {
			let randomArrayAutomne = arrayVacance[Math.floor(Math.random() * arrayVacance.length)];
			cloud1.insertAdjacentHTML('afterbegin', '<p class="editorScene__cloud--text">'+ randomArrayVacance +'</p>');
			let randomArrayVacance2 = arrayVacance[Math.floor(Math.random() * arrayVacance.length)];
			cloud2.insertAdjacentHTML('afterbegin', '<p class="editorScene__cloud--text">'+ randomArrayVacance2 +'</p>');
			let randomArrayVacance3 = arrayVacance[Math.floor(Math.random() * arrayVacance.length)];
			cloud3.insertAdjacentHTML('afterbegin', '<p class="editorScene__cloud--text">'+ randomArrayVacance3 +'</p>');
			let randomArrayVacance4 = arrayVacance[Math.floor(Math.random() * arrayVacance.length)];
			cloud4.insertAdjacentHTML('afterbegin', '<p class="editorScene__cloud--text">'+ randomArrayVacance4 +'</p>');
		} else if (themeChoice == "animaux") {
			let randomArrayAnimaux = arrayAnimaux[Math.floor(Math.random() * arrayAnimaux.length)];
			cloud1.insertAdjacentHTML('afterbegin', '<p class="editorScene__cloud--text">'+ randomArrayAnimaux +'</p>');
			let randomArrayAnimaux2 = arrayAnimaux[Math.floor(Math.random() * arrayAnimaux.length)];
			cloud2.insertAdjacentHTML('afterbegin', '<p class="editorScene__cloud--text">'+ randomArrayAnimaux2 +'</p>');
			let randomArrayAnimaux3 = arrayAnimaux[Math.floor(Math.random() * arrayAnimaux.length)];
			cloud3.insertAdjacentHTML('afterbegin', '<p class="editorScene__cloud--text">'+ randomArrayAnimaux3 +'</p>');
			let randomArrayAnimaux4 = arrayAnimaux[Math.floor(Math.random() * arrayAnimaux.length)];
			cloud4.insertAdjacentHTML('afterbegin', '<p class="editorScene__cloud--text">'+ randomArrayAnimaux4 +'</p>');
		}
	}

	addEventOnNewElem() {
		const _ = this
		const ind = this.lineCount - 1

		this.input[ind].addEventListener('focus', function() {
			_.isFocused = true
			_.setFocusState(this)
			const ind = _.getIndexOf(this)
			_.applyTransformOnEditor(ind)

			if (_.isMobile || _.isTablet) {
				_.progressBar.classList.add('progressionBar--hide')
			}
		})
		this.input[ind].addEventListener('blur', function() {
			_.isFocused = false
			_.unsetFocusState()

			if (_.isMobile || _.isTablet) {
				_.progressBar.classList.remove('progressionBar--hide')
			}
		})

		this.input[ind].addEventListener('keydown', function(evt) {
			_.keyEvents(evt)
		})

		this.input[ind].addEventListener('keyup', function(evt) {
			_.checkEditor()
		})
		return this
	}

	initStanzasObject() {
		for (var i = 0; i < this.stanzas.length; i++) {
			this.stanzas[i].custom = new Stanzas(this.stanzas[i], this.rhymeChoice, this.verseChoice)
		}
	}

	keyEvents(evt) {
		const key = {
			'IS_ENTER': evt.keyCode === 13
		}
		if (key.IS_ENTER) {
			evt.preventDefault()

			if (this.lineCount % 4 !== 0) {
				this.stanzas[this.lastStanzasIndex].custom.createLine()
				this.updateData()
				.addEventOnNewElem()
				.focusOnNewElem()
			}
		}
	}

	checkEditor() {
		if (this.lineCount === 4) {
			if (this.checkSyllableCount()) {
				this.nextStatus = this.stanzas[0].custom.Rhyme.rhymeIsValid

				return
			}
		}

		this.nextStatus = false
	}

	checkSyllableCount() {
		for (var i = 0; i < this.stanzas[0].custom.input.length; i++) {
			if (this.stanzas[0].custom.input[i].Syllable.count != this.verseChoice) {
				return false
			}
		}

		return true
	}

	applyTransformOnEditor(index) {
		const windowPosY = window.innerHeight / 2
		const elem = this.line[index].getBoundingClientRect()
		const elemPosY = elem.top + (elem.height / 2)
		const delta = windowPosY - elemPosY

		let currentTransform = this.stanzasList.style.transform
		currentTransform = currentTransform.replace('translateY(', '')
		currentTransform = currentTransform.replace('px)', '')
		currentTransform = Number(currentTransform)

		const offset = currentTransform + delta
		this.stanzasList.style.transform = 'translateY('+offset+'px)'
	}

	setFocusState(elem) {
		const line = elem.parentNode

		for (var i = 0; i < this.line.length; i++) {
			this.line[i].classList.remove('editorScene__line--selected')
		}

		line.classList.add('editorScene__line--selected')
	}

	unsetFocusState() {
		for (var i = 0; i < this.line.length; i++) {
			this.line[i].classList.remove('editorScene__line--selected')
		}
	}

	updateData() {
		this.input = this.stanzasList.querySelectorAll('.editorScene__lineInput')
		this.line = this.stanzasList.querySelectorAll('.editorScene__line')
		this.lineCount = this.input.length
		return this
	}

	updateParam(themeChoice, rhymeChoice, verseChoice) {
		this.themeChoice = themeChoice
		this.rhymeChoice = rhymeChoice
		this.verseChoice = verseChoice

		for (var i = 0; i < this.stanzas.length; i++) {
			this.stanzas[i].custom.updateParam(
				rhymeChoice,
				verseChoice
			)
		}
	}

	focusOnNewElem() {
		const ind = this.lineCount - 1

		this.input[ind].focus()
	}

	getIndexOf(node) {
		for (var i = 0; i < this.input.length; i++) {
			if (this.input[i] == document.activeElement) {
				return i
			}
		}
	}
}

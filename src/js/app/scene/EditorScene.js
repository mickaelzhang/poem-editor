import Stanzas from '../Stanzas.js'

export default class EditorScene {
	constructor(target = '.editorScene', themeChoice, rhymeChoice = 'AABB', verseChoice = 8) {
		// console.log('START: EditorScene');
		this.themeChoice = themeChoice
		this.rhymeChoice = rhymeChoice
		this.verseChoice = verseChoice

// console.log(this.themeChoice);
		this.editor = document.querySelector(target)
		this.stanzasList = this.editor.querySelector('.editorScene__stanzasList')
		this.stanzas = this.stanzasList.querySelectorAll('.editorScene__stanzas')
		this.line = this.stanzasList.querySelectorAll('.editorScene__line')
		this.input = this.stanzasList.querySelectorAll('.editorScene__lineInput')

		this.moreButton = this.editor.querySelector('.editorScene__moreStanzasButton')

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

		if (themeChoice == "NATURE") {

		} else if (themeChoice == "ÉCOLE") {

		} else if (themeChoice == "CIEL") {

		} else if (themeChoice == "TERRE") {

		} else if (themeChoice == "FAMILLE") {

		} else if (themeChoice == "NOËL") {

		} else if (themeChoice == "AUTOMNE") {

		} else if (themeChoice == "VACANCES") {

		} else if (themeChoice == "ANIMAUX") {

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
		})
		this.input[ind].addEventListener('blur', function() {
			_.isFocused = false
			_.unsetFocusState()
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

import Stanzas from '../Stanzas.js'

export default class EditorScene {
	constructor(target = '.editorScene', themeChoice = '', rhymeChoice = 'AABB', verseChoice = 8) {
		this.themeChoice = themeChoice
		this.rhymeChoice = rhymeChoice
		this.verseChoice = verseChoice

		this.editor = document.querySelector(target)
		this.stanzasList = this.editor.querySelector('.editorScene__stanzasList')
		this.stanzas = this.stanzasList.querySelectorAll('.editorScene__stanzas')
		this.line = this.stanzasList.querySelectorAll('.editorScene__line')
		this.input = this.stanzasList.querySelectorAll('.editorScene__lineInput')

		this.moreButton = this.editor.querySelector('.editorScene__moreStanzasButton')

		this.lineCount = this.input.length
		// State //
		this.isFocused = false

		this.lastStanzasIndex = this.stanzas.length - 1

		this.initStanzasObject()
		this.addEventOnNewElem()
	}

	addEventOnNewElem() {
		const _ = this
		const ind = this.lineCount - 1

		this.input[ind].addEventListener('focus', function() {
			_.isFocused = true
			_.setFocusState(this)
		})
		this.input[ind].addEventListener('blur', function() {
			_.isFocused = false
		})

		this.input[ind].addEventListener('keydown', function(evt) {
			_.keyEvents(evt)
		})

		return this
	}

	initStanzasObject() {
		for (var i = 0; i < this.stanzas.length; i++) {
			this.stanzas[i].custom = new Stanzas(this.stanzas[i], this.rhymeChoice)
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

	setFocusState(elem) {
		const line = elem.parentNode

		for (var i = 0; i < this.line.length; i++) {
			this.line[i].classList.remove('editorScene__line--selected')
		}

		line.classList.add('editorScene__line--selected')

		// console.log(this.input[ind]);
		//
		// for (var i = 0; i < this.input.length; i++) {
		// 	this.input[i].classList.remove('.editorScene__lineInput--selected')
		// }
		//
		// this.input[ind].classList.add('.editorScene__lineInput--selected')
	}

	updateData() {
		this.input = this.stanzasList.querySelectorAll('.editorScene__lineInput')
		this.line = this.stanzasList.querySelectorAll('.editorScene__line')
		this.lineCount = this.input.length
		return this
	}

	focusOnNewElem() {
		const ind = this.lineCount - 1

		this.input[ind].focus()
	}
}

import Syllable from './Syllable.js'
import Rhyme from './Rhyme.js'

export default class Stanzas {
	constructor(elem, rhymeChoice, syllableNb) {
		this.rhymeChoice = rhymeChoice
		this.syllableNb = syllableNb

		this.stanzas = elem
		this.input = this.stanzas.querySelectorAll('.editorScene__lineInput')
		this.syllableCount = this.stanzas.querySelectorAll('.editorScene__syllableCount')
		this.rhymeType = this.stanzas.querySelectorAll('.editorScene__rhymeType')
		this.lineCount = this.input.length
		this.selectedInput = -1

		this.Rhyme = new Rhyme(this.rhymeChoice)

		this.addSyllableObject()
		this.addEvents()

		this.setDefaultSyllableNb()
	}

	addSyllableObject() {
		var ind = this.lineCount - 1
		this.input[ind].Syllable = new Syllable()
	}

	addEvents() {
		var _ = this
		var ind = this.lineCount - 1

		this.input[ind].addEventListener("focus", function() {
			_.selectedInput = _.getIndexOf(this)
		})
		this.input[ind].addEventListener("blur", function() {
			_.selectedInput = -1
		})
		this.input[ind].addEventListener("keyup", function() {
			_.updateSyllable()
		})
	}

	createLine() {
		const line = '<div class="editorScene__line"><div class="editorScene__syllableCount">'+this.syllableNb+'</div><input class="editorScene__lineInput"><div class="editorScene__rhymeType">'+this.rhymeChoice[this.lineCount]+'</div></div>'

		if (this.lineCount <= 4) {
			// Create new line
			this.stanzas.insertAdjacentHTML('beforeend', line)
			this.updateData()
		}
		return false
	}

	updateSyllable(ind = -1) {
		let i
		if (ind == -1) {
			i = this.selectedInput
		} else {
			i = ind
		}

		const inputValue = this.input[i].value
		this.input[i].Syllable.setString(inputValue)
		const syllableNb = this.input[i].Syllable.count

		// Update syllable count on the View
		this.updateSyllableCount(i, syllableNb)

		// Update syllable in Rhyme object to compare if its correct
		this.Rhyme.setInputSyllable(i, this.input[i].Syllable.lastSyllable)
	}

	updateSyllableCount(index, syllableCount) {
		this.syllableCount[index].innerHTML = this.syllableNb - syllableCount;
	}

	updateData() {
		this.input = this.stanzas.querySelectorAll('.editorScene__lineInput')
		this.syllableCount = this.stanzas.querySelectorAll('.editorScene__syllableCount')
		this.rhymeType = this.stanzas.querySelectorAll('.editorScene__rhymeType')

		this.lineCount = this.input.length
		this.addSyllableObject()
		this.addEvents()

		return this
	}

	updateParam(rhymeChoice, syllableNb) {
		this.rhymeChoice = rhymeChoice
		this.syllableNb = syllableNb

		this.Rhyme.updateRhymeChoice(rhymeChoice)

		for (var i = 0; i < this.input.length; i++) {
			this.updateSyllable(i)
			this.updateRhymeType(i)
		}
	}

	updateRhymeType() {
		for (var i = 0; i < this.rhymeType.length; i++) {
			this.rhymeType[i].innerHTML = this.rhymeChoice[i]
		}
	}

	getLineCount() {
		return this.lineCount
	}

	setDefaultSyllableNb() {
		for (var i = 0; i < this.syllableCount.length; i++) {
			this.syllableCount[i].innerHTML = this.syllableNb
		}
	}

	getIndexOf(node) {
		for (var i = 0; i < this.input.length; i++) {
			if (this.input[i] == document.activeElement) {
				return i
			}
		}
	}
}

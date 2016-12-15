import Syllable from './Syllable.js'
import Rhyme from './Rhyme.js'

export default class Stanzas {
	constructor(elem, rhymeChoice) {
		this.input = elem.querySelectorAll('.editorScene__lineInput')
		this.syllableCount = elem.querySelectorAll('.editorScene__syllableCount')
		this.selectedIndex = this.setSelectedIndex()
		this.rhymeChoice = rhymeChoice

		this.Rhyme = new Rhyme(this.rhymeChoice)

		this.addSyllableObject()
		this.initEvents()
	}

	addSyllableObject() {
		for (var i = 0; i < this.input.length; i++) {
			this.input[i].Syllable = new Syllable()
		}
	}

	/**
	 * function initEvents
	 */
	initEvents() {
		for (var i = 0; i < this.input.length; i++) {
			this.input[i].addEventListener("focus", evt => this.setSelectedIndex(evt))
			this.input[i].addEventListener("blur", evt => this.unsetSelectedIndex(evt))
			this.input[i].addEventListener("keyup", evt => this.inputKeyupAction(evt))
		}
	}

	/**
	 * function inputKeyupAction
	 */
	inputKeyupAction() {
		// If an input is selected, do this
		if (0 <= this.selectedIndex) {
			const i = this.selectedIndex
			const inputValue = this.input[i].value
			this.input[i].Syllable.setString(inputValue)
			const syllableNb = this.input[i].Syllable.count

			// Update syllable count on the View
			this.updateSyllableCount(i, syllableNb)

			// Update syllable in Rhyme object to compare if its correct
			this.Rhyme.setInputSyllable(i, this.input[i].Syllable.lastSyllable)
			console.log(this.Rhyme.inputLastRhyme);
		}
	}

	/**
	 * updateSyllableCount
	 */
	updateSyllableCount(index, syllableCount) {
		this.syllableCount[index].innerHTML = syllableCount;
	}

	/**
	 * function setInputIndex
	 * Set which input is selected
	 */
	setSelectedIndex() {
		for (var i = 0; i < this.input.length; i++) {
			if (this.input[i] == document.activeElement) {
				this.selectedIndex = i
				return
			}
		}
	}

	/**
	 * function unsetSelectedIndex
	 * Remove index and set it to -1
	 */
	unsetSelectedIndex() {
		this.selectedIndex = -1
	}
}

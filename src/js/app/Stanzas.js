import Syllable from './Syllable.js'

export default class Stanzas {
	constructor(elem) {
		console.log(elem);
		this.input = elem.querySelectorAll('.editorArea__lineInput')
		this.syllableCount = elem.querySelectorAll('.editorArea__syllableCount')
		this.selectedIndex = this.setSelectedIndex()

		this.addSyllableObject()
		this.initEvents()
	}

	addSyllableObject() {
		for (var i = 0; i < this.input.length; i++) {
			this.input[i].syllable = new Syllable()
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
			this.input[i].syllable.setString(inputValue)
			const syllableNb = this.input[i].syllable.count

			this.updateSyllableCount(i, syllableNb)
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

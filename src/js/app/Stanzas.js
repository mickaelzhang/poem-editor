import Syllable from './Syllable.js'
import Rhyme from './Rhyme.js'

export default class Stanzas {
	constructor(elem, rhymeChoice) {
		this.rhymeChoice = rhymeChoice

		this.stanzas = elem
		this.input = this.stanzas.querySelectorAll('.editorScene__lineInput')
		this.syllableCount = this.stanzas.querySelectorAll('.editorScene__syllableCount')

		this.lineCount = this.input.length

		this.Rhyme = new Rhyme(this.rhymeChoice)
	}

	createLine() {
		const line = '<div class="editorScene__line"><div class="editorScene__syllableCount">0</div><input class="editorScene__lineInput"><div class="editorScene__rhymeType">A</div></div>'

		if (this.lineCount <= 4) {
			// Create new line
			this.stanzas.insertAdjacentHTML('beforeend', line)
			this.updateData()
		}
		return false
	}

	updateData() {
		this.input = this.stanzas.querySelectorAll('.editorScene__lineInput')
		this.lineCount = this.input.length

		return this
	}

	getLineCount() {
		return this.lineCount
	}
}

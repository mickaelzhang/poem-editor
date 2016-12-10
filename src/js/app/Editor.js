import Stanzas from './Stanzas.js'

export default class Editor {
	constructor() {
		console.log('Start Editor.')

		this.editor = document.querySelectorAll('.editorArea')[0]
		this.stanzasContainer = this.editor.querySelectorAll('.editorArea__stanzasList')[0]
		this.stanzas = this.stanzasContainer.querySelectorAll('.editorArea__stanzas')
		this.moreButton = this.editor.querySelectorAll('.editorArea__moreStanzasButton')[0]

		for (var i = 0; i < this.stanzas.length; i++) {
			new Stanzas(this.stanzas[i])
		}

		this.initEvents()
	}

	initEvents() {
		this.moreButton.addEventListener('click', evt => this.addStanzas(evt))
	}

	addStanzas() {
		console.log('Add Stanzas');
	}
}

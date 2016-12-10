import Stanzas from './Stanzas.js'

export default class Editor {
	constructor() {
		console.log('Start Editor.')

		this.editor = document.querySelectorAll('.editorArea')[0]
		this.stanzasContainer = this.editor.querySelectorAll('.editorArea__stanzasList')[0]
		this.stanzas = this.stanzasContainer.querySelectorAll('.editorArea__stanzas')
		this.moreButton = this.editor.querySelectorAll('.editorArea__moreStanzasButton')[0]

		this.stanzasHTML = '<div class="editorArea__stanzas"><div class="editorArea__line"><div class="editorArea__countBorder"><span class="editorArea__syllableCount">0</span></div><input class="editorArea__lineInput"></div><div class="editorArea__line"><div class="editorArea__countBorder"><span class="editorArea__syllableCount">0</span></div><input class="editorArea__lineInput"></div><div class="editorArea__line"><div class="editorArea__countBorder"><span class="editorArea__syllableCount">0</span></div><input class="editorArea__lineInput"></div><div class="editorArea__line"><div class="editorArea__countBorder"><span class="editorArea__syllableCount">0</span></div><input class="editorArea__lineInput"></div></div></div>'

		this.stanzasNb = this.stanzas.length

		for (var i = 0; i < this.stanzas.length; i++) {
			new Stanzas(this.stanzas[i])
		}

		this.initEvents()
	}

	initEvents() {
		this.moreButton.addEventListener('click', evt => this.addStanzas(evt))
	}

	/**
	 * addStanzas
	 * Use when user click on more button, it generate a new stanzas
	 */
	addStanzas() {
		this.stanzasNb++
		this.stanzasContainer.insertAdjacentHTML('beforeend', this.stanzasHTML)
	}
}

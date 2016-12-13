import Stanzas from './Stanzas.js'

export default class Editor {
	constructor() {
		console.log('Start Editor.')

		this.editor = document.querySelector('.editorArea')
		this.stanzasContainer = this.editor.querySelector('.editorArea__stanzasList')
		this.stanzas = this.stanzasContainer.querySelectorAll('.editorArea__stanzas')
		this.moreButton = this.editor.querySelector('.editorArea__moreStanzasButton')
		this.nextSceneButton = this.editor.querySelector('.editorArea__nextSceneButton')

		this.stanzasHTML = '<div class="editorArea__stanzas"><div class="editorArea__line"><div class="editorArea__countBorder"><span class="editorArea__syllableCount">0</span></div><input class="editorArea__lineInput"></div><div class="editorArea__line"><div class="editorArea__countBorder"><span class="editorArea__syllableCount">0</span></div><input class="editorArea__lineInput"></div><div class="editorArea__line"><div class="editorArea__countBorder"><span class="editorArea__syllableCount">0</span></div><input class="editorArea__lineInput"></div><div class="editorArea__line"><div class="editorArea__countBorder"><span class="editorArea__syllableCount">0</span></div><input class="editorArea__lineInput"></div></div></div>'

		this.stanzasNb = this.stanzas.length

		for (var i = 0; i < this.stanzas.length; i++) {
			new Stanzas(this.stanzas[i])
		}

		this.initEvents()
	}

	initEvents() {
		this.moreButton.addEventListener('click', evt => this.addStanzas(evt))
		// this.nextSceneButton.addEventListener('click', evt => this.processDataNextScene(evt))
	}

	/**
	 * addStanzas
	 * Use when user click on more button, it generate a new stanzas
	 */
	addStanzas() {
		this.stanzasNb++
		this.stanzasContainer.insertAdjacentHTML('beforeend', this.stanzasHTML)
		this.updateStanzas()
	}

	/**
	 * updateStanzas
	 * Get all new element
	 */
	updateStanzas() {
		this.stanzas = this.stanzasContainer.querySelectorAll('.editorArea__stanzas')
		this.addLastStanzasEventListener()
	}

	/**
	 * addLastStanzasEventListener
	 * Add Stanzas object to new .editorArea__stanzas
	 */
	addLastStanzasEventListener() {
		const index = this.stanzasNb - 1
		new Stanzas(this.stanzas[index])
	}
}

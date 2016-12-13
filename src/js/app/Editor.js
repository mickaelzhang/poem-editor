import Stanzas from './Stanzas.js'

export default class Editor {
	constructor() {
		console.log('Start Editor.')

		this.editor = document.querySelector('.editorScene')
		this.stanzasContainer = this.editor.querySelector('.editorScene__stanzasList')
		this.stanzas = this.stanzasContainer.querySelectorAll('.editorScene__stanzas')
		this.moreButton = this.editor.querySelector('.editorScene__moreStanzasButton')
		this.nextSceneButton = this.editor.querySelector('.editorScene__nextSceneButton')

		this.stanzasHTML = '<div class="editorScene__stanzas"><div class="editorScene__line"><div class="editorScene__countBorder"><span class="editorScene__syllableCount">0</span></div><input class="editorScene__lineInput"></div><div class="editorScene__line"><div class="editorScene__countBorder"><span class="editorScene__syllableCount">0</span></div><input class="editorScene__lineInput"></div><div class="editorScene__line"><div class="editorScene__countBorder"><span class="editorScene__syllableCount">0</span></div><input class="editorScene__lineInput"></div><div class="editorScene__line"><div class="editorScene__countBorder"><span class="editorScene__syllableCount">0</span></div><input class="editorScene__lineInput"></div></div></div>'

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
		this.stanzas = this.stanzasContainer.querySelectorAll('.editorScene__stanzas')
		this.addLastStanzasEventListener()
	}

	/**
	 * addLastStanzasEventListener
	 * Add Stanzas object to new .editorScene__stanzas
	 */
	addLastStanzasEventListener() {
		const index = this.stanzasNb - 1
		new Stanzas(this.stanzas[index])
	}
}

export default class VerseScene {
	constructor(target) {
		// console.log('Start VerseScene.');
		this.target = document.querySelector(target)
		this.choiceItem = this.target.querySelectorAll('.verseScene__content')

		this.focusIndex = -1
		this.nextStatus = false
		this.verseSlug

		this.initEvents()
	}

	initEvents() {
		let _ = this

		for (var i = 0; i < this.choiceItem.length; i++) {
			this.choiceItem[i].addEventListener('click', function() {
				_.setSelectedRhyme(this)
			})
		}
	}

	setSelectedRhyme(elem) {
		this.setRhymeIndex(elem).setNextStatus(true)
	}

	setRhymeIndex(elem) {
		for (var i = 0; i < this.choiceItem.length; i++) {
			if (this.choiceItem[i] == elem) {
				// Set which element is selected
				this.focusIndex = i

				// Set choice slug
				this.verseSlug = elem.getAttribute('data-ref')

				return this
			}
		}
	}

	setNextStatus(bool) {
		this.nextStatus = bool
		return this
	}
}

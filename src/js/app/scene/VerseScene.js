export default class VerseScene {
	constructor(target) {
		// console.log('Start VerseScene.');
		this.target = document.querySelector(target)
		this.verseList = this.target.querySelector('.verseScene__verseList')
		this.verseItem = this.target.querySelectorAll('.verseScene__verseItem')

		this.focusIndex = -1
		this.nextStatus = false
		this.verseSlug

		this.initEvents()
	}

	initEvents() {
		let _ = this

		for (var i = 0; i < this.verseItem.length; i++) {
			this.verseItem[i].addEventListener('click', function() {
				_.setSelectedRhyme(this)
			})
		}
	}

	setSelectedRhyme(elem) {
		this.setRhymeIndex(elem).setNextStatus(true)
	}

	setRhymeIndex(elem) {
		for (var i = 0; i < this.verseItem.length; i++) {
			if (this.verseItem[i] == elem) {
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

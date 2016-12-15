export default class VerseScene {
	constructor(target) {
		// console.log('Start VerseScene.');
		this.target = document.querySelector(target)
		this.verseList = this.target.querySelector('.verseScene__verseList')
		this.verseItem = this.target.querySelectorAll('.verseScene__verseItem')

		this.numberText = this.target.querySelector('.verseScene__number')
		this.example = this.target.querySelectorAll('.verseScene__example')

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
		this.setRhymeIndex(elem)
		.setNextStatus(true)
		.applyStyle(elem)
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

	applyStyle(elem) {
		for (var i = 0; i < this.verseItem.length; i++) {
			this.verseItem[i].classList.remove('secondaryButton--selected')
			this.example[i].classList.remove('verseScene__example--selected')
		}

		this.verseItem[this.focusIndex].classList.add('secondaryButton--selected')
		this.example[this.focusIndex].classList.add('verseScene__example--selected')
		console.log(this.numberText);
		this.numberText.innerHTML = this.verseSlug
	}

	setNextStatus(bool) {
		this.nextStatus = bool
		return this
	}
}

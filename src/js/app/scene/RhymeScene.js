export default class RhymeScene {
	constructor(target) {
		// console.log('Start RhymeScene.');

		this.target = document.querySelector(target)
		this.choiceItem = this.target.querySelectorAll('.rhymeScene__content')

		this.focusIndex = -1
		this.nextStatus = false

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
		this.setRhymeIndex(elem)
	}

	setRhymeIndex(elem) {
		for (var i = 0; i < this.choiceItem.length; i++) {
			if (this.choiceItem[i] == elem) {
				// Set which element is selected
				this.focusIndex = i

				// Set nextButton state for this page
				this.nextStatus = true
				return
			}
		}
	}
}

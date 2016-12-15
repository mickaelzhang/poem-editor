export default class RhymeScene {
	constructor(target) {
		// console.log('Start RhymeScene.');

		this.target = document.querySelector(target)
		this.rhymeList = this.target.querySelector('.rhymeScene__rhymeList')
		this.rhymeItem = this.rhymeList.querySelectorAll('.rhymeScene__rhymeItem')

		this.focusIndex = -1
		this.nextStatus = false
		this.rhymeSlug

		this.initEvents()
	}

	initEvents() {
		let _ = this

		for (var i = 0; i < this.rhymeItem.length; i++) {
			this.rhymeItem[i].addEventListener('click', function() {
				_.setSelectedRhyme(this)
			})
		}
	}

	setSelectedRhyme(elem) {
		this.setRhymeIndex(elem)
	}

	setRhymeIndex(elem) {
		for (var i = 0; i < this.rhymeItem.length; i++) {
			if (this.rhymeItem[i] == elem) {
				// Set which element is selected
				this.focusIndex = i

				// Set slug
				this.rhymeSlug = elem.getAttribute('data-ref')

				// Set nextButton state for this page
				this.nextStatus = true
				return
			}
		}
	}
}

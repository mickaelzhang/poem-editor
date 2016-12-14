export default class ThemeScene {
	constructor(target) {
		// console.log('Start ThemeScene.');
		this.target = document.querySelector(target)
		this.themeCard = this.target.querySelectorAll('.themeScene__themeCard')

		this.focusIndex = -1
		this.nextStatus = false

		this.initEvents()
	}

	initEvents() {
		const _ = this

		for (var i = 0; i < this.themeCard.length; i++) {
			this.themeCard[i].addEventListener('click', function() {
				_.setFocusedTheme(this)
			})
		}
	}

	getNextStatus() {
		return this.nextStatus
	}

	setNextStatus(bool) {
		this.nextStatus = true

		return this
	}

	setFocusedTheme(elem) {
		this.getFocusedTheme(elem)
		this.removeFocusState()
		this.addFocusState(this.focusIndex)
	}

	getFocusedTheme(elem) {
		for (var i = 0; i < this.themeCard.length; i++) {
			if (this.themeCard[i] == elem) {
				this.focusIndex = i
				return
			}
		}
	}

	removeFocusState() {
		for (var i = 0; i < this.themeCard.length; i++) {
			this.themeCard[i].classList.remove('themeScene__themeCard--focus')
		}
	}

	addFocusState(i) {
		this.themeCard[i].classList.add('themeScene__themeCard--focus')
		this.setNextStatus(true)
	}
}

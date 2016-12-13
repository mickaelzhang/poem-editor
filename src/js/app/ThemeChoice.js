export default class ThemeChoice {
	constructor() {
		console.log('ThemeChoice');
		this.themeCard = document.querySelectorAll('.themeScene__themeCard')
		this.focusIndex = -1

		this.initEvents()
	}

	initEvents() {
		const _ = this

		for (var i = 0; i < this.themeCard.length; i++) {
			this.themeCard[i].addEventListener('click', function() {
				_.setFocusedTheme(this)
			}, false)
		}
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
			console.log();
			this.themeCard[i].classList.remove('themeScene__themeCard--focus')
		}
	}

	addFocusState(i) {
		console.log(i);
		this.themeCard[i].className += ' themeScene__themeCard--focus'
	}
}

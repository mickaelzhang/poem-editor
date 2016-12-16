import EditorScene from './EditorScene'
export default class ThemeScene {
	constructor(target) {
		this.target = document.querySelector(target)
		this.themeList = this.target.querySelector('.themeScene__themeList')
		this.themeCloud = this.target.querySelectorAll('.themeScene__themeCloud')
		this.themeSign = document.querySelectorAll('.st34')
		this.theme = document.querySelector('.theme_sign')
		this.focusIndex = -1
		this.nextStatus = false
		this.themeSlug

		this.initEvents()
	}

	initEvents() {
		let _ = this

		for (var i = 0; i < this.themeCloud.length; i++) {
			this.themeCloud[i].addEventListener('click', function() {
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
		for (var i = 0; i < this.themeCloud.length; i++) {
			if (this.themeCloud[i] == elem) {
				this.focusIndex = i
				this.themeSlug = elem.getAttribute('data-ref')
				return
			}
		}
	}

	removeFocusState() {
		for (var i = 0; i < this.themeCloud.length; i++) {
			this.themeCloud[i].classList.remove('themeCloud--selected')
			this.themeSign[i].classList.add('st34')
		}
	}

	addFocusState(i) {
		this.themeCloud[i].classList.add('themeCloud--selected')
		this.themeSign[i].classList.remove('st34')
		this.theme.style = "display:none"
		this.setNextStatus(true)
		// let currentThemeSign = this.themeSign[i].innerHTML;
		// let themeChoice = new EditorScene(currentThemeSign)
	}
}

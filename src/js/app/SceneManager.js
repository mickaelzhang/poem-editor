import Slider from './Slider'
import ThemeScene from './scene/ThemeScene'
import RhymeScene from './scene/RhymeScene'
import VerseScene from './scene/VerseScene'
import EditorScene from './scene/EditorScene'

export default class SceneManager {
	constructor() {
		this.currentScene = 0
		this.nextButton = document.querySelector('.nextButton')

		this.loadSceneObject()

		this.target = document.querySelector('.jeu__content')
		this.navBar = this.target.querySelector('.jeu__navBar')
		this.navBar.item = this.navBar.querySelectorAll('.sceneButton')
		this.nextButton = this.target.querySelector('.nextButton')

		this.Slider = new Slider()
		this.sceneObject = [
			new ThemeScene('.themeScene'),
			new RhymeScene('.rhymeScene'),
			new VerseScene('.verseScene'),
			new EditorScene('.editorScene'),
		]
		this.initSliderEvents()
	}

	loadSceneObject() {

	}

	initSliderEvents() {
		let _ = this

		window.addEventListener('click', function() {
			let ind = _.Slider.currentSceneIndex
			_.updateNextButtonState(ind)
		})


		// this.nextButton.addEventListener('click', function() {
		// 	let ind = _.Slider.currentSceneIndex + 1
		// 	_.Slider.goTo(ind)
		// })
		//
		// for (var i = 0; i < this.navBar.item.length; i++) {
		// 	this.navBar.item[i].addEventListener('click', function() {
		// 		let ind = _.Slider.getIndexOf(this)
		// 		_.Slider.goTo(ind)
		// 		_.updateNextButtonState(ind)
		// 	})
		// }
	}

	updateNextButtonState(ind) {
		if (this.sceneObject[ind].nextStatus) {
			// Display button
			this.nextButton.classList.add('nextButton--displayed')
		} else {
			// Hide button
			this.nextButton.classList.remove('nextButton--displayed')
		}

	}
}

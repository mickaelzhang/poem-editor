import Slider from './Slider'
import ThemeScene from './scene/ThemeScene'
import RhymeScene from './scene/RhymeScene'
import VerseScene from './scene/VerseScene'
import EditorScene from './scene/EditorScene'

export default class SceneManager {
	constructor() {
		this.currentScene = 0
		this.nextButton = document.querySelector('.nextButton')

		this.Slider = new Slider()

		this.sceneObject = [
			new ThemeScene('.themeScene'),
			new RhymeScene('.rhymeScene'),
			new VerseScene('.verseScene'),
			new EditorScene('.editorScene'),
		]
		this.initSliderEvents()
	}

	/**
	 * eventListener
	 */
	initSliderEvents() {
		let _ = this

		window.addEventListener('click', function() {
			let ind = _.Slider.currentSceneIndex
			_.updateNextButtonState(ind)
		})
	}

	/**
	 * Update button state to visible or invisible
	 */
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

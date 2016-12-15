import Slider from './Slider'
import ThemeScene from './scene/ThemeScene'
import RhymeScene from './scene/RhymeScene'
import VerseScene from './scene/VerseScene'
import EditorScene from './scene/EditorScene'

export default class SceneManager {
	constructor() {
		this.currentScene = 0
		this.nextButton = document.querySelector('.nextButton')
		this.pulsateHide = document.querySelector('.nextButton__hide')
		this.pulsate = document.querySelector('.nextButton__pulsate')

		this.Slider = new Slider()

		this.sceneObject = [new ThemeScene('.themeScene'),,,]

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
			_.updateEditorSettings()
		})

		window.addEventListener('keyup', function() {
			let ind = _.Slider.currentSceneIndex
			_.updateNextButtonState(ind)
		})

		// Event on next scene button
		this.nextButton.addEventListener('click', function() {
			_.initSceneObject()
		})
	}

	initSceneObject() {
		let nextSlideInd = this.Slider.currentSceneIndex

		// If the object is not already initialized
		if (this.sceneObject[nextSlideInd] === undefined) {
			// Choose which object to use depending on index
			switch (nextSlideInd) {
				case 1:
					this.sceneObject[nextSlideInd] = new RhymeScene('.rhymeScene')
					break;
				case 2:
					this.sceneObject[nextSlideInd] = new VerseScene('.verseScene')
					break;
				case 3:
					this.sceneObject[nextSlideInd] = new EditorScene('.editorScene', this.sceneObject[0].themeSlug, this.sceneObject[1].rhymeSlug, this.sceneObject[2].verseSlug)
					break;
			}
		}
	}

	/**
	 * Update EditorScene object setting
	 */
	updateEditorSettings() {
		// If EditorScene object exist
		if (this.sceneObject[3]) {
			this.sceneObject[3].updateParam(
				this.sceneObject[0].themeSlug,
				this.sceneObject[1].rhymeSlug,
				this.sceneObject[2].verseSlug
			)
		}
	}

	/**
	 * Update button state to visible or invisible
	 */
	updateNextButtonState(ind) {
		// console.log(ind);
		// console.log('nextStatus: '+this.sceneObject[ind].nextStatus);
		if (this.sceneObject[ind].nextStatus) {
			// Display button
			this.nextButton.classList.add('nextButton--unblocked')
			// Display animation
			this.pulsateHide.classList.remove('nextButton__hide')
		} else {
			// Hide button
			this.nextButton.classList.remove('nextButton--unblocked')
			// Hide animation
			this.pulsate.classList.add('nextButton__hide')
		}

		// Update next status in slider
		this.Slider.nextStatus = this.sceneObject[ind].nextStatus
	}
}

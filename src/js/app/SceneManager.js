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
			new ThemeScene('.themeScene'),,,]

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

		this.nextButton.addEventListener('click', function() {
			_.initSceneObject()
		})
	}

	initSceneObject() {
		console.log('____________________');
		console.log('initSceneObject');
		let nextSlideInd = this.Slider.currentSceneIndex
		console.log('nextSlideInd: '+nextSlideInd);
		console.log('nextSlideObject:');
		console.log(this.sceneObject[nextSlideInd]);
		if (this.sceneObject[nextSlideInd] === undefined) {
			console.log("Object Don't exist");

			switch (nextSlideInd) {
				case 1:
					this.sceneObject[nextSlideInd] = new RhymeScene('.rhymeScene')
					console.log('Init RhymeScene');
					break;
				case 2:
					this.sceneObject[nextSlideInd] = new VerseScene('.verseScene')
					console.log('Init VerseScene');
					break;
				case 3:
					this.sceneObject[nextSlideInd] = new EditorScene('.editorScene')
					console.log('Init EditorScene');
					break;
			}
		} else {
			console.log("Object exist");
		}
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

		// Update next status in slider
		this.Slider.nextStatus = this.sceneObject[ind].nextStatus
	}
}

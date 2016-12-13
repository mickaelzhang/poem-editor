import ThemeChoice from './ThemeChoice'

export default class SceneManager {
	constructor() {
		this.currentScene = 0

		this.loadSceneObject()
	}

	loadSceneObject() {
		switch (this.currentScene) {
			case 4:
				console.log('Scene 5');
			case 3:
				console.log('Scene 4');
			case 2:
				console.log('Scene 3');
			case 1:
				console.log('Scene 2');
			case 0:
			default:
				new ThemeChoice()
		}
	}
}

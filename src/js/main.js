/**
 * Main JS Controller
 * All Javascript Object should be initialised here
 */

import SceneManager from './app/SceneManager'
import Animation from './app/Animation.js'
import Poem from './app/Poem'

const body = document.querySelector('body')

if (body.classList.contains('jeu')) {
	new SceneManager()
	new Animation()
} else if (body.classList.contains('poesie')) {
	new Poem()
}

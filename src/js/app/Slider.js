export default class Slider {
	constructor() {
		this.target = document.querySelector('.jeu__content')
		this.sliderContainer = this.target.querySelector('.jeu__sceneList')
		this.sliderItem = this.sliderContainer.querySelectorAll('.jeu__sceneItem')
		this.navBar = this.target.querySelector('.jeu__navBar')
		this.navBar.item = this.navBar.querySelectorAll('.sceneButton')
		this.nextButton = this.target.querySelector('.nextButton')

		this.currentSceneIndex = 0
		this.initEvents()
	}

	initEvents() {
		let _ = this

		this.nextButton.addEventListener('click', function() {
			let ind = _.currentSceneIndex + 1
			_.goTo(ind)
		})

		for (var i = 0; i < this.navBar.item.length; i++) {
			this.navBar.item[i].addEventListener('click', function() {
				let ind = _.getIndexOf(this)
				_.goTo(ind)
				console.log(ind);
			})
		}

		window.addEventListener('resize', function() {
			_.goTo(_.currentSceneIndex)
		})
	}

	goTo(ind) {
		if (ind < 0) {
			ind = 0
		} else if(this.sliderItem.length <= ind) {
			ind = this.sliderItem.length - 1
		}

		this.applyTransition(ind)
	}

	applyTransition(index) {
		let translateX = index * window.innerWidth
		let deltaScene = Math.abs(this.currentSceneIndex - index)

		// Unit in MS
		const durationPerScene = 350
		let totalDuration = durationPerScene * deltaScene

		this.currentSceneIndex = index

		this.sliderContainer.style.transitionDuration = totalDuration+'ms'
		this.sliderContainer.style.transform = 'translateX(-'+translateX+'px)'
	}

	getIndexOf(node) {
		for (var i = 0; i < node.parentNode.children.length; i++) {
			if (node == node.parentNode.children[i]) {
				return i
			}
		}
  }
}

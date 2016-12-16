export default class Poem {
	constructor() {
		this.poem = JSON.parse(localStorage.getItem("poem"))
		this.container = document.querySelector('.poesie__content')

		this.addPoem()
	}

	addPoem() {
		let string = ''

		for (var i = 0; i < this.poem.length; i++) {
			string = string + this.poem[i] + '<br>'
		}

		this.container.insertAdjacentHTML('beforeend', string)
	}
}

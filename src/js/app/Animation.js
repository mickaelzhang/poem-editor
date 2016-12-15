export default class Animation {
	constructor() {
		let choiceTypeOfRhyme = document.querySelectorAll('.rhymeScene__rhymeItem ');
		let rhyme1 = document.querySelector('.rhymeScene__rhyme1');
		let rhyme2 = document.querySelector('.rhymeScene__rhyme2');
		let rhyme3 = document.querySelector('.rhymeScene__rhyme3');
		let rhyme4 = document.querySelector('.rhymeScene__rhyme4');
		let defaultClass = 'rhymeScene__rhymeItem rhymeScene__rhymeItem--selected';
		window.i = 0;

		Array.from(choiceTypeOfRhyme).forEach((rhyme, index) => {

			rhyme.addEventListener('click', function(event) {

				switch (true) {
					case index == 0:
						console.log(window.i);
						this.classList.add('rhymeScene__rhymeItem--selected');
						choiceTypeOfRhyme[1].classList.remove('rhymeScene__rhymeItem--selected');
						choiceTypeOfRhyme[2].classList.remove('rhymeScene__rhymeItem--selected');
						if (this.className == defaultClass && window.i == 1) {
							rhyme1.classList.remove('rhymeScene__translateLeftX');
							rhyme2.classList.remove('rhymeScene__translateLeftX');
							rhyme1.classList.add('rhymeScene__translateBottomY');
							rhyme2.classList.add('rhymeScene__translateBottomY');
							setTimeout(() => {
								rhyme1.classList.remove('rhymeScene__translateBottomY');
								rhyme2.classList.remove('rhymeScene__translateBottomY');
								rhyme1.classList.add('rhymeScene__translateRightX');
								rhyme2.classList.add('rhymeScene__translateRightX');
								rhyme3.classList.remove('rhymeScene__translateTopY');
								rhyme4.classList.remove('rhymeScene__translateTopY');
								setTimeout(() => {
									rhyme1.classList.remove('rhymeScene__translateRightX');
									rhyme2.classList.remove('rhymeScene__translateRightX');
								}, 500);
							}, 500);
						} else if (this.className == defaultClass && window.i == 2) {
							rhyme3.classList.remove('rhymeScene__translateTopX');
							rhyme4.classList.remove('rhymeScene__translateTopX');
							rhyme3.classList.add('rhymeScene__translateBottomY2');
							rhyme4.classList.add('rhymeScene__translateBottomY2');
							setTimeout(() => {
								rhyme2.classList.remove('rhymeScene__translateBottomY3');
								rhyme3.classList.remove('rhymeScene__translateBottomY2');
								rhyme4.classList.remove('rhymeScene__translateBottomY2');
								rhyme3.classList.add('rhymeScene__translateRightX');
								rhyme4.classList.add('rhymeScene__translateRightX');
								setTimeout(() => {
									rhyme3.classList.remove('rhymeScene__translateRightX');
									rhyme4.classList.remove('rhymeScene__translateRightX');
								},500);
							},500);
						}
							window.i = 0;
						break;
					case index == 1:
						console.log(window.i);
						this.classList.add('rhymeScene__rhymeItem--selected');
						choiceTypeOfRhyme[0].classList.remove('rhymeScene__rhymeItem--selected');
						choiceTypeOfRhyme[2].classList.remove('rhymeScene__rhymeItem--selected');
						if (this.className == 'rhymeScene__rhymeItem rhymeScene__rhymeItem--selected' && window.i == 0) {
							rhyme1.classList.add('rhymeScene__translateRightX');
							rhyme2.classList.add('rhymeScene__translateRightX');
							setTimeout(() => {
								rhyme1.classList.add('rhymeScene__translateBottomY');
								rhyme2.classList.add('rhymeScene__translateBottomY');
								rhyme3.classList.add('rhymeScene__translateTopY');
								rhyme4.classList.add('rhymeScene__translateTopY');
								setTimeout(() => {
									rhyme1.classList.add('rhymeScene__translateLeftX');
									rhyme2.classList.add('rhymeScene__translateLeftX');
									rhyme1.classList.remove('rhymeScene__translateBottomY');
									rhyme1.classList.remove('rhymeScene__translateRightX');
									rhyme2.classList.remove('rhymeScene__translateBottomY');
									rhyme2.classList.remove('rhymeScene__translateRightX');
								}, 500);
							}, 500);
						} else if(this.className == defaultClass && window.i == 2) {
							rhyme4.classList.remove('rhymeScene__translateTopX');
							rhyme4.classList.add('rhymeScene__translateBottomY2');
							setTimeout(() => {
									rhyme4.classList.remove('rhymeScene__translateBottomY2');
									rhyme4.classList.add('rhymeScene__translateRightX');
									rhyme2.classList.add('rhymeScene__translateLeftX');
									setTimeout(() => {
										rhyme4.classList.remove('rhymeScene__translateRightX');
									},500);

							},500);

						}
						window.i = 1;
						break;
					case index == 2:
						console.log(window.i);
						this.classList.add('rhymeScene__rhymeItem--selected');
						choiceTypeOfRhyme[0].classList.remove('rhymeScene__rhymeItem--selected');
						choiceTypeOfRhyme[1].classList.remove('rhymeScene__rhymeItem--selected');
						if (this.className == defaultClass && window.i == 1) {
							rhyme3.classList.remove('rhymeScene__translateTopY');
							rhyme4.classList.remove('rhymeScene__translateTopY');
							rhyme3.classList.add('rhymeScene__translateBottomTopY3');
							rhyme4.classList.add('rhymeScene__translateBottomTopY3');
							setTimeout(() => {
								rhyme1.classList.remove('rhymeScene__translateLeftX');
								rhyme2.classList.remove('rhymeScene__translateLeftX');
								rhyme2.classList.add('rhymeScene__translateBottomY3');
								setTimeout(() => {
									rhyme3.classList.remove('rhymeScene__translateBottomTopY3');
									rhyme4.classList.remove('rhymeScene__translateBottomTopY3');
									rhyme3.classList.add('rhymeScene__translateBottomY2');
									rhyme4.classList.add('rhymeScene__translateBottomY2');
									setTimeout(() => {
										rhyme3.classList.remove('rhymeScene__translateBottomY2');
										rhyme4.classList.remove('rhymeScene__translateBottomY2');
										rhyme3.classList.add('rhymeScene__translateTopX');
										rhyme4.classList.add('rhymeScene__translateTopX');
									},500);
								}, 500);
							}, 500);
						} else if (this.className == defaultClass && window.i == 0) {
							rhyme3.classList.add('rhymeScene__translateRightX');
							rhyme4.classList.add('rhymeScene__translateRightX');
							setTimeout(() => {
								rhyme2.classList.add('rhymeScene__translateBottomY3');
								rhyme3.classList.remove('rhymeScene__translateRightX');
								rhyme4.classList.remove('rhymeScene__translateRightX');
								rhyme3.classList.add('rhymeScene__translateBottomY2');
								rhyme4.classList.add('rhymeScene__translateBottomY2');
								setTimeout(() => {
									rhyme3.classList.remove('rhymeScene__translateBottomY2');
									rhyme4.classList.remove('rhymeScene__translateBottomY2');
									rhyme3.classList.add('rhymeScene__translateTopX');
									rhyme4.classList.add('rhymeScene__translateTopX');
								},500);
							},500);
						}
						window.i = 2;
						break;
				}
			});
		});
	}
}

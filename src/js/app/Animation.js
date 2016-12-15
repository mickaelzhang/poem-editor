export default class Animation {
	constructor() {
		let choiceTypeOfRhyme = document.querySelectorAll('.rhymeScene__rhymeItem');
		let rhyme1 = document.querySelector('.rhymeScene__rhyme1');
		let rhyme2 = document.querySelector('.rhymeScene__rhyme2');
		let rhyme3 = document.querySelector('.rhymeScene__rhyme3');
		let rhyme4 = document.querySelector('.rhymeScene__rhyme4');
		let defaultClass = 'rhymeScene__rhymeItem secondaryButton secondaryButton--selected';
		let titleRhyme = document.querySelectorAll('.rhymeTitle');
		// console.log(titleRhyme);
		window.i = 0;

		Array.from(choiceTypeOfRhyme).forEach((rhyme, index) => {

			rhyme.addEventListener('click', function(event) {

				switch (true) {
					case index == 0:
						console.log(window.i);
						this.classList.add('secondaryButton--selected');
						choiceTypeOfRhyme[1].classList.remove('secondaryButton--selected');
						choiceTypeOfRhyme[2].classList.remove('secondaryButton--selected');
						titleRhyme[0].classList.add('rhymeTitle--selected');
						titleRhyme[1].classList.remove('rhymeTitle--selected');
						titleRhyme[2].classList.remove('rhymeTitle--selected');
						if (this.className == defaultClass && window.i == 1) {
							rhyme2.classList.remove('rhymeScene__translateBottomY3');
							rhyme2.classList.remove('rhymeScene__translateLeftX');
							rhyme1.classList.add('rhymeScene__translateRightX');
							rhyme2.classList.add('rhymeScene__translateBottomY');
							setTimeout(() => {
								rhyme2.classList.remove('rhymeScene__translateBottomY');
								rhyme2.classList.add('rhymeScene__translateRightX');
								rhyme3.classList.remove('rhymeScene__translateTopX');
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
						this.classList.add('secondaryButton--selected');
						choiceTypeOfRhyme[0].classList.remove('secondaryButton--selected');
						choiceTypeOfRhyme[2].classList.remove('secondaryButton--selected');
						titleRhyme[0].classList.remove('rhymeTitle--selected');
						titleRhyme[1].classList.add('rhymeTitle--selected');
						titleRhyme[2].classList.remove('rhymeTitle--selected');
						if (this.className == 'rhymeScene__rhymeItem secondaryButton secondaryButton--selected' && window.i == 0) {
							rhyme1.classList.add('rhymeScene__translateRightX');
							rhyme2.classList.add('rhymeScene__translateRightX');
							setTimeout(() => {
								rhyme2.classList.remove('rhymeScene__translateRightX');
								rhyme2.classList.add('rhymeScene__translateBottomY');
								rhyme3.classList.add('rhymeScene__translateTopX');
								setTimeout(() => {
									rhyme1.classList.remove('rhymeScene__translateRightX');
									rhyme2.classList.remove('rhymeScene__translateBottomY');
									rhyme2.classList.add('rhymeScene__translateLeftX');
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
						this.classList.add('secondaryButton--selected');
						choiceTypeOfRhyme[0].classList.remove('secondaryButton--selected');
						choiceTypeOfRhyme[1].classList.remove('secondaryButton--selected');
						titleRhyme[0].classList.remove('rhymeTitle--selected');
						titleRhyme[1].classList.remove('rhymeTitle--selected');
						titleRhyme[2].classList.add('rhymeTitle--selected');
						if (this.className == defaultClass && window.i == 1) {
							rhyme3.classList.remove('rhymeScene__translateTopY');
							rhyme3.classList.remove('rhymeScene__translateTopX');
							rhyme3.classList.add('rhymeScene__translateBottomY2');
							rhyme4.classList.add('rhymeScene__translateRightX');
							setTimeout(() => {
								rhyme2.classList.remove('rhymeScene__translateLeftX');
								rhyme2.classList.add('rhymeScene__translateBottomY3');
								setTimeout(() => {
									rhyme4.classList.remove('rhymeScene__translateBottomTopY3');
									rhyme4.classList.remove('rhymeScene__translateRightX');
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
									// rhyme2.classList.remove('rhymeScene__translateBottomY3');
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

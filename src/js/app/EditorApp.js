export default class EditorApp {
	constructor() {
		console.log('Start EditorApp.')
		this.input = document.querySelectorAll('.editorArea__lineInput')
		this.syllableCount = document.querySelectorAll('.editorArea__syllableCount')
		this.selectedIndex = this.setSelectedIndex()

		this.initEvents()
	}

	/**
	 * function initEvents
	 */
	initEvents() {
		for (var i = 0; i < this.input.length; i++) {
			this.input[i].addEventListener("focus", evt => this.setSelectedIndex(evt))
			this.input[i].addEventListener("blur", evt => this.unsetSelectedIndex(evt))
			this.input[i].addEventListener("keyup", evt => this.inputKeydownAction(evt))
		}
	}

	inputKeydownAction() {
		if (0 <= this.selectedIndex) {
			const activeInputIndex = this.selectedIndex
			const string = this.input[activeInputIndex].value

			const syllableNb = this.getSyllableCount(string)
			this.updateSyllableCount(activeInputIndex, syllableNb)
		}
	}

	/**
	 *
	 */
	updateSyllableCount(index, syllableCount) {
		this.syllableCount[index].innerHTML = syllableCount;
	}
	/**
	 * function setInputIndex
	 * Set which input is selected
	 */
	setSelectedIndex() {
		for (var i = 0; i < this.input.length; i++) {
			if (this.input[i] == document.activeElement) {
				this.selectedIndex = i
				return
			}
		}
	}

	/**
	 * function unsetSelectedIndex
	 * Remove index and set it to -1
	 */
	unsetSelectedIndex() {
		this.selectedIndex = -1
	}

	/**
	 * function getSyllableCount
	 */
	getSyllableCount(string) {
		const voyelle = "aàâeëéèêiïouùy";
		const consonne = "bcçdfghjklmnpqrstvwxyz";
		const ponctuation = ",;:!?.";
		let texte = string;
		let tailleInitiale = 0;

		//exception  ch, ph, gn et th sont inséparables et  bl, cl, fl, gl, pl, br, cr, dr, fr, gr, pr, tr, vr
		var reg = new RegExp("([cpg]h|[bcfgp]l|[bcdfgptv]r)", "g");
		texte = texte.replace(reg, "X");

		//le tiret sépare 2 mots
		reg = new RegExp("-", "g");
		texte = texte.replace(reg, "|");
		//la ponctuation est remplacer par des espaces
		reg = new RegExp("[" + ponctuation + "]", "g");
		texte = texte.replace(reg, " ");

		//on enlève les espaces en fin de ligne
		reg = new RegExp("([ ]+\n)|([ ]+$)", "g");
		texte = texte.replace(reg, "\n");

		//le e est muet en fin de vers cas ambigu ent non traité
		reg = new RegExp("(e|es|ent)\n|e$|es$|ent$", "g");
		texte = texte.replace(reg, "'\n");

		//Toute syllabe terminée par un E muet s’élide devant un mot commençant par une voyelle ou un H muet. ( je considère tout les H muet...)
		reg = new RegExp("(e|es|ent)[ ]+([" + voyelle + "h])", "g");
		texte = texte.replace(reg, "' $2");

		//Une consonne placée entre deux voyelles introduit une nouvelle syllabe
		reg = new RegExp("([" + voyelle + "])([" + consonne + "X])([" + voyelle + "])", "g");

		do {
			tailleInitiale = texte.length;
			texte = texte.replace(reg, "$1|$2$3");
		} while (tailleInitiale < texte.length);

		//De deux consonnes placées entre deux voyelles, la première appartient à la syllabe précédente, la seconde, à la syllabe suivante
		reg = new RegExp("([" + voyelle + "])([" + consonne + "X])([" + consonne + "X])([" + voyelle + "])", "g");

		do {
			tailleInitiale = texte.length;
			texte = texte.replace(reg, "$1$2|$3$4");
		} while (tailleInitiale < texte.length);

		//Quand il y a trois consonnes consécutives à l’intérieur d’un mot, ordinairement les deux premières terminent une syllabe, l’autre commence une nouvelle syllabe :
		reg = new RegExp("([" + voyelle + "])([" + consonne + "X])([" + consonne + "X])([" + consonne + "X])([" + voyelle + "])", "g");

		do {
			tailleInitiale = texte.length;
			texte = texte.replace(reg, "$1$2$3|$4$5");
		} while (tailleInitiale < texte.length);

		//les espace sont remplacé par |
		reg = new RegExp("[ ]+", "g");
		texte = texte.replace(reg, "|");

		// Split pour les sauts de ligne, pas besoin pour nous
		// var res = texte.split("\n");

		const syllableArray = texte.split("|");

		return syllableArray.length;
	}
}

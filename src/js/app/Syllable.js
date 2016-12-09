export default class Syllable {
	constructor(string) {
		this.voyelle = "aàâeëéèêiïouùy"
		this.consonne = "bcçdfghjklmnpqrstvwxyz"
		this.ponctuation = ",;:!?."

		this.texte = string
		this.syllableArray
		this.count

		this.updateData()

		return this
	}

	/**
	 * function setString
	 * Used externally to update the string but also all the information
	 */
	setString(string) {
		this.texte = string
		this.updateData()
	}

	/**
	 * function updateData
	 * Update all data
	 */
	updateData() {
		this.processString(this.texte)
		this.count = this.syllableArray.length
		this.setSyllableNumber()
	}

	/**
	 * function setSyllableNumber
	 * Get how many syllable there is in this string
	 */
	setSyllableNumber() {
		let nb = this.syllableArray.length

		// If the table length is 1 but the string contained is empty, do this
		if (nb === 1 && this.syllableArray[0].trim() === "") {
			nb = 0
		}

		this.count = nb
	}

	/**
	 * function processString
	 * Process a string to get an array with all syllable
	 * @param string
	 * @return array
	 */
	processString(string) {
		let tailleInitiale = 0
		//exception  ch, ph, gn et th sont inséparables et  bl, cl, fl, gl, pl, br, cr, dr, fr, gr, pr, tr, vr
		var reg = new RegExp("([cpg]h|[bcfgp]l|[bcdfgptv]r)", "g");
		string = string.replace(reg, "X");

		//le tiret sépare 2 mots
		reg = new RegExp("-", "g");
		string = string.replace(reg, "|");
		//la ponctuation est remplacer par des espaces
		reg = new RegExp("[" + this.ponctuation + "]", "g");
		string = string.replace(reg, " ");

		//on enlève les espaces en fin de ligne
		reg = new RegExp("([ ]+\n)|([ ]+$)", "g");
		string = string.replace(reg, "\n");

		//le e est muet en fin de vers cas ambigu ent non traité
		reg = new RegExp("(e|es|ent)\n|e$|es$|ent$", "g");
		string = string.replace(reg, "'\n");

		//Toute syllabe terminée par un E muet s’élide devant un mot commençant par une voyelle ou un H muet. ( je considère tout les H muet...)
		reg = new RegExp("(e|es|ent)[ ]+([" + this.voyelle + "h])", "g");
		string = string.replace(reg, "' $2");

		//Une consonne placée entre deux voyelles introduit une nouvelle syllabe
		reg = new RegExp("([" + this.voyelle + "])([" + this.consonne + "X])([" + this.voyelle + "])", "g");

		do {
			tailleInitiale = string.length;
			string = string.replace(reg, "$1|$2$3");
		} while (tailleInitiale < string.length);

		//De deux consonnes placées entre deux voyelles, la première appartient à la syllabe précédente, la seconde, à la syllabe suivante
		reg = new RegExp("([" + this.voyelle + "])([" + this.consonne + "X])([" + this.consonne + "X])([" + this.voyelle + "])", "g");

		do {
			tailleInitiale = string.length;
			string = string.replace(reg, "$1$2|$3$4");
		} while (tailleInitiale < string.length);

		//Quand il y a trois consonnes consécutives à l’intérieur d’un mot, ordinairement les deux premières terminent une syllabe, l’autre commence une nouvelle syllabe :
		reg = new RegExp("([" + this.voyelle + "])([" + this.consonne + "X])([" + this.consonne + "X])([" + this.consonne + "X])([" + this.voyelle + "])", "g");

		do {
			tailleInitiale = string.length;
			string = string.replace(reg, "$1$2$3|$4$5");
		} while (tailleInitiale < string.length);

		//les espace sont remplacé par |
		reg = new RegExp("[ ]+", "g");
		string = string.replace(reg, "|");

		// Split pour les sauts de ligne, pas besoin pour nous
		// var res = string.split("\n");

		this.syllableArray = string.split("|");
	}
}

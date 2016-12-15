export default class Rhyme {
	constructor(rhymeChoice = 'AABB') {
		this.rhymeChoice = rhymeChoice
		this.comparisonArrayModel = this.getRhymeModel()
		this.rhymeStatus = [false, false]

		this.voyelle = "aàâeëéèêiïouùy"
		this.consonne = "bcçdfghjklmnpqrstvwxyz"
		this.ponctuation = ",;:!?."

		this.rhyme = [
			"a", "i", "o", "u", "eu",
			"ou", "ia", "oi", "ui",
			"en", "on", "un",
			"ar", "er", "ir", "or",
			"al", "el", "il", "ol",

			"ba", "bi", "bo", "be", "bu",
			"da", "di", "do", "de", "du",
			"fa", "fi", "fo", "f", "fu",
			"ga", "gi", "go", "gu",
			"ja", "ji", "jo", "je", "ju",
			"la", "li", "lo", "le", "lu",
			"ma", "mi", "mo", "mu",
			"na", "ni", "no", "nu",
			"pa", "pi", "po", "pu",
			"ka", "ki", "ko", "ke", "ku",
			"sa", "si", "so", "su",
			"ta", "ti", "to", "tu",
			"va", "vi", "vo", "ve", "vu",

			"ape", "ope", "ipe", "upe",

			"eur", "our", "oir",
			"age", "ige", "oge", "ege",
			"ace", "ice", "oce", "èce", "uce",
			"ème", "ame", "ime", "ome", "ume",
			"ène", "ane", "ine", "one", "une",
			"ète", "ate", "ite", "ote", "ute",
			"ceu",
			"erde", "arde",
			"enbe", "onbe", "unbe", "oube",
			"ante", "onte", "unte",
			"iège",

			"atre", "itre", "otre", "ètre", "ère",
			"alte", "ilte", "olte", "elte", "ulte",
			"adre", "idre", "odre",
			"onde", "ende",
			"outre", "untre", "oitre", "uitre",
			"ondre", "oudre", "oidre", "uidre",
			"ordre",
			"euille"
		]

		this.inputLastRhyme = ["","","",""]
	}

	setInputSyllable(index, string) {
		let processedString = this.processRhyme(string.toLowerCase().trim())
		console.log('OG: '+processedString);

		const limit = 6 < processedString.length ? 6 : (processedString.length)

		this.inputLastRhyme[index] =  processedString


		console.log(this.inputLastRhyme);
		this.checkRhyme()

		// for (var i = 1; i <= limit; i++) {
		// 	this.inputLastRhyme[index] =  this.compareToRhyme( processedString.substr(i - 1) )
		//
		// 	if (this.inputLastRhyme[index] != false) {
		// 		return
		// 	}
		// }
	}

	checkRhyme() {
		// Loop on both rhyme (eg. A and B)
		for (var i = 0; i < this.comparisonArrayModel.length; i++) {
				let firstLine = this.comparisonArrayModel[i][0] - 1
				let secondLine = this.comparisonArrayModel[i][1] - 1

				if (this.inputLastRhyme[firstLine] && this.inputLastRhyme[secondLine]) {
					this.rhymeStatus[i] = this.compareLineInput(this.inputLastRhyme[firstLine], this.inputLastRhyme[secondLine])
					console.log(this.rhymeStatus);
				}
		}
	}

	compareLineInput(input1, input2) {
		let trimInput1
		let trimInput2

		const limit = input1.length < input2.length ? input1.length : input2.length

		for (var i = 1; i <= limit; i++) {
			trimInput1 = input1.substr(input1.length - i)
			trimInput2 = input2.substr(input2.length - i)

			if (trimInput1 !== trimInput2) {
				// If no character are equal
				if (i == 1) {
					return false
				} else {
					// console.log('Les 2 inputs sont différents à partir de '+i+' caractères');
					// console.log(trimInput1);
					// console.log(trimInput2);
					// console.log('FIN: compareLineInput');
					// Permet d'avoir la rime
					// trimInput1 = input1.substr(input1.length - i + 1)

					return true
				}
			}

			// Same rhyme
			return true
		}
	}

	compareToRhyme(string) {
		// console.log(string);
		for (var i = 0; i < this.rhyme.length; i++) {
			if (this.rhyme[i] === string) {
				return this.rhyme[i]
			}
		}

		return false
	}

	getRhymeModel() {
		switch (this.rhymeChoice) {
			default:
			case 'AABB':
				return [[1,2],[3,4]]
				break;
			case 'ABAB':
				return [[1,3],[2,4]]
				break;
			case 'ABBA':
				return [[1,4],[2,3]]
				break;
		}
	}

	processRhyme(string) {
		// Enlève les e muets
		string = this.regEx(string,
			"(["+this.voyelle+"])(e)+$",
			"$1")

		// EXCEPTION
		string = this.regEx(string,
			"((er)[dtbs])$",
			"ère")

		// EXCEPTION
		string = this.regEx(string,
			"(test)$",
			"teste")

		// Enlève les s|g|p|d|b|t muets
		string = this.regEx(string,
			"(["+this.voyelle+"])(["+this.consonne+"]*)[sgpdbtx]+$",
			"$1$2")

		// Enlève les s|g|p|d|b|t muets
		string = this.regEx(string,
			"(["+this.voyelle+"])[sgpdbt]+$",
			"$1")

		// Rime en a
		string = this.regEx(string,
			"(à|â|ä)$",
			"a")

		// Rime en er
		string = this.regEx(string,
			"(ai[st]*|e[szt]|é)$",
			"er")

		// Change è
		string = this.regEx(string,
			"(ê|ai)",
			"è")

		// Change ss en c
		string = this.regEx(string,
			"ss",
			"c")

		// Rime en ke
		string = this.regEx(string,
			"mm",
			"m")

		// Changer lettre m en n quand précéder par voyelle et après, autre syllabe
		string = this.regEx(string,
			"(["+this.voyelle+"])m(["+this.consonne+"])",
			"$1n$2")

		// Rime en a
		string = this.regEx(string,
			"([auoei])m$",
			"$1n")

		// Rime en ke
		string = this.regEx(string,
			"nn",
			"n")

		// Rime en ke
		string = this.regEx(string,
			"ette",
			"ète")

		// Rime en o
		string = this.regEx(string,
			"(au|eau)$",
			"o")

		// Rime en eur
		string = this.regEx(string,
			"(aine|eine)[nt]*$",
			"ène")

		// Rime en eur
		string = this.regEx(string,
			"(iene)[nt]*$",
			"iène")

		string = this.regEx(string,
			"en(["+this.consonne+"])*",
			"an$1")

		// Rime en un
		string = this.regEx(string,
			"(in|oin|aim)$",
			"un")

		// Rime en i
		string = this.regEx(string,
			"(ï)$",
			"i")

		// Rime en or
		string = this.regEx(string,
			"(aur)$",
			"or")

		// Rime en k
		string = this.regEx(string,
			"(qu|ck)$",
			"k")

		// Rime en ke
		string = this.regEx(string,
			"(c|k)$",
			"ke")

		// Rime en er
		string = this.regEx(string,
			"î",
			"i")

		// Rime en ètre
		string = this.regEx(string,
			"((aitre)|([êè][t]+(r)))$",
			"ètre")

		// Rime en eur
		string = this.regEx(string,
			"(œur|eure)$",
			"eur")

		// Remplace
		// string = this.regEx(string,
		// 	"(([aei])+(ll|lle)|(!euille))$",
		// 	"$1l")

		string = this.regEx(string,
			"(an)$",
			"en")

		// Remplace ait | ais | é par er
		string = this.regEx(string,
			"(lt)$",
			"lte")

		return string
	}

	regEx(string, regex, replacement) {
		const reg = new RegExp(regex, "g")
		return string.replace(reg, replacement)
	}
}

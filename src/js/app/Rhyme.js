export default class Rhyme {
	constructor(defaultRhyme = 'AABB') {
		console.log('Rhyme');
		this.defaultRhyme = defaultRhyme

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
		// this.inputLastRhyme[index] = processedString
		// Get only last 5 char
		// processedString = processedString.substr(processedString.length - 5)
		//

		const limit = 6 < processedString.length ? 6 : (processedString.length)


		for (var i = 1; i <= limit; i++) {
			this.inputLastRhyme[index] =  this.compareToRhyme( processedString.substr(i - 1) )

			if (this.inputLastRhyme[index] != false) {
				return
			}
		}
	}

	compareToRhyme(string) {
		console.log(string);
		for (var i = 0; i < this.rhyme.length; i++) {
			if (this.rhyme[i] === string) {
				return this.rhyme[i]
			}
		}

		return false
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

		// Enlève les s|g|p|d|b|t muets
		string = this.regEx(string,
			"(["+this.voyelle+"])(["+this.consonne+"]*)[sgpdbt]+$",
			"$1$2")

		// Enlève les s|g|p|d|b|t muets
		string = this.regEx(string,
			"(["+this.voyelle+"])[sgpdbt]+$",
			"$1")

		// Rime en a
		string = this.regEx(string,
			"(à|â|ä)$",
			"a")

		// Change è
		string = this.regEx(string,
			"(ê|ai)",
			"è")

		// Change è
		string = this.regEx(string,
			"ss",
			"c")

		// Rime en ke
		string = this.regEx(string,
			"mm",
			"m")

		string = this.regEx(string,
			"m",
			"n")

		// Rime en ke
		string = this.regEx(string,
			"nn",
			"n")

		// Rime en ke
		string = this.regEx(string,
			"ette",
			"ète")

		// Rime en eur
		string = this.regEx(string,
			"(aine|eine|iene)[nt]*$",
			"ène")

		// Rime en a
		string = this.regEx(string,
			"([auoei])m(["+this.consonne+"]*)",
			"$1n$2")

		string = this.regEx(string,
			"en(["+this.consonne+"])*",
			"an$1")

		// Rime en un
		string = this.regEx(string,
			"(in|oin)$",
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
			"(ai[st]|e[szt]|é)$",
			"er")

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

		// Remplace ait | ais | é par er
		// reg = new RegExp("(([aei])+(ll|lle)|(!euille))$", "g");
		// string = string.replace(reg, "$1l");
		// string = this.regEx(string,
		// 	"([êè][t]+(r))$",
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

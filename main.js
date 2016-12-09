(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EditorApp = function () {
	function EditorApp() {
		_classCallCheck(this, EditorApp);

		console.log('Start ok.');
		this.input = document.querySelectorAll('.editorArea__lineInput');
		this.syllableCount = document.querySelectorAll('.editorArea__syllableCount');
		this.selectedIndex = this.setSelectedIndex();

		this.initEvents();
	}

	/**
  * function initEvents
  */


	_createClass(EditorApp, [{
		key: 'initEvents',
		value: function initEvents() {
			var _this = this;

			for (var i = 0; i < this.input.length; i++) {
				this.input[i].addEventListener("focus", function (evt) {
					return _this.setSelectedIndex(evt);
				});
				this.input[i].addEventListener("blur", function (evt) {
					return _this.setSelectedIndex(evt);
				});
				this.input[i].addEventListener("keyup", function (evt) {
					return _this.inputKeydownAction(evt);
				});
			}
		}
	}, {
		key: 'inputKeydownAction',
		value: function inputKeydownAction() {
			if (0 < this.selectedIndex) {
				var activeInputIndex = this.selectedIndex;
				var string = this.input[activeInputIndex].value;

				var syllableCount = this.getSyllableCount(string);
				this.updateSyllableCount(activeInputIndex, syllableCount);
			}
		}

		/**
   *
   */

	}, {
		key: 'updateSyllableCount',
		value: function updateSyllableCount(index, syllableCount) {
			this.syllableCount[index].innerHTML = syllableCount;
		}
		/**
   * function setInputIndex
   * Set which input is selected
   * @return int index
   */

	}, {
		key: 'setSelectedIndex',
		value: function setSelectedIndex() {
			for (var i = 0; i < this.input.length; i++) {
				if (this.input[i] == document.activeElement) {
					this.selectedIndex = i;
					return;
				}
			}

			// If no element is active, set selectedIndex to -1
			this.selectedIndex = -1;
		}

		/**
   * function getSyllableCount
   */

	}, {
		key: 'getSyllableCount',
		value: function getSyllableCount(string) {
			var voyelle = "aàâeëéèêiïouùy";
			var consonne = "bcçdfghjklmnpqrstvwxyz";
			var ponctuation = ",;:!?.";
			var texte = string;
			var tailleInitiale = 0;

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

			var res = texte.split("\n");
			var res2;
			var resultatSomme = "";
			var i = 0;
			for (i = 0; i < res.length; i++) {
				res2 = res[i].split("|");

				if (res2.length > 1) resultatSomme += res2.length + " " + res[i] + "\n";else resultatSomme += "\n";
			}

			return res2.length;
		}
	}]);

	return EditorApp;
}();

exports.default = EditorApp;

},{}],2:[function(require,module,exports){
'use strict';

var _EditorApp = require('./app/EditorApp.js');

var _EditorApp2 = _interopRequireDefault(_EditorApp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _EditorApp2.default(); /**
                            * Main JS Controller
                            * All Javascript Object should be initialised here
                            */

console.log('Javascript is linked!');

},{"./app/EditorApp.js":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwL0VkaXRvckFwcC5qcyIsInNyYy9qcy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztJQ0FxQixTO0FBQ3BCLHNCQUFjO0FBQUE7O0FBQ2IsVUFBUSxHQUFSLENBQVksV0FBWjtBQUNBLE9BQUssS0FBTCxHQUFhLFNBQVMsZ0JBQVQsQ0FBMEIsd0JBQTFCLENBQWI7QUFDQSxPQUFLLGFBQUwsR0FBcUIsU0FBUyxnQkFBVCxDQUEwQiw0QkFBMUIsQ0FBckI7QUFDQSxPQUFLLGFBQUwsR0FBcUIsS0FBSyxnQkFBTCxFQUFyQjs7QUFFQSxPQUFLLFVBQUw7QUFDQTs7QUFFRDs7Ozs7OzsrQkFHYTtBQUFBOztBQUNaLFFBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxLQUFLLEtBQUwsQ0FBVyxNQUEvQixFQUF1QyxHQUF2QyxFQUE0QztBQUMzQyxTQUFLLEtBQUwsQ0FBVyxDQUFYLEVBQWMsZ0JBQWQsQ0FBK0IsT0FBL0IsRUFBd0M7QUFBQSxZQUFPLE1BQUssZ0JBQUwsQ0FBc0IsR0FBdEIsQ0FBUDtBQUFBLEtBQXhDO0FBQ0EsU0FBSyxLQUFMLENBQVcsQ0FBWCxFQUFjLGdCQUFkLENBQStCLE1BQS9CLEVBQXVDO0FBQUEsWUFBTyxNQUFLLGdCQUFMLENBQXNCLEdBQXRCLENBQVA7QUFBQSxLQUF2QztBQUNBLFNBQUssS0FBTCxDQUFXLENBQVgsRUFBYyxnQkFBZCxDQUErQixPQUEvQixFQUF3QztBQUFBLFlBQU8sTUFBSyxrQkFBTCxDQUF3QixHQUF4QixDQUFQO0FBQUEsS0FBeEM7QUFDQTtBQUNEOzs7dUNBRW9CO0FBQ3BCLE9BQUksSUFBSSxLQUFLLGFBQWIsRUFBNEI7QUFDM0IsUUFBTSxtQkFBbUIsS0FBSyxhQUE5QjtBQUNBLFFBQU0sU0FBUyxLQUFLLEtBQUwsQ0FBVyxnQkFBWCxFQUE2QixLQUE1Qzs7QUFFQSxR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QS9FLEdBQXlGLE9BQXpGLEdBQW1HLElBQTlHLEVBQW9ILEdBQXBILENBQU47O0FBRUEsTUFBRztBQUNGLHFCQUFpQixNQUFNLE1BQXZCO0FBQ0EsWUFBUSxNQUFNLE9BQU4sQ0FBYyxHQUFkLEVBQW1CLGFBQW5CLENBQVI7QUFDQSxJQUhELFFBR1MsaUJBQWlCLE1BQU0sTUFIaEM7O0FBS0E7QUFDQSxTQUFNLElBQUksTUFBSixDQUFXLE1BQVgsRUFBbUIsR0FBbkIsQ0FBTjtBQUNBLFdBQVEsTUFBTSxPQUFOLENBQWMsR0FBZCxFQUFtQixHQUFuQixDQUFSOztBQUVBLE9BQUksTUFBTSxNQUFNLEtBQU4sQ0FBWSxJQUFaLENBQVY7QUFDQSxPQUFJLElBQUo7QUFDQSxPQUFJLGdCQUFnQixFQUFwQjtBQUNBLE9BQUksSUFBSSxDQUFSO0FBQ0EsUUFBSyxJQUFJLENBQVQsRUFBWSxJQUFJLElBQUksTUFBcEIsRUFBNEIsR0FBNUIsRUFBaUM7QUFDaEMsV0FBTyxJQUFJLENBQUosRUFBTyxLQUFQLENBQWEsR0FBYixDQUFQOztBQUVBLFFBQUksS0FBSyxNQUFMLEdBQWMsQ0FBbEIsRUFDQyxpQkFBaUIsS0FBSyxNQUFMLEdBQWMsR0FBZCxHQUFvQixJQUFJLENBQUosQ0FBcEIsR0FBNkIsSUFBOUMsQ0FERCxLQUdDLGlCQUFpQixJQUFqQjtBQUNEOztBQUVELFVBQU8sS0FBSyxNQUFaO0FBQ0E7Ozs7OztrQkFqSW1CLFM7Ozs7O0FDSXJCOzs7Ozs7QUFFQSwwQixDQU5BOzs7OztBQU9BLFFBQVEsR0FBUixDQUFZLHVCQUFaIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEVkaXRvckFwcCB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdGNvbnNvbGUubG9nKCdTdGFydCBvay4nKTtcblx0XHR0aGlzLmlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmVkaXRvckFyZWFfX2xpbmVJbnB1dCcpO1xuXHRcdHRoaXMuc3lsbGFibGVDb3VudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5lZGl0b3JBcmVhX19zeWxsYWJsZUNvdW50Jyk7XG5cdFx0dGhpcy5zZWxlY3RlZEluZGV4ID0gdGhpcy5zZXRTZWxlY3RlZEluZGV4KCk7XG5cblx0XHR0aGlzLmluaXRFdmVudHMoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBmdW5jdGlvbiBpbml0RXZlbnRzXG5cdCAqL1xuXHRpbml0RXZlbnRzKCnCoHtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuaW5wdXQubGVuZ3RoOyBpKyspIHtcblx0XHRcdHRoaXMuaW5wdXRbaV0uYWRkRXZlbnRMaXN0ZW5lcihcImZvY3VzXCIsIGV2dCA9PiB0aGlzLnNldFNlbGVjdGVkSW5kZXgoZXZ0KSlcblx0XHRcdHRoaXMuaW5wdXRbaV0uYWRkRXZlbnRMaXN0ZW5lcihcImJsdXJcIiwgZXZ0ID0+IHRoaXMuc2V0U2VsZWN0ZWRJbmRleChldnQpKVxuXHRcdFx0dGhpcy5pbnB1dFtpXS5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgZXZ0ID0+IHRoaXMuaW5wdXRLZXlkb3duQWN0aW9uKGV2dCkpXG5cdFx0fVxuXHR9XG5cblx0aW5wdXRLZXlkb3duQWN0aW9uKCkge1xuXHRcdGlmICgwIDwgdGhpcy5zZWxlY3RlZEluZGV4KSB7XG5cdFx0XHRjb25zdCBhY3RpdmVJbnB1dEluZGV4ID0gdGhpcy5zZWxlY3RlZEluZGV4O1xuXHRcdFx0Y29uc3Qgc3RyaW5nID0gdGhpcy5pbnB1dFthY3RpdmVJbnB1dEluZGV4XS52YWx1ZTtcblxuXHRcdFx0Y29uc3Qgc3lsbGFibGVDb3VudCA9IHRoaXMuZ2V0U3lsbGFibGVDb3VudChzdHJpbmcpXG5cdFx0XHR0aGlzLnVwZGF0ZVN5bGxhYmxlQ291bnQoYWN0aXZlSW5wdXRJbmRleCwgc3lsbGFibGVDb3VudClcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHVwZGF0ZVN5bGxhYmxlQ291bnQoaW5kZXgsIHN5bGxhYmxlQ291bnQpIHtcblx0XHR0aGlzLnN5bGxhYmxlQ291bnRbaW5kZXhdLmlubmVySFRNTCA9IHN5bGxhYmxlQ291bnQ7XG5cdH1cblx0LyoqXG5cdCAqIGZ1bmN0aW9uIHNldElucHV0SW5kZXhcblx0ICogU2V0IHdoaWNoIGlucHV0IGlzIHNlbGVjdGVkXG5cdCAqIEByZXR1cm4gaW50IGluZGV4XG5cdCAqL1xuXHRzZXRTZWxlY3RlZEluZGV4KCkge1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5pbnB1dC5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKHRoaXMuaW5wdXRbaV0gPT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkge1xuXHRcdFx0XHR0aGlzLnNlbGVjdGVkSW5kZXggPSBpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gSWYgbm8gZWxlbWVudCBpcyBhY3RpdmUsIHNldCBzZWxlY3RlZEluZGV4IHRvIC0xXG5cdFx0dGhpcy5zZWxlY3RlZEluZGV4ID0gLTE7XG5cdH1cblxuXHQvKipcblx0ICogZnVuY3Rpb24gZ2V0U3lsbGFibGVDb3VudFxuXHQgKi9cblx0Z2V0U3lsbGFibGVDb3VudChzdHJpbmcpIHtcblx0XHR2YXIgdm95ZWxsZSA9IFwiYcOgw6Jlw6vDqcOow6ppw69vdcO5eVwiO1xuXHRcdHZhciBjb25zb25uZSA9IFwiYmPDp2RmZ2hqa2xtbnBxcnN0dnd4eXpcIjtcblx0XHR2YXIgcG9uY3R1YXRpb24gPSBcIiw7OiE/LlwiO1xuXHRcdHZhciB0ZXh0ZSA9IHN0cmluZztcblx0XHR2YXIgdGFpbGxlSW5pdGlhbGUgPSAwO1xuXG5cdFx0Ly9leGNlcHRpb24gIGNoLCBwaCwgZ24gZXQgdGggc29udCBpbnPDqXBhcmFibGVzIGV0ICBibCwgY2wsIGZsLCBnbCwgcGwsIGJyLCBjciwgZHIsIGZyLCBnciwgcHIsIHRyLCB2clxuXHRcdHZhciByZWcgPSBuZXcgUmVnRXhwKFwiKFtjcGddaHxbYmNmZ3BdbHxbYmNkZmdwdHZdcilcIiwgXCJnXCIpO1xuXHRcdHRleHRlID0gdGV4dGUucmVwbGFjZShyZWcsIFwiWFwiKTtcblxuXHRcdC8vbGUgdGlyZXQgc8OpcGFyZSAyIG1vdHNcblx0XHRyZWcgPSBuZXcgUmVnRXhwKFwiLVwiLCBcImdcIik7XG5cdFx0dGV4dGUgPSB0ZXh0ZS5yZXBsYWNlKHJlZywgXCJ8XCIpO1xuXHRcdC8vbGEgcG9uY3R1YXRpb24gZXN0IHJlbXBsYWNlciBwYXIgZGVzIGVzcGFjZXNcblx0XHRyZWcgPSBuZXcgUmVnRXhwKFwiW1wiICsgcG9uY3R1YXRpb24gKyBcIl1cIiwgXCJnXCIpO1xuXHRcdHRleHRlID0gdGV4dGUucmVwbGFjZShyZWcsIFwiIFwiKTtcblxuXHRcdC8vb24gZW5sw6h2ZSBsZXMgZXNwYWNlcyBlbiBmaW4gZGUgbGlnbmVcblx0XHRyZWcgPSBuZXcgUmVnRXhwKFwiKFsgXStcXG4pfChbIF0rJClcIiwgXCJnXCIpO1xuXHRcdHRleHRlID0gdGV4dGUucmVwbGFjZShyZWcsIFwiXFxuXCIpO1xuXG5cdFx0Ly9sZSBlIGVzdCBtdWV0IGVuIGZpbiBkZSB2ZXJzIGNhcyBhbWJpZ3UgZW50IG5vbiB0cmFpdMOpXG5cdFx0cmVnID0gbmV3IFJlZ0V4cChcIihlfGVzfGVudClcXG58ZSR8ZXMkfGVudCRcIiwgXCJnXCIpO1xuXHRcdHRleHRlID0gdGV4dGUucmVwbGFjZShyZWcsIFwiJ1xcblwiKTtcblxuXHRcdC8vVG91dGUgc3lsbGFiZSB0ZXJtaW7DqWUgcGFyIHVuIEUgbXVldCBz4oCZw6lsaWRlIGRldmFudCB1biBtb3QgY29tbWVuw6dhbnQgcGFyIHVuZSB2b3llbGxlIG91IHVuIEggbXVldC4gKCBqZSBjb25zaWTDqHJlIHRvdXQgbGVzIEggbXVldC4uLilcblx0XHRyZWcgPSBuZXcgUmVnRXhwKFwiKGV8ZXN8ZW50KVsgXSsoW1wiICsgdm95ZWxsZSArIFwiaF0pXCIsIFwiZ1wiKTtcblx0XHR0ZXh0ZSA9IHRleHRlLnJlcGxhY2UocmVnLCBcIicgJDJcIik7XG5cblx0XHQvL1VuZSBjb25zb25uZSBwbGFjw6llIGVudHJlIGRldXggdm95ZWxsZXMgaW50cm9kdWl0IHVuZSBub3V2ZWxsZSBzeWxsYWJlXG5cdFx0cmVnID0gbmV3IFJlZ0V4cChcIihbXCIgKyB2b3llbGxlICsgXCJdKShbXCIgKyBjb25zb25uZSArIFwiWF0pKFtcIiArIHZveWVsbGUgKyBcIl0pXCIsIFwiZ1wiKTtcblxuXHRcdGRvIHtcblx0XHRcdHRhaWxsZUluaXRpYWxlID0gdGV4dGUubGVuZ3RoO1xuXHRcdFx0dGV4dGUgPSB0ZXh0ZS5yZXBsYWNlKHJlZywgXCIkMXwkMiQzXCIpO1xuXHRcdH0gd2hpbGUgKHRhaWxsZUluaXRpYWxlIDwgdGV4dGUubGVuZ3RoKTtcblxuXHRcdC8vRGUgZGV1eCBjb25zb25uZXMgcGxhY8OpZXMgZW50cmUgZGV1eCB2b3llbGxlcywgbGEgcHJlbWnDqHJlIGFwcGFydGllbnQgw6AgbGEgc3lsbGFiZSBwcsOpY8OpZGVudGUsIGxhIHNlY29uZGUsIMOgIGxhIHN5bGxhYmUgc3VpdmFudGVcblx0XHRyZWcgPSBuZXcgUmVnRXhwKFwiKFtcIiArIHZveWVsbGUgKyBcIl0pKFtcIiArIGNvbnNvbm5lICsgXCJYXSkoW1wiICsgY29uc29ubmUgKyBcIlhdKShbXCIgKyB2b3llbGxlICsgXCJdKVwiLCBcImdcIik7XG5cblx0XHRkbyB7XG5cdFx0XHR0YWlsbGVJbml0aWFsZSA9IHRleHRlLmxlbmd0aDtcblx0XHRcdHRleHRlID0gdGV4dGUucmVwbGFjZShyZWcsIFwiJDEkMnwkMyQ0XCIpO1xuXHRcdH0gd2hpbGUgKHRhaWxsZUluaXRpYWxlIDwgdGV4dGUubGVuZ3RoKTtcblxuXHRcdC8vUXVhbmQgaWwgeSBhIHRyb2lzIGNvbnNvbm5lcyBjb25zw6ljdXRpdmVzIMOgIGzigJlpbnTDqXJpZXVyIGTigJl1biBtb3QsIG9yZGluYWlyZW1lbnQgbGVzIGRldXggcHJlbWnDqHJlcyB0ZXJtaW5lbnQgdW5lIHN5bGxhYmUsIGzigJlhdXRyZSBjb21tZW5jZSB1bmUgbm91dmVsbGUgc3lsbGFiZSA6XG5cdFx0cmVnID0gbmV3IFJlZ0V4cChcIihbXCIgKyB2b3llbGxlICsgXCJdKShbXCIgKyBjb25zb25uZSArIFwiWF0pKFtcIiArIGNvbnNvbm5lICsgXCJYXSkoW1wiICsgY29uc29ubmUgKyBcIlhdKShbXCIgKyB2b3llbGxlICsgXCJdKVwiLCBcImdcIik7XG5cblx0XHRkbyB7XG5cdFx0XHR0YWlsbGVJbml0aWFsZSA9IHRleHRlLmxlbmd0aDtcblx0XHRcdHRleHRlID0gdGV4dGUucmVwbGFjZShyZWcsIFwiJDEkMiQzfCQ0JDVcIik7XG5cdFx0fSB3aGlsZSAodGFpbGxlSW5pdGlhbGUgPCB0ZXh0ZS5sZW5ndGgpO1xuXG5cdFx0Ly9sZXMgZXNwYWNlIHNvbnQgcmVtcGxhY8OpIHBhciB8XG5cdFx0cmVnID0gbmV3IFJlZ0V4cChcIlsgXStcIiwgXCJnXCIpO1xuXHRcdHRleHRlID0gdGV4dGUucmVwbGFjZShyZWcsIFwifFwiKTtcblxuXHRcdHZhciByZXMgPSB0ZXh0ZS5zcGxpdChcIlxcblwiKTtcblx0XHR2YXIgcmVzMjtcblx0XHR2YXIgcmVzdWx0YXRTb21tZSA9IFwiXCI7XG5cdFx0dmFyIGkgPSAwO1xuXHRcdGZvciAoaSA9IDA7IGkgPCByZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHJlczIgPSByZXNbaV0uc3BsaXQoXCJ8XCIpO1xuXG5cdFx0XHRpZiAocmVzMi5sZW5ndGggPiAxKVxuXHRcdFx0XHRyZXN1bHRhdFNvbW1lICs9IHJlczIubGVuZ3RoICsgXCIgXCIgKyByZXNbaV0gKyBcIlxcblwiO1xuXHRcdFx0ZWxzZVxuXHRcdFx0XHRyZXN1bHRhdFNvbW1lICs9IFwiXFxuXCI7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlczIubGVuZ3RoO1xuXHR9XG59XG4iLCIvKipcbiAqIE1haW4gSlMgQ29udHJvbGxlclxuICogQWxsIEphdmFzY3JpcHQgT2JqZWN0IHNob3VsZCBiZSBpbml0aWFsaXNlZCBoZXJlXG4gKi9cbmltcG9ydCBFZGl0b3JBcHAgZnJvbSAnLi9hcHAvRWRpdG9yQXBwLmpzJztcblxubmV3IEVkaXRvckFwcCgpO1xuY29uc29sZS5sb2coJ0phdmFzY3JpcHQgaXMgbGlua2VkIScpO1xuIl19

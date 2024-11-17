

class CookieBox
{
	#box;
	#btnOk;
	#parameterName = 'cookie-consent';

	constructor(cookieBoxId) {
		this.#box = document.querySelector(cookieBoxId);
		this.#btnOk = this.#box.querySelector('button');

		let consent = localStorage.getItem(this.#parameterName);

		if(consent) {
			this.#box.classList.add('hidden');
			this.#box.classList.remove('show');
		} else {
			this.#box.classList.add('show');
			this.#box.classList.remove('hidden');
			this.#init();
		}
	}

	#init()
	{
		this.#btnOk.addEventListener('click', this.#onClick.bind(this));
	}

	#onClick()
	{
		localStorage.setItem(this.#parameterName, '1');
		this.#box.classList.remove('show');
		this.#box.classList.add('hidden');
	}
}

export default CookieBox;

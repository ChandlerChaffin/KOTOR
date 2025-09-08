document.addEventListener("DOMCOntentLoaded", function () {
	document.getElementById("btn-new").onclick = () => handleMenuClick(1);
	document.getElementById("btn-load").onclick = () => handleMenuClick(2);
	document.getElementById("btn-credits").onclick = () => handleMenuClick(3);
});

function handleMenuClick(choice) {
	if (choice === 1) {
		return 0;
	}
	else if (choice === 2) {
		return 0;
	}
	else if (choice === 3) {
		showCredits();
	}
}

function showCredits() {
	const menu = document.getElementById("menu")
	menu.innterHTML = "<p>Created by Chandler - Jedi Master of Code.</p>";
}


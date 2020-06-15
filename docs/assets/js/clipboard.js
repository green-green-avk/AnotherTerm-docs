---
---
(function() {
	if (navigator == null || navigator.clipboard == null) return;
	function roger(v) {
		const overlay = document.createElement("overlay");
		const elt = document.createElement("roger");
		elt.innerText = v;
		overlay.appendChild(elt);
		document.body.appendChild(overlay);
		setTimeout(() => overlay.parentNode.removeChild(overlay), 2000);
		overlay.className = "roger";
	}
	const elts = Array.from(document.getElementsByClassName("clipboard"))
		.concat(Array.from(document.getElementsByTagName("clipboard")));
	for (const elt_c of elts) {
		const pres = elt_c.getElementsByTagName("pre");
		const elt = pres.length == 1 ? pres[0] : elt_c;
		const isBlock = window.getComputedStyle(elt).display == "block";
		const btn = document.createElement("img");
		btn.src = "{{ '/assets/images/clipboard.png' | relative_url }}";
		btn.className = "btn tab-" + (isBlock ? "bottom" : "right");
		if (isBlock) {
			btn.style.position = "relative";
			btn.style.top = "-" + window.getComputedStyle(elt).marginBottom;
		}
		btn.addEventListener("click", function() {
			navigator.clipboard.writeText(elt.innerText.trim());
			roger("Copied to clipboard");
		});
		elt.parentNode.insertBefore(btn, elt.nextSibling);
	}
})();

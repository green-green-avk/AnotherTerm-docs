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
	(function() {
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
	(function() {
		const root = document.getElementById("main_content");
		const elts = Array.from(root.getElementsByTagName("h1"))
			.concat(Array.from(root.getElementsByTagName("h2")))
			.concat(Array.from(root.getElementsByTagName("h3")))
			.concat(Array.from(root.getElementsByTagName("dt")))
			.concat(Array.from(root.getElementsByClassName("link")));
		for (const elt of elts) {
			if (elt.id == null || elt.id == "") continue;
			const mark = document.createElement("img");
			mark.src = "{{ '/assets/images/link.svg' | relative_url }}";
			const url = new URL(window.location.href);
			url.hash = elt.id
				.replace(/^main_content_title$/, "main_content");
			mark.className = "link-icon-left";
			mark.style.position = "absolute";
			mark.style.opacity = 0;
			mark.addEventListener("click", function() {
				navigator.clipboard.writeText(url.href);
				roger("Link is copied to clipboard");
			});
			elt.style.position = "relative";
			elt.insertBefore(mark, elt.firstChild);
			elt.addEventListener("mouseover", function() {
				mark.style.opacity = 1;
			});
			elt.addEventListener("mouseout", function() {
				mark.style.opacity = 0;
			});

		}
	})();
})();

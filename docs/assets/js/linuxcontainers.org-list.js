(function() {
	const wSnippet = document.getElementById("snippet");
	if (fetch == null) {
		wSnippet.innerText = "Your browser is extremely outdated.";
		return;
	}
	function add(list, distro, version, arch, data) {
		if (!list.has(distro)) list.set(distro, new Map());
		if (!list.get(distro).has(version)) list.get(distro).set(version, new Map());
		list.get(distro).get(version).set(arch, data);
	}
	function parse(v) {
		const list = new Map();
		for (const s of v.split("\n")) {
			const [distro, version, arch, type, date, path] = s.trim().split(";");
			if (type != "default") continue;
			add(list, distro, version, arch, {date: date, path: path});
		}
		return list;
	}
	function clearOpts(elt) {
		elt.innerHTML = "";
	}
	function addOpts(elt, opts) {
		for (const opt of opts) {
			const oe = document.createElement("option");
			oe.value = opt;
			oe.text = opt;
			elt.add(oe);
		}
	}
	function wrapIntoScript(distro, version) {
		return '( S=install-linuxcontainers.sh ; "$TERMSH" copy -f -fu "https://raw.githubusercontent.com/green-green-avk/AnotherTerm-scripts/master/$S" -tp . && chmod 755 $S && sh ./$S -a ' + distro + ' ' + version + ' )';
	}
	// Temporary solution with a CORS proxy:
	// const src = "https://cors-anywhere.herokuapp.com/https://images.linuxcontainers.org/meta/1.0/index-user";
	// Finally: caching proxy:
	const src = "https://small-proxy-301517.wm.r.appspot.com/linuxcontainers.idx";
	fetch(src).then(resp => {
			if (!resp.ok) throw resp.statusText;
			return resp.text();
		}).then(text => {
			if (text == null || text == "") throw "Something looks wrong."
			const wDistro = document.getElementById("distro");
			const wVersion = document.getElementById("version");
			const wArches = document.getElementById("arches");
			const list = parse(text);
			wVersion.oninput = () => {
				wSnippet.innerText = "";
				const distro = wDistro.value;
				const version = wVersion.value;
				if (distro == null || version == null) return;
				wArches.innerText = Array.from(list.get(distro).get(version).keys()).join(", ");
				const snippet = wrapIntoScript(distro, version);
				if (hljs != null) {
					wSnippet.className = "hljs";
					wSnippet.innerHTML = hljs.highlight(snippet, {language: "sh", ignoreIllegals: true}).value;
				} else {
					wSnippet.className = "";
					wSnippet.innerText = snippet;
				}
			};
			wDistro.oninput = () => {
				clearOpts(wVersion);
				const v = list.get(wDistro.value);
				if (v == null) return;
				addOpts(wVersion, v.keys());
				wVersion.oninput();
			};
			clearOpts(wDistro);
			addOpts(wDistro, list.keys());
			wDistro.oninput();
		}).catch(err => {
			wSnippet.innerText = "Oops: " + err;
		});
})();

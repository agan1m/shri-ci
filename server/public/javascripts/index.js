
window.onload = function() {
	document.querySelector('#deploy').addEventListener('click', handlerDeploy);
	document.querySelector('#close').addEventListener('click', handlerClose);
};

function handlerDeploy() {
	fetch(
		`/deploy?command=npm run build`
	);
}

function handlerClose() {
	fetch('/notify_agent/close');
}

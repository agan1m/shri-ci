window.onload = function() {
	document.querySelector('#deploy').addEventListener('click', handlerDeploy);
	document.querySelector('#close').addEventListener('click', handlerClose);
};

function handlerDeploy() {
	fetch('/notify_agent?command=npm run build&port=3001&repository=F:\\shri-react');
}

function handlerClose() {
	fetch('/notify_agent/close');
}

window.onload = function() {
	document.querySelector('#deploy').addEventListener('click', handlerDeploy);
};

function handlerDeploy() {
	console.log('111');
	fetch('/notify');
}

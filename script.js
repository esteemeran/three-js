let scene, camera, renderer;
function init() {
	let canvas = document.getElementById('canv');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 45, 30000);
	camera.position.set(-900, -200, -900);

	renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	//controls
	let controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.addEventListener('change', renderer);
	controls.minDistance = 200;
	controls.maxDistance = 1500;
	controls.zoomSpeed = 20;

	//mesh
	let materialArray = [];
	let t_ft = new THREE.TextureLoader().load("afterrain_ft.jpg");
	let t_bk = new THREE.TextureLoader().load("afterrain_bk.jpg");
	let t_up = new THREE.TextureLoader().load("afterrain_up.jpg");
	let t_dn = new THREE.TextureLoader().load("afterrain_dn.jpg");
	let t_rf = new THREE.TextureLoader().load("afterrain_rt.jpg");
	let t_lf = new THREE.TextureLoader().load("afterrain_lf.jpg");

	materialArray.push(new THREE.MeshBasicMaterial({ map: t_ft }));
	materialArray.push(new THREE.MeshBasicMaterial({ map: t_bk }));
	materialArray.push(new THREE.MeshBasicMaterial({ map: t_up }));
	materialArray.push(new THREE.MeshBasicMaterial({ map: t_dn }));
	materialArray.push(new THREE.MeshBasicMaterial({ map: t_rf }));
	materialArray.push(new THREE.MeshBasicMaterial({ map: t_lf }));

	for (let i = 0; i < 6; i++)
		materialArray[i].side = THREE.BackSide;

	let skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
	let skybox = new THREE.Mesh(skyboxGeo, materialArray);
	scene.add(skybox);
}
//const material = new THREE.MeshBasicMaterial({ color: 0x006500 });

function animate() {
	renderer.render(scene, camera);
	requestAnimationFrame(animate);
	
};

init();
animate();
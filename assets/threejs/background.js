import * as THREE from 'three';

const scene = new THREE.Scene();
const frustumSize = 10;
const camera = new THREE.OrthographicCamera(
    frustumSize * -window.innerWidth / window.innerHeight / 2,
    frustumSize * window.innerWidth / window.innerHeight / 2,
    frustumSize / 2,
    frustumSize * -1 / 2,
    1,
    1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.querySelector('.canvas-container').appendChild(renderer.domElement);

function createRandomCube() {
    const sideSize = Math.random() * 1.5 + 0.5;
    const geometry = Math.random() < 0.5
        ? new THREE.BoxGeometry(sideSize, sideSize, sideSize)
        : new THREE.TetrahedronGeometry(sideSize, Math.floor(Math.random() * 2));
    const colors = [0x00ffcc, 0xff77ff, 0x04d9ff, 0xbc00fe, 0x9600ff, 0x00b8ff, 0x00fff9];
    const material = new THREE.LineBasicMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        transparent: true,
        opacity: 0.5
    });
    const line = new THREE.LineSegments(new THREE.WireframeGeometry(geometry), material);

    line.position.x = Math.floor((Math.random() - 0.5) * 100) / 100 * frustumSize * window.innerWidth / window.innerHeight;
    line.position.y = Math.floor((Math.random() - 0.5) * 100) / 100 * frustumSize;
    line.rotationSpeed = {
        x: (Math.random() - 0.5) * 0.005,
        y: (Math.random() - 0.5) * 0.005,
        z: (Math.random() - 0.5) * 0.005,
        w: (Math.random() - 0.5) * 0.01,
        v: (Math.random() / 2) * 0.005
    };

    scene.add(line);
    return line;
}

const cubes = Array.from({ length: 20 }, createRandomCube);
camera.position.z = 5;
camera.lookAt(0, 0, 0);

function animate() {
    cubes.forEach((cube) => {
        cube.rotation.x += cube.rotationSpeed.x;
        cube.rotation.y += cube.rotationSpeed.y;
        cube.rotation.z += cube.rotationSpeed.z;
        cube.position.y += cube.rotationSpeed.v;

        if (cube.position.y > frustumSize / 2 + 1) {
            cube.position.y = -(frustumSize / 2 + 1);
        }

        cube.position.x += Math.sin(Date.now() * 0.0005) * cube.rotationSpeed.w;
    });
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const aspect = width / height;
    camera.left = frustumSize * -aspect / 2;
    camera.right = frustumSize * aspect / 2;
    camera.top = frustumSize / 2;
    camera.bottom = frustumSize * -1 / 2;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
});

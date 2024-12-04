import * as THREE from 'three';

const scene = new THREE.Scene();
const aspect = window.innerWidth / window.innerHeight;
        const frustumSize = 10; // Size of the viewing volume
        const camera = new THREE.OrthographicCamera(
            frustumSize * -aspect / 2, // Left
            frustumSize * aspect / 2,  // Right
            frustumSize / 2,            // Top
            frustumSize * -1 / 2,       // Bottom
            1,                          // Near
            1000                        // Far
        );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
const canvasContainer = document.querySelector('.canvas-container');
canvasContainer.appendChild(renderer.domElement);

function createStarGeometry(size) {
    const shape = new THREE.Shape();
    const spikes = 5;
    const outerRadius = size;
    const innerRadius = size / 2;
    for (let i = 0; i < spikes * 2; i++) {
        const angle = (i / (spikes * 2)) * Math.PI * 2;
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        if (i === 0) {
            shape.moveTo(x, y);
        } else {
            shape.lineTo(x, y);
        }
    }
    const geometry = new THREE.ShapeGeometry(shape);
    return geometry;
}

function createRandomCube() {
    // Generate random sizes for the cube
    const sideSize = Math.random() * 1.5 + 0.5;

    const randomShape = Math.floor(Math.random() * 2); // 0 for cube, 1 for tetrahedron
    var geometry;

    switch (randomShape) {
        case 0: // Cube
            geometry = new THREE.BoxGeometry(sideSize, sideSize, sideSize);
            break;
        case 1: // Tetrahedron
            geometry = new THREE.TetrahedronGeometry(sideSize, Math.floor(Math.random() * 2));
            break;
    }

    const colors = [0x00ffcc, 0xff77ff, 0x04d9ff, 0xbc00fe, 0x9600ff, 0x00b8ff, 0x00fff9];
    const material = new THREE.LineBasicMaterial({ 
        color: colors[Math.floor(Math.random() * colors.length)],
        transparent: true, 
        opacity: 0.5 
    });

    // Create a wireframe using thicker lines
    const wireframe = new THREE.WireframeGeometry(geometry);
    const line = new THREE.LineSegments(wireframe, material);
    
    // Calculate the base position
    line.position.x = Math.floor((Math.random() - 0.5) * 100) / 100 * frustumSize * aspect;
    line.position.y = Math.floor((Math.random() - 0.5) * 100) / 100 * frustumSize;
    line.position.z = 0;

    // Random rotation speed and direction
    line.rotationSpeed = {
        x: (Math.random() - 0.5) * 0.005, // Random speed for x rotation
        y: (Math.random() - 0.5) * 0.005, // Random speed for y rotation
        z: (Math.random() - 0.5) * 0.005,
        w: (Math.random() - 0.5) * 0.01,
        v: (Math.random()/2) * 0.005
    };

    scene.add(line);
    return line; // Return the line object for rotation in animate function
}

// Create multiple random cubes
const numberOfCubes = 20; // Number of cubes to create
const cubes = []; // Array to hold all cubes
for (let i = 0; i < numberOfCubes; i++) {
    cubes.push(createRandomCube());
}

// Position the camera
camera.position.z = 5; // Move camera back to see the cubes
camera.lookAt(0, 0, 0); // Look at the center of the scene

// Animate the scene
function animate() {
    // Rotate each cube based on its random speed
    cubes.forEach((cube) => {
        cube.rotation.x += cube.rotationSpeed.x;
        cube.rotation.y += cube.rotationSpeed.y;
        cube.rotation.z += cube.rotationSpeed.z;

        // Floating up effect
        cube.position.y += cube.rotationSpeed.v;
        
        // If the cube reaches a certain height, reset its position
        if (cube.position.y > frustumSize/2+1) {
            cube.position.y = -(frustumSize/2+1);
        }

        // Bobbing effect on the x-axis
        const bobbingSpeed = 2; // Speed of bobbing
        cube.position.x += Math.sin(Date.now() * 0.0005) * cube.rotationSpeed.w;
    });
    renderer.render(scene, camera);
}

document.getElementById("pgpToggle").addEventListener("click", function() {
    var pgpKey = document.getElementById("pgpKey");
    if (pgpKey.classList.contains("hidden")) {
        pgpKey.classList.remove("hidden");
        this.textContent = this.textContent.replace("Show", "Hide");
    } else {
        pgpKey.classList.add("hidden");
        this.textContent = this.textContent.replace("Hide", "Show");
    }
});
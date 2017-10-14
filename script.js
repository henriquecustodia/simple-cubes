(function () {
    var colors = ['green', 'red', 'blue', 'pink'];

    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
    }

    function createCube() {
        var geometry = new THREE.BoxGeometry(1, 1, 1);

        var color = colors[getRandomIntInclusive(0, colors.length - 1)]
        var material = new THREE.MeshBasicMaterial({ color: color });

        var cube = new THREE.Mesh(geometry, material);
        cube.uuid
        cube.position.x = getRandomIntInclusive(-3, 3);
        cube.position.y = getRandomIntInclusive(-3, 3);
        return cube;
    }

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    var domEvents = new THREEx.DomEvents(camera, renderer.domElement)

    var cubes = [];

    for (var index = 0; index < 10; index++) {
        cubes.push(createCube());
    }

    cubes.forEach(cube => {

        domEvents.addEventListener(cube, 'click', function (event) {
            const i = setInterval(() => {
                cube.position.z -= 10;
            }, 100);

            setTimeout(() => {
                clearInterval(i);
                scene.remove(cube);
            }, 1000);
        }, false)

        scene.add(cube);
    });

    camera.position.z = 5;

    var animate = function () {
        requestAnimationFrame(animate);
        
        cubes.forEach(cube => {
            cube.rotation.x += 0.1;
            cube.rotation.y += 0.1;
        });

        renderer.render(scene, camera);
    };

    animate();

})();

// particles.js configuration
particlesJS("particles-container", {
    particles: {
      number: {
        value: 100, // Number of particles
        density: {
          enable: true,
          value_area: 800, // Area of effect for density
        },
      },
      color: {
        value: "#ffffff", // Color of particles
      },
      shape: {
        type: "circle", // Shape of particles
        stroke: {
          width: 0,
          color: "#000000", // Border color
        },
        polygon: {
          nb_sides: 5, // Number of sides for polygon shapes
        },
      },
      opacity: {
        value: 0.5, // Opacity of particles
        random: false,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 5, // Size of particles
        random: true,
        anim: {
          enable: false,
          speed: 40,
          size_min: 0.1,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 150, // Distance for line linking
        color: "#ffffff", // Color of linking lines
        opacity: 0.4,
        width: 1, // Width of linking lines
      },
      move: {
        enable: true,
        speed: 6, // Movement speed of particles
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "grab", // Mode on hover
        },
        onclick: {
          enable: true,
          mode: "push", // Mode on click
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 140, // Distance for grab effect
          line_linked: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3,
        },
        push: {
          particles_nb: 4, // Number of particles to add on click
        },
        remove: {
          particles_nb: 2, // Number of particles to remove on click
        },
      },
    },
    retina_detect: true, // Detect retina display for better rendering
  });
  
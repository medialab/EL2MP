<script>
    import { onMount, onDestroy } from "svelte";
  
    // Simulation parameters bound to the sliders.
    let feedVal = 0.037;
    let kVal = 0.06;
    let dAVal = 0.2237;
    let dBVal = 0.1295;
    // Removed dt parameter.
  
    let myp5;
  
    onMount(async () => {
      // Dynamically import p5 on the client side.
      const p5Module = await import("p5");
      const p5 = p5Module.default;
  
      const sketch = (p) => {
        let grid;
        let next;
  
        p.setup = () => {
          p.createCanvas(300, 300);
          p.pixelDensity(1);
          grid = [];
          next = [];
          for (let x = 0; x < p.width; x++) {
            grid[x] = [];
            next[x] = [];
            for (let y = 0; y < p.height; y++) {
              grid[x][y] = { a: 1, b: 0 };
              next[x][y] = { a: 1, b: 0 };
            }
          }
          // Seed a small square in the center with B = 1.
          const midX = Math.floor(p.width / 2);
          const midY = Math.floor(p.height / 2);
          for (let i = midX - 5; i < midX + 5; i++) {
            for (let j = midY - 5; j < midY + 5; j++) {
              grid[i][j].b = 1;
            }
          }
          // Pre-run the simulation several iterations so that the pattern is already developed.
          for (let n = 0; n < 100; n++) {
            for (let x = 1; x < p.width - 1; x++) {
              for (let y = 1; y < p.height - 1; y++) {
                const a = grid[x][y].a;
                const b = grid[x][y].b;
                next[x][y].a = a + (dAVal * laplaceA(x, y) - a * b * b + feedVal * (1 - a));
                next[x][y].b = b + (dBVal * laplaceB(x, y) + a * b * b - (kVal + feedVal) * b);
                next[x][y].a = p.constrain(next[x][y].a, 0, 1);
                next[x][y].b = p.constrain(next[x][y].b, 0, 1);
              }
            }
            swap();
          }
        };
  
        p.draw = () => {
          // Clear the canvas to transparent.
          p.clear();
  
          // One simulation iteration per draw frame.
          for (let x = 1; x < p.width - 1; x++) {
            for (let y = 1; y < p.height - 1; y++) {
              const a = grid[x][y].a;
              const b = grid[x][y].b;
              next[x][y].a = a + (dAVal * laplaceA(x, y) - a * b * b + feedVal * (1 - a));
              next[x][y].b = b + (dBVal * laplaceB(x, y) + a * b * b - (kVal + feedVal) * b);
              next[x][y].a = p.constrain(next[x][y].a, 0, 1);
              next[x][y].b = p.constrain(next[x][y].b, 0, 1);
            }
          }
          swap();
  
          // Define a circular region.
          const centerX = p.width / 2;
          const centerY = p.height / 2;
          const radius = (p.min(p.width, p.height) / 2) * 0.9;
  
          p.loadPixels();
          for (let x = 0; x < p.width; x++) {
            for (let y = 0; y < p.height; y++) {
              const idx = (x + y * p.width) * 4;
              if (p.dist(x, y, centerX, centerY) <= radius) {
                const a = next[x][y].a;
                const b = next[x][y].b;
                let c = p.floor((a - b) * 255);
                c = p.constrain(c, 0, 255);
                p.pixels[idx + 0] = c;
                p.pixels[idx + 1] = c;
                p.pixels[idx + 2] = c;
                p.pixels[idx + 3] = 255; // Opaque within the circle.
              } else {
                // Outside the circle, set transparent.
                p.pixels[idx + 0] = 0;
                p.pixels[idx + 1] = 0;
                p.pixels[idx + 2] = 0;
                p.pixels[idx + 3] = 0;
              }
            }
          }
          p.updatePixels();
        };
  
        function laplaceA(x, y) {
          let sumA = 0;
          sumA += grid[x][y].a * -1;
          sumA += grid[x - 1][y].a * 0.2;
          sumA += grid[x + 1][y].a * 0.2;
          sumA += grid[x][y + 1].a * 0.2;
          sumA += grid[x][y - 1].a * 0.2;
          sumA += grid[x - 1][y - 1].a * 0.05;
          sumA += grid[x + 1][y - 1].a * 0.05;
          sumA += grid[x + 1][y + 1].a * 0.05;
          sumA += grid[x - 1][y + 1].a * 0.05;
          return sumA;
        }
  
        function laplaceB(x, y) {
          let sumB = 0;
          sumB += grid[x][y].b * -1;
          sumB += grid[x - 1][y].b * 0.2;
          sumB += grid[x + 1][y].b * 0.2;
          sumB += grid[x][y + 1].b * 0.2;
          sumB += grid[x][y - 1].b * 0.2;
          sumB += grid[x - 1][y - 1].b * 0.05;
          sumB += grid[x + 1][y - 1].b * 0.05;
          sumB += grid[x + 1][y + 1].b * 0.05;
          sumB += grid[x - 1][y + 1].b * 0.05;
          return sumB;
        }
  
        function swap() {
          const temp = grid;
          grid = next;
          next = temp;
        }
      };
  
      myp5 = new p5(sketch, document.getElementById("p5-container"));
    });
  
    onDestroy(() => {
      if (myp5) {
        myp5.remove();
      }
    });
  </script>
  
  <!-- Container for the p5 canvas (mobile only) -->
  <div id="p5-container"></div>
  
  <!-- Sliders for controlling simulation parameters -->
  <div id="controls">
    <label>
      Feed Rate: {feedVal.toFixed(3)}
      <input
        type="range"
        min="0.0"
        max="0.1"
        step="0.001"
        bind:value={feedVal}
      />
    </label>
    <label>
      Kill Rate: {kVal.toFixed(3)}
      <input
        type="range"
        min="0.0"
        max="0.1"
        step="0.001"
        bind:value={kVal}
      />
    </label>
    <label>
      dA (Diffusion A): {dAVal.toFixed(4)}
      <input
        type="range"
        min="0.0"
        max="1.0"
        step="0.0001"
        bind:value={dAVal}
      />
    </label>
    <label>
      dB (Diffusion B): {dBVal.toFixed(4)}
      <input
        type="range"
        min="0.0"
        max="1.0"
        step="0.0001"
        bind:value={dBVal}
      />
    </label>
  </div>
  
  <style>
    /* Mobile-only container for the p5 canvas */
    #p5-container {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: auto;
      width: 100%;
      height: 60vh;
    }
    
    /* Ensure the canvas is transparent */
    canvas {
      width: 90%;
      height: auto;
      border: 1px solid #fff;
      background-color: transparent;
    }
  
    /* Slider controls styling */
    #controls {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin: 1rem auto;
      width: 90%;
      max-width: 300px;
    }
    label {
      display: flex;
      flex-direction: column;
      color: #000; /* Labels now black */
    }
    input[type="range"] {
      width: 100%;
    }
  
    /* Hide p5 container on larger screens */
    @media (min-width: 768px) {
      #p5-container {
        display: none;
      }
    }
  
    /* Dark background for contrast */
    :global(body) {
      background: #222;
    }
  </style>
  
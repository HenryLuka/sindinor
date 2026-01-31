/**
 * SINDINOR Enterprise App Core
 * Main Entry Point.
 */

import { ApiService } from '../services/api.js';
import { AnimationSystem } from '../ui/animations.js';
import { PublicUI } from '../ui/public-ui.js';
import { ParticleSystem } from '../ui/particles.js';

class App {
    static async start() {
        console.log("🚀 SINDINOR System Starting...");

        // 1. Render UI (Connects to API automatically)
        await PublicUI.init();

        // 2. Start Visual Engines
        requestAnimationFrame(() => {
            const animSystem = new AnimationSystem();
            animSystem.init();

            // Hero VFX
            new ParticleSystem('hero-canvas');
        });
    }
}

// Boot
document.addEventListener('DOMContentLoaded', App.start);

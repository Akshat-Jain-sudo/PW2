// Web Audio API Procedural Sound Synthesizer
// Provides interactive futuristic hacker and paranormal SFX without external audio files.

class SoundFXEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private droneGain: GainNode | null = null;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private listeners: Set<(muted: boolean) => void> = new Set();

  constructor() {
    // AudioContext will be initialized on first user gesture to comply with browser autoplay policies
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (!this.isMuted) {
      this.initContext();
      this.playBootBeep();
      this.startAmbientDrone();
    } else {
      this.stopAmbientDrone();
    }
    this.notifyListeners();
    return this.isMuted;
  }

  public setMuted(muted: boolean) {
    if (this.isMuted === muted) return;
    this.isMuted = muted;
    if (!this.isMuted) {
      this.initContext();
      this.startAmbientDrone();
    } else {
      this.stopAmbientDrone();
    }
    this.notifyListeners();
  }

  public subscribe(callback: (muted: boolean) => void) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  private notifyListeners() {
    this.listeners.forEach((cb) => cb(this.isMuted));
  }

  // --- SOUND GENERATORS ---

  // Soft futuristic terminal click
  public playTypingClick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      const baseFreq = 1600 + Math.random() * 800;
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(baseFreq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.04);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, this.ctx.currentTime);
      filter.Q.setValueAtTime(3, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {
      // Ignore audio synthesis errors on suspended states
    }
  }

  // Boot sequence confirmation beep
  public playBootBeep() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.setValueAtTime(1760, now + 0.08);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.26);
    } catch {
      // Ignore
    }
  }

  // Radar sonar ping
  public playRadarPing(pitchMultiplier: number = 1) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1320 * pitchMultiplier, now);
      osc.frequency.exponentialRampToValueAtTime(880 * pitchMultiplier, now + 0.4);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.65);
    } catch {
      // Ignore
    }
  }

  // Paranormal entity lock alarm
  public playWarningAlarm() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      for (let i = 0; i < 3; i++) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = now + i * 0.12;

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(900, startTime);
        osc.frequency.setValueAtTime(1350, startTime + 0.06);

        gain.gain.setValueAtTime(0.07, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.11);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.12);
      }
    } catch {
      // Ignore
    }
  }

  // Cybernetic Glitch burst (Noise + FM)
  public playGlitch() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const bufferSize = this.ctx.sampleRate * 0.15;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2400, this.ctx.currentTime);
      filter.Q.setValueAtTime(8, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      whiteNoise.start();
    } catch {
      // Ignore
    }
  }

  // Card hover feedback
  public playCardHover() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(660, now + 0.06);

      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch {
      // Ignore
    }
  }

  // Heavy mechanical modal open
  public playOpenDossier() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(200, now);
      osc1.frequency.exponentialRampToValueAtTime(700, now + 0.2);

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(350, now);
      osc2.frequency.exponentialRampToValueAtTime(1400, now + 0.2);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.32);
      osc2.stop(now + 0.32);
    } catch {
      // Ignore
    }
  }

  // Ambient paranormal portal drone
  private startAmbientDrone() {
    if (this.droneGain || !this.ctx) return;

    try {
      this.droneGain = this.ctx.createGain();
      this.droneGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      this.droneGain.gain.exponentialRampToValueAtTime(0.025, this.ctx.currentTime + 3.0);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, this.ctx.currentTime);

      this.droneOsc1 = this.ctx.createOscillator();
      this.droneOsc1.type = 'sawtooth';
      this.droneOsc1.frequency.setValueAtTime(55, this.ctx.currentTime); // A1 sub-bass

      this.droneOsc2 = this.ctx.createOscillator();
      this.droneOsc2.type = 'sine';
      this.droneOsc2.frequency.setValueAtTime(57.5, this.ctx.currentTime); // Slight detune for pulsing beat

      this.droneOsc1.connect(filter);
      this.droneOsc2.connect(filter);
      filter.connect(this.droneGain);
      this.droneGain.connect(this.ctx.destination);

      this.droneOsc1.start();
      this.droneOsc2.start();
    } catch {
      // Ignore
    }
  }

  private stopAmbientDrone() {
    if (!this.droneGain || !this.ctx) return;
    try {
      this.droneGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);
      setTimeout(() => {
        if (this.droneOsc1) {
          try { this.droneOsc1.stop(); } catch { /* ignore */ }
          this.droneOsc1.disconnect();
          this.droneOsc1 = null;
        }
        if (this.droneOsc2) {
          try { this.droneOsc2.stop(); } catch { /* ignore */ }
          this.droneOsc2.disconnect();
          this.droneOsc2 = null;
        }
        if (this.droneGain) {
          this.droneGain.disconnect();
          this.droneGain = null;
        }
      }, 600);
    } catch {
      // Ignore
    }
  }
}

export const soundFX = new SoundFXEngine();

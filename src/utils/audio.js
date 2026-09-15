class SoundController {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMuted(mute) {
    this.muted = mute;
  }

  playTone(freq, type, duration, gainVal = 0.1) {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      
      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Ignore policy errors prior to first user gesture
    }
  }

  click() {
    this.playTone(800, 'sine', 0.05, 0.05);
  }

  placePiece(isX = true) {
    this.playTone(isX ? 520 : 380, 'triangle', 0.12, 0.1);
  }

  invalid() {
    this.playTone(160, 'sawtooth', 0.15, 0.08);
  }

  vanish() {
    this.playTone(240, 'sine', 0.25, 0.12);
  }

  win() {
    if (this.muted) return;
    const notes = [440, 554, 659, 880];
    notes.forEach((note, idx) => {
      setTimeout(() => {
        this.playTone(note, 'sine', 0.35, 0.15);
      }, idx * 100);
    });
  }
}

export const soundFx = new SoundController();
"use client";

import { useState } from "react";
import { TextSlashAnimation } from "@/components/text-slash-animation";
import { TextReveal } from "@/components/text-reveal";
import { TypingAnimation } from "@/components/typing-animation";
import { ShineAnimation } from "@/components/shine-animation";
import { FadeAnimation } from "@/components/fade-animation";
import { BounceAnimation } from "@/components/bounce-animation";
import { WaveAnimation } from "@/components/wave-animation";
import { GlitchAnimation } from "@/components/glitch-animation";
import { BlurAnimation } from "@/components/blur-animation";
import { GradientAnimation } from "@/components/gradient-animation";
import { FlipAnimation } from "@/components/flip-animation";
import { ScaleAnimation } from "@/components/scale-animation";
import { SlotMachineAnimation } from "@/components/slot-machine-animation";
import { MatrixAnimation } from "@/components/matrix-animation";
import { ScrambleAnimation } from "@/components/scramble-animation";
import { PerspectiveAnimation } from "@/components/perspective-animation";
import { FireAnimation } from "@/components/fire-animation";
import { NeonAnimation } from "@/components/neon-animation";
import { WaterAnimation } from "@/components/water-animation";
import { ShadowDanceAnimation } from "@/components/shadow-dance-animation";
import { InkBlotAnimation } from "@/components/ink-blot-animation";
import { TypewriterAnimation } from "@/components/typewriter-animation";
import { MagneticAnimation } from "@/components/magnetic-animation";
import { HologramAnimation } from "@/components/hologram-animation";
import { CyberAnimation } from "@/components/cyber-animation";
import { SandAnimation } from "@/components/sand-animation";
import { CircuitAnimation } from "@/components/circuit-animation";
import { SplitHorrorAnimation } from "@/components/split-horror-animation";
import { Glitch3DAnimation } from "@/components/glitch-3d-animation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Footer } from "@/components/footer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Animation type enum
enum AnimationType {
  SLASH = "slash",
  REVEAL = "reveal",
  TYPING = "typing",
  SHINE = "shine",
  FADE = "fade",
  BOUNCE = "bounce",
  WAVE = "wave",
  GLITCH = "glitch",
  BLUR = "blur",
  GRADIENT = "gradient",
  FLIP = "flip",
  SCALE = "scale",
  SLOT_MACHINE = "slot_machine",
  MATRIX = "matrix",
  SCRAMBLE = "scramble",
  PERSPECTIVE = "perspective",
  FIRE = "fire",
  NEON = "neon",
  WATER = "water",
  SHADOW_DANCE = "shadow_dance",
  INK_BLOT = "ink_blot",
  TYPEWRITER = "typewriter",
  MAGNETIC = "magnetic",
  HOLOGRAM = "hologram",
  CYBER = "cyber",
  SAND = "sand",
  CIRCUIT = "circuit",
  SPLIT_HORROR = "split_horror",
  GLITCH_3D = "glitch_3d",
}

// Animation component mapping
const ANIMATION_COMPONENTS: Record<AnimationType, React.FC<{ text: string; className: string; darkMode: boolean }>> = {
  [AnimationType.SLASH]: TextSlashAnimation,
  [AnimationType.REVEAL]: TextReveal,
  [AnimationType.TYPING]: TypingAnimation,
  [AnimationType.SHINE]: ShineAnimation,
  [AnimationType.FADE]: FadeAnimation,
  [AnimationType.BOUNCE]: BounceAnimation,
  [AnimationType.WAVE]: WaveAnimation,
  [AnimationType.GLITCH]: GlitchAnimation,
  [AnimationType.BLUR]: BlurAnimation,
  [AnimationType.GRADIENT]: GradientAnimation,
  [AnimationType.FLIP]: FlipAnimation,
  [AnimationType.SCALE]: ScaleAnimation,
  [AnimationType.SLOT_MACHINE]: SlotMachineAnimation,
  [AnimationType.MATRIX]: MatrixAnimation,
  [AnimationType.SCRAMBLE]: ScrambleAnimation,
  [AnimationType.PERSPECTIVE]: PerspectiveAnimation,
  [AnimationType.FIRE]: FireAnimation,
  [AnimationType.NEON]: NeonAnimation,
  [AnimationType.WATER]: WaterAnimation,
  [AnimationType.SHADOW_DANCE]: ShadowDanceAnimation,
  [AnimationType.INK_BLOT]: InkBlotAnimation,
  [AnimationType.TYPEWRITER]: TypewriterAnimation,
  [AnimationType.MAGNETIC]: MagneticAnimation,
  [AnimationType.HOLOGRAM]: HologramAnimation,
  [AnimationType.CYBER]: CyberAnimation,
  [AnimationType.SAND]: SandAnimation,
  [AnimationType.CIRCUIT]: CircuitAnimation,
  [AnimationType.SPLIT_HORROR]: SplitHorrorAnimation,
  [AnimationType.GLITCH_3D]: Glitch3DAnimation,
};

export default function Home() {
  const [text, setText] = useState("minhvo.is-a.dev");
  const [inputText, setInputText] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [animationType, setAnimationType] = useState<AnimationType>(AnimationType.SLASH);
  const [key, setKey] = useState(0);

  // Get the current animation component
  const CurrentAnimationComponent = ANIMATION_COMPONENTS[animationType];

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-8 ${
        darkMode ? "dark bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="max-w-3xl w-full space-y-12">
        <div className="space-y-6">
          <h1 className={`text-3xl font-bold text-center ${darkMode ? "text-white" : "text-black"}`}>
            Text Animation Collection
          </h1>

          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text to animate"
              className={`flex-1 ${darkMode ? "text-white placeholder:text-gray-400" : ""}`}
            />
            <Button onClick={() => setText(inputText)}>Animate</Button>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center space-x-2">
              <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
              <Label htmlFor="dark-mode" className={darkMode ? "text-white" : "text-black"}>
                Dark Mode
              </Label>
            </div>

            <div className="flex-1 w-full sm:w-auto">
              <Select value={animationType} onValueChange={(value) => setAnimationType(value as AnimationType)}>
                <SelectTrigger className={`w-full ${darkMode ? "text-white border-gray-700" : ""}`}>
                  <SelectValue placeholder="Select animation type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={AnimationType.SLASH}>Slash Animation</SelectItem>
                  <SelectItem value={AnimationType.REVEAL}>Text Reveal</SelectItem>
                  <SelectItem value={AnimationType.TYPING}>Typing</SelectItem>
                  <SelectItem value={AnimationType.SHINE}>Shine</SelectItem>
                  <SelectItem value={AnimationType.FADE}>Fade In</SelectItem>
                  <SelectItem value={AnimationType.BOUNCE}>Bounce</SelectItem>
                  <SelectItem value={AnimationType.WAVE}>Wave</SelectItem>
                  <SelectItem value={AnimationType.GLITCH}>Glitch</SelectItem>
                  <SelectItem value={AnimationType.BLUR}>Blur</SelectItem>
                  <SelectItem value={AnimationType.GRADIENT}>Gradient</SelectItem>
                  <SelectItem value={AnimationType.FLIP}>Flip</SelectItem>
                  <SelectItem value={AnimationType.SCALE}>Scale</SelectItem>
                  {/* <SelectItem value={AnimationType.SLOT_MACHINE}>Slot Machine</SelectItem> */}
                  {/* <SelectItem value={AnimationType.MATRIX}>Matrix</SelectItem> */}
                  {/* <SelectItem value={AnimationType.SCRAMBLE}>Scramble</SelectItem> */}
                  {/* <SelectItem value={AnimationType.PERSPECTIVE}>3D Perspective</SelectItem> */}
                  {/* <SelectItem value={AnimationType.FIRE}>Fire</SelectItem> */}
                  {/* <SelectItem value={AnimationType.NEON}>Neon</SelectItem> */}
                  {/* <SelectItem value={AnimationType.WATER}>Water</SelectItem> */}
                  {/* <SelectItem value={AnimationType.SHADOW_DANCE}>Shadow Dance</SelectItem> */}
                  <SelectItem value={AnimationType.INK_BLOT}>Ink Blot</SelectItem>
                  {/* <SelectItem value={AnimationType.TYPEWRITER}>Typewriter</SelectItem> */}
                  {/* <SelectItem value={AnimationType.MAGNETIC}>Magnetic</SelectItem> */}
                  {/* <SelectItem value={AnimationType.HOLOGRAM}>Hologram</SelectItem> */}
                  <SelectItem value={AnimationType.CYBER}>Cyber</SelectItem>
                  {/* <SelectItem value={AnimationType.SAND}>Sand</SelectItem> */}
                  {/* <SelectItem value={AnimationType.CIRCUIT}>Circuit</SelectItem> */}
                  {/* <SelectItem value={AnimationType.SPLIT_HORROR}>Split Horror</SelectItem> */}
                  {/* <SelectItem value={AnimationType.GLITCH_3D}>Glitch 3D</SelectItem> */}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div
          className={`min-h-[200px] flex items-center justify-center p-8 rounded-lg ${
            darkMode ? "bg-gray-800" : "bg-white"
          } shadow-md relative`}
        >
          <CurrentAnimationComponent key={key} text={text} className="text-2xl" darkMode={darkMode} />
          <Button variant="ghost" size="icon" className="absolute top-0 right-0" onClick={() => setKey((k) => k + 1)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`${darkMode ? "text-white" : "text-black"}`}
            >
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
              <path d="M21 3v5h-5" />
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
              <path d="M8 16H3v5" />
            </svg>
          </Button>
        </div>

        <div className="space-y-4">
          <h2 className={`text-xl font-semibold ${darkMode ? "text-white" : "text-black"}`}>Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              variant="outline"
              onClick={() => setText("minhvo.is-a.dev")}
              className={`h-auto py-2 ${darkMode ? "text-white border-gray-700" : ""}`}
            >
              minhvo.is-a.dev
            </Button>
            <Button
              variant="outline"
              onClick={() => setText("quang minh")}
              className={`h-auto py-2 ${darkMode ? "text-white border-gray-700" : ""}`}
            >
              ReactJS
            </Button>
            <Button
              variant="outline"
              onClick={() => setText("Lorem ipsum")}
              className={`h-auto py-2 ${darkMode ? "text-white border-gray-700" : ""}`}
            >
              Lorem ipsum
            </Button>
            <Button
              variant="outline"
              onClick={() => setText("Lorem ipsum dolor sit amet...")}
              className={`h-auto py-2 ${darkMode ? "text-white border-gray-700" : ""}`}
            >
              Lorem ipsum dolor sit amet...
            </Button>
          </div>
        </div>

        <Footer darkMode={darkMode} />
      </div>
    </main>
  );
}

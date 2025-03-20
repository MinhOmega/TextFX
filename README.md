# Text Animation Collection

A comprehensive collection of text animation components for React applications. Easily add visually engaging text effects to your websites and applications.

![Text Animation Preview](https://minhvo.is-a.dev/text-animation-preview.png)

## Features

- **25+ Text Animation Effects**: From simple fade-ins to complex holographic displays
- **Dark Mode Support**: All animations are optimized for both light and dark modes
- **Customizable**: Easily customize animations with props
- **Responsive**: Works well on all device sizes
- **Zero Dependencies**: Pure React and CSS animations, no additional animation libraries required
- **TypeScript Support**: Fully typed components for better development experience

## Demo

Visit [https://minhvo.is-a.dev/text-animation](https://minhvo.is-a.dev/text-animation) to see all animations in action.

## Installation

```bash
git clone https://github.com/minhvo-dev/text-animation.git
cd text-animation
npm install
npm run dev
```

## Available Animations

This collection includes the following animations:

1. **Text Slash**: Reveals text with a slashing animation
2. **Text Reveal**: Smooth reveal animation
3. **Typing**: Classic typewriter effect
4. **Shine**: Text with shine/glossy effect passing through
5. **Fade**: Simple fade-in animation
6. **Bounce**: Letters bouncing in sequence
7. **Wave**: Wavy animation for text
8. **Glitch**: Cyberpunk-style glitch effect
9. **Blur**: Text emerging from blur
10. **Gradient**: Color gradient transition effect
11. **Flip**: 3D flip animation
12. **Scale**: Size scaling animation
13. **Slot Machine**: Slot machine style character changing
14. **Matrix**: Matrix code-like falling characters
15. **Scramble**: Characters scrambling before settling
16. **3D Perspective**: Text with 3D perspective movement
17. **Fire**: Burning text with flame effects
18. **Neon**: Neon sign glow effect
19. **Water**: Water ripple effect on text
20. **Shadow Dance**: Dynamic shadow movement
21. **Ink Blot**: Ink spreading animation
22. **Typewriter**: Enhanced typewriter with cursor
23. **Magnetic**: Magnetic field interaction with mouse
24. **Hologram**: Sci-fi holographic projection
25. **Cyber**: Cyberpunk styled text with grid effects
26. **Sand**: Desert sand particle effect
27. **Circuit**: Electronic circuit path animation
28. **Split Horror**: Horror-themed splitting effect

## Usage

Each animation is available as a React component. Here's how to use them in your components:

```jsx
import { WaveAnimation } from "@/components/wave-animation"

export default function MyComponent() {
  return (
    <WaveAnimation 
      text="Hello World" 
      className="text-2xl" 
      darkMode={false} 
    />
  )
}
```

## Component Props

All animation components share the same props structure:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | string | (required) | The text to animate |
| `className` | string | "" | Additional CSS classes |
| `darkMode` | boolean | false/true (varies) | Whether to use dark mode styling |

## Contributing

Contributions are welcome! If you'd like to add a new animation or improve an existing one:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-animation`)
3. Commit your changes (`git commit -m 'Add amazing animation'`)
4. Push to the branch (`git push origin feature/amazing-animation`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Created by [Minh Vo](https://minhvo.is-a.dev)
- Inspired by various text animation techniques from across the web
- Built with Next.js and TypeScript

## Contact

For any questions or suggestions, feel free to reach out at minh@example.com or create an issue in this repository. 
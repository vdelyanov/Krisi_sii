/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'primary': '#C83030',
        'accent': '#5688C7',
        'yellow': '#F7F86A',
        'cream': '#FFF3D4',
        'gray': '#C4C7C7',
        'dark-gray': '#d3d3d3',
        'black': '#000000',
        'white': '#f8f8f8',
    },
    corePlugins: {
      preflight: false, // Disables the preflight entirely
    },
    },
  },
  plugins: [
    
  ],
};

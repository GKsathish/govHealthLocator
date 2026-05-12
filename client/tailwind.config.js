export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        medical: {
          50: '#effaff',
          100: '#dff4ff',
          500: '#168aad',
          600: '#0f7898',
          700: '#0b647c'
        }
      },
      boxShadow: {
        glass: '0 20px 60px rgba(15, 118, 110, 0.16)'
      }
    }
  },
  plugins: []
};

# PRS Guitar Year Identifier

A React + Vite web application that identifies PRS (Paul Reed Smith) guitar models and manufacturing years from serial numbers.

**Note:** This is an unofficial tool and is not affiliated with PRS Guitars. For official support, please visit [PRS Support](https://support.prsguitars.com).

## Features

- 🔍 Identify PRS guitar models and years from serial numbers
- 📋 Supports all PRS models:
  - Standard Set-Neck models
  - CE models (1988-2008 and 2016+)
  - SE models (Korea and Indonesia)
  - S2 Series
  - Swamp Ash Special
  - EG models
  - Acoustic guitars
  - Bass guitars (Bolt-On, Set-Neck, Electric Bass)
  - Amplifiers
  - Speaker Cabinets
- 🎨 Modern, responsive UI
- 📖 Direct link to official PRS identification guide

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd prs-guitar-checker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Usage

1. Enter your PRS guitar's serial number in the input field
2. Click "Identify Guitar" or press Enter
3. View the identification results including:
   - Model type
   - Manufacturing year
   - Serial number location
   - Confidence level

## Serial Number Locations

- **Set-Neck models**: Back of headstock
- **CE, EG, Swamp Ash Special**: Neck plate on back of guitar
- **SE models**: Back of headstock
- **S2 Series**: Back of headstock
- **Acoustic guitars**: Label inside sound hole
- **Bass guitars**: Back of headstock or neck plate
- **Amplifiers**: Back of amp, upper right corner or sticker
- **Speaker Cabinets**: Back of cabinet, upper right corner

## Reference

This application is based on the official PRS Guitars Year Identification guide:
https://support.prsguitars.com/hc/en-us/articles/4408314427547-Year-Identification

A local copy of the guide is saved as `prs_year_identification_guide.txt` in the project root.

## Technologies Used

- React 19
- Vite 7
- CSS3 (with modern features like gradients and animations)

## Contributing

Found an issue with the identification algorithm or have suggestions for improvement? 

**Contact:** [alexander.chisler@gmail.com](mailto:alexander.chisler@gmail.com)

Please include:
- The serial number you're trying to identify
- The expected result vs. actual result
- Any additional context about the guitar

## License

This project is for educational and personal use. PRS Guitars is a trademark of PRS Guitars, LLC.

## Contact

For questions, bug reports, or suggestions about the identification algorithm, please contact:

**Alexander Chisler**  
Email: [alexander.chisler@gmail.com](mailto:alexander.chisler@gmail.com)

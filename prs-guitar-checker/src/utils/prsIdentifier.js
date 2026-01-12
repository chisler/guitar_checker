// PRS Guitar Year Identification Logic
// Based on: https://support.prsguitars.com/hc/en-us/articles/4408314427547-Year-Identification

// Year prefix mapping (prefix -> possible years)
const YEAR_PREFIXES = {
  '0': [1990, 2000],
  '1': [1991, 2001],
  '2': [1992, 2002],
  '3': [1993, 2003],
  '4': [1994, 2004],
  '5': [1985, 1995, 2005],
  '6': [1986, 1996, 2006],
  '7': [1987, 1997, 2007],
  '8': [1988, 1998],
  '9': [1989, 1999],
  '08': [2008],
  '09': [2009],
  '10': [2010],
  '11': [2011],
  '12': [2012],
  '13': [2013],
  '14': [2014],
  '15': [2015],
  '16': [2016],
  '17': [2017],
  '18': [2018],
  '19': [2019],
  '20': [2020],
  '21': [2021],
  '22': [2022],
  '23': [2023],
  '24': [2024],
};

// SE Korea letter prefixes
const SE_KOREA_PREFIXES = {
  'A': 2000, 'B': 2001, 'C': 2002, 'D': 2003, 'E': 2004,
  'F': 2005, 'G': 2006, 'H': 2007, 'I': 2008, 'J': 2009,
  'K': 2010, 'L': 2011, 'M': 2012, 'N': 2013, 'O': 2014,
  'P': 2015, 'Q': 2016, 'R': 2017, 'S': 2018, 'T': 2019,
  'U': 2020,
};

// SE Indonesia prefixes
const SE_INDONESIA_PREFIXES = {
  'IA': 2014, 'IB': 2015, 'IC': 2016, 'ID': 2017, 'IE': 2018,
  'CTIA': 2018, 'CTIB': 2019, 'CTIC': 2020, 'CTID': 2021,
  'CTIE': 2022, 'CTIF': 2023, 'CTIG': 2024,
};

// Set-neck serial number ranges
const SET_NECK_RANGES = [
  { min: 1, max: 400, year: 1985 },
  { min: 401, max: 1700, year: 1986 },
  { min: 1701, max: 3500, year: 1987 },
  { min: 3501, max: 5400, year: 1988 },
  { min: 5401, max: 7600, year: 1989 },
  { min: 7601, max: 10100, year: 1990 },
  { min: 10101, max: 12600, year: 1991 },
  { min: 12601, max: 15000, year: 1992 },
  { min: 15001, max: 17900, year: 1993 },
  { min: 17901, max: 20900, year: 1994 },
  { min: 20901, max: 24600, year: 1995 },
  { min: 24601, max: 29500, year: 1996 },
  { min: 29501, max: 34600, year: 1997 },
  { min: 34601, max: 39100, year: 1998 },
  { min: 39101, max: 44499, year: 1999 },
  { min: 44500, max: 52199, year: 2000 },
  { min: 52200, max: 62199, year: 2001 },
  { min: 62200, max: 72353, year: 2002 },
  { min: 72354, max: 82254, year: 2003 },
  { min: 82255, max: 92555, year: 2004 },
  { min: 92556, max: 103103, year: 2005 },
  { min: 103104, max: 114940, year: 2006 },
  { min: 114941, max: 132401, year: 2007 },
  { min: 132402, max: 146419, year: 2008 },
  { min: 146420, max: 159132, year: 2009 },
  { min: 159133, max: 170591, year: 2010 },
  { min: 170592, max: 183862, year: 2011 },
  { min: 183863, max: 196410, year: 2012 },
  { min: 196411, max: 206059, year: 2013 },
  { min: 206060, max: 215491, year: 2014 },
  { min: 215492, max: 224954, year: 2015 },
  { min: 224955, max: 236147, year: 2016 },
  { min: 236148, max: 248633, year: 2017 },
  { min: 248634, max: 271078, year: 2018 },
  { min: 271079, max: 298384, year: 2019 },
  { min: 298385, max: 315748, year: 2020 },
  { min: 315749, max: 340165, year: 2021 },
  { min: 340166, max: 354905, year: 2022 },
  { min: 35906, max: 363798, year: 2023 },
  { min: 375043, max: 397950, year: 2024 },
];

// CE Models (1988-2008)
const CE_OLD_RANGES = [
  { prefix: '7', min: 1, max: 270, year: 1988 },
  { prefix: '7', min: 271, max: 1830, year: 1989 },
  { prefix: '7', min: 1831, max: 3200, year: 1990 },
  { prefix: '7', min: 3201, max: 4540, year: 1991 },
  { prefix: '7', min: 4541, max: 7090, year: 1992 },
  { prefix: '7', min: 7091, max: 8820, year: 1993 },
  { prefix: '7', min: 8821, max: 10700, year: 1994 },
  { prefix: '7', min: 10701, max: 13000, year: 1995 },
  { prefix: '7', min: 13001, max: 14680, year: 1996 },
  { prefix: '7', min: 14681, max: 17130, year: 1997 },
  { prefix: '7', min: 17131, max: 19580, year: 1998 },
  { prefix: 'CE', min: 17131, max: 19580, year: 1998 },
  { prefix: 'CE', min: 19581, max: 20749, year: 1999 },
  { prefix: 'CE', min: 20750, max: 21599, year: 2000 },
  { prefix: 'CE', min: 21600, max: 23199, year: 2001 },
  { prefix: 'CE', min: 23200, max: 25389, year: 2002 },
  { prefix: 'CE', min: 25390, max: 26399, year: 2003 },
  { prefix: 'CE', min: 26400, max: 27900, year: 2004 },
  { prefix: 'CE', min: 27901, max: 29377, year: 2005 },
  { prefix: 'CE', min: 29378, max: 31800, year: 2006 },
  { prefix: 'CE', min: 31801, max: 32783, year: 2007 },
  { prefix: 'CE', min: 32784, max: 33881, year: 2008 },
];

// S2 Models
const S2_RANGES = [
  { min: 1, max: 3820, year: 2013 },
  { min: 3821, max: 10529, year: 2014 },
  { min: 10530, max: 17390, year: 2015 },
  { min: 17391, max: 23214, year: 2016 },
  { min: 23215, max: 27902, year: 2017 },
  { min: 27903, max: 36779, year: 2018 },
  { min: 36780, max: 43719, year: 2019 },
  { min: 43719, max: 49421, year: 2020 },
  { min: 49422, max: 59387, year: 2021 },
  { min: 59388, max: 65338, year: 2022 },
  { min: 65339, max: 67488, year: 2023 },
  { min: 71820, max: 78569, year: 2024 },
];

// Acoustic prefixes
const ACOUSTIC_PREFIXES = {
  'A09': 2009, 'A10': 2010, 'A11': 2011, 'A12': 2012, 'A13': 2013,
  'A14': 2014, 'A15': 2015, 'A16': 2016, 'A17': 2017, 'A18': 2018,
  'A19': 2019, 'A20': 2020, 'A21': 2021, 'A22': 2022, 'A23': 2023,
};

// SE Acoustic China prefixes
const SE_ACOUSTIC_CHINA = {
  'CTCA': 2017, 'CTCB': 2018, 'CTCC': 2019, 'CTCD': 2020,
  'CTCE': 2021, 'CTCF': 2022, 'CTCG': 2023,
};

// Amplifier prefixes
const AMP_PREFIXES = {
  'AMP08': 2008, 'AMP09': 2009, 'AMP10': 2010, 'AMP11': 2011,
  'AMP12': 2012, 'AMP13': 2013, 'AMP14': 2014, 'AMP15': 2015,
  'AMP16': 2016, 'AMP17': 2017, 'AMP18': 2018, 'AMP19': 2019,
  'AMP20': 2020,
};

// Speaker cabinet prefixes
const SPK_PREFIXES = {
  'SPK09': 2009, 'SPK10': 2010, 'SPK11': 2011, 'SPK12': 2012,
  'SPK13': 2013, 'SPK14': 2014, 'SPK15': 2015, 'SPK16': 2016,
  'SPK17': 2017, 'SPK18': 2018, 'SPK19': 2019, 'SPK20': 2020,
};

// Swamp Ash Special ranges
const SA_RANGES = [
  { prefix: '8', min: 1, max: 410, year: 1997 },
  { prefix: '8', min: 411, max: 760, year: 1998 },
  { prefix: 'SA', min: 411, max: 760, year: 1998 },
  { prefix: 'SA', min: 761, max: 969, year: 1999 },
  { prefix: 'SA', min: 970, max: 1179, year: 2000 },
  { prefix: 'SA', min: 1180, max: 1399, year: 2001 },
  { prefix: 'SA', min: 1400, max: 1899, year: 2002 },
  { prefix: 'SA', min: 1900, max: 2099, year: 2003 },
  { prefix: 'SA', min: 2100, max: 2287, year: 2004 },
  { prefix: 'SA', min: 2288, max: 2700, year: 2005 },
  { prefix: 'SA', min: 2701, max: 2800, year: 2006 },
  { prefix: 'SA', min: 2801, max: 3055, year: 2007 },
  { prefix: 'SA', min: 3056, max: 3256, year: 2008 },
  { prefix: 'SA', min: 3257, max: 3312, year: 2009 },
];

// EG Models
const EG_RANGES = [
  { prefix: '5', min: 1, max: 920, year: 1990 },
  { prefix: '5', min: 921, max: 1290, year: 1991 },
  { prefix: '5', min: 1291, max: 2070, year: 1992 },
  { prefix: '5', min: 2071, max: 2870, year: 1993 },
  { prefix: '5', min: 2871, max: 3190, year: 1994 },
  { prefix: '5', min: 3191, max: 3300, year: 1995 },
];

// Bass models
const BASS_BOLT_ON_RANGES = [
  { prefix: '4', min: 1, max: 30, year: 1989 },
  { prefix: '4', min: 31, max: 140, year: 1990 },
  { prefix: '4', min: 141, max: 200, year: 1991 },
];

const BASS_SET_NECK_RANGES = [
  { prefix: '9', min: 1, max: 230, year: '1986/87' },
  { prefix: '9', min: 231, max: 350, year: 1988 },
  { prefix: '9', min: 351, max: 680, year: 1989 },
  { prefix: '9', min: 681, max: 730, year: 1990 },
  { prefix: '9', min: 731, max: 800, year: 1991 },
];

const BASS_EB_RANGES = [
  { prefix: 'EB', min: 7, max: 72, year: 2000 },
  { prefix: 'EB', min: 73, max: 199, year: 2001 },
  { prefix: 'EB', min: 200, max: 422, year: 2002 },
  { prefix: 'EB', min: 423, max: 501, year: 2003 },
  { prefix: 'EB', min: 502, max: 650, year: 2004 },
];

/**
 * Identify PRS guitar/model from serial number
 */
export function identifyPRS(serialNumber) {
  if (!serialNumber || typeof serialNumber !== 'string') {
    return { error: 'Please enter a valid serial number' };
  }

  const originalSerial = serialNumber.trim();
  const serial = originalSerial.toUpperCase();
  const results = [];

  // Check for SE Korea (single letter prefix)
  if (serial.length > 0 && /^[A-U]$/.test(serial[0])) {
    const year = SE_KOREA_PREFIXES[serial[0]];
    if (year) {
      results.push({
        model: 'SE (Korea)',
        year: year,
        location: 'Back of headstock',
        confidence: 'high',
      });
    }
  }

  // Check for SE Indonesia (IA, IB, IC, etc. or CTIA, CTIB, etc.)
  for (const prefix of Object.keys(SE_INDONESIA_PREFIXES).sort((a, b) => b.length - a.length)) {
    if (serial.startsWith(prefix)) {
      results.push({
        model: 'SE (Indonesia)',
        year: SE_INDONESIA_PREFIXES[prefix],
        location: 'Back of headstock',
        confidence: 'high',
      });
      break;
    }
  }

  // Check for SE Acoustic China
  for (const prefix of Object.keys(SE_ACOUSTIC_CHINA).sort((a, b) => b.length - a.length)) {
    if (serial.startsWith(prefix)) {
      results.push({
        model: 'SE Acoustic (China)',
        year: SE_ACOUSTIC_CHINA[prefix],
        location: 'Back of headstock',
        confidence: 'high',
      });
      break;
    }
  }

  // Check for Acoustic (A09, A10, etc.)
  for (const prefix of Object.keys(ACOUSTIC_PREFIXES).sort((a, b) => b.length - a.length)) {
    if (serial.startsWith(prefix)) {
      results.push({
        model: 'Acoustic',
        year: ACOUSTIC_PREFIXES[prefix],
        location: 'Label inside sound hole',
        confidence: 'high',
      });
      break;
    }
  }

  // Check for Amplifier (AMP08, AMP09, etc.)
  for (const prefix of Object.keys(AMP_PREFIXES).sort((a, b) => b.length - a.length)) {
    if (serial.startsWith(prefix)) {
      results.push({
        model: 'Amplifier',
        year: AMP_PREFIXES[prefix],
        location: 'Back of amp, upper right corner or sticker',
        confidence: 'high',
      });
      break;
    }
  }

  // Check for Speaker Cabinet (SPK09, SPK10, etc.)
  for (const prefix of Object.keys(SPK_PREFIXES).sort((a, b) => b.length - a.length)) {
    if (serial.startsWith(prefix)) {
      results.push({
        model: 'Speaker Cabinet',
        year: SPK_PREFIXES[prefix],
        location: 'Back of cabinet, upper right corner',
        confidence: 'high',
      });
      break;
    }
  }

  // Check for S2 Models - handle both formats:
  // 1. S2 followed by numbers (e.g., S2000001)
  // 2. Year prefix + S2 + numbers (e.g., 23s2067156)
  
  // First check for year prefix + S2 format (e.g., 23s2067156)
  const s2WithYearPrefix = serial.match(/^(\d{1,2})(s2|S2)(.+)$/);
  if (s2WithYearPrefix) {
    const yearPrefix = s2WithYearPrefix[1];
    const numStr = s2WithYearPrefix[3].replace(/^0+/, '');
    const num = parseInt(numStr, 10);
    if (!isNaN(num)) {
      // Get the year from prefix
      const possibleYears = YEAR_PREFIXES[yearPrefix];
      if (possibleYears) {
        // For 2-digit prefixes (2008+), use the single year
        // For 1-digit prefixes, we need to match against ranges
        if (possibleYears.length === 1) {
          const year = possibleYears[0];
          // Find matching S2 range for this year
          for (const range of S2_RANGES) {
            if (range.year === year && num >= range.min && num <= range.max) {
              results.push({
                model: 'S2 Series',
                year: year,
                location: 'Back of headstock',
                confidence: 'high',
              });
              break;
            }
          }
        } else {
          // 1-digit prefix - check all possible years
          for (const year of possibleYears) {
            for (const range of S2_RANGES) {
              if (range.year === year && num >= range.min && num <= range.max) {
                results.push({
                  model: 'S2 Series',
                  year: year,
                  location: 'Back of headstock',
                  confidence: 'high',
                });
                break;
              }
            }
          }
        }
      }
    }
  }
  
  // Check for S2 Models starting with S2 (no year prefix)
  if (serial.startsWith('S2')) {
    const numStr = serial.substring(2).replace(/^0+/, '');
    const num = parseInt(numStr, 10);
    if (!isNaN(num)) {
      for (const range of S2_RANGES) {
        if (num >= range.min && num <= range.max) {
          results.push({
            model: 'S2 Series',
            year: range.year,
            location: 'Back of headstock',
            confidence: 'high',
          });
          break;
        }
      }
    }
  }

  // Check for CE Models (2016 and later) - uses year prefix
  // Skip if we already found an S2 match (S2 models also use year prefixes)
  const hasS2Match = results.some(r => r.model === 'S2 Series');
  if (!hasS2Match && serial.match(/^(16|17|18|19|20|21|22|23)/)) {
    const prefix = serial.substring(0, 2);
    // Make sure it's not an S2 serial (which would have been caught above)
    if (!serial.match(/^\d{1,2}(s2|S2)/) && YEAR_PREFIXES[prefix] && YEAR_PREFIXES[prefix].length === 1) {
      results.push({
        model: 'CE (2016+)',
        year: YEAR_PREFIXES[prefix][0],
        location: 'Back of headstock',
        confidence: 'medium',
      });
    }
  }

  // Check for CE Models (1988-2008)
  if (serial.startsWith('CE') || serial.startsWith('7')) {
    const prefix = serial.startsWith('CE') ? 'CE' : '7';
    const numStr = serial.substring(prefix.length).trim().replace(/^0+/, '');
    const num = parseInt(numStr, 10);
    if (!isNaN(num)) {
      for (const range of CE_OLD_RANGES) {
        if (range.prefix === prefix && num >= range.min && num <= range.max) {
          results.push({
            model: 'CE (1988-2008)',
            year: range.year,
            location: 'Neck plate on back of guitar',
            confidence: 'high',
          });
          break;
        }
      }
    }
  }

  // Check for Swamp Ash Special (SA or 8 prefix)
  if (serial.startsWith('SA') || serial.startsWith('8')) {
    const prefix = serial.startsWith('SA') ? 'SA' : '8';
    const numStr = serial.substring(prefix.length).trim().replace(/^0+/, '');
    const num = parseInt(numStr, 10);
    if (!isNaN(num)) {
      for (const range of SA_RANGES) {
        if (range.prefix === prefix && num >= range.min && num <= range.max) {
          results.push({
            model: 'Swamp Ash Special',
            year: range.year,
            location: 'Neck plate on back of guitar',
            confidence: 'high',
          });
          break;
        }
      }
    }
  }

  // Check for EG Models (5 or EG prefix)
  if (serial.startsWith('EG') || serial.startsWith('5')) {
    const prefix = serial.startsWith('EG') ? 'EG' : '5';
    const numStr = serial.substring(prefix.length).trim().replace(/^0+/, '');
    const num = parseInt(numStr, 10);
    if (!isNaN(num)) {
      for (const range of EG_RANGES) {
        if (range.prefix === prefix && num >= range.min && num <= range.max) {
          results.push({
            model: 'EG',
            year: range.year,
            location: 'Neck plate on back of guitar',
            confidence: 'high',
          });
          break;
        }
      }
    }
  }

  // Check for Bass models
  if (serial.startsWith('EB')) {
    const numStr = serial.substring(2).trim().replace(/^0+/, '');
    const num = parseInt(numStr, 10);
    if (!isNaN(num)) {
      for (const range of BASS_EB_RANGES) {
        if (num >= range.min && num <= range.max) {
          results.push({
            model: 'Electric Bass',
            year: range.year,
            location: 'Back of headstock',
            confidence: 'high',
          });
          break;
        }
      }
    }
  }

  if (serial.startsWith('4')) {
    const numStr = serial.substring(1).trim().replace(/^0+/, '');
    const num = parseInt(numStr, 10);
    if (!isNaN(num)) {
      for (const range of BASS_BOLT_ON_RANGES) {
        if (num >= range.min && num <= range.max) {
          results.push({
            model: 'Bolt-On Bass',
            year: range.year,
            location: 'Neck plate on back of bass',
            confidence: 'high',
          });
          break;
        }
      }
    }
  }

  if (serial.startsWith('9')) {
    const numStr = serial.substring(1).trim().replace(/^0+/, '');
    const num = parseInt(numStr, 10);
    if (!isNaN(num)) {
      for (const range of BASS_SET_NECK_RANGES) {
        if (num >= range.min && num <= range.max) {
          results.push({
            model: 'Set-Neck Bass',
            year: range.year,
            location: 'Back of headstock',
            confidence: 'high',
          });
          break;
        }
      }
    }
  }

  // Check for standard set-neck models (numeric serial numbers)
  // Extract year prefix and sequential number
  let yearPrefix = null;
  let sequentialNum = null;

  // Try 2-digit prefix first (for 2008+)
  if (serial.length >= 2 && /^\d{2}/.test(serial)) {
    const prefix = serial.substring(0, 2);
    if (YEAR_PREFIXES[prefix]) {
      yearPrefix = prefix;
      const numStr = serial.substring(2).replace(/^0+/, '');
      sequentialNum = parseInt(numStr, 10);
    }
  }

  // Try 1-digit prefix if 2-digit didn't work
  if (!yearPrefix && serial.length >= 1 && /^\d/.test(serial)) {
    const prefix = serial[0];
    if (YEAR_PREFIXES[prefix]) {
      yearPrefix = prefix;
      const numStr = serial.substring(1).replace(/^0+/, '');
      sequentialNum = parseInt(numStr, 10);
    }
  }

  // If we have a sequential number, check set-neck ranges
  if (sequentialNum && !isNaN(sequentialNum)) {
    for (const range of SET_NECK_RANGES) {
      if (sequentialNum >= range.min && sequentialNum <= range.max) {
        const possibleYears = YEAR_PREFIXES[yearPrefix];
        // If prefix matches the range year, it's a match
        if (possibleYears && possibleYears.includes(range.year)) {
          results.push({
            model: 'Set-Neck (Standard)',
            year: range.year,
            location: 'Back of headstock',
            confidence: 'high',
            yearPrefix: yearPrefix,
            possibleYears: possibleYears,
            breakdown: {
              fullSerial: originalSerial,
              yearPrefix: yearPrefix,
              sequentialNumber: sequentialNum,
              explanation: `This serial number breaks down as: Year prefix "${yearPrefix}" (${range.year}) + Sequential number "${sequentialNum.toLocaleString()}". Set-Neck (Standard) models include Custom 24, McCarty, Santana, Singlecut, and other standard PRS models. The serial number format doesn't encode the specific model name—only the year and production sequence. To identify the exact model, check other features like pickup configuration, headstock shape, or body style.`,
              showModels: true
            }
          });
          break;
        }
      }
    }

    // If no exact match but we have a prefix, provide possible years
    if (results.length === 0 && yearPrefix && YEAR_PREFIXES[yearPrefix]) {
      results.push({
        model: 'Unknown Model (Year Prefix Match)',
        year: null,
        possibleYears: YEAR_PREFIXES[yearPrefix],
        location: 'Check serial number location',
        confidence: 'low',
        note: 'Serial number format recognized but model could not be determined. Check the serial number location and format.',
      });
    }
  }

  if (results.length === 0) {
    return {
      error: 'Could not identify this PRS serial number. Please verify the serial number is correct.',
      suggestions: [
        'Check that you entered the complete serial number',
        'Verify the serial number location matches the model type',
        'Some older models may have different formats',
      ],
    };
  }

  return { results };
}

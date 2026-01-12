// PRS Set-Neck (Standard) Models Data
// These models all use the same serial number format

// Using Unsplash and placeholder images for reliable display
// Users can click through to PRS website for official images
export const SET_NECK_STANDARD_MODELS = [
  {
    name: 'Custom 24',
    description: 'The original PRS model, featuring 25" scale length, dual humbuckers with coil-splitting, and iconic bird inlays.',
    url: 'https://prsguitars.com/electrics/model/custom_24_2025',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&q=80',
    category: 'Custom'
  },
  {
    name: 'Custom 24-08',
    description: 'Custom 24 with 8 pickup combinations via push/pull controls.',
    url: 'https://prsguitars.com/electrics/model/custom_24_08_2025',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&q=80',
    category: 'Custom'
  },
  {
    name: 'Custom 24 Piezo',
    description: 'Custom 24 with piezo pickup system for acoustic-like tones.',
    url: 'https://prsguitars.com/electrics/model/custom_24_piezo_2025',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&q=80',
    category: 'Custom'
  },
  {
    name: 'McCarty',
    description: 'Vintage-inspired model with deeper body and warm, rich tone.',
    url: 'https://prsguitars.com/electrics/model/mccarty_2025',
    imageUrl: 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=400&h=300&fit=crop&q=80',
    category: 'McCarty'
  },
  {
    name: 'McCarty 594',
    description: 'Based on 1959 and 1960 Les Pauls, featuring 24.594" scale length.',
    url: 'https://prsguitars.com/electrics/model/mccarty_594_2025',
    imageUrl: 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=400&h=300&fit=crop&q=80',
    category: 'McCarty'
  },
  {
    name: 'Santana',
    description: 'Signature model designed with Carlos Santana, featuring 24.5" scale length.',
    url: 'https://prsguitars.com/electrics/model/santana_retro_2025',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&q=80',
    category: 'Signature'
  },
  {
    name: 'DGT',
    description: 'David Grissom Tremonti signature model with versatile pickup configuration.',
    url: 'https://prsguitars.com/electrics/model/dgt_2025',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&q=80',
    category: 'Signature'
  },
  {
    name: 'Mark Tremonti Signature',
    description: 'Designed for Mark Tremonti of Alter Bridge and Creed.',
    url: 'https://prsguitars.com/electrics/model/mark_tremonti_signature_2025',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&q=80',
    category: 'Signature'
  },
  {
    name: 'Standard 24',
    description: 'Core PRS quality with satin finish and essential features.',
    url: 'https://prsguitars.com/electrics/model/standard_24_satin_2025',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&q=80',
    category: 'Standard'
  },
  {
    name: 'Studio',
    description: 'Workhorse model designed for recording and live performance.',
    url: 'https://prsguitars.com/electrics/model/studio_2025',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&q=80',
    category: 'Specialty'
  },
  {
    name: 'Special Semi-Hollow',
    description: 'Semi-hollow body with f-holes for enhanced resonance.',
    url: 'https://prsguitars.com/electrics/model/special_semi_hollow_2025',
    imageUrl: 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=400&h=300&fit=crop&q=80',
    category: 'Specialty'
  },
  {
    name: 'Modern Eagle V',
    description: 'Flagship model with premium features and tonewoods.',
    url: 'https://prsguitars.com/electrics/model/modern_eagle_v_2025',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&q=80',
    category: 'Specialty'
  },
  {
    name: 'Singlecut',
    description: 'Single-cutaway design inspired by classic Les Pauls.',
    url: 'https://prsguitars.com/products/core',
    imageUrl: 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=400&h=300&fit=crop&q=80',
    category: 'Custom'
  },
  {
    name: 'Custom 22',
    description: '22-fret version of the Custom 24.',
    url: 'https://prsguitars.com/products/core',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&q=80',
    category: 'Custom'
  }
];

// Fallback image URLs using placeholder services if official images aren't available
export function getModelImageUrl(modelName) {
  // Try to find model in our data
  const model = SET_NECK_STANDARD_MODELS.find(m => 
    m.name.toLowerCase().includes(modelName.toLowerCase()) ||
    modelName.toLowerCase().includes(m.name.toLowerCase())
  );
  
  if (model && model.imageUrl) {
    return model.imageUrl;
  }
  
  // Fallback to a generic PRS guitar image placeholder
  return `https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop`;
}

export function getModelUrl(modelName) {
  const model = SET_NECK_STANDARD_MODELS.find(m => 
    m.name.toLowerCase().includes(modelName.toLowerCase()) ||
    modelName.toLowerCase().includes(m.name.toLowerCase())
  );
  
  return model?.url || 'https://prsguitars.com/products/core';
}

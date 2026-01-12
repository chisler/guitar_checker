// PRS Model Type to Website URL Mapping
export const MODEL_LINKS = {
  'Set-Neck (Standard)': 'https://prsguitars.com/products/core',
  'CE (2016+)': 'https://prsguitars.com/products/core',
  'CE (1988-2008)': 'https://prsguitars.com/products/core',
  'SE (Korea)': 'https://prsguitars.com/products/se_electrics',
  'SE (Indonesia)': 'https://prsguitars.com/products/se_electrics',
  'S2 Series': 'https://prsguitars.com/products/s2_electrics',
  'Swamp Ash Special': 'https://prsguitars.com/products/core',
  'EG': 'https://prsguitars.com/products/core',
  'Acoustic': 'https://prsguitars.com/products/acoustics',
  'SE Acoustic (China)': 'https://prsguitars.com/products/se_electrics',
  'Bolt-On Bass': 'https://prsguitars.com/products/core',
  'Set-Neck Bass': 'https://prsguitars.com/products/core',
  'Electric Bass': 'https://prsguitars.com/products/core',
  'Amplifier': 'https://prsguitars.com/products/amplifiers',
  'Speaker Cabinet': 'https://prsguitars.com/products/amplifiers',
};

export function getModelLink(modelName) {
  return MODEL_LINKS[modelName] || 'https://prsguitars.com/products';
}

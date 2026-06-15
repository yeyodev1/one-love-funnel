const fs = require('fs');
const glob = require('fs');

const replaceInFile = (path, replacements) => {
  if (!fs.existsSync(path)) return;
  let content = fs.readFileSync(path, 'utf8');
  replacements.forEach(([search, replace]) => {
    content = content.replace(new RegExp(search, 'g'), replace);
  });
  fs.writeFileSync(path, content);
};

const components = [
  'src/views/BookedView.vue',
  'src/views/BookingView.vue',
  'src/views/PrivacyPolicyView.vue',
  'src/views/LegalNoticeView.vue',
  'src/views/FunnelView.vue',
  'src/views/VideoView.vue',
  'src/views/NoSpaceView.vue',
  'src/router/index.ts',
  'src/components/TheTestimonials.vue',
  'src/components/TheStrategies.vue'
];

components.forEach(c => replaceInFile(c, [
  ['en madera', 'mineral'],
  ['madera', 'suelo'],
  ['Madera', 'Productividad'],
  ['MADERA', 'PRODUCTIVIDAD'],
  ['Ale Barreto', 'Zeonatec'],
  ['alebarreto', 'zeonatec'],
  ['ALE BARRETO', 'ZEONATEC'],
]));


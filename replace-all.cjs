const fs = require('fs');

const replaceInFile = (path, replacements) => {
  if (!fs.existsSync(path)) return;
  let content = fs.readFileSync(path, 'utf8');
  replacements.forEach(([search, replace]) => {
    content = content.split(search).join(replace);
  });
  fs.writeFileSync(path, content);
};

const commonReplacements = [
  ['Ale Barreto', 'Zeonatec'],
  ['ALE BARRETO', 'ZEONATEC'],
  ['ale-barreto', 'zeonatec'],
];

const components = [
  'src/views/BookedView.vue',
  'src/views/BookingView.vue',
  'src/views/PrivacyPolicyView.vue',
  'src/views/LegalNoticeView.vue',
  'src/components/CalendarModal.vue',
  'src/components/TheHero.vue',
  'src/components/TheStrategies.vue',
  'src/components/TheTestimonials.vue',
  'index.html',
  'src/App.vue',
  'src/router/index.ts',
  'package.json'
];

components.forEach(c => replaceInFile(c, commonReplacements));


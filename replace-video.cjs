const fs = require('fs');

const files = [
  'index.html',
  'src/components/TheHero.vue',
  'src/views/VideoView.vue',
  'src/views/FunnelView.vue'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/5ql8l131me/g, '3ffgiuig80');
    fs.writeFileSync(file, content);
    console.log('Replaced in ' + file);
  }
});

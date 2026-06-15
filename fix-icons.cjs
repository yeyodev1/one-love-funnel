const fs = require('fs');

const files = [
  'src/components/CalendarModal.vue',
  'src/views/FunnelView.vue',
  'src/components/TheHero.vue',
  'src/components/ContactWizard.vue'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/fa-tree/g, 'fa-leaf');
    content = content.replace(/fa-house-chimney/g, 'fa-seedling');
    fs.writeFileSync(file, content);
    console.log('Fixed icons in ' + file);
  }
});

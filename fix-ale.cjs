const fs = require('fs');

function replaceInFile(path, replacer) {
  if (fs.existsSync(path)) {
    let content = fs.readFileSync(path, 'utf8');
    content = replacer(content);
    fs.writeFileSync(path, content);
  }
}

replaceInFile('src/components/CalendarModal.vue', c => c.replace(/funnel-alebarreto/g, 'funnel-zeonatec'));

replaceInFile('src/components/ContactWizard.vue', c => c.replace(/ale-barreto-web/g, 'zeonatec-web'));

replaceInFile('src/components/RegistrationModal.vue', c => {
  return c
    .replace(/AleBarreto/g, 'Zeonatec')
    .replace(/ale-barreto-web/g, 'zeonatec-web');
});

replaceInFile('src/views/FunnelView.vue', c => {
  return c.replace(/"Ale logró captar exactamente lo que queríamos para nuestra oficina\. La calidez de la\s+suelo y la precisión de los acabados han transformado por completo el ambiente de\s+trabajo\."/g, 
  '"Zeonatec logró exactamente lo que queríamos para nuestros cultivos. Recuperamos la estructura del suelo, las plantas están más fuertes y logramos aumentar nuestra productividad un 15% reduciendo costos químicos."');
});

console.log('Fixed ale references');

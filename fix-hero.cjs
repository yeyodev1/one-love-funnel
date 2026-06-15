const fs = require('fs');

const path = 'src/components/TheHero.vue';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  "Transformamos tus espacios con la calidez y<br/>\n              <strong>Elegancia de la Suelo de Alta Gama</strong>",
  "Acondicionamos tu suelo para<br/>\n              <strong>Maximizar la Productividad Mineral</strong>"
);

content = content.replace(
  "Producción y construcción experta para hogares y oficinas.<br/>\n              Calidad artesanal con visión contemporánea.",
  "Ingeniería y nutrición mineral técnica para grandes productores.<br/>\n              Calidades de exportación y rentabilidad garantizada."
);

content = content.replace(
  "const stats = [\n  { number: '15+', label: 'Años de Experiencia' },\n  { number: '500+', label: 'Proyectos Entregados' },\n  { number: '100%', label: 'Suelo Certificada' },\n  { number: '24/7', label: 'Asesoría Técnica' }\n]",
  "const stats = [\n  { number: '500+', label: 'Sacos/Mes Mínimo' },\n  { number: '100%', label: 'Ingeniería Mineral' },\n  { number: '10X', label: 'Productividad' },\n  { number: '24/7', label: 'Diagnóstico B2B' }\n]"
);

content = content.replace(
  "const benefits = [\n  {\n    icon: 'fa-solid fa-tree',\n    title: 'Suelo de Calidad',\n    description: 'Seleccionamos las mejores piezas para garantizar durabilidad y estética superior.'\n  },\n  {\n    icon: 'fa-solid fa-couch',\n    title: 'Producción a Medida',\n    description: 'Creamos espacios únicos que reflejan tu estilo, desde casas hasta oficinas.'\n  },\n  {\n    icon: 'fa-solid fa-hammer',\n    title: 'Mano de Obra Experta',\n    description: 'Artesanos especializados con años de trayectoria en el manejo de la suelo.'\n  },\n  {\n    icon: 'fa-solid fa-shield-halved',\n    title: 'Garantía Total',\n    description: 'Respaldamos cada proyecto con una garantía de calidad inigualable.'\n  }\n]",
  "const benefits = [\n  {\n    icon: 'fa-solid fa-leaf',\n    title: 'Intercambio Catiónico',\n    description: 'Acondicionamiento físico del suelo y liberación inteligente de nutrientes.'\n  },\n  {\n    icon: 'fa-solid fa-shield-virus',\n    title: 'Blindaje Mineral',\n    description: 'Engrosamiento de paredes celulares contra plagas mediante silicio asimilable.'\n  },\n  {\n    icon: 'fa-solid fa-seedling',\n    title: 'Reactivación Biológica',\n    description: 'Recuperación de estructura y vida microbiológica tras alta extracción.'\n  },\n  {\n    icon: 'fa-solid fa-truck-fast',\n    title: 'Logística Eficiente',\n    description: 'Mezclas granuladas calibradas perfectas para abonado mecánico masivo.'\n  }\n]"
);

// Check if these replacements worked
if (!content.includes('Maximizar la Productividad')) {
  // Try another approach if previous replaced everything or there's a typo
  content = content.replace(/Transformamos tus espacios.*Suelo de Alta Gama<\/strong>/s, "Acondicionamos tu suelo para<br/>\n              <strong>Maximizar la Productividad Mineral</strong>");
  content = content.replace(/Diseño y construcción experta.*contemporánea\./s, "Ingeniería y nutrición mineral técnica para grandes productores.<br/>\n              Calidades de exportación y rentabilidad garantizada.");
  content = content.replace(/const stats = \[.*?\]/s, "const stats = [\n  { number: '500+', label: 'Sacos/Mes Mínimo' },\n  { number: '100%', label: 'Ingeniería Mineral' },\n  { number: '10X', label: 'Productividad' },\n  { number: '24/7', label: 'Diagnóstico B2B' }\n]");
  content = content.replace(/const benefits = \[.*?}\n\]/s, "const benefits = [\n  {\n    icon: 'fa-solid fa-leaf',\n    title: 'Intercambio Catiónico',\n    description: 'Acondicionamiento físico del suelo y liberación inteligente de nutrientes.'\n  },\n  {\n    icon: 'fa-solid fa-shield-virus',\n    title: 'Blindaje Mineral',\n    description: 'Engrosamiento de paredes celulares contra plagas mediante silicio asimilable.'\n  },\n  {\n    icon: 'fa-solid fa-seedling',\n    title: 'Reactivación Biológica',\n    description: 'Recuperación de estructura y vida microbiológica tras alta extracción.'\n  },\n  {\n    icon: 'fa-solid fa-truck-fast',\n    title: 'Logística Eficiente',\n    description: 'Mezclas granuladas calibradas perfectas para abonado mecánico masivo.'\n  }\n]");
}

fs.writeFileSync(path, content);

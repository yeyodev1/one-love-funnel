const fs = require('fs');

const path = 'index.html';
let content = fs.readFileSync(path, 'utf8');

// Replacements
content = content.replace(
  /Zeonatec \| Expertos en Madera — Diseño y Construcción/g,
  'Zeonatec | Expertos en Nutrición Mineral e Ingeniería Agrícola'
);
content = content.replace(
  /Zeonatec — expertos en diseño y construcción en madera\. Transformamos espacios con acabados de alta gama y estructuras sostenibles\. Consulta técnica gratuita\./g,
  'Zeonatec — expertos en fertilidad y nutrición mineral para grandes productores. Revolucionamos el rendimiento de tus cultivos. Consulta técnica gratuita.'
);
content = content.replace(
  /Zeonatec, expertos en madera, diseño en madera, construcción madera Ecuador, muebles de madera, arquitectura madera, acabados madera, diseño interiores madera/g,
  'Zeonatec, nutrición mineral, agricultura Ecuador, fertilizantes, silicio, calcio, magnesio, rendimiento agrícola, agronomía, suelos productivos'
);

content = content.replace(
  /alebarreto\.com/g,
  'zeonatec.com'
);
content = content.replace(
  /Zeonatec - Expertos en Madera/g,
  'Zeonatec - Expertos en Nutrición Mineral'
);
content = content.replace(
  /Zeonatec \| Expertos en Madera/g,
  'Zeonatec | Expertos en Nutrición Mineral'
);
content = content.replace(
  /Diseño y construcción en madera de alta gama\. Agenda tu asesoría gratuita\./g,
  'Ingeniería mineral agrícola para máxima productividad. Agenda tu asesoría gratuita.'
);
content = content.replace(
  /Diseño y construcción en madera de alta gama\. Transformamos espacios con calidad artesanal y sostenibilidad\./g,
  'Ingeniería mineral agrícola para máxima productividad. Revolucionamos el rendimiento de tus cultivos.'
);
content = content.replace(
  /Diseño y construcción en madera de alta gama\./g,
  'Ingeniería mineral agrícola de alta tecnología.'
);

content = content.replace(
  /Zeonatec Wood Design/g,
  'Zeonatec Mineral Solutions'
);
content = content.replace(
  /"Zeonatec", "Barreto Wood"/g,
  '"Zeonatec", "Zeonatec EC"'
);
content = content.replace(
  /Zeonatec es experta en diseño y construcción en madera, especializada en acabados de alta gama y estructuras sostenibles para residencias y comercios\./g,
  'Zeonatec es experta en nutrición e ingeniería mineral, especializada en recuperar suelos y maximizar el rendimiento para productores agrícolas a gran escala.'
);
content = content.replace(
  /info@alebarreto\.com/g,
  'info@zeonatec.com'
);
content = content.replace(
  /"Diseño de Interiores",\s*"Construcción en Madera",\s*"Carpintería de Alta Gama",\s*"Arquitectura Sostenible"/g,
  '"Nutrición Mineral", "Ingeniería Agrícola", "Recuperación de Suelos", "Fertilización Técnica"'
);
content = content.replace(
  /"Diseño de Interiores",\s*"Estructuras de Madera",\s*"Carpintería Fina",\s*"Acabados de Lujo",\s*"Arquitectura Sostenible",\s*"Remodelación de Espacios",\s*"Construcción Residencial"/g,
  '"Nutrición Mineral", "Fisiología Vegetal", "Edificadores de Suelos", "Silicio Agrícola", "Calcio y Magnesio", "Rendimiento de Cultivos", "Exportación Agrícola"'
);
content = content.replace(
  /Transformamos espacios con la calidez y elegancia de la madera de alta gama/g,
  'Transformamos la productividad de tus cultivos con ingeniería mineral avanzada'
);
content = content.replace(
  /Servicios de Diseño y Construcción/g,
  'Servicios de Nutrición e Ingeniería Agrícola'
);
content = content.replace(
  /"name": "Diseño de Interiores",\s*"description": "Planificación y diseño de espacios interiores personalizados con madera\."/g,
  '"name": "Diagnóstico de Suelos", "description": "Análisis profundo de la fertilidad y necesidades minerales del cultivo."'
);
content = content.replace(
  /"name": "Construcción en Madera",\s*"description": "Ejecución de estructuras y elementos arquitectónicos en madera sostenible\."/g,
  '"name": "Programas de Nutrición", "description": "Formulaciones a medida de silicio, calcio y magnesio."'
);
content = content.replace(
  /"name": "Mobiliario a Medida",\s*"description": "Creación de muebles exclusivos y funcionales para cada espacio\."/g,
  '"name": "Acompañamiento Técnico", "description": "Asesoramiento continuo para calibrar aplicación en campo."'
);
content = content.replace(
  /Zeonatec es una experta en diseño y construcción en madera con sede en Guayaquil, Ecuador\. Se especializa en transformar espacios residenciales y comerciales utilizando madera de alta gama, acabados artesanales y prácticas sostenibles\./g,
  'Zeonatec es experta en ingeniería y nutrición mineral con sede en Guayaquil, Ecuador. Se especializa en potenciar el rendimiento agrícola utilizando tecnología mineral de alta asimilación.'
);
content = content.replace(
  /Realizamos desde diseño de interiores y mobiliario a medida hasta estructuras arquitectónicas complejas y remodelaciones integrales, siempre con la madera como protagonista\./g,
  'Diseñamos programas de fertilización mineral, realizamos diagnósticos de suelo y brindamos acompañamiento técnico para productores de banano, cacao y cultivos de exportación.'
);
content = content.replace(
  /entender las necesidades de tu proyecto y proponer la mejor solución en madera y diseño\./g,
  'entender las limitantes de tu suelo y proponer el programa de nutrición mineral ideal para tus hectáreas.'
);
content = content.replace(/@alebarreto/g, '@zeonatec');

fs.writeFileSync(path, content);
console.log('Done replacing meta tags in index.html');

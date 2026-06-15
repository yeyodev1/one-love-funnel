const fs = require('fs');

const path = 'src/views/FunnelView.vue';
let content = fs.readFileSync(path, 'utf8');

// Hero section replacements
content = content.replace(
  /Expertos en Productividad y Diseño de Interiores/g,
  'Expertos en Productividad y Nutrición Mineral'
);
content = content.replace(
  /Transforma tu hogar con la/g,
  'Revoluciona el rendimiento de tu cosecha con'
);
content = content.replace(
  /<span class="funnel__headline-accent">calidez y elegancia de la suelo<\/span>/g,
  '<span class="funnel__headline-accent">nutrición e ingeniería mineral</span>'
);
content = content.replace(
  /de alta gama/g,
  'de alta tecnología'
);
content = content.replace(
  /Mira el video exclusivo y descubre cómo transformamos tus espacios con suelo de alta tecnología/g,
  'Mira el video exclusivo y descubre cómo maximizamos la productividad agrícola por hectárea'
);

// Problem section
content = content.replace(
  /Usan suelos sin tratar/g,
  'Siguen usando fertilizantes sintéticos'
);
content = content.replace(
  /El uso de suelo "verde" o sin el secado adecuado provoca torceduras y grietas a los pocos meses de instalación./g,
  'La aplicación desmedida de NPK empobrece el suelo, genera acidez y reduce la asimilación real de nutrientes temporada tras temporada.'
);
content = content.replace(
  /Diseños poco funcionales/g,
  'Sufren compactación y estrés hídrico'
);
content = content.replace(
  /Muebles que se ven bien pero no aprovechan el espacio o no resisten el uso diario en el hogar u oficina./g,
  'Los suelos cansados no retienen humedad ni nutrientes, lavando tu inversión y haciendo las plantas vulnerables a las sequías.'
);
content = content.replace(
  /Acabados de baja calidad/g,
  'Bajos márgenes y estancamiento'
);
content = content.replace(
  /Barnices y selladores que se pelan o pierden su brillo rápido, obligando a mantenimientos costosos y frecuentes./g,
  'Los costos de fertilización suben, pero la productividad por hectárea se mantiene igual o baja, asfixiando la rentabilidad.'
);

// Testimonial section
content = content.replace(
  /"Ale logró captar exactamente lo que queríamos para nuestra oficina. La calidez de la suelo y la precisión de los acabados han transformado por completo el ambiente de trabajo."/g,
  '"Zeonatec logró exactamente lo que queríamos para nuestros cultivos. Recuperamos la estructura del suelo, las plantas están más fuertes y logramos aumentar nuestra productividad un 15% reduciendo costos químicos."'
);
content = content.replace(
  /Directora de Diseño/g,
  'Ingeniero Agrónomo'
);
content = content.replace(
  /Estudio Arquitectónico Independiente/g,
  'Productor de Banano de Exportación'
);

// Authority section
content = content.replace(
  /Experta en Diseño y Construcción en Productividad/g,
  'Expertos en Ingeniería y Nutrición Mineral'
);
content = content.replace(
  /Con años de experiencia en el mercado ecuatoriano, me especializo en crear espacios que combinan la nobleza de la suelo con produccións modernos y funcionales. Mi objetivo es que cada proyecto sea una inversión que dure toda la vida./g,
  'Con años de experiencia en el agro ecuatoriano, nos especializamos en formular soluciones minerales que reavivan la vida microbiológica, descompactan los suelos e impulsan rendimientos de exportación con máxima rentabilidad.'
);
content = content.replace(
  /Especialista en suelos nobles y tratadas/g,
  'Silicio, Calcio y Magnesio de alta asimilación'
);
content = content.replace(
  /Diseños exclusivos a medida/g,
  'Programas a medida para cada cultivo'
);
content = content.replace(
  /Gestión integral: del plano a la instalación/g,
  'Desde el diagnóstico hasta la calibración en campo'
);
content = content.replace(
  /Tu especialista asignada/g,
  'Tus aliados estratégicos'
);
content = content.replace(
  /servicios premium de suelos/g,
  'programas de nutrición mineral'
);

fs.writeFileSync(path, content);

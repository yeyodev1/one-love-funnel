const fs = require('fs');

const envContent = `VITE_WEBHOOK_REGISTRO="https://hook.us1.make.com/tu-webhook-registro"
VITE_WEBHOOK_CALIFICACION="https://hook.us1.make.com/tu-webhook-calificacion"
`;
fs.writeFileSync('.env', envContent);

const replaceInFile = (path, replacements) => {
  if (!fs.existsSync(path)) return;
  let content = fs.readFileSync(path, 'utf8');
  replacements.forEach(([search, replace]) => {
    content = content.split(search).join(replace);
  });
  fs.writeFileSync(path, content);
};

// 1. FunnelView.vue
replaceInFile('src/views/FunnelView.vue', [
  ['Ale Barreto', 'Zeonatec'],
  ['ALE BARRETO', 'ZEONATEC'],
  ['ale-barreto', 'zeonatec'],
  ['madera', 'suelo'],
  ['diseño', 'producción'],
  ['construcción en madera', 'nutrición mineral técnica']
]);

// 2. VideoView.vue
replaceInFile('src/views/VideoView.vue', [
  ['Ale Barreto', 'Yurka Dominage'],
  ['ALE BARRETO', 'ZEONATEC'],
  ['Descubre por qué los proyectos de lujo', 'Descubre cómo maximizar tu productividad por hectárea con la metodología Zeonatec'],
  ['eligen a Ale Barreto', 'y alcanzar calidades de exportación'],
  ['Ale Barreto te explica cómo transformamos espacios con la nobleza de la madera.', 'Yurka Dominage te explica cómo blindar tus cultivos y tomar el control total de la rentabilidad de tus hectáreas.'],
  ['AGENDAR MI ASESORÍA DE DISEÑO', 'AGENDAR MI SESIÓN DE DIAGNÓSTICO B2B'],
  ['Tu especialista asignada', 'Experta en Nutrición Mineral'],
  ['Experta en Diseño y Construcción en Madera', 'Especialista en Nutrición Mineral Técnica y Productividad Agrícola'],
  ['Con años de experiencia en el mercado ecuatoriano, me especializo en crear\n              espacios que combinan la nobleza de la madera con diseños modernos y funcionales.\n              Mi objetivo es que cada proyecto sea una inversión que dure toda la vida.', 'Con amplia experiencia en el sector agroexportador, me especializo en metodologías de alta productividad mineral. Mi objetivo es que tu suelo trabaje para tu productividad y optimices el aprovechamiento de tus hectáreas a gran escala.'],
  ['Especialista en maderas nobles y tratadas', 'Especialista en acondicionamiento e intercambio catiónico'],
  ['Diseños exclusivos a medida', 'Mezclas físicas personalizadas y granuladas'],
  ['Gestión integral: del plano a la instalación', 'Soluciones de nutrición con criterio científico'],
  ['Para personalizar tu asesoría de diseño', 'Para personalizar tu diagnóstico agrícola B2B'],
  ['Remodelación Sala', 'Finca Los Álamos'],
  ['alePhoto', 'zeonatecPhoto'] // Assuming we leave image as is for now, or just name
]);

// 3. ContactWizard.vue
replaceInFile('src/components/ContactWizard.vue', [
  ['Ale Barreto', 'Zeonatec'],
  ['ALE BARRETO', 'ZEONATEC'],
  ['¿Qué tipo de proyecto buscas realizar?', '¿Qué tipo de operación agrícola manejas?'],
  ['Residencial (Casa / Departamento)', 'Productor Agrícola a gran escala'],
  ['Oficina / Corporativo', 'Distribuidor Mayorista'],
  ['Local Comercial / Restaurante', 'Almacén de Insumos'],
  ['Otro', 'Otro'],
  ['¿Dispones de un presupuesto de más de $1200 para este proyecto?', '¿Manejas un volumen constante de 500 o más sacos al mes?'],
  ['Sí, dispongo de más de $1200', 'Sí, movemos más de 500 sacos al mes'],
  ['No, mi presupuesto es menor', 'No, nuestro volumen es menor a 500 sacos'],
  ['¿Cuál es tu objetivo principal con este proyecto?', '¿Cuál es tu objetivo principal?'],
  ['Remodelación completa de espacios.', 'Elevar la productividad y rentabilidad de la operación.'],
  ['Diseño y fabricación de muebles a medida.', 'Solucionar problemas de compactación o lavado de nutrientes.'],
  ['Construcción de estructuras en madera (pérgolas, decks, etc.).', 'Comercializar y distribuir insumos de alta rotación a gran escala.'],
  ['¿Con qué urgencia necesitas este servicio?', '¿Con qué urgencia necesitas este suministro?'],
  ['cualificado-ab', 'cualificado-zeonatec'],
  ['Presupuesto +$1200', 'Volumen +500 sacos'],
  ['s2.budget === \\\'yes\\\' ? \\\'Sí\\\' : \\\'No\\\'', 's2.budget === \\\'yes\\\' ? \\\'Sí\\\' : \\\'No\\\''],
  ['\\\'2. ¿Dispones de más de $1200 para este proyecto?\\\'', '\\\'2. ¿Manejas más de 500 sacos al mes?\\\'']
]);

// 4. RegistrationModal.vue
replaceInFile('src/components/RegistrationModal.vue', [
  ['Ale Barreto', 'Zeonatec'],
  ['ALE BARRETO', 'ZEONATEC'],
  ['Asesoría gratuita', 'Diagnóstico B2B gratuito'],
  ['Agenda tu sesión', 'Agenda tu diagnóstico'],
  ['Remodelación Sala', 'Finca Los Álamos'],
  ['RESERVAR MI CUPO AHORA', 'AGENDAR MI SESIÓN B2B'],
  ['AGENDAR MI ASESORÍA', 'AGENDAR MI SESIÓN B2B'],
  ['Nombre de tu proyecto', 'Nombre de tu finca o empresa'],
  ['¿Cuándo necesitas iniciar tu proyecto?', '¿Cuándo necesitas iniciar con el suministro?']
]);

// 5. App.vue and others if needed
// Replacing global Ale Barreto -> Zeonatec

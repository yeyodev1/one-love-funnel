const fs = require('fs');

const path = 'src/components/CalendarModal.vue';
let content = fs.readFileSync(path, 'utf8');

// Replace questions and logic
content = content.replace(
  "const qualifies = () => {\n  if (form.value.presupuesto === 'menos1200') return false\n  return true\n}",
  "const qualifies = () => {\n  return true; // aprobacion automatica\n}"
);

// Form questions replacement
content = content.replace('¿Qué tipo de proyecto estás buscando?', '¿Qué tipo de operación agrícola manejas?');
content = content.replace("{ value: 'residencial', label: 'Residencial (Casa o Departamento)' }", "{ value: 'productor', label: 'Productor Agrícola a gran escala' }");
content = content.replace("{ value: 'comercial', label: 'Comercial (Oficina o Local)' }", "{ value: 'distribuidor', label: 'Distribuidor Mayorista' }");
content = content.replace("{ value: 'nautico', label: 'Náutico (Interiores de Embarcación)' }", "{ value: 'almacen', label: 'Almacén de Insumos' }");
content = content.replace("{ value: 'otro', label: 'Otro proyecto' }", "{ value: 'otro', label: 'Otro' }");

content = content.replace('¿Para qué espacio principal es el trabajo?', '¿Cuál es el principal problema en tu operación?');
content = content.replace("{ value: 'cuarto', label: 'Habitación o espacio único' }", "{ value: 'rendimiento', label: 'Estancamiento de rendimiento' }");
content = content.replace("{ value: 'casa',   label: 'Casa o departamento completo' }", "{ value: 'costos',   label: 'Costos altos de fertilización' }");
content = content.replace("{ value: 'local',  label: 'Local comercial u oficina' }", "{ value: 'suelo',  label: 'Suelo compactado / lavado de nutrientes' }");
content = content.replace("{ value: 'yate',   label: 'Yate o bote' }", "{ value: 'plagas',   label: 'Plagas recurrentes' }");

content = content.replace('¿Qué estilo de diseño prefiere?', '¿Cuál es tu objetivo principal?');
content = content.replace("{ value: 'rustico',   label: 'Rústico / Natural' }", "{ value: 'productividad',   label: 'Aumentar productividad' }");
content = content.replace("{ value: 'moderno',   label: 'Moderno / Lujoso' }", "{ value: 'rentabilidad',   label: 'Mejorar márgenes y rentabilidad' }");
content = content.replace("{ value: 'industrial', label: 'Industrial / Vintage' }", "{ value: 'exportacion', label: 'Mejorar calidad para exportación' }");

content = content.replace('¿Dispone de un presupuesto mayor a $1,200?', '¿Manejas un volumen de 500 o más sacos al mes?');
content = content.replace("{ value: 'mas2000',   label: 'Sí, cuento con más de $2,000 USD' }", "{ value: 'mas1000',   label: 'Sí, más de 1000 sacos' }");
content = content.replace("{ value: 'mas1200',   label: 'Sí, cuento con al menos $1,200 USD' }", "{ value: 'mas500',   label: 'Sí, al menos 500 sacos' }");
content = content.replace("{ value: 'menos1200', label: 'No, por ahora menos de $1,200 USD' }", "{ value: 'menos500', label: 'No, por ahora menos de 500 sacos' }");

content = content.replace('¿Qué idea tienes en mente para tu espacio?', 'Cuéntanos un poco más sobre tu operación o necesidad');
content = content.replace('placeholder="Ej: Me gustaría revestir una pared principal de mi sala con madera noble y añadir una estantería empotrada que combine con..."', 'placeholder="Ej: Tengo 200 hectáreas de banano y los costos de fertilizante químico se están comiendo el margen..."');

content = content.replace('Acepto que Zeonatec me contacte para brindarme una asesoría de diseño personalizada.', 'Acepto que Zeonatec me contacte para una sesión de diagnóstico agrícola B2B.');

fs.writeFileSync(path, content);

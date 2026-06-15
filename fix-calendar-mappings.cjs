const fs = require('fs');

const path = 'src/components/CalendarModal.vue';
let content = fs.readFileSync(path, 'utf8');

// Replace the dictionaries in handleSubmit
content = content.replace(
  /const sectorLabel: Record<string, string> = {[\s\S]*?const presupuestoLabel: Record<string, string> = {[\s\S]*?}/,
  `const sectorLabel: Record<string, string> = {
    productor: 'Productor Agrícola a gran escala',
    distribuidor: 'Distribuidor Mayorista',
    almacen: 'Almacén de Insumos',
    otro: 'Otro',
  }
  const embarcacionesLabel: Record<string, string> = {
    rendimiento: 'Estancamiento de rendimiento',
    costos: 'Costos altos de fertilización',
    suelo: 'Suelo compactado / lavado de nutrientes',
    plagas: 'Plagas recurrentes',
  }
  const hpLabel: Record<string, string> = {
    productividad: 'Aumentar productividad',
    rentabilidad: 'Mejorar márgenes y rentabilidad',
    exportacion: 'Mejorar calidad para exportación',
  }
  const presupuestoLabel: Record<string, string> = {
    mas1000: 'Sí, más de 1000 sacos',
    mas500: 'Sí, al menos 500 sacos',
    menos500: 'No, por ahora menos de 500 sacos',
  }`
);

// Replace the notes rendering to be more agricultural
content = content.replace(
  /🏠 Tipo: \$\{sectorLabel\[form\.value\.sector\] \?\? form\.value\.sector\}/,
  '🚜 Operación: ${sectorLabel[form.value.sector] ?? form.value.sector}'
);
content = content.replace(
  /📐 Espacio: \$\{embarcacionesLabel\[form\.value\.embarcaciones\] \?\? form\.value\.embarcaciones\}/,
  '⚠️ Problema Principal: ${embarcacionesLabel[form.value.embarcaciones] ?? form.value.embarcaciones}'
);
content = content.replace(
  /🎨 Estilo: \$\{hpLabel\[form\.value\.hp\] \?\? form\.value\.hp\}/,
  '🎯 Objetivo: ${hpLabel[form.value.hp] ?? form.value.hp}'
);
content = content.replace(
  /💰 Presupuesto: \$\{presupuestoLabel\[form\.value\.presupuesto\] \?\? form\.value\.presupuesto\}/,
  '📦 Volumen mensual: ${presupuestoLabel[form.value.presupuesto] ?? form.value.presupuesto}'
);

fs.writeFileSync(path, content);

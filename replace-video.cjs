const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'views', 'VideoView.vue');
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Reemplazar form state y añadir opciones
content = content.replace(
  /const captureForm = ref\(\{ nombre: '', apellido: '', empresa: '', email: '', telefono: '' \}\)/,
  `const captureForm = ref({ project: '', budget: '', objective: '', urgency: '', message: '' })

const projectOpts = [
  { value: 'Eclesiástica', label: 'Eclesiástica' },
  { value: 'Civil', label: 'Civil' },
  { value: 'Destino', label: 'Destino' },
  { value: 'Otro', label: 'Otro' },
]

const budgetOpts = [
  { value: 'yes', label: 'Sí, contamos con Wedding Planner' },
  { value: 'no', label: 'No, estamos planeando por nuestra cuenta' },
]

const objectiveOpts = [
  { value: 'Película cinematográfica y documental emotivo', label: 'Película cinematográfica y documental emotivo' },
  { value: 'Resumen dinámico para redes sociales', label: 'Resumen dinámico para redes sociales' },
  { value: 'Registro completo de todo el evento', label: 'Registro completo de todo el evento' },
]

const urgencyOpts = [
  { value: 'immediate', label: 'Menos de 3 meses', sub: 'Urge apartar la fecha' },
  { value: 'next-month', label: 'De 3 a 6 meses', sub: 'Planificando con tiempo' },
  { value: 'just-looking', label: 'Más de 6 meses', sub: 'Solo explorando opciones' },
]`
);

// 2. Reemplazar validateCapture
content = content.replace(
  /const validateCapture = \(\) => \{[\s\S]*?return Object\.keys\(e\)\.length === 0\n\}/,
  `const validateCapture = () => {
  const e: Record<string, string> = {}
  if (!captureForm.value.project) e.project = 'Selecciona una opción'
  if (!captureForm.value.budget) e.budget = 'Selecciona una opción'
  if (!captureForm.value.objective) e.objective = 'Selecciona una opción'
  if (!captureForm.value.urgency) e.urgency = 'Selecciona una opción'
  captureErrors.value = e
  return Object.keys(e).length === 0
}`
);

// 3. Reemplazar submitCapture
const submitLogic = `const submitCapture = async () => {
  captureTouched.value = {
    project: true,
    budget: true,
    objective: true,
    urgency: true,
  }
  if (!validateCapture()) return
  captureSubmitting.value = true

  const c = contactStore.get()
  
  const notes = [
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '💍 ONE LOVE - CALIFICACIÓN (Paso 2)',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    \`💍 Tipo de boda: \${captureForm.value.project}\`,
    \`📋 Wedding Planner: \${captureForm.value.budget === 'yes' ? 'Sí' : 'No'}\`,
    \`🎥 Visión principal: \${captureForm.value.objective}\`,
    \`🗓️ Fecha de boda: \${urgencyOpts.find(u => u.value === captureForm.value.urgency)?.label || captureForm.value.urgency}\`,
    captureForm.value.message ? \`💬 Mensaje del lead: \${captureForm.value.message}\` : '',
    \`📲 Fuente: Formulario One Love\`,
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
  ].filter(Boolean).join('\\n')

  const payload = {
    nombre: c.nombre,
    email: c.email,
    telefono: c.telefono,
    note: notes,
    tags: ['one-love', 'calificado'],
    source: 'one-love-video-gate'
  }

  await fetch(import.meta.env.VITE_WEBHOOK_CALIFICACION, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }).catch(() => {})

  const leadEventId = generateEventId('lead_calificado')
  trackStage('calificado', {
    nombre: c.nombre,
    email: c.email,
    telefono: c.telefono,
    event_id: leadEventId,
  })
  ;(window as any).fbq?.('track', 'Lead', { content_name: 'video-gate' }, { eventID: leadEventId })

  await new Promise((r) => setTimeout(r, 600))
  captureSubmitting.value = false
  captureOpen.value = false
  startTimer()
}`;

content = content.replace(/const submitCapture = async \(\) => \{[\s\S]*?startTimer\(\)\n\}/, submitLogic);

// 4. Cambiar el HTML del capture modal
const modalHtml = `          <div class="capture-modal__header">
            <h2 class="capture-modal__logo-text">ONE LOVE</h2>
            <h2 id="capture-title" class="capture-modal__title">
              Paso 2: <span>Tu Visión</span>
            </h2>
            <p class="capture-modal__sub">Para personalizar tu experiencia y mostrarte el video correcto</p>
          </div>
          <form class="capture-modal__form" @submit.prevent="submitCapture" novalidate>
            <!-- Tipo de boda -->
            <div class="wf-question">
              <p class="wf-q-title">¿Qué tipo de boda estás planeando?</p>
              <div style="display:flex; flex-direction:column; gap:8px;">
                <label v-for="opt in projectOpts" :key="opt.value" class="wf-opt" :class="{ 'wf-opt--sel': captureForm.project === opt.value }">
                  <input type="radio" v-model="captureForm.project" :value="opt.value" class="sr-only" />
                  <span class="wf-opt__radio" />
                  <span class="wf-opt__text">{{ opt.label }}</span>
                </label>
              </div>
              <span v-if="captureTouched.project && captureErrors.project" class="capture-field__error">{{ captureErrors.project }}</span>
            </div>

            <!-- Wedding Planner -->
            <div class="wf-question">
              <p class="wf-q-title">¿Cuentan con un Wedding Planner?</p>
              <div style="display:flex; flex-direction:column; gap:8px;">
                <label v-for="opt in budgetOpts" :key="opt.value" class="wf-opt" :class="{ 'wf-opt--sel': captureForm.budget === opt.value }">
                  <input type="radio" v-model="captureForm.budget" :value="opt.value" class="sr-only" />
                  <span class="wf-opt__radio" />
                  <span class="wf-opt__text">{{ opt.label }}</span>
                </label>
              </div>
              <span v-if="captureTouched.budget && captureErrors.budget" class="capture-field__error">{{ captureErrors.budget }}</span>
            </div>

            <!-- Vision -->
            <div class="wf-question">
              <p class="wf-q-title">¿Cuál es tu objetivo principal?</p>
              <div style="display:flex; flex-direction:column; gap:8px;">
                <label v-for="opt in objectiveOpts" :key="opt.value" class="wf-opt" :class="{ 'wf-opt--sel': captureForm.objective === opt.value }">
                  <input type="radio" v-model="captureForm.objective" :value="opt.value" class="sr-only" />
                  <span class="wf-opt__radio" />
                  <span class="wf-opt__text">{{ opt.label }}</span>
                </label>
              </div>
              <span v-if="captureTouched.objective && captureErrors.objective" class="capture-field__error">{{ captureErrors.objective }}</span>
            </div>

            <!-- Fecha -->
            <div class="wf-question">
              <p class="wf-q-title">¿Cuándo es la fecha de tu boda?</p>
              <div style="display:flex; flex-direction:column; gap:8px;">
                <label v-for="opt in urgencyOpts" :key="opt.value" class="wf-opt" :class="{ 'wf-opt--sel': captureForm.urgency === opt.value }">
                  <input type="radio" v-model="captureForm.urgency" :value="opt.value" class="sr-only" />
                  <span class="wf-opt__radio" />
                  <span class="wf-opt__text">{{ opt.label }} - <small>{{opt.sub}}</small></span>
                </label>
              </div>
              <span v-if="captureTouched.urgency && captureErrors.urgency" class="capture-field__error">{{ captureErrors.urgency }}</span>
            </div>

            <button type="submit" class="capture-submit" :disabled="captureSubmitting">
              <span v-if="!captureSubmitting">
                <i class="fa-solid fa-play" aria-hidden="true"></i>
                Ver el video
              </span>
              <span v-else>
                <i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i>
                Cargando...
              </span>
            </button>
          </form>`;

content = content.replace(/<div class="capture-modal__header">[\s\S]*?<\/form>/, modalHtml);

// 5. Agregar estilos basicos de wf-opt (porque vienen de ContactWizard)
const stylesToAdd = `
.wf-question {
  margin-bottom: 15px;
}
.wf-q-title {
  font-weight: 400;
  margin-bottom: 8px;
  font-size: 0.9rem;
}
.wf-opt {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border: 1.5px solid #e8edf5;
  border-radius: 12px;
  cursor: pointer;
  background: #f9fbff;
  transition: all 0.2s ease;
}
.wf-opt:hover {
  border-color: #d0dbe8;
  background: #ffffff;
}
.wf-opt--sel {
  border-color: #CC0000;
  background: #fffafa;
}
.wf-opt__radio {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #b0c0d5;
  position: relative;
}
.wf-opt--sel .wf-opt__radio {
  border-color: #CC0000;
}
.wf-opt--sel .wf-opt__radio::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #CC0000;
}
.wf-opt__text {
  font-size: 0.85rem;
  color: #3a4f6a;
}
.wf-opt--sel .wf-opt__text {
  color: #CC0000;
  font-weight: 400;
}`;

content = content.replace(/<\/style>/, `\n${stylesToAdd}\n</style>`);

fs.writeFileSync(filePath, content);
console.log('VideoView.vue updated');

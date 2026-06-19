<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CalendarModal from '@/components/CalendarModal.vue'
import { trackStage, generateEventId } from '@/utils/ghl'
import { useContactStore } from '@/stores/contact'
import agentPhoto from '@/assets/team/one-love.png'
import logoImg from '@/assets/logos/logo.png'

const contactStore = useContactStore()

// ── Calendar modal ────────────────────────────────────────────────────────────
const calendarOpen = ref(false)

// ── Contact capture guard ─────────────────────────────────────────────────────
const captureOpen = ref(false)
const captureForm = ref({ project: '', budget: '', objective: '', urgency: '', message: '' })
const captureErrors = ref<Record<string, string>>({})
const captureTouched = ref<Record<string, boolean>>({})
const captureSubmitting = ref(false)

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
  {
    value: 'Película cinematográfica y documental emotivo',
    label: 'Película cinematográfica y documental emotivo',
  },
  { value: 'Resumen dinámico para redes sociales', label: 'Resumen dinámico para redes sociales' },
  { value: 'Registro completo de todo el evento', label: 'Registro completo de todo el evento' },
]

const urgencyOpts = [
  { value: 'immediate', label: 'Menos de 3 meses', sub: 'Urge apartar la fecha' },
  { value: 'next-month', label: 'De 3 a 6 meses', sub: 'Planificando con tiempo' },
  { value: 'just-looking', label: 'Más de 6 meses', sub: 'Solo explorando opciones' },
]

const validateCapture = () => {
  const e: Record<string, string> = {}
  if (!captureForm.value.project) e.project = 'Selecciona una opción'
  if (!captureForm.value.budget) e.budget = 'Selecciona una opción'
  if (!captureForm.value.objective) e.objective = 'Selecciona una opción'
  if (!captureForm.value.urgency) e.urgency = 'Selecciona una opción'
  captureErrors.value = e
  return Object.keys(e).length === 0
}

const submitCapture = async () => {
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
    `💍 Tipo de boda: ${captureForm.value.project}`,
    `📋 Wedding Planner: ${captureForm.value.budget === 'yes' ? 'Sí' : 'No'}`,
    `🎥 Visión principal: ${captureForm.value.objective}`,
    `🗓️ Fecha de boda: ${urgencyOpts.find((u) => u.value === captureForm.value.urgency)?.label || captureForm.value.urgency}`,
    captureForm.value.message ? `💬 Mensaje del lead: ${captureForm.value.message}` : '',
    `📲 Fuente: Formulario One Love`,
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
  ]
    .filter(Boolean)
    .join('\n')

  const payload = {
    nombre: c.nombre,
    email: c.email,
    telefono: c.telefono,
    note: notes,
    tags: ['one-love', 'calificado'],
    source: 'one-love-video-gate',
  }

  await fetch(import.meta.env.VITE_WEBHOOK_CALIFICACION, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
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
}

onMounted(() => {
  const c = contactStore.get()
  const hasContact = !!c.email && !!c.nombre
  if (!hasContact) {
    captureOpen.value = true
  } else {
    ;(window as any).fbq?.('track', 'ViewContent', { content_name: 'video-vsl' })
  }
})
</script>

<template>
  <div class="vv-page">
    <!-- Top bar -->
    <header class="vv-topbar">
      <img :src="logoImg" alt="ONE LOVE" class="vv-logo" />
    </header>

    <!-- Main content -->
    <main class="vv-main">
      <!-- Progress stepper -->
      <div class="vv-stepper" aria-label="Paso 1 de 2">
        <span class="vv-stepper__pill">
          <span class="vv-stepper__dot vv-stepper__dot--active" aria-current="step"></span>
          <span class="vv-stepper__dot"></span>
          <span class="vv-stepper__label">Paso 1 de 2</span>
        </span>
      </div>

      <!-- Headline -->
      <section class="vv-headline">
        <p class="vv-eyebrow">
          <i class="fa-solid fa-video" aria-hidden="true"></i>
          Metodología Narrativa Cinematográfica
        </p>
        <h1 class="vv-h1">
          Revive el día más importante de tu vida con
          <span class="vv-accent">cinematografía de alto impacto</span>
          y una narrativa profesional
        </h1>
        <p class="vv-subtitle">
          Ve el video completo y descubre cómo podemos transformar el recuerdo de tu boda en una
          obra de arte.
        </p>
      </section>

      <!-- Wistia video embed -->
      <div class="vv-video-wrapper">
        <div class="vv-video-ratio">
          <wistia-player media-id="h5bs715nzv" aspect="1.7777777777777777"></wistia-player>
        </div>
      </div>

      <!-- CTA section -->
      <div class="vv-cta-section">
        <button class="vv-cta-btn" @click="calendarOpen = true">
          <i class="fa-solid fa-calendar-check" aria-hidden="true"></i>
          RESERVAR MI CUPO
        </button>

        <p class="vv-cta-sub">
          <i class="fa-solid fa-lock" aria-hidden="true"></i>
          100% gratuito &nbsp;·&nbsp; Sin compromiso &nbsp;·&nbsp; Cupos limitados
        </p>
      </div>

      <!-- Authority section -->
      <section class="vv-authority" aria-labelledby="authority-heading">
        <div class="vv-authority__inner">
          <div class="vv-authority__photo-wrap">
            <div class="vv-authority__avatar" aria-hidden="true">
              <img :src="agentPhoto" alt="Agente Especialista" class="vv-authority__img" />
            </div>
          </div>
          <div class="vv-authority__content">
            <p class="vv-authority__eyebrow">Expertos en Cinematografía Nupcial</p>
            <h2 id="authority-heading" class="vv-authority__name">One Love</h2>
            <p class="vv-authority__role">Expertos en Narrativa y Cinematografía de Bodas</p>
            <p class="vv-authority__bio">
              Con una amplia trayectoria documentando bodas, nos especializamos en una metodología
              narrativa que transforma el día más importante de tu vida en una pieza
              cinematográfica. Nuestro objetivo es que revivas cada emoción al máximo.
            </p>
            <ul class="vv-authority__creds" role="list">
              <li>
                <i class="fa-solid fa-check-circle" aria-hidden="true"></i> Cinematografía de alto
                impacto
              </li>
              <li>
                <i class="fa-solid fa-check-circle" aria-hidden="true"></i> Metodología narrativa
                comprobada
              </li>
              <li>
                <i class="fa-solid fa-check-circle" aria-hidden="true"></i> Edición profesional y
                emotiva
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="vv-footer">
      <nav class="vv-footer__links" aria-label="Legal">
        <RouterLink to="/politicas-privacidad">Política de Privacidad</RouterLink>
        <RouterLink to="/aviso-legal">Aviso Legal</RouterLink>
      </nav>
      <p class="vv-footer__copy">
        © {{ new Date().getFullYear() }} ONE LOVE. Todos los derechos reservados.
      </p>
    </footer>
  </div>

  <!-- Calendar modal -->
  <CalendarModal :open="calendarOpen" @close="calendarOpen = false" />

  <!-- Contact capture overlay -->
  <Teleport to="body">
    <Transition name="capture-fade">
      <div
        v-if="captureOpen"
        class="capture-overlay"
        role="dialog"
        aria-modal="true"
        aria-labelledby="capture-title"
      >
        <div class="capture-modal">
          <div class="capture-modal__header">
            <img :src="logoImg" alt="ONE LOVE" class="vv-logo vv-logo--modal" />
            <h2 id="capture-title" class="capture-modal__title">Paso 2: <span>Tu Visión</span></h2>
            <p class="capture-modal__sub">
              Para personalizar tu experiencia y mostrarte el video correcto
            </p>
          </div>
          <form class="capture-modal__form" @submit.prevent="submitCapture" novalidate>
            <!-- Tipo de boda -->
            <div class="wf-question">
              <p class="wf-q-title">¿Qué tipo de boda estás planeando?</p>
              <div style="display: flex; flex-direction: column; gap: 8px">
                <label
                  v-for="opt in projectOpts"
                  :key="opt.value"
                  class="wf-opt"
                  :class="{ 'wf-opt--sel': captureForm.project === opt.value }"
                >
                  <input
                    type="radio"
                    v-model="captureForm.project"
                    :value="opt.value"
                    class="sr-only"
                  />
                  <span class="wf-opt__radio" />
                  <span class="wf-opt__text">{{ opt.label }}</span>
                </label>
              </div>
              <span
                v-if="captureTouched.project && captureErrors.project"
                class="capture-field__error"
                >{{ captureErrors.project }}</span
              >
            </div>

            <!-- Wedding Planner -->
            <div class="wf-question">
              <p class="wf-q-title">¿Cuentan con un Wedding Planner?</p>
              <div style="display: flex; flex-direction: column; gap: 8px">
                <label
                  v-for="opt in budgetOpts"
                  :key="opt.value"
                  class="wf-opt"
                  :class="{ 'wf-opt--sel': captureForm.budget === opt.value }"
                >
                  <input
                    type="radio"
                    v-model="captureForm.budget"
                    :value="opt.value"
                    class="sr-only"
                  />
                  <span class="wf-opt__radio" />
                  <span class="wf-opt__text">{{ opt.label }}</span>
                </label>
              </div>
              <span
                v-if="captureTouched.budget && captureErrors.budget"
                class="capture-field__error"
                >{{ captureErrors.budget }}</span
              >
            </div>

            <!-- Vision -->
            <div class="wf-question">
              <p class="wf-q-title">¿Cuál es tu objetivo principal?</p>
              <div style="display: flex; flex-direction: column; gap: 8px">
                <label
                  v-for="opt in objectiveOpts"
                  :key="opt.value"
                  class="wf-opt"
                  :class="{ 'wf-opt--sel': captureForm.objective === opt.value }"
                >
                  <input
                    type="radio"
                    v-model="captureForm.objective"
                    :value="opt.value"
                    class="sr-only"
                  />
                  <span class="wf-opt__radio" />
                  <span class="wf-opt__text">{{ opt.label }}</span>
                </label>
              </div>
              <span
                v-if="captureTouched.objective && captureErrors.objective"
                class="capture-field__error"
                >{{ captureErrors.objective }}</span
              >
            </div>

            <!-- Fecha -->
            <div class="wf-question">
              <p class="wf-q-title">¿Cuándo es la fecha de tu boda?</p>
              <div style="display: flex; flex-direction: column; gap: 8px">
                <label
                  v-for="opt in urgencyOpts"
                  :key="opt.value"
                  class="wf-opt"
                  :class="{ 'wf-opt--sel': captureForm.urgency === opt.value }"
                >
                  <input
                    type="radio"
                    v-model="captureForm.urgency"
                    :value="opt.value"
                    class="sr-only"
                  />
                  <span class="wf-opt__radio" />
                  <span class="wf-opt__text"
                    >{{ opt.label }} - <small>{{ opt.sub }}</small></span
                  >
                </label>
              </div>
              <span
                v-if="captureTouched.urgency && captureErrors.urgency"
                class="capture-field__error"
                >{{ captureErrors.urgency }}</span
              >
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
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
@use '@/styles/fonts.modules.scss' as fonts;
@use '@/styles/colorVariables.module.scss' as colors;

.vv-page {
  min-height: 100vh;
  background: #ffffff;
  color: colors.$OS-DARK;
  display: flex;
  flex-direction: column;
  font-family: fonts.$font-secondary;
}

.vv-logo {
  height: 70px;
  width: auto;
  object-fit: contain;

  &--modal {
    margin-bottom: 1rem;
    height: 34px;
  }
}

.vv-topbar {
  background: #000000;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1.5rem;
  display: flex;
  justify-content: center;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.2);

  &__logo-text {
    font-family: fonts.$font-principal;
    font-weight: 400;
    font-size: 1.25rem;
    letter-spacing: 0.05em;
    color: colors.$OS-NAVY;
    margin: 0;
  }
}

.vv-main {
  flex: 1;
  max-width: 720px;
  margin: 0 auto;
  padding: 2rem 1.5rem 3rem;
  width: 100%;
}

.vv-stepper {
  display: flex;
  justify-content: center;
  margin-bottom: 1.75rem;

  &__pill {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: #f5f8ff;
    border: 1px solid #e4edf7;
    border-radius: 999px;
    padding: 0.4rem 1rem;
  }

  &__dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #d0dbe8;
    transition: background 0.2s;

    &--active {
      background: colors.$OS-NAVY;
    }
  }

  &__label {
    font-family: fonts.$font-interface;
    font-size: 0.78rem;
    font-weight: 400;
    color: #7a8ea5;
    letter-spacing: 0.03em;
  }
}

.vv-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: fonts.$font-interface;
  font-size: 0.76rem;
  font-weight: 400;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: colors.$OS-NAVY;
  margin: 0 0 0.75rem;
  i {
    font-size: 0.75rem;
  }
}

.vv-headline {
  margin-bottom: 1.75rem;
}

.vv-h1 {
  @include fonts.heading-font(400);
  font-size: clamp(2rem, 4vw, 2.6rem);
  color: colors.$OS-DARK;
  line-height: 1.35;
  margin: 0 0 0.75rem;
  letter-spacing: 0.05em;
}

.vv-accent {
  color: colors.$OS-DARK;
}

.vv-subtitle {
  font-size: 1.25rem;
  color: colors.$OS-DARK;
  line-height: 1.6;
  margin: 0;
  letter-spacing: 0.02em;
}

.vv-video-wrapper {
  margin-bottom: 1.75rem;
}

.vv-video-ratio {
  position: relative;
  aspect-ratio: 16 / 9;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 63, 125, 0.12);
  border: 1px solid #e4edf7;
  background: colors.$OS-NAVY;

  wistia-player {
    display: block;
    width: 100%;
    height: 100%;

    &:not(:defined) {
      background: center / contain no-repeat
        url('https://fast.wistia.com/embed/medias/3ffgiuig80/swatch');
      display: block;
      filter: blur(5px);
      padding-top: 56.25%;
    }
  }
}

// ── CTA section ──────────────────────────────────────────────────────────────
.vv-cta-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.vv-cta-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  background: colors.$OS-DARK;
  color: #ffffff;
  border: none;
  border-radius: 999px;
  padding: 1.1rem 2.5rem;
  font-family: fonts.$font-accent;
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 0.05em;
  cursor: pointer;
  width: 100%;
  max-width: 480px;
  transition:
    background 0.2s ease,
    transform 0.15s ease,
    box-shadow 0.2s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);

  &:hover {
    background: #111111;
    transform: translateY(-1px);
    box-shadow: 0 8px 28px rgba(0, 0, 0, 0.35);
  }
  &:active {
    transform: translateY(0);
  }
}

.vv-cta-sub {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.76rem;
  color: #b0c0d5;
  margin: 0;
  i {
    font-size: 0.7rem;
  }
}

// ── Authority ────────────────────────────────────────────────────────────────
.vv-authority {
  margin-top: 3.5rem;
  padding: 2rem;
  background: linear-gradient(135deg, #f5f8ff 0%, #ffffff 100%);
  border: 1px solid #e4edf7;
  border-radius: 20px;
}

.vv-authority__inner {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  @media (max-width: 580px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}

.vv-authority__avatar {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  border: 3px solid #ffffff;
  box-shadow: 0 4px 16px rgba(0, 63, 125, 0.15);
  overflow: hidden;
  background: colors.$OS-NAVY;
}

.vv-authority__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.vv-authority__eyebrow {
  font-size: 0.7rem;
  font-weight: 400;
  text-transform: uppercase;
  color: colors.$OS-BLUE;
  letter-spacing: 0.05em;
  margin: 0 0 0.25rem;
}

.vv-authority__name {
  @include fonts.heading-font(400);
  font-size: 1.5rem;
  color: colors.$OS-DARK;
  margin: 0 0 0.1rem;
}

.vv-authority__role {
  font-size: 0.8rem;
  color: #8a9bb5;
  margin: 0 0 1rem;
}

.vv-authority__bio {
  font-size: 0.88rem;
  color: #3a4f6a;
  line-height: 1.6;
  margin: 0 0 1.25rem;
  strong {
    color: colors.$OS-DARK;
  }
}

.vv-authority__creds {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.78rem;
    color: #4a5f7a;
    i {
      color: colors.$OS-BLUE;
      font-size: 0.75rem;
    }
    @media (max-width: 580px) {
      justify-content: center;
    }
  }
}

// ── Footer ───────────────────────────────────────────────────────────────────
.vv-footer {
  padding: 1.5rem;
  border-top: 1px solid #f0f4fb;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  &__links {
    display: flex;
    gap: 1.5rem;
    a {
      font-size: 0.76rem;
      color: #b0c0d5;
      text-decoration: none;
      &:hover {
        color: colors.$OS-NAVY;
      }
    }
  }

  &__copy {
    font-size: 0.72rem;
    color: #c8d8ed;
    margin: 0;
  }
}

// ── Capture overlay ──────────────────────────────────────────────────────────
.capture-fade-enter-active,
.capture-fade-leave-active {
  transition: opacity 0.25s ease;
}
.capture-fade-enter-from,
.capture-fade-leave-to {
  opacity: 0;
}

.capture-overlay {
  position: fixed;
  inset: 0;
  z-index: 950;
  background: rgba(colors.$OS-DARK, 0.8);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.capture-modal {
  background: #ffffff;
  border-radius: 20px;
  width: 100%;
  max-width: 460px;
  overflow: hidden;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.25);

  &__header {
    padding: 2rem 2rem 1.25rem;
    text-align: center;
    background: colors.$OS-DARK;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  &__logo-text {
    font-family: fonts.$font-principal;
    font-weight: 400;
    font-size: 1.25rem;
    letter-spacing: 0.05em;
    color: colors.$OS-NAVY;
    margin-bottom: 1rem;
  }

  &__title {
    @include fonts.heading-font(400);
    font-size: 1.3rem;
    color: #ffffff;
    margin: 0 0 0.4rem;
    letter-spacing: -0.02em;
    span {
      color: colors.$OS-RED;
    }
  }

  &__sub {
    font-size: 0.82rem;
    color: #a0b0c5;
    margin: 0;
  }

  &__form {
    padding: 1.5rem 1.75rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
  }
}

.capture-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  @media (max-width: 400px) {
    grid-template-columns: 1fr;
  }
}

.capture-field {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;

  label {
    font-family: fonts.$font-interface;
    font-size: 0.78rem;
    font-weight: 400;
    color: #4a5f7a;
    letter-spacing: 0.02em;
  }

  input {
    border: 1.5px solid #e4edf7;
    border-radius: 9px;
    padding: 0.7rem 0.85rem;
    font-family: fonts.$font-secondary;
    font-size: 0.88rem;
    color: colors.$OS-DARK;
    background: #fafbff;
    outline: none;
    transition: border-color 0.18s;
    &::placeholder {
      color: #b8cae0;
    }
    &:focus {
      border-color: colors.$OS-BLUE;
      background: #f5f9ff;
    }
  }

  &.error input {
    border-color: colors.$OS-RED;
    background: rgba(colors.$OS-RED, 0.03);
  }
}

.capture-field__error {
  font-size: 0.72rem;
  color: colors.$OS-RED;
}

.capture-submit {
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: colors.$OS-RED;
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 1.1rem;
  @include fonts.heading-font(400);
  font-size: 0.95rem;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition:
    background 0.2s,
    transform 0.15s;

  span {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  &:hover {
    background: #aa0000;
    transform: translateY(-1px);
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

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
  border-color: #cc0000;
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
  border-color: #cc0000;
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
  background: #cc0000;
}
.wf-opt__text {
  font-size: 0.85rem;
  color: #3a4f6a;
}
.wf-opt--sel .wf-opt__text {
  color: #cc0000;
  font-weight: 400;
}
</style>

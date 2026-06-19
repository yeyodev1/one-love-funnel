<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import RegistrationModal from '@/components/RegistrationModal.vue'
import { captureFbParams } from '@/utils/fbclid'
import agentPhoto from '@/assets/team/one-love.png'
import logoImg from '@/assets/logos/logo.png'

const router = useRouter()
const modalOpen = ref(false)
const IS_DEV = window.location.hostname === 'localhost'

const openModal = () => {
  if (!IS_DEV) {
    const disqAt = localStorage.getItem('os_disq_at')
    if (disqAt && Date.now() - Number(disqAt) < 48 * 60 * 60 * 1000) {
      router.push('/sin-espacio')
      return
    }
  }
  modalOpen.value = true
}

const stats = [
  {
    number: '+12',
    text: 'Años contando\nhistorias de amor',
  },
  {
    number: '+500',
    text: 'Historias convertidas\nen recuerdos para toda la vida.',
  },
  {
    number: '100%',
    text: 'Capturando emociones reales',
  },
]

const methodology = [
  {
    title: 'C O N E X I Ó N',
    body: 'Queremos entender su esencia y crear una película que refleje quiénes son y cómo se sienten.',
  },
  {
    title: 'V I V I E N D O\nC A D A  E M O C I Ó N',
    body: 'Guardamos las emociones y los recuerdos que harán eterna su historia.',
  },
  {
    title: 'R E V I V I E N D O\nS U  H I S T O R I A',
    body: 'Damos vida a su historia para que, años después, puedan volver a emocionarse como la primera vez.',
  },
]

onMounted(() => {
  const script1 = document.createElement('script')
  script1.src = 'https://fast.wistia.com/player.js'
  script1.async = true
  document.head.appendChild(script1)

  const script2 = document.createElement('script')
  script2.src = 'https://fast.wistia.com/embed/h5bs715nzv.js'
  script2.async = true
  script2.type = 'module'
  document.head.appendChild(script2)

  const style = document.createElement('style')
  style.innerHTML = `wistia-player[media-id='h5bs715nzv']:not(:defined) { background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/h5bs715nzv/swatch'); display: block; filter: blur(5px); padding-top:56.25%; }`
  document.head.appendChild(style)

  captureFbParams()
})
</script>

<template>
  <div class="funnel">
    <!-- TOP BAR -->
    <header class="funnel__topbar">
      <img :src="logoImg" alt="ONE LOVE" class="funnel__logo" />
    </header>

    <!-- URGENCY BANNER REMOVED -->

    <!-- HERO -->
    <section class="funnel__hero" aria-labelledby="funnel-headline">
      <div class="funnel__container">
        <div class="funnel__hero-header">
          <h1 id="funnel-headline" class="funnel__headline">
            Dos almas, una promesa y<br />
            una historia que merece<br />
            ser contada para siempre...
          </h1>
          <div class="funnel__hero-cta">
            <button class="funnel__cta-btn" @click="openModal()">AGENDA UNA REUNIÓN</button>
          </div>
        </div>

        <div class="funnel__hero-description">
          <p>
            Capturamos todo aquello que las palabras no alcanzan a explicar,<br />
            para que cuando pasen los años, vuelvas a sentir exactamente lo mismo.
          </p>
          <p>Creamos historias de amor que no solo se ven, se sienten.</p>
        </div>

        <!-- VSL Gated Area -->
        <div
          class="funnel__vsl-wrap"
          @click="openModal()"
          style="cursor: pointer; position: relative"
        >
          <!-- Intercept click to open modal instead of playing video -->
          <div style="position: absolute; inset: 0; z-index: 10"></div>
          <div class="funnel__vsl" style="background: transparent">
            <wistia-player media-id="h5bs715nzv" aspect="1.7777777777777777"></wistia-player>
          </div>
        </div>

        <div class="funnel__cta-wrap" style="margin-top: 3rem">
          <button class="funnel__cta-btn" @click="openModal()">AGENDA UNA REUNIÓN</button>
        </div>
      </div>
    </section>

    <!-- STATS -->
    <section class="funnel__stats" aria-label="Resultados comprobados">
      <div class="funnel__container">
        <div class="funnel__stats-grid">
          <div v-for="stat in stats" :key="stat.number" class="funnel__stat">
            <strong class="funnel__stat-number">{{ stat.number }}</strong>
            <p class="funnel__stat-text">{{ stat.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- PROBLEMA -->
    <section class="funnel__problem" aria-labelledby="problem-heading">
      <div class="funnel__container">
        <h2 id="problem-heading" class="funnel__problem-title">¿TE IDENTIFICAS CON ESTO?</h2>
        <p class="funnel__problem-subtitle">
          Lo que muchas parejas olvidan hasta que es demasiado tarde
        </p>
        <div class="funnel__problem-grid">
          <div class="funnel__problem-item">
            <strong>VIDEOS SIN ALMA</strong>
            <p>
              Un videógrafo que solo graba lo que sucede, sin buscar las emociones que hacen única
              tu historia.
            </p>
          </div>
          <div class="funnel__problem-item">
            <strong>LA ESPERA INTERMINABLE</strong>
            <p>
              Esperar demasiado puede hacer que ese día tan especial se sienta cada vez más lejano.
            </p>
          </div>
          <div class="funnel__problem-item">
            <strong>CADA EMOCIÓN MERECE SER VISTA</strong>
            <p>
              Las emociones más bonitas suceden al mismo tiempo y merecen ser recordadas juntas.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- METODOLOGÍA -->
    <section
      class="funnel__method"
      aria-labelledby="method-heading"
      style="background: #f3f2ee; padding: 5rem 0"
    >
      <div class="funnel__container">
        <h2
          id="method-heading"
          class="funnel__section-title"
          style="
            text-align: left;
            text-transform: uppercase;
            font-weight: 400;
            font-size: clamp(1.6rem, 3.5vw, 2.2rem);
            margin-bottom: 2.5rem;
            letter-spacing: 0.15em;
            color: #333;
          "
        >
          ASÍ HACEMOS QUE TU HISTORIA<br />DURE PARA SIEMPRE
        </h2>
        <div class="funnel__method-grid" style="gap: 1.5rem">
          <div
            v-for="(m, i) in methodology"
            :key="i"
            style="
              background: #231f20;
              border-radius: 20px;
              padding: 2.5rem 2rem;
              display: flex;
              flex-direction: column;
            "
          >
            <h3
              class="funnel__method-title"
              style="
                color: white;
                letter-spacing: 0.15em;
                font-weight: 400;
                font-size: 1.1rem;
                margin-bottom: 1.25rem;
                white-space: pre-line;
                line-height: 1.4;
              "
            >
              {{ m.title }}
            </h3>
            <p
              class="funnel__method-body"
              style="color: #e5e5e5; font-size: 1.1rem; line-height: 1.5"
            >
              {{ m.body }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- TESTIMONIAL -->
    <section
      class="funnel__testimonial"
      aria-labelledby="testimonial-heading"
      style="background: #faf5e8; padding: 5rem 0 6rem"
    >
      <div class="funnel__container">
        <h2
          id="testimonial-heading"
          class="funnel__section-title"
          style="
            text-align: left;
            margin-bottom: 2rem;
            font-weight: 300;
            font-size: clamp(1.6rem, 3.5vw, 2.2rem);
            letter-spacing: 0.15em;
            color: #333;
            text-transform: uppercase;
          "
        >
          LO QUE DICEN NUESTRAS PAREJAS
        </h2>
        <p
          style="
            font-size: 1.35rem;
            line-height: 1.6;
            color: #333;
            max-width: 850px;
            margin: 0;
            font-weight: 300 !important;
          "
        >
          "Antes de conocer a Carlos y al equipo de One Love, tenía miedo de que nuestro video fuera
          uno más, algo que veríamos una vez y olvidaríamos. Pero cada vez que lo vemos volvemos a
          emocionarnos y a recordar exactamente cómo se sintió ese día. Fue mucho más que un
          video... fue nuestra historia de amor."
        </p>
      </div>
    </section>

    <!-- INTENCION Y EMOCION (DARK BANNER) -->
    <section style="background: #231f20; color: white; padding: 5rem 1.5rem; text-align: center">
      <div class="funnel__container">
        <h2
          style="
            font-size: clamp(1.6rem, 3.5vw, 2.4rem);
            font-weight: 400;
            margin-bottom: 2.5rem;
            letter-spacing: 0.1em;
            text-transform: none;
          "
        >
          -Una historia contada con intención y emoción
        </h2>
        <p
          style="
            font-size: 1.35rem;
            max-width: 850px;
            margin: 0 auto;
            line-height: 1.6;
            color: #e5e5e5;
          "
        >
          Nos involucramos desde el inicio para conocerlos, entender su esencia<br />y crear un
          video que refleje quiénes son.<br />
          Cada detalle se captura con intención para crear una película que los<br />haga volver a
          sentir ese día una y otra vez.
        </p>
      </div>
    </section>

    <!-- AUTHORITY — One Love -->
    <!-- <section class="funnel__authority" aria-labelledby="authority-heading">
      <div class="funnel__container funnel__authority-inner">
        <div class="funnel__authority-photo-wrap">
          <div class="funnel__authority-avatar" aria-hidden="true">
            <img :src="agentPhoto" alt="Agente Especialista" class="funnel__authority-img" />
          </div>
        </div>
        <div class="funnel__authority-content">
          <h2 id="authority-heading" class="funnel__authority-name">One Love</h2>
          <p class="funnel__authority-bio">
            Dejamos de improvisar y empezamos a planificar desde la preboda. Integramos tecnología como los drones para dar un contexto épico que solo el cine puede ofrecer. Te entrego una estructura narrativa que cumple con los más altos estándares artísticos.
          </p>
          <ul class="funnel__authority-creds" role="list">
            <li><i class="fa-solid fa-check-circle" aria-hidden="true"></i> Enfoque narrativo multidimensional</li>
            <li><i class="fa-solid fa-check-circle" aria-hidden="true"></i> Equipos de última tecnología y drones</li>
            <li><i class="fa-solid fa-check-circle" aria-hidden="true"></i> Formatos versátiles para redes y archivo</li>
          </ul>
        </div>
      </div>
    </section> -->

    <!-- CTA FINAL -->
    <section
      class="funnel__cta-final"
      aria-labelledby="cta-final-heading"
      style="padding: 7rem 0; background: white"
    >
      <div class="funnel__container" style="text-align: center">
        <h2
          id="cta-final-heading"
          class="funnel__cta-final-title"
          style="
            font-size: clamp(1.6rem, 3.5vw, 2.2rem);
            font-weight: 400;
            letter-spacing: 0.15em;
            margin-bottom: 1.5rem;
            text-transform: uppercase;
          "
        >
          ¿LISTO PARA INICIAR?
        </h2>
        <p
          class="funnel__cta-final-sub"
          style="
            font-size: 1.35rem;
            max-width: 800px;
            margin: 0 auto 3rem;
            line-height: 1.6;
            color: #333;
          "
        >
          Agenda una reunión con nosotros y conversemos sobre cómo convertir<br />el día más
          importante de sus vidas en un recuerdo que los emocione<br />para siempre.
        </p>
        <button
          class="funnel__cta-btn"
          @click="openModal()"
          style="
            background: #231f20;
            color: #fff;
            padding: 1.25rem 3.5rem;
            border-radius: 50px;
            font-weight: 400;
            letter-spacing: 0.15em;
            border: none;
            font-size: 1.05rem;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
          "
        >
          AGENDA UNA REUNIÓN
        </button>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="funnel__footer">
      <div class="funnel__container funnel__footer-inner">
        <img :src="logoImg" alt="ONE LOVE" class="funnel__footer-logo" />
        <nav class="funnel__footer-links" aria-label="Legal">
          <RouterLink to="/politicas-privacidad">Política de Privacidad</RouterLink>
          <RouterLink to="/aviso-legal">Aviso Legal</RouterLink>
        </nav>
        <p class="funnel__footer-copy">
          © {{ new Date().getFullYear() }} ONE LOVE. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  </div>

  <RegistrationModal :open="modalOpen" @close="modalOpen = false" />
</template>

<style lang="scss" scoped>
@use '@/styles/fonts.modules.scss' as fonts;
@use '@/styles/colorVariables.module.scss' as colors;

.funnel {
  background: #ffffff;
  color: colors.$OS-DARK;
  min-height: 100vh;
  font-family: fonts.$font-secondary;

  &__container {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 1.5rem;

    @media (min-width: 768px) {
      padding: 0 2rem;
    }
  }
}

// ── Top bar ──────────────────────────────────────────────────────────────────
.funnel__topbar {
  background: #000000;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1.5rem;
  display: flex;
  justify-content: center;
  box-shadow: 0 1px 12px rgba(0, 0, 0, 0.2);
}

.funnel__logo {
  height: 70px;
  width: auto;
  object-fit: contain;
}

// ── Urgency banner ───────────────────────────────────────────────────────────
.funnel__urgency {
  position: sticky;
  top: 0;
  z-index: 50;
  background: linear-gradient(90deg, colors.$AB-URGENT 0%, colors.$AB-URGENT-DARK 100%);
  color: #ffffff;
  padding: 0.65rem 0.85rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  flex-wrap: wrap;
  font-family: fonts.$font-interface;
  font-size: 0.82rem;
  font-weight: 400;
  letter-spacing: 0.03em;
  border-bottom: 2px solid colors.$AB-URGENT-LIGHT;
  box-shadow: 0 2px 12px rgba(colors.$AB-URGENT, 0.35);
  text-transform: uppercase;

  @media (min-width: 768px) {
    padding: 0.85rem 1.5rem;
    font-size: 0.95rem;
    justify-content: space-between;
    flex-wrap: nowrap;
  }
}

.funnel__urgency-info {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
  justify-content: center;

  @media (min-width: 768px) {
    flex-wrap: nowrap;
  }
}

.funnel__urgency-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: #ffffff;
  color: colors.$AB-URGENT-DARK;
  border: 2px solid colors.$AB-URGENT-LIGHT;
  border-radius: 999px;
  padding: 0.45rem 1rem;
  font-family: fonts.$font-accent;
  font-size: 0.78rem;
  font-weight: 400;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  cursor: pointer;
  white-space: nowrap;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
  animation: cta-bounce 2.4s ease-in-out infinite;
  transition:
    transform 0.15s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;

  span {
    font-size: 0.95rem;
    transition: transform 0.18s ease;
  }

  &:hover {
    background: colors.$AB-URGENT-BG;
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3);

    span {
      transform: translateX(3px);
    }
  }

  &:active {
    transform: translateY(0);
  }

  @media (min-width: 768px) {
    padding: 0.55rem 1.2rem;
    font-size: 0.85rem;
  }
}

@keyframes cta-bounce {
  0%,
  100% {
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
    transform: scale(1);
  }

  50% {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
    transform: scale(1.04);
  }
}

// ── Social proof toast (FOMO bottom-left) ────────────────────────────────────
.funnel__proof {
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  z-index: 55;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  background: #ffffff;
  border: 1px solid rgba(colors.$AB-FOREST, 0.08);
  border-left: 4px solid colors.$AB-SAGE;
  border-radius: 12px;
  padding: 0.75rem 0.9rem 0.75rem 0.85rem;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.18);
  max-width: 320px;
  font-family: fonts.$font-secondary;

  @media (min-width: 768px) {
    bottom: 1.5rem;
    left: 1.5rem;
    max-width: 360px;
    padding: 0.9rem 1rem 0.9rem 0.95rem;
  }
}

.funnel__proof-icon {
  flex-shrink: 0;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(colors.$AB-SAGE, 0.14);
  color: colors.$AB-SAGE;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.05rem;
  margin-top: 2px;
}

.funnel__proof-body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.funnel__proof-title {
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 6px;
  font-family: fonts.$font-interface;
  font-size: 0.86rem;
  line-height: 1.3;
  color: colors.$AB-FOREST;

  strong {
    font-weight: 400;
  }

  span {
    font-size: 0.74rem;
    color: rgba(colors.$AB-FOREST, 0.55);
    font-weight: 400;
  }
}

.funnel__proof-text {
  margin: 0;
  font-size: 0.82rem;
  line-height: 1.35;
  color: rgba(colors.$AB-FOREST, 0.78);

  strong {
    color: colors.$AB-EARTH;
    font-weight: 400;
  }
}

.funnel__proof-meta {
  margin: 4px 0 0;
  font-size: 0.7rem;
  color: rgba(colors.$AB-FOREST, 0.45);
  display: inline-flex;
  align-items: center;
  gap: 4px;

  i {
    font-size: 0.66rem;
  }
}

.funnel__proof-close {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: rgba(colors.$AB-FOREST, 0.4);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.78rem;
  transition:
    background 0.15s,
    color 0.15s;

  &:hover {
    background: rgba(colors.$AB-FOREST, 0.08);
    color: colors.$AB-FOREST;
  }
}

.proof-fade-enter-active {
  transition:
    opacity 0.32s ease,
    transform 0.42s cubic-bezier(0.34, 1.4, 0.64, 1);
}

.proof-fade-leave-active {
  transition:
    opacity 0.22s ease,
    transform 0.25s ease;
}

.proof-fade-enter-from {
  opacity: 0;
  transform: translateY(14px) translateX(-8px);
}

.proof-fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

.funnel__urgency-icon {
  color: colors.$AB-URGENT-LIGHT;
  font-size: 1.1rem;
  filter: drop-shadow(0 0 6px rgba(colors.$AB-URGENT-LIGHT, 0.6));
  animation: bolt-flash 1.8s infinite;
}

@keyframes bolt-flash {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }

  50% {
    opacity: 0.55;
    transform: scale(0.92);
  }
}

.funnel__urgency-text {
  strong {
    font-weight: 400;
    color: colors.$BAKANO-PINK;
    letter-spacing: 0.04em;
  }
}

.funnel__urgency-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: colors.$AB-URGENT-LIGHT;
  flex-shrink: 0;
  animation: dot-pulse 1.5s infinite;
  box-shadow: 0 0 0 0 rgba(colors.$AB-URGENT-LIGHT, 0.6);
}

@keyframes dot-pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(252, 165, 165, 0.7);
    transform: scale(1);
  }

  70% {
    box-shadow: 0 0 0 8px rgba(252, 165, 165, 0);
    transform: scale(1.1);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(252, 165, 165, 0);
    transform: scale(1);
  }
}

.funnel__timer {
  display: flex;
  align-items: center;
  gap: 0.2rem;
  background: rgba(0, 0, 0, 0.18);
  padding: 0.25rem 0.6rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.funnel__timer-block {
  display: flex;
  align-items: baseline;
  gap: 2px;

  strong {
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 1;
    font-variant-numeric: tabular-nums;
    color: #ffffff;

    @media (min-width: 768px) {
      font-size: 2rem;
    }
  }

  small {
    font-size: 0.72rem;
    opacity: 0.85;
    font-weight: 400;
    text-transform: uppercase;
  }
}

.funnel__timer-sep {
  font-weight: 400;
  font-size: 1.4rem;
  opacity: 0.7;
  padding: 0 2px;
  line-height: 1;

  @media (min-width: 768px) {
    font-size: 1.7rem;
  }
}

// ── Urgency callout (hero) ───────────────────────────────────────────────────
.funnel__urgency-callout {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  background: colors.$AB-URGENT-BG;
  border-left: 4px solid colors.$AB-URGENT-LIGHT;
  border-radius: 8px;
  padding: 0.85rem 1rem;
  margin: 1.25rem 0 1.5rem;
  font-family: fonts.$font-interface;
  font-size: 0.92rem;
  color: rgba(colors.$AB-WHITE, 0.95);
  font-weight: 400;

  i {
    color: colors.$AB-URGENT-LIGHT;
    font-size: 1.15rem;
    flex-shrink: 0;
  }

  strong {
    color: colors.$AB-URGENT-LIGHT;
    font-weight: 400;
  }

  @media (min-width: 768px) {
    font-size: 1rem;
    padding: 1rem 1.25rem;
  }
}

// ── Hero ─────────────────────────────────────────────────────────────────────
.funnel__hero {
  padding: 4.5rem 0 4rem;
  background: #ffffff;
}

.funnel__hero-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }
}

.funnel__headline {
  @include fonts.heading-font(400);
  font-size: clamp(2rem, 4vw, 2.6rem);
  line-height: 1.35;
  color: colors.$OS-DARK;
  margin: 0;
  letter-spacing: 0.05em;
}

.funnel__hero-description {
  margin-bottom: 3rem;

  p {
    font-size: 1.25rem;
    color: colors.$OS-DARK;
    line-height: 1.6;
    margin: 0 0 1.2rem;
    letter-spacing: 0.02em;
  }
}

// ── VSL ──────────────────────────────────────────────────────────────────────
.funnel__vsl-wrap {
  margin-bottom: 2rem;
}

.funnel__vsl {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid #d8e6f5;
  box-shadow: 0 8px 40px rgba(0, 63, 125, 0.12);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 48px rgba(0, 63, 125, 0.2);
  }

  &:focus-visible {
    outline: 3px solid colors.$OS-BLUE;
    outline-offset: 2px;
  }
}

.funnel__vsl-bg {
  position: absolute;
  inset: 0;
  background: colors.$OS-NAVY;
  display: flex;
  align-items: center;
  justify-content: center;
}

.funnel__vsl-thumb {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(8px) brightness(0.6);
  transform: scale(1.1); // Avoid white edges from blur
  transition:
    filter 0.4s ease,
    transform 0.4s ease,
    brightness 0.4s ease;

  .funnel__vsl:hover & {
    filter: blur(4px) brightness(0.75);
    transform: scale(1.05);
  }
}

.funnel__vsl-blur-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at center,
    rgba(colors.$OS-NAVY, 0.2) 0%,
    rgba(colors.$OS-NAVY, 0.6) 100%
  );
  z-index: 1;
}

.funnel__vsl-watermark {
  position: relative;
  z-index: 2;
  height: 60px;
  width: auto;
  opacity: 0.15;
  filter: brightness(0) invert(1);
}

.funnel__vsl-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
}

.funnel__vsl-play {
  width: 76px;
  height: 76px;
  border-radius: 50%;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.35);
  transition: transform 0.2s ease;

  .funnel__vsl:hover & {
    transform: scale(1.1);
  }

  i {
    color: colors.$OS-RED;
    font-size: 1.7rem;
    margin-left: 5px;
  }
}

.funnel__vsl-caption {
  color: #ffffff;
  font-size: 0.88rem;
  font-weight: 400;
  text-align: center;
  padding: 0 2rem;
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.5);
  max-width: 420px;
}

// ── CTA ──────────────────────────────────────────────────────────────────────
.funnel__cta-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.funnel__cta-btn {
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

.funnel__cta-sub {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  font-size: 0.78rem;
  color: #8a9bb5;
  margin: 0;

  i {
    font-size: 0.72rem;
  }
}

// ── Stats ────────────────────────────────────────────────────────────────────
.funnel__stats {
  background: colors.$OS-DARK;
  padding: 4.5rem 0;
}

.funnel__section-label {
  font-family: fonts.$font-interface;
  font-size: 0.78rem;
  font-weight: 400;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: colors.$OS-NAVY;
  margin: 0 0 1rem;

  &--light {
    color: rgba(#ffffff, 0.55);
  }
}

.funnel__stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 580px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
}

.funnel__stat {
  text-align: left;
  border-left: 1px solid rgba(#ffffff, 0.35);
  padding-left: 1.5rem;
}

.funnel__stat-number {
  display: block;
  @include fonts.heading-font(400);
  font-size: 3.2rem;
  color: #ffffff;
  line-height: 1;
  margin-bottom: 0.6rem;
  letter-spacing: -0.02em;
}

.funnel__stat-text {
  font-size: 1rem;
  color: rgba(#ffffff, 0.85);
  line-height: 1.4;
  margin: 0;
  white-space: pre-line;
}

// ── Problem ──────────────────────────────────────────────────────────────────
.funnel__problem {
  padding: 5rem 0;
  background: #ffffff;
}

.funnel__problem-title {
  @include fonts.heading-font(400);
  font-size: clamp(1.8rem, 4vw, 2.4rem);
  color: colors.$OS-DARK;
  margin: 0 0 0.5rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.funnel__problem-subtitle {
  font-size: 1.25rem;
  color: #333;
  margin: 0 0 2.5rem;
}

.funnel__section-title {
  @include fonts.heading-font(400);
  font-size: clamp(1.6rem, 3.5vw, 2.2rem);
  color: colors.$OS-DARK;
  margin: 0.25rem 0 2rem;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.funnel__problem-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.funnel__problem-item {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background: #f3f2ee;
  border-radius: 20px;

  strong {
    display: block;
    color: colors.$OS-DARK;
    font-size: 1.15rem;
    font-weight: 400;
    margin-bottom: 0.5rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }

  p {
    font-size: 1.1rem;
    color: #444;
    line-height: 1.5;
    margin: 0;
  }
}

// ── Methodology ──────────────────────────────────────────────────────────────
.funnel__method {
  padding: 4rem 0;
  background: #f5f8ff;
}

.funnel__method-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
}

.funnel__method-card {
  background: #ffffff;
  border: 1px solid #e4edf7;
  border-radius: 16px;
  padding: 1.75rem 1.5rem;
  position: relative;
  box-shadow: 0 2px 12px rgba(0, 63, 125, 0.05);
}

.funnel__method-num {
  position: absolute;
  top: 1rem;
  right: 1.25rem;
  @include fonts.heading-font(400);
  font-size: 2.5rem;
  color: rgba(colors.$OS-NAVY, 0.07);
  line-height: 1;
  user-select: none;
}

.funnel__method-icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: colors.$OS-NAVY;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;

  i {
    color: #ffffff;
    font-size: 1.1rem;
  }
}

.funnel__method-title {
  @include fonts.heading-font(400);
  font-size: 0.97rem;
  color: colors.$OS-DARK;
  margin: 0 0 0.5rem;
}

.funnel__method-body {
  font-size: 0.86rem;
  color: #4a5f7a;
  line-height: 1.55;
  margin: 0;
}

// ── Testimonial ──────────────────────────────────────────────────────────────
.funnel__testimonial {
  padding: 4rem 0;
  background: #ffffff;
}

.funnel__testimonial-card {
  background: #f5f8ff;
  border: 1px solid rgba(colors.$OS-NAVY, 0.1);
  border-left: 4px solid colors.$OS-NAVY;
  border-radius: 16px;
  padding: 2rem;
  max-width: 720px;
  margin: 0 auto;
  box-shadow: 0 4px 24px rgba(0, 63, 125, 0.07);
}

.funnel__testimonial-quote {
  font-size: 2.2rem;
  color: rgba(colors.$OS-NAVY, 0.12);
  display: block;
  margin-bottom: 0.75rem;
  line-height: 1;
}

.funnel__testimonial-text {
  font-size: 1.1rem;
  color: colors.$OS-DARK;
  line-height: 1.65;
  margin: 0 0 1.5rem;
  font-style: italic;
}

.funnel__testimonial-author {
  display: flex;
  align-items: center;
  gap: 0.75rem;

  strong {
    display: block;
    color: colors.$OS-DARK;
    font-size: 0.88rem;
    font-weight: 400;
  }

  span {
    font-size: 0.78rem;
    color: #8a9bb5;
  }
}

.funnel__testimonial-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: colors.$OS-NAVY;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  i {
    color: #ffffff;
    font-size: 1.2rem;
  }
}

// ── Authority ────────────────────────────────────────────────────────────────
.funnel__authority {
  padding: 4rem 0;
  background: linear-gradient(135deg, #eef4ff 0%, #f9fbff 100%);
  border-top: 1px solid #e4edf7;
  border-bottom: 1px solid #e4edf7;
}

.funnel__authority-inner {
  display: flex;
  gap: 2.5rem;
  align-items: flex-start;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: center;
  }
}

.funnel__authority-photo-wrap {
  flex-shrink: 0;
}

.funnel__authority-avatar {
  width: 112px;
  height: 112px;
  border-radius: 50%;
  background: colors.$OS-NAVY;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4px solid #ffffff;
  box-shadow: 0 4px 20px rgba(0, 63, 125, 0.2);
  overflow: hidden;
}

.funnel__authority-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.funnel__authority-content {
  flex: 1;
}

.funnel__authority-eyebrow {
  font-family: fonts.$font-interface;
  font-size: 0.76rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: colors.$OS-BLUE;
  margin: 0 0 0.35rem;
}

.funnel__authority-name {
  @include fonts.heading-font(400);
  font-size: 2rem;
  color: colors.$OS-DARK;
  margin: 0 0 0.2rem;
  letter-spacing: -0.02em;
}

.funnel__authority-role {
  font-size: 0.88rem;
  color: #8a9bb5;
  margin: 0 0 1rem;
}

.funnel__authority-bio {
  font-size: 0.93rem;
  color: #3a4f6a;
  line-height: 1.65;
  margin: 0 0 1rem;

  strong {
    color: colors.$OS-DARK;
    font-weight: 400;
  }
}

.funnel__authority-creds {
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
    font-size: 0.86rem;
    color: #3a4f6a;

    i {
      color: colors.$OS-BLUE;
      font-size: 0.82rem;
      flex-shrink: 0;
    }
  }
}

// ── CTA Final ────────────────────────────────────────────────────────────────
.funnel__cta-final {
  padding: 4.5rem 0;
  background: colors.$OS-NAVY;
  text-align: center;

  .funnel__section-label {
    color: rgba(#ffffff, 0.5);
  }

  .funnel__cta-btn {
    margin: 0 auto 1rem;
  }

  .funnel__cta-sub {
    color: rgba(#ffffff, 0.5);
  }
}

.funnel__cta-final-title {
  @include fonts.heading-font(400);
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  color: #ffffff;
  margin: 0 0 0.75rem;
  letter-spacing: -0.025em;
}

.funnel__cta-final-sub {
  font-size: 0.97rem;
  color: rgba(#ffffff, 0.72);
  margin: 0 auto 2rem;
  max-width: 520px;
  line-height: 1.55;
}

// ── Footer ───────────────────────────────────────────────────────────────────
.funnel__footer {
  background: colors.$OS-DARK;
  padding: 2rem 1.5rem;
}

.funnel__footer-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
}

.funnel__footer-logo {
  height: 30px;
  width: auto;
  filter: brightness(100);
  opacity: 0.6;
  object-fit: contain;
}

.funnel__footer-links {
  display: flex;
  gap: 1.5rem;

  a {
    font-size: 0.78rem;
    color: rgba(#ffffff, 0.45);
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: rgba(#ffffff, 0.85);
    }
  }
}

.funnel__footer-copy {
  font-size: 0.72rem;
  color: rgba(#ffffff, 0.28);
  margin: 0;
}
</style>

<script setup lang="ts">
/**
 * BookedTeam.vue
 * Displays the team members who will assist the client.
 * Provides social proof and builds personal connection.
 */

interface TeamMember {
  name: string
  role: string
  photo: string
}

const props = defineProps({
  team: {
    type: Array as () => TeamMember[],
    required: true,
  },
})
</script>

<template>
  <section class="booked-team">
    <h2 class="booked-team__section-title">
      <i class="fa-solid fa-users"></i>
      Conoce a tus expertos
    </h2>

    <div class="team-grid">
      <article v-for="member in props.team" :key="member.name" class="team-card">
        <!-- Foto de perfil con decoraciones -->
        <div class="team-card__image-wrap">
          <img :src="member.photo" :alt="member.name" class="team-card__photo" />
          <div class="team-card__verified-badge">
            <i class="fa-solid fa-shield-check"></i>
          </div>
        </div>

        <!-- Información del miembro -->
        <div class="team-card__info">
          <h3 class="team-card__name">{{ member.name }}</h3>
          <p class="team-card__role">{{ member.role }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/colorVariables.module.scss' as colors;
@use '@/styles/fonts.modules.scss' as fonts;

.booked-team {
  width: 100%;
  padding: 0 0 2.5rem; // Padding horizontal removido

  @media (min-width: 768px) {
    padding: 0 0 4rem;
  }

  &__section-title {
    @include fonts.heading-font(700);
    font-size: 1.15rem;
    color: colors.$white;
    margin: 0 0 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;

    i {
      color: colors.$BAKANO-PINK;
    }

    @media (min-width: 768px) {
      font-size: 1.35rem;
      margin-bottom: 2.5rem;
    }
  }
}

.team-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.75rem;
  }
}

.team-card {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.25rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 28px;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at top right,
      rgba(colors.$BAKANO-PINK, 0.1),
      transparent 70%
    );
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(colors.$BAKANO-PINK, 0.3);
    transform: translateY(-8px);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);

    &::before {
      opacity: 1;
    }

    .team-card__image-wrap {
      transform: scale(1.08) rotate(-3deg);
      border-color: colors.$BAKANO-PINK;
    }

    .team-card__verified-badge {
      transform: scale(1.2) rotate(15deg);
      background: colors.$BAKANO-PINK;
      color: colors.$white;
    }
  }

  @media (min-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 2.5rem 1.5rem;
    gap: 1.75rem;
  }

  &__image-wrap {
    position: relative;
    width: 68px;
    height: 68px;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.15);
    padding: 4px;
    transition: all 0.5s ease;
    flex-shrink: 0;
    background: #0a0712;

    @media (min-width: 768px) {
      width: 110px;
      height: 110px;
      border-width: 3px;
    }
  }

  &__photo {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    filter: saturate(1.1);
  }

  &__verified-badge {
    position: absolute;
    bottom: 2px;
    right: 2px;
    width: 22px;
    height: 22px;
    background: rgba(colors.$BAKANO-PURPLE, 0.9);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    color: colors.$white;
    border: 2px solid #0a0712;
    transition: all 0.4s ease;

    @media (min-width: 768px) {
      width: 30px;
      height: 30px;
      font-size: 0.9rem;
      bottom: 4px;
      right: 4px;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    position: relative;
    z-index: 1;
  }

  &__name {
    @include fonts.heading-font(700);
    font-size: 1.1rem;
    color: colors.$white;
    margin: 0;
    letter-spacing: -0.01em;

    @media (min-width: 768px) {
      font-size: 1.35rem;
    }
  }

  &__role {
    @include fonts.interface-font(600);
    font-size: 0.75rem;
    color: rgba(colors.$white, 0.5);
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 1.5px;

    @media (min-width: 768px) {
      font-size: 0.85rem;
    }
  }
}
</style>

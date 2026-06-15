<script setup lang="ts">
/**
 * BookedHeader.vue
 * Dedicated top bar for the confirmation page.
 */
const LOGO =
  'https://res.cloudinary.com/dpuody0df/image/upload/v1775587085/bakano/logos/bakano-light.png'
</script>

<template>
  <header class="booked-header">
    <img :src="LOGO" alt="Bakano" class="booked-header__logo" />
  </header>
</template>

<style lang="scss" scoped>
@use '@/styles/colorVariables.module.scss' as colors;

.booked-header {
  width: 100%;
  padding: 1.25rem 1rem;
  display: flex;
  justify-content: center;
  background: rgba(#0a0712, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(colors.$BAKANO-PURPLE, 0.15);
  position: sticky;
  top: 0;
  z-index: 100;

  &__logo {
    height: 26px;
    width: auto;
    filter: drop-shadow(0 0 12px rgba(colors.$BAKANO-PINK, 0.2));
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }

    @media (min-width: 768px) {
      height: 32px;
    }
  }
}
</style>

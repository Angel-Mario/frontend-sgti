<script>
export default {
  name: 'QuickLinkCard',
  props: {
    to: {
      type: [String, Object],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    compact: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<template>
  <router-link :to="to" class="quick-link-card" :class="{ compact }">
    <div class="icon-container">
      <slot />
    </div>
    <div class="content">
      <h3 class="title">
        {{ title }}
      </h3>
      <p v-if="description" class="description">
        {{ description }}
      </p>
    </div>
  </router-link>
</template>

<style scoped src="@/assets/css/quickLinkCard.css"></style>

<script setup lang="ts">
import TheForm from "./TheForm.vue";
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-cosmic">
    <div
      class="flex items-center flex-col w-full max-w-[500px] bg-dark-card border border-neon-cyan border-opacity-30 rounded-lg shadow-neon-glow p-8 mx-5 animate-fade-in"
    >
      <h3 class="text-4xl font-bold mb-8 text-white drop-shadow-lg">
        Authorization
      </h3>
      <TheForm />
      <button
        @click="$router.push('/register')"
        class="font-medium text-neon-cyan hover:text-neon-purple hover:glow-cyan transition-glow mt-8 duration-300"
      >
        Need an account? Register
      </button>
    </div>
  </div>
</template>

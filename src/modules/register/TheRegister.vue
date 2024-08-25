<script setup lang="ts">
import TheForm from "./TheForm.vue";
</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <div
      class="flex items-center flex-col w-full max-w-[500px] bg-white rounded-lg shadow-2xl p-6 mx-5"
    >
      <h3 class="text-xl font-semibold mb-5 flex-grow-0">Registration</h3>
      <TheForm />
      <button
        @click="$router.push('/auth')"
        class="font-medium text-blue-600 dark:text-blue-500 hover:underline mt-6"
      >
        <p>Have an account? <u>Login</u></p>
      </button>
    </div>
  </div>
</template>

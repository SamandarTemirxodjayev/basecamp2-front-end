<template>
  <div class="flex justify-center items-center h-screen">
    <div class="border-t-4 border-blue-500 border-solid rounded-full w-12 h-12 animate-spin"></div>
  </div>
</template>

<style scoped>
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>

<script>
  export default {
    name: "Loader"
  }
</script>
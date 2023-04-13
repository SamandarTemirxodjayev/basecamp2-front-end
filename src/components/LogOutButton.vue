<template>
  <button @click="handleLogout" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-3xl">
    Logout
  </button>
</template>

<script>
export default {
  name: "LogOutButton",
  methods: {
    handleLogout() {
      localStorage.removeItem('id');
      this.$router.push('/login');
    }
  }
}

</script>

<style>

</style>
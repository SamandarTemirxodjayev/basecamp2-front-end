<template>
  <div class="flex justify-center items-center h-screen bg-blue-300">
    <div class="w-full max-w-sm">
      <h1 class="text-3xl font-bold mb-6">Login</h1>
      <form @submit.prevent="login" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Email
          </label>
          <input v-model="email" id="username" type="emil" placeholder="Username"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input v-model="password" id="password" type="password" placeholder="Password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <button type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Login
        </button>
      </form>
      <p v-if="error" class="text-red-500">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
      error: ''
    };
  },
  methods: {
    login() {
      axios.post('https://my-basecamp-2-flax.vercel.app/api/v1/login', {email: this.email, password: this.password})
        .then(response => {
          localStorage.setItem('id', response.data.id);
          localStorage.setItem('email', response.data.email);
          this.error = '';
          this.$router.push('/');
        })
        .catch(error => {
          this.error = error.response.data.message;
          console.log(error);
        });
    }
  },
  created() {
    const id = localStorage.getItem('id');
    if (id) {
      this.$router.push('/');
    }
  }
};
</script>
<template>
  <div class="flex justify-center items-center h-screen bg-blue-300">
    <div class="w-full max-w-sm">
      <h1 class="text-3xl font-bold mb-6">Create Project</h1>
      <form @submit.prevent="createProject" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Name
          </label>
          <input v-model="name" id="username" type="text" placeholder="Username"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Description
          </label>
          <textarea v-model="description" id="description" placeholder="Description" rows="6"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-black mb-3 leading-tight focus:outline-none focus:shadow-outline"></textarea>
        </div>
        <button type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Create Project
        </button>
      </form>
      <p v-if="error" class="text-red-500">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      description: '',
      name: '',
      error: ''
    }
  },
  methods: {
    createProject () {
      if (!this.name) {
        this.error = 'Name is required'
      } else if (!this.description) {
        this.error = 'Description is required'
      } else {
        const id = localStorage.getItem('id')
        const email = localStorage.getItem('email')
        this.error = ''
        axios.post('https://my-basecamp-2-flax.vercel.app/api/v1/create', {
          name: this.name,
          description: this.description,
          email: email,
          id: id
        })
        .then(response => {
          this.error = response.data.error
          this.$router.push('/')
        })
        .catch(error => {
          console.log(error)
        })
      }
    }
  },
  name: "CreateProject"
}
</script>

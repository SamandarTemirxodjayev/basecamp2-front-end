<template>
  <div class="justify-center items-center flex mt-20">
    <div v-if="isLoading" class="text-center">Loading...</div>
    <ul v-else>
      <li v-for="project in projects" :key="project._id" class="bg-green-300 rounded-lg shadow-md p-20 mb-4">
          <h3 class="text-lg font-semibold">{{ project.name }}</h3>
          <p class="text-gray-600 mt-2">{{ project.description }}</p>
          <div class=" justify-between flex float-left text-2xl mt-10 ">
            <router-link :to="`/discuss/${project._id}`" class="no-underline mx-16">
              Discuss
            </router-link>
            <div class="" v-if="project.email == id">
              <router-link :to="`/project/${project._id}`" class="no-underline ">
                Edit Project
              </router-link>
            </div>
            <div class="" v-else></div>
          </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data () {
    return {
      projects: [],
      isLoading: true,
      id: null
    }
  },
  created() {
    axios.get('https://my-basecamp-2-flax.vercel.app/api/v1/projects/all')
      .then(response => {
        this.projects = response.data.projects;
        console.log(this.projects)
        this.isLoading = false; // Set isLoading to false after data is fetched
      })
      .catch(error => {
        console.log(error);
        this.isLoading = false; // Set isLoading to false on error as well
      });
      const id = localStorage.getItem('email');
      this.id = id;
  },
}
</script>

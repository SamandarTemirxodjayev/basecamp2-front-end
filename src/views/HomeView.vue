<template>
  <div>
    <div v-if="isLoading">
      <Loader />
    </div>
      <div v-else class=" justify-between flex mx-32 ">
        <div class="text-3xl font-bold">
          Hello {{ name }}
        </div>
        <create-project/>
        <log-out-button/>
      </div>
      <div class="  ">
        <projects />
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import Loader from '../components/Loader.vue';
import LogOutButton from '../components/LogOutButton.vue';
import CreateProject from '../components/CreateProject.vue';
import Projects from '../components/Projects.vue';
export default {
  components: { Loader, LogOutButton, CreateProject, Projects },
  name: 'HomeView',
  data() {
    return {
      id: null,
      name: '',
      isLoading: true,
      error: null
    };
  },
  created() {
    const id = localStorage.getItem('id');
    if (!id) {
      this.$router.push('/register');
    } else {
      this.id = id;
      axios.get(`https://my-basecamp-2-flax.vercel.app/api/v1/user/${id}`)
        .then(response => {
          this.name = response.data.user.name;
          this.isLoading = false; // Set isLoading to false after data is fetched
        })
        .catch(error => {
          console.error(error);
          this.error = 'Failed to fetch user data';
          this.isLoading = false; // Set isLoading to false on error as well
        });
    }
  },
};
</script>

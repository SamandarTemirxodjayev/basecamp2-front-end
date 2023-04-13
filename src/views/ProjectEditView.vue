<template>
  <div class="">
    <div class="">
      <loader v-if="loading"></loader> <!-- Add this line for conditional rendering of the loader -->
    </div>
    <div class="flex justify-center items-center h-screen">
    <div class="bg-white rounded-lg p-8 shadow-md big">
      <div class="text-3xl font-bold mb-12">
        Created By {{ project.email }}
      </div>
      <h2 class="text-xl font-bold mb-4">Edit Project</h2>
      <form class="" @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="name" class="block text-gray-800 font-medium mb-2">Name:</label>
          <input type="text" id="name" v-model="project.name" class="w-full rounded-md p-2 bg-orange-400 text-xl">
        </div>
        <div class="mb-4">
          <label for="description" class="block text-gray-800 font-medium mb-2">Description:</label>
          <textarea id="description" v-model="project.description" class="w-full rounded-md p-2 bg-orange-400 text-xl" rows="4"></textarea>
        </div>
        <div class="mb-4">
          <label for="file" class="block text-gray-800 font-medium mb-2">Load File:</label>
          <input id="file" class="w-full rounded-md p-2 bg-orange-400 text-xl" type="file" ref="imageRef">
        </div>
        <div class="flex justify-end">
          <button type="submit" class="bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 transition-colors text-2xl">Update Project</button>
        </div>
      </form>
    </div>
  </div>
  </div>
  
</template>

<script>
import axios from 'axios';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import firebaseApp from '../firebase.js'
import Loader from '../components/Loader.vue';

export default {
  components: { Loader },
  name: 'ProjectEdit',
  data() {
    return {
      projectId: null,
      project: {
        email: '',
        name: '',
        description: ''
      },
      loading: false
    };
  },
  created() {
    // Check if id parameter is defined
    if (this.$route.params.id) {
      this.projectId = this.$route.params.id;
      axios.get(`https://my-basecamp-2-flax.vercel.app/api/v1//projects/${this.projectId}`)
        .then(response => {
          this.project = response.data.project; // Set the fetched project data to the 'project' data property
        })
        .catch(error => {
          console.log(error);
        });
        
    }
  },
  methods: {
    handleSubmit() {
      this.loading = true;
      const file = this.$refs.imageRef.files[0];
      const fileName = file.name;
      const storage = getStorage(firebaseApp);
      const pathFile = `posts/${fileName}`;
      const storageRef = ref(storage, pathFile);
      uploadBytes(storageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          axios.post('https://my-basecamp-2-flax.vercel.app/api/v1/editproject',{
            id: this.projectId,
            name: this.project.name,
            description: this.project.description,
            url: downloadURL
          }).then(response => {
            this.loading = false;
            alert('Project updated successfully');
            this.$router.push('/');
          })
          
        });
        this.loading = false;
      });
    },
  }
}
</script>


<style scoped>
.big{
  width: 450px;
}
</style>

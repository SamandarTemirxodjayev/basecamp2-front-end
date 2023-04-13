<template>
  <div class="">
    <div class="">
      <loader v-if="loading"></loader> <!-- Add this line for conditional rendering of the loader -->
    </div>
    <div class="">
      <router-link to="/" class="text-3xl font-bold text-blue-700">
        Home
      </router-link>
    </div>
    <div class="flex justify-center items-center h-screen">
    <div class="bg-white rounded-lg p-8 shadow-md big">
      <div class="text-3xl font-bold mb-12">
        Created By {{ project.email }}
      </div>
      <h2 class="text-xl font-bold mb-4">Edit Project</h2>
        <div class="mb-4">
          <label for="name" class="block text-gray-800 font-medium mb-2">Name:</label>
          <div class="bg-green-500 h-10 w-full text-center">
            {{ project.name }}
          </div>
        </div>
        <div class="mb-4">
          <label for="description" class="block text-gray-800 font-medium mb-2">Description:</label>
          <div class="bg-green-500 h-16 w-full text-center">
            {{ project.description }}
          </div>
        </div>
        <div class="" v-if="!project.url">
          <div class="">
            Not Have File
          </div>
        </div>
        <div v-else class="mb-4">
          <label for="file" class="block text-gray-800 font-medium mb-2">Loaded File:</label>
          <button @click="handleDownload" class="bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 transition-colors text-2xl">
            Download File
          </button>
        </div>
      </div>
    </div>
    <div class="text-center flex justify-center mt-[-200px]"> <!-- Use mt-[-200px] to apply negative margin-top -->
      <div class="">
        <div class="" v-if="discussItems.length != 0">
          <ul class="list-inside list-none"> <!-- Use list-disc to style the bullet points, and list-inside to indent the list -->
            <li v-for="discussItem in discussItems" :key="discussItem._id" class="my-4"> <!-- Use my-4 to apply margin-y to each list item -->
              <div class="text-gray-800 font-medium"> <!-- Customize text color and font weight -->
                User Id: {{ discussItem.userId }}
              </div>
              <div class="text-gray-600"> <!-- Customize text color -->
                Comment: {{ discussItem.comment }}
              </div>
              <div class="" v-if="discussItem.userId == userId">
                <button @click="handleDelete(`${discussItem._id}`)" class="bg-red-500 text-white font-medium py-2 px-4 rounded-md hover:bg-red-600 transition-colors"> <!-- Customize button styles with background color, text color, padding, and rounded styles -->
                  Delete
                </button>
              </div>
            </li>
          </ul>

        </div>
        <div class="" v-else>
          Not have Discuss
        </div>
        <div class="flex mt-4"> <!-- Use mt-4 to apply margin-top -->
          <input v-model="comment" type="text" placeholder="Write discuss" class="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-blue-500"> <!-- Customize input with border, padding, and rounded styles -->
          <button @click="handleCreate" class="bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 transition-colors text-2xl ml-2"> <!-- Use ml-2 to apply margin-left -->
            Send
          </button>
        </div>
      </div>
    </div>

  </div>
  
</template>

<script>
import axios from 'axios';
import Loader from '../components/Loader.vue';
export default {
  methods: {
    handleDownload(){
      window.location.href = this.project.url
    },
    handleCreate(){
      this.loading = true;
      axios.post('https://my-basecamp-2-flax.vercel.app/api/v1/discuss', {
        postId: this.project._id,
        userId: this.userId,
        comment: this.comment
      })
      .then(res => {
        window.location.reload();
      }).
      catch(err => {
        console.log(err)
      })
      this.loading = false;
    },
    handleDelete(id){
      this.loading = true;
      axios.delete('https://my-basecamp-2-flax.vercel.app/api/v1/discuss/'+ id)
      .then(res => {
        window.location.reload();
      })

    }
  },
  components: { Loader },
  data () {
    return {
      projectId: '',
      project: {
        email: '',
        name: '',
        description: '',
        url: '',
        _id: ''
      },
      loading: true,
      discussItems: [],
      userId: '',
      comment: ''
    }
  },
  name: 'Discuss',
  created() {
    const id = localStorage.getItem('id');
    this.userId = id; 
    if (this.$route.params.id) {
      this.projectId = this.$route.params.id;
      axios.get(`https://my-basecamp-2-flax.vercel.app/api/v1/projects/${this.projectId}`)
        .then(response => {
          this.project = response.data.project; // Set the fetched project data to the 'project' data propertyc
        })
        .catch(error => {
          console.log(error);
        });
      axios.post(`https://my-basecamp-2-flax.vercel.app/api/v1/discuss/${this.projectId}`)
        .then(response => {
          this.discussItems = response.data.comments;
        })
        .catch(error => {
          console.log(error);
        });
        this.loading = false;
    }
  },
}
</script>

<style>

</style>
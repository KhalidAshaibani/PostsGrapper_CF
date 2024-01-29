<script setup></script>

<template>
  <div class="p-4 h-[100vh] w-[100vw]">
    <div class="p-3 border-2 h-full rounded-lg">
      <div class="mt-4 p-3">
        <div class="flex gap-x-3 items-center mb-4">
          <label class="block text-lg font-semibold" for="search">
            Search
          </label>
          <input class="border-2 p-1 rounded" type="search" v-model="search" />
        </div>
        <div>
          <button
            class="p-3 bg-blue-500 text-white rounded py-2"
            @click="getPosts"
          >
            Get Posts
          </button>
        </div>
      </div>
      <div>
        <div v-for="text in posts" class="px-3 py-2 rounded-lg border-2 mb-1">
          <span class="text-blue-500 px-2 py-1 rounded-full bg-blue-100">
            {{ text.username }}
          </span>
          <div class="h-2"></div>
          {{ text.post }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      posts: [],
      search: null,
    };
  },
  methods: {
    async getPosts() {
      const posts = await axios.get(
        `http://127.0.0.1:3000/${
          this.search ? `search?search=${this.search}` : ""
        }`
      );
      this.posts = posts.data?.posts;
    },
  },
};
</script>

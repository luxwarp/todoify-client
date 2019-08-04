<template>
  <UniversalModal @close="$router.go(-1)">
    <template v-slot:title>
      <h2>Edit category</h2>
    </template>
    <template v-slot:body>
      <form @submit.prevent="onSubmit">
        <label for="newTitle">Current title: {{ category.title }}</label>
        <span v-if="error" style="color: red;">{{ error }}</span>
        <input
          v-model="newTitle"
          v-focus
          name="newTitle"
          type="text"
          placeholder="New title"
          required
        />
        <button type="submit" class="button primary">
          <span class="label">Update</span>
          <i class="icon-ok"></i>
        </button>
      </form>
    </template>
  </UniversalModal>
</template>

<script>
import UniversalModal from "@/components/common/UniversalModal/UniversalModal";
export default {
  name: "CategoryEdit",
  components: {
    UniversalModal
  },
  data() {
    return {
      newTitle: "",
      error: ""
    };
  },
  computed: {
    category() {
      return this.$store.getters.getCategoryById(this.$route.params.categoryId);
    }
  },
  methods: {
    onSubmit() {
      if (!this.newTitle || !this.newTitle.trim()) {
        return (this.error = "New title is required.");
      } else if (this.category.title === this.newTitle) {
        return this.$router.go(-1);
      }
      this.$store.dispatch("updateCategory", {
        id: this.category._id,
        newTitle: this.newTitle
      });
      this.newTitle = "";
      this.error = "";
      this.$router.go(-1);
    }
  }
};
</script>

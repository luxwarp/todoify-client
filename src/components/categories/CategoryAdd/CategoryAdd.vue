<template>
  <UniversalModal v-if="show" @close="close">
    <template v-slot:title>
      Add Category
    </template>
    <template v-slot:body>
      <p v-if="error" style="color: red">
        {{ error }}
      </p>
      <form @submit.prevent="onSubmit">
        <input
          v-model="title"
          v-focus
          type="text"
          placeholder="Enter a title"
          required
        />
        <l-button type="submit" design="primary">
          <span class="label">Add category</span><i class="icon-plus"></i>
        </l-button>
      </form>
    </template>
  </UniversalModal>
</template>

<script>
export default {
  name: "CategoryAdd",
  props: {
    show: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      title: null,
      error: null
    };
  },
  methods: {
    close() {
      this.error = null;
      this.title = null;
      this.$emit("close");
    },
    onSubmit() {
      if (!this.title || !this.title.trim()) {
        this.error = "Title is required.";
        this.title = null;
        return;
      }

      this.$store.dispatch("createCategory", this.title);

      this.close();
    }
  }
};
</script>

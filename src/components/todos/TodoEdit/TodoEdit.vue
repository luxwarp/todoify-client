<template>
  <UniversalModal @close="close">
    <template v-slot:title>
      Edit to-do
    </template>
    <template v-slot:body>
      <form @submit.prevent="onSubmit">
        <label for="title">Title: </label>
        <span v-if="error" style="color: red">{{ error }}</span>
        <input
          v-model="customTodo.title"
          v-focus
          name="title"
          type="text"
          placeholder="Title"
          required
        />
        <div class="row">
          <label for="done">Done: </label>
          <input v-model="customTodo.done" name="done" type="checkbox" />
        </div>

        <label for="category">Category: </label>
        <select v-model="customTodo.category" name="category">
          <option value="null">Uncategorized</option>
          <option
            v-for="category in categories"
            :key="category._id"
            :value="category._id"
            >{{ category.title }}</option
          >
        </select>

        <button type="submit" class="button primary">
          <span class="label">Update</span>
          <i class="icon-ok"></i>
        </button>
      </form>
    </template>
  </UniversalModal>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "TodoEdit",
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      error: "",
      customTodo: null
    };
  },
  computed: {
    ...mapGetters({
      categories: "getCategories"
    })
  },
  created() {
    this.customTodo = Object.assign({}, this.customTodo, this.todo);
  },
  methods: {
    close(payload) {
      this.$emit("close", payload);
    },
    onSubmit() {
      if (!this.customTodo.title || !this.customTodo.title.trim()) {
        return (this.error = "Title is required.");
      } else if (
        JSON.stringify(this.todo) === JSON.stringify(this.customTodo)
      ) {
        return this.close();
      }

      if (this.customTodo.category === "null") {
        this.customTodo.category = null;
      }
      this.$store.dispatch("updateTodo", this.customTodo);
      this.close(this.customTodo);
    }
  }
};
</script>

<style lang="scss" scoped>
.row {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
}
</style>

<template>
  <UniversalModal v-if="show" @close="close">
    <template v-slot:title>
      Add to-do
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
        <div v-if="categories.length" class="row">
          <label>Category: </label>
          <select v-model="selectedCategory">
            <option value="null">Uncategorized</option>
            <option
              v-for="category in categories"
              :key="category._id"
              :value="category._id"
            >
              {{ category.title }}
            </option>
          </select>
        </div>
        <button type="submit" class="button primary">
          <span class="label">Add to-do</span><i class="icon-plus"></i>
        </button>
      </form>
    </template>
  </UniversalModal>
</template>

<script>
import UniversalModal from "@/components/common/UniversalModal/UniversalModal";
import { mapGetters } from "vuex";
export default {
  name: "AddTodo",
  components: {
    UniversalModal
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      title: null,
      error: null,
      categorySpecial: null
    };
  },
  computed: {
    ...mapGetters({
      categories: "getCategories"
    }),
    selectedCategory: {
      get() {
        return this.categorySpecial || this.$route.params.categoryId || null;
      },
      set(newVal) {
        this.categorySpecial = newVal;
      }
    }
  },
  methods: {
    close() {
      this.$emit("close");
      this.error = null;
      this.title = null;
      this.selectedCategory = null;
    },
    onSubmit() {
      if (!this.title || !this.title.trim()) {
        this.error = "Title is required.";
        this.title = null;
        return;
      }

      this.$store.dispatch("createTodo", {
        title: this.title,
        category: this.selectedCategory
      });

      this.close();
    }
  }
};
</script>
<style lang="scss" scoped>
.row {
  display: flex;
  flex-wrap: wrap;
}
</style>

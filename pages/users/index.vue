<template>
  <div class="d-flex flex-column align-self-stretch page-color">
    <h2 class="text-white">Listing</h2>
    <div class="w-2 py-2">
      <div @click="goToCreate()" class="btn btn-primary ">Add +</div>
    </div>

    <Table :cols="columns" model="users" title="Users" />
  </div>
</template>

<script>
export default {
   middleware: 'auth',
  methods:{
    goToCreate(){
      this.$router.push(`/users/create`)
    }
  },
  data() {
    return {
      columns: [
        {
          label: "id",
          name: "id",
          uniqueId: true,
        },
        {
          label: "Name",
          name: "name",
        },
        {
          label: "Email",
          name: "email",
        },
        {
          label: "Type",
          name: "user_type.description",
        },
        {
          label: "Actions",
          slot_name: "actions",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
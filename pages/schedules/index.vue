<template>
  <div class="d-flex flex-column align-self-stretch page-color">
    <h2 class="text-white">Listing</h2>
    <div class="w-2 py-2">
      <div @click="goToCreate()" class="btn btn-primary ">Add +</div>
    </div>

    <Table :cols="columns" model="schedules" title="Schedules" />
  </div>
</template>

<script>
export default {
   middleware: 'auth',
  methods:{
    goToCreate(){
      this.$router.push(`/schedules/create`)
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
          label: "User",
          name: "user.name",
        },
        {
          label: "Has Obs",
           slot_name: "observation",
        },
       {
          label: "Disponibility",
          name: "disponibility",
          slot_name: "disponibility",
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
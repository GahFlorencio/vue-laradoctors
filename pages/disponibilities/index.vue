<template>
  <div class="d-flex flex-column align-self-stretch page-color">
    <h2 class="text-white">Listing</h2>
    <div class="w-2 py-2">
      <div @click="goToCreate()" class="btn btn-primary ">Add +</div>
    </div>

    <Table :cols="columns" model="disponibilities" title="Disponibilites" />
  </div>
</template>

<script>
export default {
   middleware: 'auth',
  methods:{
    goToCreate(){
      this.$router.push(`/disponibilities/create`)
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
          label: "Doctor",
          name: "user.name",
        },
        {
          label: "Date",
          name: "date",
        },
       {
          label: "Schedule",
          name: "schedule",
          slot_name: "schedule",
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
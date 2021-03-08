<template>
</template>

<script>
export default {
  middleware: 'auth',
  created(){
    this.$router.push(`/schedules`);
  }
}
</script>
<template>
  <div class="container align-middle">
    <div class="">
      <div class="align-items-start">
        <img alt="Vue logo" src="../assets/hacknoid-color.png" />
      </div>
      <div class="align-items-end">
        <scan-form></scan-form>
      </div>
    </div>
  </div>
</template>

<script>
import ScanForm from "@/components/ScanForm.vue";
// @ is an alias to /src
export default {
  name: "Home",
  components: {
    ScanForm,
  },
};
</script>

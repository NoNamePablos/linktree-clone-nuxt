<script setup lang="ts">
import {useUserStore} from "~/stores/user";
import  {storeToRefs} from "pinia";
import {onMounted} from "vue";
const userStore=useUserStore();
const {updatedLinkId}=storeToRefs(userStore);
const route=useRoute();
onMounted(()=>{
  updatedLinkId.value=0
})
</script>

<template>
  <div id="AuthLayout" class="h-screen w-full flex justify-between">
    <div class="lg:pt-7 pt-3 lg:px-12 px-6 lg:w-2/3 w-full lg:min-w-[800px]">
      <NuxtLink to="/" class="inline-block">
        <img src="~/assets/images/linktree-logo.png" alt="" class="lg:w-28 w-[75px] select-none">
      </NuxtLink>
      <main class="w-full">
        <div class="w-full md:max-w-[550px] max-w-[360px] mx-auto">
          <slot></slot>
        </div>
      </main>
    </div>
    <div class="lg:block hidden w-1/3 pointer-events-none">
      <img  v-if="route.fullPath==='/'"
            src="~/assets/images/side1.png"
           class="object-cover w-full h-screen select-none"
           alt="">
      <img  v-else
            src="~/assets/images/side2.png"
            class="object-cover w-full h-screen select-none"
            alt="">
    </div>
  </div>
</template>

<style scoped>

</style>
<script setup lang="ts">
  import AdminLayout from '~/layouts/AdminLayout.vue';
  const userStore = useUserStore();
</script>

<template>
  <AdminLayout>
    <div id="AdminPage" class="flex h-[100vh] pb-4">
      <div
        class="lg:w-[calc(100%-500px)] md:w-[calc(100%-330px)] w-full md:pt-20 pt-14">
        <div class="max-w-[750px mx-auto pb-24">
          <button
            v-if="userStore.isMobile || !showAddlink"
            @click="($event) => showAddLinkFunc()"
            class="flex items-center justify-center w-full py-3 rounded-full text-white font-semibold bg-[#8228d9] hover:bg-[#6c21b3]"
            :class="userStore.isMobile ? 'mt-8 text-xl' : 'mt-20 md:mt-8'">
            <Icon
              v-if="!userStore.isMobile"
              name="mdi:plus"
              class="mr-0.5"
              size="25" />
            <span v-if="!userStore.isMobile">Add Link</span>
            <span v-if="userStore.isMobile">Add new Link</span>
          </button>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<style scoped></style>

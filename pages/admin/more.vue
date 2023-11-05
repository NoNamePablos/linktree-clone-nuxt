<script setup lang="ts">
  import AdminLayout from '~/layouts/AdminLayout.vue';
  import { useUserStore } from '~/stores/user';
  import { useRouter } from 'vue-router';

  const userStore = useUserStore();

  let windowWidth = ref(process.client ? window.innerWidth : '');

  const getWindowWidth = () => {
    windowWidth.value = window.innerWidth;
  };
  const router = useRouter();
  onMounted(() => {
    window.addEventListener('resize', getWindowWidth);
  });
  onUnmounted(() => {
    window.removeEventListener('resize', getWindowWidth);
  });
  const logout = async () => {
    let res = confirm('Logout?');
  };
  watch(
    () => windowWidth.value,
    () => {
      if (windowWidth.value >= 767) {
        router.push('/admin');
      }
    },
  );
</script>

<template>
  <AdminLayout>
    <div
      id="MorePage"
      class="flex"
      :class="userStore.isMobile ? 'pt-24' : 'pt-32'">
      <div class="rounded-md bg-white w-full">
        <button
          @click="logout()"
          class="w-full flex items-center text-gray-600 p-3 hover:text-black"
          :class="userStore.isMobile ? 'text-[20px]' : 'text-[15px]'">
          <Icon
            name="circum:logout"
            class="mr-6"
            :size="userStore.isMobile ? '22' : '15'" />
          Sign out
        </button>
      </div>
    </div>
  </AdminLayout>
</template>

<style scoped></style>

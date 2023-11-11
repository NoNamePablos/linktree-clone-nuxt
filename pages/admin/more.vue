<script setup lang="ts">
  import AdminLayout from '~/layouts/AdminLayout/AdminLayout.vue';
  import { useUserStore } from '~/stores/user';
  import { useRouter } from 'vue-router';
  // definePageMeta({middleware:'is-logged-out'})
  const userStore = useUserStore();
  const router = useRouter();

  let windowWidth = ref(process.client ? window.innerWidth : '');

  const getWindowWidth = (): void => {
    windowWidth.value = window.innerWidth;
  };

  onMounted(() => {
    window.addEventListener('resize', getWindowWidth);
  });
  onUnmounted(() => {
    window.removeEventListener('resize', getWindowWidth);
  });
  const logout = async (): Promise<void> => {
    try {
      await userStore.logout();
      router.push('/');
      return;
    } catch (error) {
      console.log(error);
    }
  };
  watch(
    () => windowWidth.value,
    () => {
      if ((windowWidth.value as number) >= 767) {
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

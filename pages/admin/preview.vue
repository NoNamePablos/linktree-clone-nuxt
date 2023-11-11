<script setup lang="ts">
  import AdminLayout from '~/layouts/AdminLayout/AdminLayout.vue';
  import { useUserStore } from '~/stores/user';
  import type { IUserExtendLink } from '~/types/link.interface';
  // definePageMeta({middleware:'is-logged-out'})
  const userStore = useUserStore();
  const fakeLink: IUserExtendLink[] = [
    {
      id: 1,
      name: 'Yt Chanel',
      url: 'https://dev.to/alexdrocks/using-lodash-debounce-with-react-hooks-for-an-async-data-fetching-input-2p4g',
      image:
        'https://avatars.mds.yandex.net/get-mpic/11375416/2a0000018b56bcb47a42097dc308fd55ef96/300x300',
    },
    {
      id: 2,
      name: 'Yt Chanel2',
      url: 'https://dev.to/alexdrocks/using-lodash-debounce-with-react-hooks-for-an-async-data-fetching-input-2p4g',
      image:
        'https://avatars.mds.yandex.net/get-mpic/11375416/2a0000018b56bcb47a42097dc308fd55ef96/300x300',
    },
    {
      id: 3,
      name: 'Yt Chanel3',
      url: 'https://dev.to/alexdrocks/using-lodash-debounce-with-react-hooks-for-an-async-data-fetching-input-2p4g',
      image:
        'https://avatars.mds.yandex.net/get-mpic/11375416/2a0000018b56bcb47a42097dc308fd55ef96/300x300',
    },
  ];
</script>

<template>
  <div class="fixed overflow-auto w-full h-screen" :class="userStore.theme" />
  <AdminLayout>
    <div id="PreviewAdminPage" class="w-full mx-auto pt-32 relative z-10">
      <div class="mx-auto w-full">
        <div class="h-full mx-auto w-full">
          <img
            class="rounded-full min-w-[60px] w-[60px] mx-auto mt-8"
            src="https://avatars.mds.yandex.net/get-mpic/11375416/2a0000018b56bcb47a42097dc308fd55ef96/300x300"
            alt="" />
          <div
            class="text-center text-2xl font-semibold mt-2"
            :class="userStore.theme">
            @baidekinsergey
          </div>
          <div
            class="text-center text-lg font-light mt-2 mb-10"
            :class="userStore.theme">
            <div class="px-8">this is bio section !!!</div>
          </div>
          <div v-for="link in fakeLink" :key="link.id">
            <a
              :href="link.url"
              target="_blank"
              class="flex items-center relative w-[calc(100%-10px)] mx-auto border bg-white mt-2 p-1 rounded-lg">
              <img
                :src="link.image"
                class="rounded-lg h-[55px] aspect-square"
                alt="" />

              <div class="absolute text-[20px] text-center w-full">
                {{ link.name }}
              </div>
            </a>
          </div>
          <div class="pb-12" />
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

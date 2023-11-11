<script setup lang="ts">
  import { IUserExtendLink } from '~/types/link.interface';

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
  <div
    class="md:block fixed hidden right-0 lg:w-[500px] w-[310px] h-[calc(100%-20px)] mt-[20px] mx-auto border-l border-l-gray-300 pt-20">
    <div
      class="mx-auto mt-16 mb-16 flex items-center justify-center w-full lg:max-w-[230px] max-w-[200px] lg:h-[460px] h-[400px] p-3 rounded-3xl relative">
      <img
        src="~/assets/images/mobile-case.png"
        class="absolute z-10 pointer-events-none select-none"
        alt="" />
      <div
        class="w-full h-full absolute lg:max-w-[220px] max-w-[195px] rounded-3xl z-0"
        :class="userStore.theme">
        <div class="h-full mx-auto w-full overflow-auto z-10">
          <img
            class="rounded-full min-w-[60px] w-[60px] mx-auto mt-8"
            src="https://avatars.mds.yandex.net/get-mpic/11375416/2a0000018b56bcb47a42097dc308fd55ef96/300x300"
            alt="" />
          <div
            class="text-center text-sm font-semibold mt-4 break-words"
            :class="userStore.theme">
            @baidekinsergey
          </div>
          <div
            class="text-center text-[10px] font-semibold mt-2"
            :class="userStore.theme">
            <div class="px-8 break-words">this is bio section !!!</div>
          </div>
          <div v-for="link in fakeLink" :key="link.id">
            <a
              :href="link.url"
              target="_blank"
              class="flex items-center relative w-[calc(100%-10px)] mx-auto border bg-white mt-2 p-1 rounded-xl">
              <img
                :src="link.image"
                class="rounded-lg h-[30px] aspect-square"
                alt="" />
              <div class="absolute w-full">
                <div class="max-w-[70%] w-full mx-auto text-[10px] text-center">
                  {{ link.name }}
                </div>
              </div>
            </a>
          </div>
          <div class="pb-12" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

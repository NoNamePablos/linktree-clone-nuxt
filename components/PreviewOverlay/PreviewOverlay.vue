<script setup lang="ts">
  import { useUserStore } from '~/stores/user';
  import type { Ref } from 'vue';
  import type { IUserExtendLink } from '~/types/link.interface';

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
  const userStore = useUserStore();
  onUnmounted(() => {
    userStore.isPreviewOverlay = false;
  });
</script>

<template>
  <div
    id="PreviewOverlay"
    class="md:hidden fixed bg-white z-30 top-0 left-0 h-full w-full overflow-auto"
    :class="userStore.theme">
    <div
      id="PreviewOverlayTopNav"
      class="w-full fixed z-10 flex items-center justify-between">
      <div
        class="flex items-center justify-between px-2 py-[8px] pl-4 bg-white w-full border-b">
        <div class="flex items-center justify-start w-full">
          <button @click="userStore.isPreviewOverlay = false">
            <img
              src="~/assets/images/linktree-logo-icon.png"
              class="w-[23px] min-w-[23px] select-none"
              alt="" />
          </button>
        </div>
        <div class="flex items-center justify-between gap-3">
          <button class="btn btn-sm">
            <Icon
              name="healthicons:megaphone-outline"
              class="mr-0.5"
              size="22" />
          </button>
          <button class="btn btn-sm">
            <Icon name="mdi:lightning-bolt" class="mr-0.5" size="18" />
            Upgrade
          </button>
          <button class="btn btn-sm">
            <Icon name="teenyicons:upload-solid" class="mr-1.5" size="18" />
            Share
          </button>
        </div>
      </div>
    </div>
    <div
      id="PreviewOverlayContentSection"
      class="relative w-full h-full mx-auto pt-24">
      <div class="mx-auto mb-16 w-full p-3">
        <div class="h-full mx-auto w-full overflow-auto z-10">
          <img
            src="https://avatars.mds.yandex.net/get-mpic/11375416/2a0000018b56bcb47a42097dc308fd55ef96/300x300"
            class="rounded-full min-w-[100px] w-[100px] mx-auto"
            alt="" />
        </div>
        <div
          class="text-center text-sm font-semibold mt-4 break-words"
          :class="userStore.theme">
          @baidekinsergey
        </div>
        <div
          class="text-center text-[10px] font-light mt-2"
          :class="userStore.theme">
          <div class="px-8 break-words">this is bio section !!!</div>
        </div>
        <div v-for="link in fakeLink" :key="link.id">
          <a
            :href="link.url"
            target="_blank"
            class="flex items-center relative w-[calc(100%-10px)] mx-auto border bg-white mt-4 p-1 rounded-lg">
            <img
              :src="link.image"
              class="rounded-lg h-[45px] aspect-square"
              alt="" />

            <div class="absolute text-[16px] text-center w-full">
              {{ link.name }}
            </div>
          </a>
        </div>
        <div class="pb-28" />
      </div>
    </div>
    <div
      id="PreviewButton"
      class="fixed bottom-10 w-full flex items-center justify-center">
      <button
        @click="($event) => (userStore.isPreviewOverlay = false)"
        class="md:hidden flex items-center text-[17px] font-semibold px-5 py-2.5 bg-[#dfe2d9] rounded-full">
        <Icon name="mdi:close" size="30" />
      </button>
    </div>
  </div>
</template>

<style scoped></style>

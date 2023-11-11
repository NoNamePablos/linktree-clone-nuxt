<script setup lang="ts">
  import { useUserStore } from '~/stores/user';
  import { storeToRefs } from 'pinia';
  import { onMounted } from 'vue';
  import type { Ref } from 'vue';
  import { onClickOutside } from '@vueuse/core';
  import type { INavigationLink } from '~/layouts/AdminLayout/AdminLayout.interface';

  const userStore = useUserStore();
  const { updatedLinkId } = storeToRefs(userStore);
  const route = useRoute();
  const router = useRouter();

  const links: Ref<INavigationLink[]> = ref([
    {
      name: 'Links',
      url: '/admin',
      icon: 'icon-park-outline:hamburger-button',
    },
    {
      name: 'Apperance',
      url: '/admin/apperance',
      icon: 'fluent:shapes-48-regular',
    },
    { name: 'Analytics', url: '/', icon: 'tabler:brand-google-analytics' },
    { name: 'Settings', url: '/', icon: 'material-symbols:settings' },
  ]);
  const linkSecondaryNav: Ref<INavigationLink[]> = ref([
    {
      name: 'Links',
      url: '/admin',
      icon: 'icon-park-outline:hamburger-button',
    },
    {
      name: 'Apperance',
      url: '/admin/apperance',
      icon: 'fluent:shapes-48-regular',
    },
    { name: 'Analytics', url: '/', icon: 'tabler:brand-google-analytics' },
    {
      name: 'More',
      url: '/admin/more',
      icon: '',
      img: 'https://avatars.mds.yandex.net/get-mpic/11375416/2a0000018b56bcb47a42097dc308fd55ef96/300x300',
    },
  ]);
  const linksMobile: Ref<INavigationLink[]> = ref([
    {
      name: 'Links',
      url: '/admin',
      icon: 'icon-park-outline:hamburger-button',
      img: '',
    },
    {
      name: 'Apperance',
      url: '/admin/apperance',
      icon: 'fluent:shapes-48-regular',
      img: '',
    },
    {
      name: 'Preview',
      url: '/admin/preview',
      icon: 'icon-park-outline:preview-open',
      img: '',
    },
    {
      name: 'Analytics',
      url: '/',
      icon: 'tabler:brand-google-analytics',
      img: '',
    },
    {
      name: 'More',
      url: '/admin/more',
      icon: '',
      img: 'https://avatars.mds.yandex.net/get-mpic/11375416/2a0000018b56bcb47a42097dc308fd55ef96/300x300',
    },
  ]);

  const isTopNav: Ref<boolean> = ref(false);
  let windowWidth: Ref<string | number> = ref(
    process.client ? window.innerWidth : '',
  );
  let isSecondaryTopNav: Ref<boolean> = ref(false);
  const modalRef = ref(null);
  const openMenu = (str: string): void => {
    if (str === 'TopNav') {
      isTopNav.value = true;
    } else if (str === 'SecondaryTopNav') {
      isSecondaryTopNav.value = true;
    } else {
      router.push('/admin/settings');
    }
  };
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
      if ((windowWidth.value as number) <= 767) {
        isTopNav.value = false;
      }
    },
  );
  const currentMobilePage = () => {
    switch (route.fullPath) {
      case '/admin':
        return 'Links';
        break;
      case '/admin/apperance':
        return 'Apperance';
        break;
      case '/admin/preview':
        return 'Preview';
        break;
      case '/admin/more':
        return 'More';
        break;
    }
  };

  onMounted(() => {
    window.addEventListener('resize', function () {
      windowWidth.value = window.innerWidth;
    });
  });
  onClickOutside(modalRef, (event) => {
    isTopNav.value = false;
  });
</script>

<template>
  <div id="AdminLayout" class="w-full fixed z-30">
    <div
      v-if="!userStore.isMobile"
      id="TopNav"
      class="flex w-full items-center justify-between md:pt-2.5 md:px-2.5">
      <div
        class="flex items-center justify-between md:rounded-full md:shadow-sm px-2 md:pl-6 pl-4 py-[8px] bg-white w-full border-b">
        <div class="flex items-center w-max justify-start w-full max-w-[500px]">
          <NuxtLink to="/admin">
            <img
              src="../../assets/images/linktree-logo-icon.png"
              class="w-[23px] min-w-[23px] select-none" />
          </NuxtLink>
          <div v-for="link in links" class="lg:px-2.5 px-0.5 md:block hidden">
            <NuxtLink
              :to="link.url"
              class="flex items-center text-sm font-semibold px-1.5 py-3 rounded-lg hover:bg-gray-100">
              <Icon
                :name="link?.icon as string"
                class="mt-0.5"
                size="18"
                :color="route.fullPath === link.url ? '#000000' : '#67685f'" />
              <div
                :class="
                  route.fullPath === link.url ? 'text-black' : 'text-[#67685f]'
                ">
                {{ link.name }}
              </div>
            </NuxtLink>
          </div>
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
          <button
            class="rounded-full md:block hidden"
            @click="
              ($event) => (!isTopNav ? openMenu('TopNav') : (isTopNav = false))
            ">
            <img
              src="https://avatars.mds.yandex.net/get-mpic/11375416/2a0000018b56bcb47a42097dc308fd55ef96/300x300"
              alt=""
              class="rounded-full min-w-[40px] w-[40px]" />
          </button>
        </div>
      </div>
      <div
        v-if="isTopNav"
        ref="modalRef"
        class="absolute md:block hidden right-4 top-16 border shadow-sm bg-white w-full max-w-[300px] rounded-2xl">
        <button @click="logout()" class="btn wide w-full">
          <Icon name="circum:logout" class="mr-6" />
          Sign out
        </button>
      </div>
    </div>
    <div
      v-if="!userStore.isMobile"
      id="SecondaryTopNav"
      class="w-full md:hidden flex items-center justify-between md:pt-2.5 md:px-2.5">
      <div
        class="flex items-center justify-between gap-4 shadow-sm bg-white w-full">
        <div class="flex w-full">
          <div v-for="link in linkSecondaryNav" class="w-1/4">
            <NuxtLink
              :to="link.url"
              class="relative flex justify-center border-t-black text-sm w-full h-full font-semibold px-1.5 my-[1px] py-[1px] hover:bg-gray-100"
              :class="
                link.url === route.fullPath ? 'border-b-2 border-b-black' : ''
              ">
              <button class="relative pt-[6px]">
                <Icon
                  v-if="link.icon"
                  :name="link.icon"
                  size="20"
                  :color="route.fullPath == link.url ? '#000' : '#67685f'" />

                <img
                  v-else
                  :src="link.img"
                  class="rounded-full min-w-[22px] w-[22px]"
                  alt="" />
                <div
                  class="relative text-[13px] text-[#67685f]"
                  :class="link.img ? '-left-[5px]' : ''">
                  <span
                    :class="route.fullPath == link.url ? '#000' : '#67685f'">
                    {{ link.name }}
                  </span>
                </div>
              </button>
            </NuxtLink>
          </div>
        </div>
      </div>
      <div
        v-if="!userStore.isMobile"
        id="PreviewButton"
        class="fixed bottom-10 w-full flex items-center justify-center">
        <button
          @click="($event) => (userStore.isPreviewOverlay = true)"
          class="md:hidden flex items-center text-[17px] font-semibold px-5 py-2.5 bg-[#dfe2d9] rounded-full">
          <Icon name="icon-park-outline:preview-open" size="20" class="mr-2" />
          Preview
        </button>
      </div>
      <div
        v-if="!userStore.isMobile"
        id="TopNavMobile"
        class="fixed w-full flex items-center justify-between px-2.5 bg-[#f3f3f1]">
        <div class="flex items-center justify-between w-full py-[8px]">
          <div
            class="flex items-center justify-between w-max text-3xl font-bold max-w-[500px]">
            {{ currentMobilePage() }}
          </div>
          <div class="flex items-center justify-between gap-3">
            <button class="btn btn-sm">
              Upgrade
              <Icon name="mdi:lightning-bolt" class="ml-1" size="18" />
              Upgrade
            </button>
            <button
              class="flex items-center font-semibold px-3 py-2 rounded-full hover:bg-gray-200">
              <Icon name="ph:share-network" class="mr-0.5" size="23" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="px-2.5 w-full z-0">
    <slot></slot>
  </div>
  <div
    v-if="userStore.isMobile"
    id="BottomNav"
    class="fixed z-20 bottom-0 flex w-full bg-white shadow-sm"
    :class="userStore.isMobile ? 'h-[70px]' : 'h-[60px]'">
    <div class="flex w-full">
      <div v-for="link in linksMobile" class="w-1/5">
        <NuxtLink
          :to="link.url"
          class="relative flex justify-center border-t-black text-sm w-full h-full font-semibold px-1.5 my-[1px] py-[1px] hover:bg-gray-100"
          :class="
            link.url === route.fullPath ? 'border-b-2 border-b-black' : ''
          ">
          <button class="relative pt-[6px]">
            <Icon
              v-if="link.icon"
              :name="link.icon"
              size="20"
              :color="route.fullPath == link.url ? '#000' : '#67685f'" />

            <img
              v-else
              :src="link.img"
              class="rounded-full min-w-[22px] w-[22px]"
              alt="" />
            <div
              class="relative text-[13px] text-[#67685f]"
              :class="link.img ? '-left-[5px]' : ''">
              <span :class="route.fullPath == link.url ? '#000' : '#67685f'">
                {{ link.name }}
              </span>
            </div>
          </button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

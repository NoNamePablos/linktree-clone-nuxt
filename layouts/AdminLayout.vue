<script setup lang="ts">
import {useUserStore} from '~/stores/user';
import {storeToRefs} from 'pinia';
import {onMounted} from 'vue';

const userStore = useUserStore();
const {updatedLinkId} = storeToRefs(userStore);
const route = useRoute();
const router = useRouter();
const links = ref([
  {name: 'Links', url: '/admin', icon: 'icon-park-outline:hamburger-button'},
  {name: 'Apperance', url: '/admin/apperance', icon: 'fluent:shapes-48-regular'},
  {name: 'Analytics', url: '/', icon: 'tabler:brand-google-analytics'},
  {name: 'Settings', url: '/', icon: 'material-symbols:settings'},
])
const linkSecondaryNav = ref([
  {name: 'Links', url: '/admin', icon: 'icon-park-outline:hamburger-button'},
  {name: 'Apperance', url: '/admin/apperance', icon: 'fluent:shapes-48-regular'},
  {name: 'Analytics', url: '/', icon: 'tabler:brand-google-analytics'},
  {
    name: 'More',
    url: '/admin/more',
    icon: '',
    img: 'https://avatars.mds.yandex.net/get-mpic/11375416/2a0000018b56bcb47a42097dc308fd55ef96/300x300'
  },
])

const isTopNav = ref(false);
let windowWidth = ref(process.client ? window.innerWidth : '');
let isSecondaryTopNav = ref(false);
const openMenu = (str: string) => {
  if (str === 'TopNav') {
    isTopNav.value = true;
  } else if (str === 'SecondaryTopNav') {
    isSecondaryTopNav.value = true;
  } else {
    router.push('/admin/settings');
  }
}
const logout = () => {
}
watch(() => windowWidth.value, () => {
  if (windowWidth.value <= 767) {
    isTopNav.value = false;
  }
})
onMounted(() => {
  window.addEventListener('resize', function () {
    windowWidth.value = window.innerWidth;
  })
})
</script>

<template>
  <div id="AdminLayout" class="w-full fixed z-30">
    <div v-if="!userStore.isMobile" id="TopNav" class="flex w-full items-center justify-between md:pt-2.5 md:px-2.5">
      <div
          class="flex items-center justify-between md:rounded-full md:shadow-sm px-2 md:pl-6 pl-4 py-[8px] bg-white w-full border-b">
        <div class="flex items-center w-max justify-start w-full max-w-[500px]">
          <NuxtLink to="/admin">
            <img src="~/assets/images/linktree-logo-icon.png" class="w-[23px] min-w-[23px] select-none">
          </NuxtLink>
          <div v-for="link in links" class="lg:px-2.5 px-0.5 md:block hidden">
            <NuxtLink :to="link.url"
                      class="flex items-center text-sm font-semibold px-1.5 py-3 rounded-lg hover:bg-gray-100">
              <Icon :name="link.icon" class="mt-0.5" size="18" :color="route.fullPath===link.url?'#000000':'#67685f'"/>
              <div :class="route.fullPath===link.url?'text-black':'text-[#67685f]'">
                {{ link.name }}
              </div>
            </NuxtLink>
          </div>
        </div>
        <div class="flex items-center justify-between gap-3">
          <button class="btn btn-sm">
            <Icon name="healthicons:megaphone-outline" class="mr-0.5" size="22"/>
          </button>
          <button class="btn btn-sm">
            <Icon name="mdi:lightning-bolt" class="mr-0.5" size="18"/>
            Upgrade
          </button>
          <button class="btn btn-sm">
            <Icon name="teenyicons:upload-solid" class="mr-1.5" size="18"/>
            Share
          </button>
          <button
              class="rounded-full md:block hidden"
              @click="$event=>!isTopNav?openMenu('TopNav'):isTopNav=false">
            <img src="https://avatars.mds.yandex.net/get-mpic/11375416/2a0000018b56bcb47a42097dc308fd55ef96/300x300"
                 alt=""
                 class="rounded-full min-w-[40px] w-[40px]"
            >
          </button>
        </div>
      </div>
      <div v-if="isTopNav"
           class="absolute md:block hidden right-4 top-16 border shadow-sm bg-white w-full max-w-[300px] rounded-2xl">
        <button class="btn  wide w-full">
          <Icon name="circum:logout" class="mr-6"/>
          Sign out
        </button>
      </div>
    </div>
    <div v-if="!userStore.isMobile" id="SecondaryTopNav"
         class="w-full md:hidden flex items-center justify-between md:pt-2.5 md:px-2.5">
      <div class="flex items-center justify-between gap-4 shadow-sm bg-white w-full">
        <div class="flex w-full">
          <div v-for="link in linkSecondaryNav" class="w-1/4">
            <NuxtLink
                :to="link.url"
                class="relative flex justify-center border-t-black text-sm w-full h-full font-semibold px-1.5 my-[1px] py-[1px] hover:bg-gray-100"
                :class="link.url===route.fullPath?'border-b-2 border-b-black':''"
            >
              <button class="relative pt-[6px] ">
                <Icon v-if="link.icon"
                      :name="link.icon"
                      size="20"
                      :color="route.fullPath==link.url?'#000':'#67685f'"
                />

                <img v-else :src="link.img" class="rounded-full min-w-[22px] w-[22px]" alt="">
                <div class="relative text-[13px] text-[#67685f]"
                     :class="link.img?'-left-[5px]':''"
                >
                  <span :class="route.fullPath==link.url?'#000':'#67685f'">
                    {{link.name}}
                  </span>
                </div>
              </button>

            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

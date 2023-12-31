<template>
  <div>
    <VitePwaManifest />
    <div v-if="bgIsGray" class="bg-[#f3f3f1] fixed w-full h-full z-[-1]" />
    <NuxtPage />
    <UpdateLinkOverlay v-if="isMobile && updatedLinkId" />
    <VAddLinkOverlay v-if="isMobile && addLinkOverlay" />
    <PreviewOverlay v-if="isMobile && isPreviewOverlay" />
  </div>
</template>
<script lang="ts" setup>
  import { storeToRefs } from 'pinia';
  import type { Ref } from 'vue';
  import { reactive } from 'vue';
  import VAddLinkOverlay from '~/components/AddLinkOverlay/VAddLinkOverlay.vue';
  import UpdateLinkOverlay from '~/components/UpdateLinkOverlay/UpdateLinkOverlay.vue';
  import type { IUserTheme } from '~/types/theme.interface';

  const userStore = useUserStore();
  const { isMobile, isPreviewOverlay, updatedLinkId, addLinkOverlay, id } =
    storeToRefs(userStore);
  const route = useRoute();
  const show: Ref<boolean> = ref(false);
  const bgIsGray: Ref<boolean> = ref(false);

  const colors: IUserTheme[] = reactive([
    { id: 1, color: 'bg-white', text: 'text-black', name: 'Air White' },
    { id: 2, color: 'bg-gray-800', text: 'text-white', name: 'Lake Black' },
    {
      id: 3,
      color: 'bg-gradient-to-t from-indigo-500 via-purple-500 to-pink-500',
      text: 'text-white',
      name: 'Purple Pie',
    },
    {
      id: 4,
      color: 'bg-gradient-to-t from-gray-500 via-blue-500 to-green-500',
      text: 'text-white',
      name: 'Green Grass',
    },
    {
      id: 5,
      color: 'bg-gradient-to-t from-orange-500 via-green-500 to-red-500',
      text: 'text-white',
      name: 'Traffic Lights',
    },
    {
      id: 6,
      color: 'bg-gradient-to-b from-blue-800 via-blue-500 to-green-500',
      text: 'text-white',
      name: 'Blue Sky',
    },
    {
      id: 7,
      color: 'bg-gradient-to-t from-lime-500 via-indigo-700 to-amber-500',
      text: 'text-white',
      name: 'Soft Horizon',
    },
    {
      id: 8,
      color: 'bg-gradient-to-t from-gray-800 to-emerald-500',
      text: 'text-white',
      name: 'Tinted Lake',
    },
  ]);

  onBeforeMount(() => {
    userStore.colors = colors;
    console.log('user colors: ', userStore.colors);
  });
  onMounted(async () => {
    updatedLinkId.value = 0;
    addLinkOverlay.value = false;
    isPreviewOverlay.value = false;
    isMobile.value = false;

    try {
      if (userStore.id) {
        console.log('user store is get req');
        /* await userStore.getUser();
        await userStore.getAllLinks();*/
      }
    } catch (e) {
      console.log(e);
    }

    checkPath(route.fullPath);
    if ('ontouchstart' in window) {
      isMobile.value = true;
    }
  });

  const checkPath = (path: string): void => {
    if (path === '/' || path === '/register') {
      bgIsGray.value = false;
      return;
    }
    bgIsGray.value = true;
  };

  watch(
    () => route.fullPath,
    (path) => checkPath(path),
  );
  watch(
    () => isPreviewOverlay.value,
    (val) => {
      let id = '';
      if (route.fullPath === '/admin') {
        id = 'AdminPage';
      } else if (route.fullPath == '/admin/apperance') {
        id = 'ApperancePage';
      } else if (route.fullPath == '/admin/settings') {
        id = 'SettingsPage';
      }
      userStore.hidePageOverflow(val, id);
    },
  );
</script>

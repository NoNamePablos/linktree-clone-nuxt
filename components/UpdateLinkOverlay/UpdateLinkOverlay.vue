<script setup lang="ts">
  import { useUserStore } from '~/stores/user';
  import { storeToRefs } from 'pinia';
  import type { Ref } from 'vue';
  import type { IUserLink } from '~/types/link.interface';

  const userStore = useUserStore();
  const { addLinkOverlay, updatedLinkId } = storeToRefs(userStore);
  const isName: Ref<boolean> = ref(false);
  const isLink: Ref<boolean> = ref(false);
  const name: Ref<string> = ref('');
  const url: Ref<string> = ref('');
  const data = ref(null);
  const currentLink: Ref<IUserLink | null> = ref(null);
  const openCropper = ref(false);
  onMounted(() => {
    //getlinkbyid
    //userStore.hidePageOverflow(trie,'AdminPage')
    document.addEventListener('mouseup', function (e) {
      let editNameInput = document.getElementById('editNameInputMobile');
      //@ts-ignore
      if (!editNameInput.contains(e.target)) {
        //@ts-ignore
        editNameInput.blur();
        isName.value = false;
      }
    });
    document.addEventListener('mouseup', function (e) {
      let editLinkInput = document.getElementById('editLinkInputMobile');
      //@ts-ignore
      if (!editLinkInput.contains(e.target)) {
        //@ts-ignore
        editLinkInput.blur();
        isLink.value = false;
      }
    });
  });
  const getLinkById = () => {
    userStore.allLinks.forEach((link) => {
      if (updatedLinkId.value === link.id) {
        currentLink.value = link;
        name.value = link.name;
        url.value = link.url;
      }
    });
  };
  const close = () => {
    updatedLinkId.value = 0;
  };
  const updateLinkImage = async () => {
    //
  };
  const deleteLink = async () => {
    let res = confirm('delete?');
  };
  const isFocused = (str: string) => {
    if (str == 'isName') {
      //@ts-ignore
      setTimeout(() => document.getElementById('editNameInputMobile').focus());
      isName.value = true;
      isLink.value = false;
    }
    if (str == 'isLink') {
      //@ts-ignore
      setTimeout(() => document.getElementById('editLinkInputMobile').focus());
      isName.value = false;
      isLink.value = true;
    }
  };
  const updateLink = useDebounce(async () => {
    //
  });
  watch(
    () => name.value,
    () => {
      if (name.value && currentLink.value.name !== name.value) {
        updateLink();
      }
    },
  );
  watch(
    () => url.value,
    () => {
      if (url.value && currentLink.value.url !== url.value) {
        updateLink();
      }
    },
  );
  watch(
    () => data.value,
    async () => await updateLinkImage(),
  );
  onUnmounted(() => {
    //userStore.hidePageOverflow(false,'AdminPage')
    updatedLinkId.value = 0;
  });
</script>

<template>
  <div
    id="UpdateLinkOverlay"
    class="fixed z-40 left-0 right-0 top-0 w-full h-full bg-white px-5">
    <div class="w-full md:hidden flex items-center justify-between">
      <div class="flex items-center justify-between w-full py-[8px]">
        <button type="button" @click="close()" class="rounded-full">
          <Icon size="35" name="ic:baseline-check" color="#67685f" />
        </button>
        <div class="flex items-center justify-between gap-8">
          <Icon size="30" name="mdi:bell-outline" color="#67685f" />
          <button type="button" @click="deleteLink()" class="flex items-center">
            <Icon size="27" name="carbon:trash-can" color="#67685f" />
          </button>
        </div>
      </div>
    </div>
    <div class="flex flex-col items-center w-full pt-12">
      <div v-show="!isName" class="flex items-center justify-between w-full">
        <div
          @click="isFocused('isName')"
          class="text-2xl font-semibold mr-2 cursor-pointer">
          {{ name }}
        </div>
        <Icon
          name="octicon:pencil-24"
          @click="isFocused('isName')"
          class="cursor-pointer"
          size="25"
          color="#67685f" />
      </div>
      <input
        v-show="isName"
        id="editNameInputMobile"
        type="text"
        v-model="name"
        class="w-full text-2xl underline font-semibold focus:outline-none" />
    </div>
    <div class="flex items-center w-full pt-3 pb-6 border-b-2">
      <div v-show="isLink" class="flex items-center w-[calc(100%-2px)]">
        <div
          @click="isFocused('isLink')"
          class="text-lg truncate mr-2 cursor-pointer">
          {{ url }}
        </div>
        <Icon
          name="octicon:pencil-24"
          @click="isFocused('isLink')"
          class="cursor-pointer min-w-[17px]"
          size="25"
          color="#67685f" />
      </div>
      <input
        v-show="isLink"
        id="editLinkInputMobile"
        type="text"
        v-model="url"
        class="w-full text-lg underline focus:outline-none" />
    </div>
    <div id="UploadImageForLink" class="pt-6">
      <button
        @click="($event) => (openCropper = true)"
        class="flex items-center justify-center w-full py-3 rounded-full text-white font-semibold bg-[#8228d9] hover:bg-[#6c21b3] mb-2">
        <Icon name="mdi:plus" class="mr-0.5" size="25" />
        Select Image
      </button>
      <img
        v-if="currentLink && currentLink.image"
        class="mx-auto pt-4 aspect-square object-cover"
        :src="currentLink.image"
        alt="" />
    </div>
    <CropperModal
      v-if="openCropper"
      :linkId="updatedLinkId"
      @data="($event) => (data = $event)"
      @close="openCropper = false" />
  </div>
</template>

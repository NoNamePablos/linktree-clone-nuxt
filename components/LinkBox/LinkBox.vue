<script setup lang="ts">
  import { useUserStore } from '~/stores/user';

  const userStore = useUserStore();
  const { isMobile, updatedLinkId } = storeToRefs(userStore);
  const name = ref('');
  const isDelete = ref(false);
  let url = ref('');
  let data = ref(null);
  let openCropper = ref(false);
  let isUploadImage = ref(false);

  interface ILinkBox {
    link: Object;
    selectedId: number;
    selectedStr: string;
  }

  const props = withDefaults(defineProps<ILinkBox>(), {
    selectedId: 0,
    selectedStr: '',
  });

  const { link, selectedId, selectedStr } = toRefs(props);
  const emit = defineEmits<{
    (
      e: 'updatedInput',
      updatedInput: {
        id: number;
        str: string;
      },
    ): void;
  }>();
  onMounted(() => {
    name.value = link.value?.name;
    url.value = link.value?.url;
    document.addEventListener('mouseup', function (e) {
      let editNameInput = document.getElementById(
        `editNameInput-${link.value.id}`,
      );
      if (
        editNameInput &&
        !editNameInput.contains(e.target) &&
        selectedStr.value === 'isName' &&
        link.value.id == selectedId.value
      ) {
        editNameInput.blur();
        emit('updatedInput', { id: 0, str: '' });
      }
    });
    document.addEventListener('mouseup', function (e) {
      let editLinkInput = document.getElementById(
        `editLinkInput-${link.value.id}`,
      );
      if (
        editLinkInput &&
        !editLinkInput.contains(e.target) &&
        selectedStr.value === 'isLink' &&
        link.value.id == selectedId.value
      ) {
        editLinkInput.blur();
        emit('updatedInput', { id: 0, str: '' });
      }
    });
  });
  const updateLink = useDebounce(async () => {}, 500);
  const changeInput = (str: string, linkIdNameString: string) => {
    if (selectedId.value == link.value.id && selectedStr.value == str) {
      setTimeout(() => {
        document.getElementById(`${linkIdNameString}-${link.value.id}`).focus();
        return;
      }, 100);
    }
  };
  const editName = (selectedId: number, selectedStr: string) => {
    if (userStore.isMobile) {
      userStore.updatedLinkId = selectedId;
      return false;
    } else if (selectedId == link.value.id && selectedStr == 'isName') {
      return true;
    }
    return false;
  };
  const editLink = (selectedId: number, selectedStr: string) => {
    if (userStore.isMobile) {
      userStore.updatedLinkId = selectedId;
      return false;
    } else if (selectedId == link.value.id && selectedStr == 'isLink') {
      return true;
    }
    return false;
  };
  const editImage = () => {
    if (userStore.isMobile) {
      userStore.updatedLinkId = link.value.id;
    } else {
      isUploadImage.value = true;
      isDelete.value = false;
    }
  };
  const deleteLink = async () => {
    let res = confirm('Delete?');
  };

  const updateLinkImage = async () => {};

  watch(
    () => name.value,
    () => {
      if (name.value && name.value !== link.value.name) {
        updateLink();
      }
    },
  );
  watch(
    () => url.value,
    () => {
      if (url.value && url.value !== link.value.url) {
        updateLink();
      }
    },
  );
  watch(
    () => selectedId.value,
    () => {
      if (selectedId.value) {
        changeInput('isName', 'editNameInput');
        changeInput('isLink', 'editLinkInput');
      }
    },
  );
  watch(
    () => updatedLinkId.value,
    (val) => {
      if (!val) {
        emit('updatedInput', { id: 0, str: '' });
      }
    },
  );
  watch(
    () => data.value,
    async () => await updateLinkImage(),
  );
</script>

<template>
  <div :id="`LinkBox${link.id}`" class="w-full bg-white rounded-3xl">
    <div class="px-8 py-5">
      <div class="flex items-center justify-between py-1">
        <div class="flex items-center w-full">
          <input
            type="text"
            v-if="editName(selectedId as number, selectedStr as string)"
            :id="`editNameInput-${link.id}`"
            v-model="name"
            class="w-full text-sm font-semibold focus:outline-none" />
          <div v-else class="flex items-center w-full">
            <div
              @click="
                name = link.name;
                $emit('updatedInput', { id: link.id, str: 'isName' });
              "
              class="font-semibold mr-2 cursor-pointer"
              :class="isMobile ? 'text-xl' : 'text-sm'">
              {{ link.name }}
              <Icon
                class="cursor-pointer"
                name="octicon:pencil-24"
                :size="isMobile ? '23' : '17'" />
            </div>
          </div>
          <div class="flex items-center">
            <Icon
              class="cursor-pointer"
              :class="isMobile ? 'min-w-[23px]' : 'min-w-[17px]'"
              name="mdi:bell-outline"
              :size="isMobile ? '25' : '20'" />
          </div>
        </div>
      </div>
      <div class="flex items-center justify-between py-1">
        <div class="flex items-center w-full">
          <input
            type="text"
            v-if="editLink(selectedId as number, selectedStr as string)"
            :id="`editLinkInput-${link.id}`"
            v-model="url"
            class="w-full text-sm focus:outline-none" />
          <div v-else class="flex items-center w-[calc(100%-2px)]">
            <div
              @click="
                url = link.url;
                $emit('updatedInput', { id: link.id, str: 'isLink' });
              "
              class="mr-2 truncate cursor-pointer"
              :class="isMobile ? 'text-xl' : 'text-sm'">
              {{ link.url }}
              <Icon
                @click="$emit('updatedInput', { id: link.id, str: 'isLink' })"
                class="cursor-pointer min-w-[17px]"
                :class="isMobile ? 'min-w-[23px]' : 'min-w-[17px]'"
                name="octicon:pencil-24"
                :size="isMobile ? '23' : '17'" />
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-between py-1 mt-4">
        <div class="w-full flex items-center relative">
          <div
            class="flex items-center px-1.5 py-[2px] absolute -left-[6px] rounded-md"
            :class="isUploadImage ? 'bg-[#8228d9]' : 'hover:bg-gray-200'">
            <Icon
              @click="editImage"
              class="cursor-pointer"
              :color="isUploadImage ? '#ffffff' : ''"
              name="icon-park-twotone:collect-picture"
              :size="isMobile ? '23' : '17'" />
          </div>
        </div>
        <div v-if="!isMobile" class="flex items-center">
          <div class="flex items-center px-1.5 py-[2px] relative rounded-md">
            <button
              @click="
                isDelete = true;
                isUploadImage = false;
              "
              class="flex items-center px-1.5 py-[2px] absolute -right-[6px] rounded-md"
              :class="isDelete ? 'bg-[#8228d9]' : 'hover:bg-gray-200'">
              <Icon
                class="cursor-pointer"
                name="carbon:trash-can"
                size="20"
                :color="isDelete ? '#FFFFFF' : ''" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="overflow-hidden"
      :class="[
        { 'max-h-[180px] transition-all duration-300 ease-in': isDelete },
        { 'max-h-0 transition-all duration-200 ease-out': !isDelete },
      ]">
      <button
        @click="isDelete = false"
        class="relative w-full bg-[#DFE2D9] py-1.5">
        <Icon
          name="mdi:close"
          class="absolute right-1 top-[6px] cursor-pointer"
          size="20"
          color="#45494A" />
        <div class="text-center text-sm font-bold text-[#45494A]">Delete</div>
      </button>
      <div class="flex items-center justify-center pt-3">
        Delete this Forever?
      </div>
      <div class="w-full px-4 py-3">
        <div class="flex items-center gap-2 w-full">
          <button
            @click="deleteLink()"
            class="flex items-center border justify-center w-full py-3 rounded-full text-black font-semibold hover:bg-gray-100">
            Remove
          </button>
        </div>
      </div>
    </div>
    <div
      id="FooterLinkBoxSection"
      class="overflow-hidden"
      :class="[
        { 'max-h-[180px] transition-all duration-300 ease-in': isUploadImage },
        { 'max-h-0 transition-all duration-200 ease-out': !isUploadImage },
      ]">
      <div class="relative w-full bg-[#DFE2D9] px-1.5">
        <Icon
          @click="($event) => (isUploadImage = false)"
          name="mdi:close"
          class="absolute right-1 top-[6px] cursor-pointer"
          size="20"
          color="#45494a" />
        <div class="text-center text-sm font-bold text-[#45494A]">
          Add Thumbnail
        </div>
      </div>
      <div class="w-full flex items-center justify-between px-4 py-5">
        <img
          src="https://avatars.mds.yandex.net/get-mpic/11375416/2a0000018b56bcb47a42097dc308fd55ef96/300x300"
          alt=""
          class="rounded-lg w-[80px] aspect-square" />
        <div class="w-full pl-3">
          <button
            @click="($event) => (openCropper = true)"
            class="flex items-center justify-center w-full py-3 rounded-full text-white font-semibold bg-[#8228d9] hover:bg-[#6c21b3] mb-2">
            Change
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

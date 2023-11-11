<script setup lang="ts">
  import { useUserStore } from '~/stores/user';
  import { storeToRefs } from 'pinia';
  import type { Ref } from 'vue';
  const userStore = useUserStore();
  const name: Ref<string> = ref('');
  const url: Ref<string> = ref('');
  const { addLinkOverlay } = storeToRefs(userStore);

  onMounted(() => {
    userStore.hidePageOverflow(true, 'AdminPage');
  });

  const addLink = async () => {
    //
  };
  onUnmounted(() => {
    userStore.hidePageOverflow(false, 'AdminPage');
    addLinkOverlay.value = false;
  });

  const close = () => {
    addLinkOverlay.value = false;
  };

  const submit = async () => {
    //Логика для отправки на бек
  };
</script>

<template>
  <div
    id="VAddLinkOverlay"
    class="fixed z-40 left-0 right-0 w-full h-full bg-white px-5">
    <div class="flex items-center justify-start w-full py-[8px]">
      <button type="button" class="rounded-full" @click="close">
        <Icon
          name="material-symbols:arrow-back-sharp"
          size="35"
          color="#67685F" />
      </button>
      <div class="text-lg font-semibold pl-8">Add New Link</div>
    </div>
    <div class="text-2xl font-semibold pt-10">Enter URL</div>
    <form
      @submit.prevent="submit()"
      class="flex items-center gap-4 w-full pt-4">
      <div class="w-full">
        <TextInput v-model="name" class="w-full" placeholder="Name" />
        <div class="py-1" />
        <TextInput v-model="url" class="w-full" placeholder="URL" />
      </div>
      <button
        class="rounded-full p-2 bg-[#eff0ea]"
        type="submit"
        @click="addLink()">
        <Icon
          name="material-symbols:arrow-forward-sharp"
          size="25"
          color="#67685F" />
      </button>
    </form>
  </div>
</template>

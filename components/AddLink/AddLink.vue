<script setup lang="ts">
  const emit = defineEmits<{
    (e: 'close'): void;
  }>();
  const userStore = useUserStore();
  const name = ref('');
  const url = ref('');

  const addLink = async () => {};

  const submit = async() => {
      console.log("submit");
      await userStore.addLink(name.value,url.value);
      console.log("after submit");
  
  };
</script>

<template>
  <div id="AddLink" class="w-full bg-white rounded-3xl overflow-hidden">
    <div class="pb-2 p-6 flex items-center justify-between">
      <div class="text-[19px] font-semibold">Enter URL</div>
      <button @click="($event) => emit('close')" class="btn btn-ghost w-max">
        <Icon name="mdi:close" size="20" />
      </button>
    </div>
    <form
      @submit.prevent="$event = submit()"
      class="flex items-center gap-4 w-full pt-2 p-6">
      <div class="w-full">
        <TextInput
          class="w-full"
          v-model="name"
          input-type="text"
          placeholder="Name" />
        <div class="py-1"></div>
        <TextInput
          class="w-full"
          v-model="url"
          input-type="text"
          placeholder="URL" />
      </div>
      <button class="btn btn-primary font-bold" :disabled="!name || !url">
        Add
      </button>
    </form>
  </div>
</template>

<style scoped></style>

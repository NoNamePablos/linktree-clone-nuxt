<script setup lang="ts">
  import AdminLayout from '~/layouts/AdminLayout.vue';
  import { useUserStore } from '~/stores/user';
  const userStore = useUserStore();
  const name = ref('');
  const bio = ref('');
  const data = ref(null);
  const isBioFocused = ref(false);
  let openCropper = ref(false);
  const bioLengthComputed = computed(() => {
    return !bio.value ? 0 : bio.value.length;
  });
  onMounted(() => {
    name.value = userStore.name;
    bio.value = userStore.bio;
  });
  const updateTheme = async (themeId: number) => {
    //
  };
  const updateUserDetails = useDebounce(async () => {
    //
  });
  const updateUserImage = async () => {};
  watch(
    () => name.value,
    async () => await updateUserDetails(),
  );
  watch(
    () => bio.value,
    async () => await updateUserDetails(),
  );
  watch(
    () => data.value,
    async () => await updateUserImage(),
  );
</script>

<template>
  <AdminLayout>
    <div id="ApperancePage" class="flex h-[calc(100%-50px)] pb-4">
      <div
        class="lg:w-[calc(100%-500px)] md:w-[calc(100%-330px)] w-full md:pt-20 pt-14">
        <div class="max-w-[750px] mx-auto pb-24">
          <div class="ProfileSection">
            <div
              class="font-semibold pb-4"
              :class="
                userStore.isMobile ? 'mt-8 text-2xl' : 'mt-20 md:mt-8 text-xl'
              ">
              Profile
            </div>
            <div class="w-full bg-white rounded-3xl p-6">
              <div class="flex items-center justify-between gap-4">
                <img
                  src="https://avatars.mds.yandex.net/get-mpic/11375416/2a0000018b56bcb47a42097dc308fd55ef96/300x300"
                  class="rounded-full w-[190px]"
                  alt="" />
                <div class="w-full">
                  <button
                    @click="($event) => (openCropper = true)"
                    class="flex items-center justify-center w-full py-3 rounded-full text-white font-semibold bg-[#8228d9] hover:bg-[#6c21b3] mb-2">
                    Change
                  </button>
                </div>
              </div>
              <div class="mt-4">
                <TextInput v-model="name" placeholder="Profile Title" />
              </div>
              <textarea
                v-model="bio"
                rows="4"
                placeholder="Bio"
                @focus="isBioFocused = true"
                @blur="isBioFocused = false"
                maxlength="80"
                :class="isBioFocused ? 'border-gray-900' : ''"
                class="w-full mt-4 bg-[#eff0eb] resize-none text-gray-800 border-2 text-sm border-[#eff0eb] rounded-xl py-3.5 px-3 placeholder-gray-500 focus:outline-none"></textarea>
              <div
                class="flex items-center justify-end text-[#67685F] text-[13px]">
                {{ bioLengthComputed }}/80
              </div>
            </div>
          </div>
          <div id="ThemeSection">
            <div
              class="font-semibold pb-4"
              :class="
                userStore.isMobile ? 'mt-8 text-2xl' : 'mt-20 md:mt-8 text-xl'
              ">
              Themes
            </div>
            <div class="w-full bg-white rounded-3xl p-6">
              <div
                class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-2 gap-4">
                <div v-for="item in userStore.colors">
                  <div
                    class="border-2 border-gray-500 rounded-lg aspect-[2/3] border-dashed cursor-pointer"
                    :class="
                      userStore.theme_id === item.id
                        ? 'transition-all duration-150 ease-in'
                        : 'transition-all duration-150 ease-out'
                    ">
                    <div
                      @click="updateTheme(item.id)"
                      class="relative rounded-xl h-full mx-auto">
                      <div
                        class="absolute left-0 top-0 h-full w-full z-0 rounded-lg"
                        :class="item.color" />
                      <div class="relative z-10 pt-9">
                        <div
                          class="rounded-full mx-auto w-12 h-12 bg-[#eff0ea] bg-opacity-70" />
                        <div
                          class="w-[calc(100%-20px)] mx-auto rounded-full h-6 mt-4 bg-[#eff0ea] bg-opacity-70" />
                        <div
                          class="w-[calc(100%-20px)] mx-auto rounded-full h-6 mt-1 bg-[#eff0ea] bg-opacity-70" />
                        <div
                          class="w-[calc(100%-20px)] mx-auto rounded-full h-6 mt-1 bg-[#eff0ea] bg-opacity-70" />
                      </div>
                    </div>
                  </div>
                  <div class="text-center font-semibold mt-2">
                    {{ item.name }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MobileSectionDisplay />
    </div>
  </AdminLayout>
</template>

<style scoped></style>

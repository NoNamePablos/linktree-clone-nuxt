<script setup lang="ts">
import {useUserStore} from "~/stores/user";

const userStore = useUserStore();
const {isMobile} = storeToRefs(userStore);
const name = ref("");
const isDelete=ref(false);
</script>

<template>
  <div id="LinkBox" class="w-full bg-white rounded-3xl">
    <div class="px-8 py-5">
      <div class="flex items-center justify-between py-1">
        <div class="flex items-center w-full">
          <input type="text" v-if="true" v-model="name" class="w-full text-sm font-semibold focus:outline-none">
          <div v-else class="flex items-center w-full">
            <div
                class="font-semibold mr-2 cursor-pointer"
                :class="isMobile?'text-xl':'text-sm'"
            >
              Testing
              <Icon class="cursor-pointer" name="octicon:pencil-24" :size="isMobile?'23':'17'"/>
            </div>
          </div>
          <div class="flex items-center">
            <Icon class="cursor-pointer"
                  :class="isMobile?'min-w-[23px]':'min-w-[17px]'"
                  name="mdi:bell-outline" :size="isMobile?'25':'20'"/>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-between py-1">
        <div class="flex items-center w-full">
          <input type="text" v-if="true" v-model="name" class="w-full text-sm  focus:outline-none">
          <div v-else class="flex items-center w-[calc(100%-2px)]">
            <div
                class=" mr-2 truncate cursor-pointer"
                :class="isMobile?'text-xl':'text-sm'"
            >
              Testing url
              <Icon class="cursor-pointer min-w-[17px]"
                    :class="isMobile?'min-w-[23px]':'min-w-[17px]'"
                    name="octicon:pencil-24" :size="isMobile?'23':'17'"/>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-between py-1 mt-4">
        <div class="w-full flex items-center relative">
          <div class="flex items-center px-1.5 py-[2px] absolute -left-[6px] rounded-md"
               :class="isUploadImage?'bg-[#8228d9]':'hover:bg-gray-200'"

          >
            <Icon class="cursor-pointer"
                  :color="isUploadImage?'#ffffff':''"
                  name="icon-park-twotone:collect-picture" :size="isMobile?'23':'17'"/>
          </div>
        </div>
        <div v-if="!isMobile" class="flex items-center">
          <div class="flex items-center px-1.5 py-[2px] relative rounded-md">
            <button @click="isDelete = true; isUploadImage = false"
                    class="flex items-center px-1.5 py-[2px] absolute -right-[6px] rounded-md"
                    :class="isDelete?'bg-[#8228d9]':'hover:bg-gray-200'"
            >
              <Icon
                  class="cursor-pointer"
                  name="carbon:trash-can"
                  size="20"
                  :color="isDelete ? '#FFFFFF' : ''"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="overflow-hidden"
         :class="[
                {'max-h-[180px] transition-all duration-300 ease-in': isDelete},
                {'max-h-0 transition-all duration-200 ease-out': !isDelete},
            ]"
    >
      <button
          @click="isDelete = false"
          class="relative w-full bg-[#DFE2D9] py-1.5"
      >
        <Icon
            name="mdi:close"
            class="absolute right-1 top-[6px] cursor-pointer"
            size="20"
            color="#45494A"
        />
        <div class="text-center text-sm font-bold text-[#45494A]">
          Delete
        </div>
      </button>
      <div class="flex items-center justify-center pt-3">
          Delete this Forever?
      </div>
      <div class="w-full px-4 py-3">
          <div class="flex items-center gap-2 w-full">
            <button
                @click="deleteLink()"
                class="
                            flex
                            items-center
                            border
                            justify-center
                            w-full
                            py-3
                            rounded-full
                            text-black
                            font-semibold
                            hover:bg-gray-100
                        "
            >
              Remove
            </button>
          </div>
      </div>

    </div>
  </div>
</template>

<style scoped>

</style>
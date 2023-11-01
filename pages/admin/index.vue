<script setup lang="ts">
  import AdminLayout from '~/layouts/AdminLayout.vue';
  import type {Ref} from "vue";
  const userStore = useUserStore();
  const showAddlink:Ref<boolean>=ref(false);
  interface ISelectedInput{
    id:number,
    str:string
  }

  const selectedInput:Ref<ISelectedInput>=ref({
    id:0,
    str:''
  })
  const updatedInput=(e:ISelectedInput)=>{
    selectedInput.value.id=e.id;
    selectedInput.value.str=e.str;
  }
  const showAddLinkFunc=()=>{
    if(userStore.isMobile){
      userStore.addLinkOverlay=true;
    }else{
      showAddlink.value=true;
    }
  }


</script>

<template>
  <AdminLayout>
    <div id="AdminPage" class="flex h-[100vh] pb-4">
      <div
        class="lg:w-[calc(100%-500px)] md:w-[calc(100%-330px)] w-full md:pt-20 pt-14">
        <div class="max-w-[750px mx-auto pb-24">
          <button
            v-if="userStore.isMobile || !showAddlink"
            @click="($event) => showAddLinkFunc()"
            class="flex items-center justify-center w-full py-3 rounded-full text-white font-semibold bg-[#8228d9] hover:bg-[#6c21b3]"
            :class="userStore.isMobile ? 'mt-8 text-xl' : 'mt-20 md:mt-8'">
            <Icon
              v-if="!userStore.isMobile"
              name="mdi:plus"
              class="mr-0.5"
              size="25" />
            <span v-if="!userStore.isMobile">Add Link</span>
            <span v-if="userStore.isMobile">Add new Link</span>
          </button>
          <AddLink
            v-if="!userStore.isMobile"
            @close="()=>showAddlink=false"
            :class="[
                {
                  'mt-20 md:mt-8 mb-12 max-h-[1000px] transition-all duration-300 ease-in':showAddlink
                },
                {
                  'max-h-0 transition-all duration-300 ease-out':!showAddlink
                },
            ]"
          />
          <LinkBox />

        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<style scoped></style>

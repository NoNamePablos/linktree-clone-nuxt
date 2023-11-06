import { defineStore } from 'pinia';
import axios from '~~/plugins/axios';

const $axios = axios().provide.axios;

export const useUserStore = defineStore('user', {
  state: () => ({
    id: '',
    theme_id: '',
    email: '',
    name: '',
    image: '',
    bio: '',
    theme: null,
    colors: null,
    allLinks: [],
    isMobile: false,
    updatedLinkId: 0,
    addLinkOverlay: false,
    isPreviewOverlay: false,
  }),
  actions: {
    //
  },
  persist: true,
});

interface UserInfo {
  name: string;
  age: number;
}

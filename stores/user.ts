import { defineStore } from 'pinia';
import type { IUserLink } from '~/types/link.interface';
import type { IUserTheme } from '~/types/theme.interface';
import axios from '~~/plugins/axios';
const $axios = axios().provide.axios


interface UserInfo {
  id:string;
  name: string;
  bio: string;
  theme_id:string;
  email:string;
  image:string;
  theme:IUserTheme|null;
  colors:IUserTheme[];
  allLinks:IUserLink[];
  isMobile:boolean;
  updatedLinkId:number;
  addLinkOverlay:boolean;
  isPreviewOverlay:boolean;
}


// @ts-ignore
// @ts-ignore
export const useUserStore = defineStore('user', {
  state: ():UserInfo => ({
    id: '',
    theme_id: '',
    email: '',
    name: '',
    image: '',
    bio: '',
    theme: null,
    colors: [],
    allLinks: [],
    isMobile: false,
    updatedLinkId: 0,
    addLinkOverlay: false,
    isPreviewOverlay: false,
  }),
  actions: {
    //
    hidePageOverflow(val:boolean,id:string){
      if(val){
        document.body.style.overflow='hidden';
        if(id){
          // @ts-ignore
          document.getElementById(id).style.overflow="hidden";
        }
        return;
      }
      document.body.style.overflow='visible';
      if(id){
        // @ts-ignore
        document.getElementById(id).style.overflow="visible";
      }
    },
    allLowerCaseNoCaps(str:string){
      return str.split(' ').join("").toLowerCase();
    },
    async hasSessionExpired() {
      await $axios.interceptors.response.use((response) => {
        // Call was successful, continue.
        return response;
      }, (error) => {
        switch (error.response.status) {
          case 401: // Not logged in
          case 419: // Session expired
          case 503: // Down for maintenance
            // Bounce the user to the login screen with a redirect back
            this.resetState()
            window.location.href = '/';
            break;
          case 500:
            break;
          default:
            // Allow individual requests to handle other errors
            return Promise.reject(error);
        }
      });
    },
    async getTokens(){
            await $axios.get('/sanctum/csrf-cookie')
    },
    async login(email:string,password:string){
      await $axios.post('/login',{
        email:email,
        password:password,
      })
    },
    async register(name:string,email:string,password:string,confirmPassword:string){
      await $axios.post('/register', {
        name: name,
        email: email,
        password: password,
        password_confirmation: confirmPassword
      })
    },
    async getUser(){
      let res=await $axios.get('/api/users')
      this.$state.id=res.data.id
      this.$state.theme_id=res.data.theme_id
      this.$state.name=res.data.name
      this.$state.bio=res.data.bio
      this.$state.image=res.data.image
      console.log("resp: ",res);
      this.getUserTheme()
    },
    getUserTheme() {
      this.$state.colors.forEach(color => {
        if (+this.$state.theme_id === color.id) {
          this.$state.theme = color
        }
      })
      console.log("set theme: ",this.$state.theme);
      
    },
    // @ts-ignore
    async updateUserImage(data) {
      await $axios.post('/api/user-image', data)
    },
// @ts-ignore
    async updateLinkImage(data) {
      await $axios.post(`/api/link-image`, data)
    },
    async deleteLink(id:number) {
      await $axios.delete(`/api/links/${id}`)
    },
    async updateUserDetail(name:string,bio:string){
      await $axios.patch(`/api/users/${this.$state.id}`,{
        name:name,
        bio:bio,
      },{withCredentials:true})
    },
    async updateTheme(themeId:number){
      let res=await $axios.patch('/api/themes',{
        theme_id:themeId
      })
      this.$state.theme_id=res.data.theme_id;
      this.getUserTheme();
    },
    async getAllLinks(){
      let res=await $axios.get('api/links');
      this.$state.allLinks=res.data;
    },
    async addLink(name:string,url:string){
      await $axios.post('api/links',{
        name:name,
        url:url,
      });
    },
    async updateLink(id:number,name:string,url:string){
      await $axios.patch(`api/links/${id}`,{
        name:name,
        url:url,
      },{withCredentials:true});
    },
    async logout(){
      await $axios.post('/logout')
      this.resetState();
    },
    resetState(){
      this.$state.id=''
      this.$state.name=''
      this.$state.email=''
      this.$state.image=''
      this.$state.bio=''
      this.$state.theme_id=''
      this.$state.theme=null
      this.$state.colors=[]
      this.$state.allLinks=[]
      this.$state.isMobile=false
      this.$state.updatedLinkId=0
      this.$state.addLinkOverlay=false
      this.$state.isPreviewOverlay=false
    }
  },
  persist: true,
});


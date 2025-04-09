<template>
  <k-app theme="ios" :dark="false">
    <k-page class="h-[100dvh]">
      <NavbarMenu />

      <router-view></router-view>

      <TabMenu />

      <PopupDialog />

      <div
        class="absolute bottom-0 text-center w-full text-xs p-4 text-gray-500"
      >
        Version 1.1
      </div>
    </k-page>
  </k-app>
</template>

<script setup>
import { kApp, kPage } from "konsta/vue";

import NavbarMenu from "./components/menu/NavbarMenu.vue";
import TabMenu from "./components/menu/TabMenu.vue";
import PopupDialog from "./components/PopupDialog.vue";
</script>

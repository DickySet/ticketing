<template>
  <k-toast position="left" :opened="info">
    <template #button>
      <k-button clear inline @click="() => (info = null)">
        Close
      </k-button>
    </template>
    <div class="shrink">{{ info }}</div>
  </k-toast>
  
  <kCard>
      <img src="../../assets/image/logo.png" :style="{ maxWidth: '50%' }" :class="imgClass">
    <div class="text-gray-600 text-lg text-center font-semibold">GT-GUARD Version</div>
      <div v-if="!newVersionAvailable">
        <div class="text-green-600 text-center mt-4">GARUDA TEKNO is up to date</div>
        <div class="text-gray-400 text-center mb-2">1.1.0</div>
      </div>
      <div v-else>
      
        <div class="text-blue-500 text-center font-semibold flex justify-center mt-4">
            Update available 
          <span class="relative flex h-3 w-3 ml-1">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
          </span>
        </div>
        <div class="text-gray-400 text-center mt-4">Current version</div>
        <div class="text-gray-400 text-center mb-2">1.1.0</div>
      </div>
  </kCard>

</template>

<script setup>

  import { ref,watch } from 'vue';
  import { kButton, kToast, kCard, } from 'konsta/vue';

  const info = ref(null);
  const checkUpdate = ref(true);
  const imgClass = ref('mx-auto');
  const newVersionAvailable = ref(false);

  if(checkUpdate){
    imgClass.value = 'mx-auto mt-10 animate-bounce';
    newVersionAvailable.value = true ;
  };

</script>

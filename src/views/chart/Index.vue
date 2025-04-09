<template>
    
  <k-toast position="left" :opened="info">
    <template #button>
      <k-button clear inline @click="() => (info = null)">
        Close
      </k-button>
    </template>
    <div class="shrink">{{ info }}</div>
  </k-toast>

  <k-card>
      <h1 class="text-1xl text-center font-bold">Chart</h1>
  </k-card>

  <div class="shadow-2 p-4 surface-card border-round mb-4">
            <div class="flex flex-wrap justify-content-center mb-3">
                <v-chart style="height: 60vh;" autoresize :option="option" />
            </div>
        </div>

</template>

<script setup>

  import { ref, onMounted, provide } from 'vue';
  import { useRouter } from 'vue-router';
  import { kCard, kButton, kToast, kBlock } from 'konsta/vue';

import VChart, { THEME_KEY } from 'vue-echarts';
import { use } from 'echarts/core'
import { PieChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer
])


const props = defineProps(['realisasi', 'target', 'tahun']);
let bulan= ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

provide(THEME_KEY, 'light');

const option = ref(
  {
  title: {
    text: 'Referer of a Website',
    subtext: 'Fake Data',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}
);

  onMounted(() => {
      
    
  });

</script>
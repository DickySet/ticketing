<template>

    <k-tabbar 
        v-if="route.name !== 'home' && route.name !== 'register.index'"
        class="left-0 bottom-0 fixed pt-3" 
        :labels="isTabbarLabels" 
        :icons="isTabbarIcons" >
        <k-tabbar-link :active="activeTab === 'tab-1'" @click="() => { (activeTab = 'tab-1'); router.push('/menu'); }">
            <template v-if="isTabbarLabels" #label> Home </template>
            <template v-if="isTabbarIcons" #icon>
                <FontAwesomeIcon :icon="faHome" size="lg"/>
            </template>
        </k-tabbar-link>

        <k-tabbar-link :active="activeTab === 'tab-2'" @click="() => (activeTab = 'tab-2')">
            <template v-if="isTabbarLabels" #label> Berita </template>
            <template v-if="isTabbarIcons" #icon>
                <FontAwesomeIcon :icon="faNewspaper" size="lg"/>
            </template>
        </k-tabbar-link>

        <k-tabbar-link :active="activeTab === 'tab-3'" @click="() => (activeTab = 'tab-3')">
            <template v-if="isTabbarLabels" #label> Pesan </template>
            <template v-if="isTabbarIcons" #icon>
                <FontAwesomeIcon :icon="faEnvelope" size="lg" />
            </template>
        </k-tabbar-link>

        <k-tabbar-link :active="activeTab === 'tab-4'" @click="() => { (activeTab = 'tab-4'); router.push('/setting'); }">
            <template v-if="isTabbarLabels" #label> User </template>
            <template v-if="isTabbarIcons" #icon>
                <FontAwesomeIcon :icon="faUser" size="lg" /> 
            </template>
        </k-tabbar-link>

    </k-tabbar>

</template>

<script setup>

    import { ref } from 'vue';
    import { kTabbar, kTabbarLink } from 'konsta/vue';
    import { faEnvelope, faNewspaper, faUser, faHome } from '@fortawesome/free-solid-svg-icons';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { useRoute, useRouter } from 'vue-router'

    const route = useRoute();
    const router = useRouter();
    const activeTab = ref('tab-1');
    const isTabbarLabels = ref(false); //untuk menampilkan label pada tabbar
    const isTabbarIcons = ref(true); // untuk menampilkan icon pada tabbar

</script>
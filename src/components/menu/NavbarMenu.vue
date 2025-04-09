<template>

    <k-navbar v-if="route.name !== 'home' && route.name !== 'register.index'" title="GARUDA TEKNO" class="" titleClass="text-blue-600 font-bold">
        <template #left>
            <k-navbar-back-link v-if="showBackLink" text="" @click="goBack" />
        </template>
    </k-navbar>

</template>

<script setup>

    import { computed } from 'vue'
    import { kNavbar, kNavbarBackLink } from 'konsta/vue'
    import { useRoute, useRouter }  from 'vue-router'

    const route = useRoute();
    const router = useRouter();

    // fungsi untuk kembali ke halaman sebelumnya
    const goBack = () => {
        router.back();
    }

    //daftar nama routes yang dimana k-navbar-back-link akan ditampilkan
    const routesWithBackLink = [
        'profile',
        'edit-profile',
        'change-password',
        'about',
        'biometric',
    ]

    const showBackLink = computed(() => {
        return routesWithBackLink.includes(route.name);
    });

</script>
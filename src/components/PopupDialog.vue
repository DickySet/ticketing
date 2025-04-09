<template>
  
    <k-dialog :opened="confirmOpened" @backdropclick="() => (confirmOpened = false)">
        <template #title>Info</template>
            Apakah kamu yakin ingin keluar?
        <template #buttons>
            <k-dialog-button @click="() => (confirmOpened = false)">Tidak</k-dialog-button>
            <k-dialog-button strong @click="handleLogout">
                Ya
            </k-dialog-button>
        </template>
    </k-dialog>

</template>

<script setup>

    import { ref, onMounted, watch } from 'vue';
    import { useRouter, useRoute } from 'vue-router';
    import { kDialog, kDialogButton } from 'konsta/vue';

    import emitter from '../eventBus';
  
    const confirmOpened = ref(false);
    const router = useRouter();
    const route = useRoute();
    const classPage = ref('');
   
    const handleLogout = () => {
        confirmOpened.value = false;
        localStorage.removeItem('token');
        router.push('/');
    };
  
    onMounted(() => {
        emitter.on('openConfirmDialog', () => {
            confirmOpened.value = true;
        });
    });
  
</script>
  
<template>

    <k-toast position="left" :opened="info">
        <template #button>
            <k-button clear inline @click="() => (info = null)">
                Close
            </k-button>
        </template>
        <div class="shrink">{{ info }}</div>
    </k-toast>

    <div class="flex justify-center mt-7">
        <div class="w-20 relative">
            <img class="bg-cover bg-center bg-no-repeat bg-primary rounded-full h-20 w-full" style="object-fit: cover;"
            :src="user.photo_pathname ? user.photo_pathname : '/img/user-default.jpg'" alt="">
        </div>
    </div>
    <div class="flex gap-2 items-center justify-center mt-3">
        <!-- <h1 class="text-xl font-bold text-center">{{user.nama_user}}</h1> -->
    </div>

    <k-list strong inset>
        <k-list-item title="Profile" class="font-bold"/>
        <k-list-item :title="user.nama_user"></k-list-item>
        <k-list-item :title="user.username"></k-list-item>
        <k-list-item :title="user.email"></k-list-item>
    </k-list>

</template>

<script setup>

    import { ref } from 'vue'
    import { kCard, kList, kListItem, kToast } from 'konsta/vue'
    import { getUser } from '../../services/storage'
    import { faUser, faKey, faCircleInfo, faRightFromBracket, faPenToSquare, faFingerprint } from '@fortawesome/free-solid-svg-icons';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { useRouter } from 'vue-router';

    import emitter from '../../eventBus';

    const user = ref(getUser());
    const router = useRouter();
    const info = ref(null);

    const openConfirmLogOut = () => {
        emitter.emit('openConfirmDialog');
    }

</script>
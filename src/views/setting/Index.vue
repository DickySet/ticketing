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
        <h1 class="text-xl font-bold text-center">{{user.nama_user}}</h1>
        <router-link :to="{ name: 'edit-profile' }">
            <FontAwesomeIcon :icon="faPenToSquare" class="text-blue-500" size="md"/>
        </router-link>
    </div>

    <k-list strong inset>
        <k-list-item title="Setting" class="font-bold"/>
        <router-link :to="{ name: 'profile' }">
            <k-list-item link title="Profile">
                <template #media>
                    <FontAwesomeIcon :icon="faUser" class="text-blue-500" size="md"/>
                </template>
            </k-list-item>
        </router-link>
        <router-link :to="{ name: 'change-password' }">
            <k-list-item link title="Change Password">
                <template #media>
                    <FontAwesomeIcon :icon="faKey" class="text-blue-500" size="md"/>
                </template>
            </k-list-item>
        </router-link>
        <router-link :to="{ name: 'biometric' }">
            <k-list-item link title="Setting Biometric">
                <template #media>
                    <FontAwesomeIcon :icon="faFingerprint" class="text-blue-500" size="md"/>
                </template>
            </k-list-item>
        </router-link>
    </k-list>

    <k-list strong inset style="margin-top:-15px">
        <k-list-item title="Other" class="font-bold"/>
        <router-link :to="{ name: 'about' }">
            <k-list-item link title="About">
                <template #media>
                    <FontAwesomeIcon :icon="faCircleInfo" class="text-blue-500" size="md"/>
                </template>
            </k-list-item>
        </router-link>
        <k-list-item link title="Log Out" @click="openConfirmLogOut">
            <template #media>
                <FontAwesomeIcon :icon="faRightFromBracket" class="text-blue-500" size="md"/>
            </template>
        </k-list-item>
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
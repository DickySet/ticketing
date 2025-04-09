<template>

    <div>
        <k-card>
            <div class="flex flex-row sm:align-items-center gap-5">
                <div class="w-12 relative">
                    <img class="bg-cover bg-center bg-no-repeat bg-primary rounded-full h-12 w-full" style="object-fit: cover;"
                    :src="user.photo_pathname ? user.photo_pathname : '/img/user-default.jpg'" alt="">
                </div>
                <div class="mt-1">
                    <h2>Selamat datang,</h2> 
                    <b>{{ user.nama_user }}</b>
                </div>
            </div>
        </k-card>

        <div class="grid grid-cols-5 gap-4 px-4">
            <div>
                <router-link :to="{ name: 'chart' }">
                    <k-card margin="m-0" raised style="background-color: #B197FC">
                    <div class="flex justify-center items-center h-8">
                        <FontAwesomeIcon :icon="faTruckFast" size="2xl" style="color: white;" />
                    </div>
                </k-card>
                <div class="text-center font-semibold mt-2 mb-4 text-sm">
                    Menu Chart
                </div>
                </router-link>
            </div>
            <div>
                <k-card margin="m-0" raised style="background-color: #74C0FC">
                    <div class="flex justify-center items-center h-8">
                        <FontAwesomeIcon :icon="faCar" size="2xl" style="color: white;"/>
                    </div>
                </k-card>
                <div class="text-center font-semibold mt-2 mb-4 text-sm">
                    Menu 2
                </div>
            </div>
            <div>
                <k-card margin="m-0" raised style="background-color: #eb25ef">
                    <div class="flex justify-center items-center h-8">
                        <FontAwesomeIcon :icon="faAddressBook" size="2xl" style="color: white;"/>
                    </div>
                </k-card>
                <div class="text-center font-semibold mt-2 mb-4 text-sm">
                    Menu 3
                </div>
            </div>
            <div>
                <k-card margin="m-0" raised style="background-color: #FFD43B">
                    <div class="flex justify-center items-center h-8">
                        <FontAwesomeIcon :icon="faEarthAmericas" size="2xl" style="color: white;"/>
                    </div>
                </k-card>
                <div class="text-center font-semibold mt-2 mb-4 text-sm">
                    Menu 4
                </div>
            </div>
            <div>
                <k-card margin="m-0" raised style="background-color: #63E6BE">
                    <div class="flex justify-center items-center h-8">
                        <FontAwesomeIcon :icon="faStethoscope" size="2xl" style="color: white;"/>
                    </div>
                </k-card>
                <div class="text-center font-semibold mt-2 mb-4 text-sm">
                    Menu 5
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>

    import { ref } from 'vue';
    import { kButton, kCard, kList } from 'konsta/vue';
    import { getUser } from '../services/storage.js';
    import { faCar, faTruckFast, faAddressBook, faEarthAmericas, faStethoscope } from '@fortawesome/free-solid-svg-icons';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

    const user = ref(getUser());

</script>
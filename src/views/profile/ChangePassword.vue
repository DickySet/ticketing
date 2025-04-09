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
        <h1 class="text-1xl text-center font-bold">Change Password</h1>
    </k-card>

    <k-list inset-ios strong style="margin-top: 0px">
        <k-list-input @input="e => form.current_password = e.target.value" outline label="Password Saat Ini" floating-label
            type="password" placeholder="Password Saat Ini" :error="error?.current_password ? error.current_password[0] : null" />

        <k-list-input @input="e => form.password = e.target.value" outline label="Password Baru" floating-label
            type="password" placeholder="Password Baru" :error="error?.password ? error.password[0] : null" />

        <k-list-input @input="e => form.password_confirmation = e.target.value" outline label="Konfirmasi Password"
            floating-label type="password" placeholder="Konfirmasi Password" />

        <k-block>
            <k-button large rounded @click="handleSubmit">
                Simpan
            </k-button>
        </k-block>

    </k-list>

    <k-toast position="left" :opened="info">
      <template #button>
        <k-button clear inline @click="() => (info = null)">
          Close
        </k-button>
      </template>
      <div class="shrink">{{ info }}</div>
    </k-toast>

</template>

<script setup>

    import { ref, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import { kCard, kPage, kNavbar, kList, kListInput, kButton, kToast, kBlock } from 'konsta/vue';
    
    import axios from 'axios';
    import api from '../../api';

    const router = useRouter();
    const user = ref([]);
    const error = ref(null);
    const info = ref(null);

    const form = ref({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const getToken = () => {
        const token = localStorage.getItem('token');
        return token;
    };

    const handleSubmit = async () => {
        try {
            error.value = null;
            const token = getToken();
            if (!token) {
                console.error('Token not found. User not authenticated.');
                return;
            }

            const { current_password, password, password_confirmation } = form.value;

            const formData = new FormData();
            formData.append("_method", 'PUT');
            formData.append("current_password", current_password);
            formData.append("password", password);
            formData.append("password_confirmation", password_confirmation);

            // Menambahkan token ke header Authorization
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            // Lakukan permintaan POST dengan payload dan token
            const response = await api.post(`/api/users/password/${user.value.id}`, formData);
            const { success, message } = response.data;

            if (success) {
                info.value = message;
            }
        } catch (err) {
            if (err?.response?.data) {
                error.value = err.response.data;
            }
        }
    };

    const fetchUser = async () => {
        try {
            const token = getToken();
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            const response = await api.get(`/api/user`);
            user.value = response.data.data;
        } catch (error) {
            console.error('Error fetching:', error);
        }
    }

    onMounted(() => {
        fetchUser();
    });

</script>
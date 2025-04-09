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
        <h1 class="text-1xl text-center font-bold">Edit Profile</h1>
    </k-card>

    <k-list inset-ios strong style="margin-top: 0px">
        <k-list-input @input="e => form.nama = e.target.value" outline label="Nama" floating-label type="text"
            placeholder="Nama" :error="error?.nama ? error.nama[0] : null" :value="form.nama" />

        <k-list-input @input="e => form.username = e.target.value" outline label="Username" floating-label type="text"
            placeholder="Username" :error="error?.username ? error.username[0] : null" :value="form.username" />

        <k-list-input @input="e => form.email = e.target.value" outline label="Email" floating-label type="email"
            placeholder="Email" :error="error?.email ? error.email[0] : null" :value="form.email" />
        
        <k-list-input type="file" label="Foto Profile" @change="onChangeFotoProfile"></k-list-input>

        <k-block>
            <k-button rounded large @click="handleSubmit">Simpan</k-button>
        </k-block>

    </k-list>

</template>

<script setup>

    import { ref, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import { kCard, kPage, kNavbar, kList, kListInput, kButton, kToast, kBlock } from 'konsta/vue';

    import axios from 'axios';
    import api from '../../api';

    const router = useRouter();
    const error = ref(null);
    const info = ref(null);
    const user = ref([]);
    const fotoProfile = ref("");

    const form = ref({
        nama: '',
        username: '',
        email: '',
    });

    const handleSubmit = async () => {
        try {
            error.value = null;
            const token = getToken();
            if (!token) {
                console.error('Token not found. User not authenticated.');
                return;
            }

            const { nama, username, email } = form.value;

            const formData = new FormData();
            formData.append("_method", 'PUT');
            formData.append("nama", nama);
            formData.append("username", username);
            formData.append("email", email);
            formData.append("photo", fotoProfile.value);

            // Menambahkan token ke header Authorization
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            // Lakukan permintaan POST dengan payload dan token
            const response = await api.post(`/api/users/profile/${user.value.id}`, formData);
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

    const getToken = () => {
        const token = localStorage.getItem('token');
        return token;
    };

    const fetchUser = async () => {
        try {
            const token = getToken();
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            const response = await api.get(`/api/user`);
            user.value = response.data.data;

            form.value.nama = response.data.data.nama;
            form.value.username = response.data.data.username;
            form.value.email = response.data.data.email;
        } catch (error) {
            console.error('Error fetching:', error);
        }
    }

    const onChangeFotoProfile = async (image) => {
        if (image) {
            let imageFile = await resizeImage(image, 600);

            fotoProfile.value = imageFile;
        } else {
            console.log('FileReader API not supported')
        }
    }

    function resizeImage(file, height) {
        return new Promise((resolve, reject) => {
            const fileName = file.target.files[0].name;
            const reader = new FileReader();

            reader.readAsDataURL(file.target.files[0]);

            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result.toString();

                img.onload = () => {
                    const elem = document.createElement('canvas');
                    const scaleFactor = height / img.height;
                    elem.width = img.width * scaleFactor;
                    elem.height = height;

                    const ctx = elem.getContext('2d');
                    ctx.drawImage(img, 0, 0, img.width * scaleFactor, height);

                    ctx.canvas.toBlob((blob) => {
                        resolve(new File([blob], fileName, {
                            type: 'image/jpeg',
                            lastModified: Date.now()
                        }));
                    }, 'image/jpeg', 1);
                };
            };
        });
    }

    onMounted(() => {
        fetchUser();
    });

</script>
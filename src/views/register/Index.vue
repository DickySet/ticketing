<template>

  <k-toast position="left" :opened="info">
    <template #button>
      <k-button clear inline @click="() => (info = null)">
        Close
      </k-button>
    </template>
    <div class="shrink">{{ info }}</div>
  </k-toast>

  <div class="flex h-screen justify-center items-center">
    <k-card>
      <k-list inset-ios strong-ios>
        <img src="../../assets/image/logo.png"  :style="{ maxWidth: '50%' }" class="mx-auto">

        <k-list-input @input="e => form.name = e.target.value.toLowerCase()" outline label="Nama Lengkap" floating-label
          type="text" placeholder="Nama Lengkap" :error="error?.name ? error?.name[0] : null" />

        <k-list-input @input="e => form.email = e.target.value.toLowerCase()" outline label="Email" floating-label
          type="email" placeholder="Email" :error="error?.email ? error?.email[0] : null" />

        <k-list-input @input="e => form.password = e.target.value" outline label="Kata Sandi" floating-label
          type="password" placeholder="Kata Sandi" :error="error?.password ? error?.password[0] : null" />

        <k-list-input @input="e => form.password_confirmation = e.target.value" outline label="Konfirmasi Kata Sandi"
          floating-label type="password" placeholder="Konfirmasi Kata Sandi" />

        <k-block>
          <k-button large rounded @click="handleSubmit">
            Daftar
          </k-button>
        </k-block>

        <div class="flex justify-center items-center">
          <router-link :to="{ name: 'home' }" class="text-gray-500">
              Sudah Mempunyai Akun?  <span class="text-blue-400 font-semibold">Login sekarang</span>
          </router-link>
        </div>
      </k-list>
    </k-card>
  </div>
  <div class="absolute bottom-0 text-center w-full text-xs  p-4 text-gray-500">Version 1.1</div>
  
</template>

<script setup>

  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { kCard, kBlock, kList, kButton, kListInput, kToast } from 'konsta/vue';
  
  import api from '../../api';

  const router = useRouter();
  const info = ref(null);
  const error = ref(null);

  const form = ref({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    device_name: "test",
  });

  const handleSubmit = async () => {
    try {
      error.value = null;
      const response = await api.post('/api/register', form.value);

      if (response.status === 200) {
        info.value = 'Silahkan periksa email anda dan lakukan verifikasi email.';
      }

    } catch (err) {
      if (err?.response?.data?.message) {
        error.value = err.response.data.message;
      }
    }
  };
  
</script>

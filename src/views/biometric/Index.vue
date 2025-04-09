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
        <h1 class="text-1xl text-center font-bold">Setting Biometric</h1>
    </k-card>

    <k-list inset strong>
      <k-list-item title="Login">
        <template #media>
          <div class="border border-indigo-400 rounded-lg h-10 w-10 flex items-center justify-center">
            <FontAwesomeIcon :icon="faKey" class="text-blue-500" size="md" />
          </div>
        </template>
        <template #after>
          <div @click="() => toggleBiometric('login')">
            <FontAwesomeIcon
              :icon="loginBiometricEnabled ? faToggleOn : faToggleOff"
              :class="loginBiometricEnabled ? 'text-green-500' : 'text-gray-500'"
              size="lg"
            />
          </div>
        </template>
      </k-list-item>
      <!-- <k-list-item title="Absensi">
        <template #media>
          <div class="border border-indigo-400 rounded-lg h-10 w-10 flex items-center justify-center">
            <FontAwesomeIcon :icon="faClipboard" class="text-blue-500" size="md" />
          </div>
        </template>
        <template #after>
          <div @click="() => toggleBiometric('absensi')">
            <FontAwesomeIcon
              :icon="absensiBiometricEnabled ? faToggleOn : faToggleOff"
              :class="absensiBiometricEnabled ? 'text-green-500' : 'text-gray-500'"
              size="lg"
            />
          </div>
        </template>
      </k-list-item> -->
    </k-list>
  </template>
  
  <script setup>
  import { getToken, getUser } from '../../services/storage';
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import {
    kButton,
    kToast,
    kList,
    kListItem,
    kCard,
  } from 'konsta/vue';
  import emitter from '../../eventBus';
  import { faKey, faClipboard, faFingerprint, faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  
  const route = useRoute();
  const info = ref(null);
  const user = ref(getUser());
  const token = getToken();
  const isMobile = ref(false);
  const loginBiometricEnabled = ref(false);
//   const absensiBiometricEnabled = ref(false);
  
  const openConfirmLogOut = () => {
    emitter.emit('openConfirmDialog');
  };
  
  const toggleBiometric = async (type) => {
    if (type === 'login') {
      if (!loginBiometricEnabled.value) {
        await registerBiometric('login');
      } else {
        // Logika untuk menonaktifkan biometrik login
        localStorage.removeItem('loginBiometricAdded');
        localStorage.removeItem('loginBiometricName');
        localStorage.removeItem('loginBiometricDisplayName');
        localStorage.removeItem('loginToken');
        loginBiometricEnabled.value = false;
        info.value = 'Login biometric authentication disabled!';
      }
    }
    //  else if (type === 'absensi') {
    //   if (!absensiBiometricEnabled.value) {
    //     await registerBiometric('absensi');
    //   } else {
    //     // Logika untuk menonaktifkan biometrik absensi
    //     localStorage.removeItem('absensiBiometricAdded');
    //     localStorage.removeItem('absensiBiometricName');
    //     localStorage.removeItem('absensiBiometricDisplayName');
    //     localStorage.removeItem('absensiToken');
    //     absensiBiometricEnabled.value = false;
    //     info.value = 'Absensi biometric authentication disabled!';
    //   }
    // }
  };
  
  const registerBiometric = async (type) => {
    try {
      const publicKey = {
        challenge: new Uint8Array([/* some challenge from your server */]),
        rp: {
          name: "Gt-Guard.",
        },
        user: {
          id: new Uint8Array(16),
          name: user.value.email,
          displayName: user.value.nama_user,
        },
        pubKeyCredParams: [
          {
            type: "public-key",
            alg: -7,
          },
        ],
      };
      const credential = await navigator.credentials.create({ publicKey });
      console.log(credential);
  
      // Save biometric status
      if (type === 'login') {
        localStorage.setItem('loginBiometricAdded', 'true');
        localStorage.setItem('loginBiometricName', user.value.email);
        localStorage.setItem('loginBiometricDisplayName', user.value.nama_user);
        localStorage.setItem('loginToken', token);
        loginBiometricEnabled.value = true;
        info.value = 'Login biometric authentication successful!';
      }
    //    else if (type === 'absensi') {
    //     localStorage.setItem('absensiBiometricAdded', 'true');
    //     localStorage.setItem('absensiBiometricName', user.value.email);
    //     localStorage.setItem('absensiBiometricDisplayName', user.value.nama_user);
    //     localStorage.setItem('absensiToken', token);
    //     absensiBiometricEnabled.value = true;
    //     info.value = 'Absensi biometric authentication successful!';
    //   }
    } catch (error) {
      console.error(error);
    //   info.value = `${type === 'login' ? 'Login' : 'Absensi'} biometric registration failed!`;
      info.value = `${type} biometric registration failed!`;
      if (type === 'login') {
        loginBiometricEnabled.value = false;
      }
    //    else if (type === 'absensi') {
    //     absensiBiometricEnabled.value = false;
    //   }
    }
  };
  
  onMounted(() => {
    const message = localStorage.getItem('info');
    info.value = message;
    localStorage.removeItem('info');
  
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    isMobile.value = /android|ios/.test(userAgent.toLowerCase());
    loginBiometricEnabled.value = localStorage.getItem('loginBiometricAdded') === 'true';
    // absensiBiometricEnabled.value = localStorage.getItem('absensiBiometricAdded') === 'true';
  });
  
  </script>
  
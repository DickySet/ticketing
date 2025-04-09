<template>
    <k-toast position="left" :opened="error">
        <template #button>
            <k-button clear inline @click="() => (error = null)">
                Close
            </k-button>
        </template>
        <div class="shrink">{{ error }}</div>
    </k-toast>
    <div class="flex h-screen justify-center items-center">
        <k-card>
            <k-list inset-ios>
                <img src="../../assets/image/logo.png" :style="{ maxWidth: '50%' }" class="mx-auto">

                <k-list-input @input="e => email = e.target.value.toLowerCase()" outline label="Username" floating-label
                type="text" placeholder="Username" :value="email" />

                <k-list-input @input="e => password = e.target.value" outline label="Password" floating-label type="password"
                placeholder="Password" />

                <k-block>
                <div class="flex items-center">
                    <k-button large rounded @click="login">
                    Login
                    </k-button>

                    <div v-if="loginBiometricEnabled" class="ml-4 border border-indigo-400 rounded-lg h-10 w-10 flex items-center justify-center" @click="loginWithBiometrics">
                    <FontAwesomeIcon :icon="faFingerprint" class="text-blue-500" size="md" />
                    </div>
                </div>
                </k-block>

                <div class="flex justify-center items-center">
                    <router-link :to="{ name: 'register.index' }" class="text-gray-500">
                        Anda tidak punya akun? <span class="text-blue-400 font-semibold">Silakan mendaftar</span>
                    </router-link>
                </div>
            </k-list>
        </k-card>
    </div>
</template>

<script setup>

    import { ref, onMounted } from 'vue';
    import { kCard, kBlock, kList, kButton, kListInput, kToast } from 'konsta/vue';
    import { useRouter } from 'vue-router';
    import { setToken, setUser } from '../../services/storage.js'
    import { apiLogin } from '../../services/auth.js';

    import api from '../../api'
    import { faFingerprint } from '@fortawesome/free-solid-svg-icons';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

    const email = ref('');
    const password = ref('');
    const router = useRouter();
    const loginBiometricEnabled = ref(false);

    const login = async () => {
        try {
            const response = await api.post('/api/login', {
                username: email.value,
                password: password.value,
                device_name: "test"
            });

            console.log(response);
            if (response.status === 200) {
                const token = response.data.data.access_token; // Ambil token dari respons dengan benar
                setToken(token); // Simpan token di localStorage
                setUser(response.data.data);

                router.push('/menu');
            } 
        } catch (err) {
            // Handle login error
            err.value = 'Invalid email or password. Please try again.';
        }
    };
    
const loginWithBiometrics = async () => {
    try {
        const publicKey = {
        challenge: new Uint8Array([/* some challenge from your server */]),
        rp: {
            name: "Gt-Guard.",
        },
        user: {
            id: new Uint8Array(16),
            name: localStorage.getItem('loginBiometricName'),
            displayName: localStorage.getItem('loginBiometricDisplayName'),
        },
        pubKeyCredParams: [
            {
            type: "public-key",
            alg: -7,
            },
        ],
        };

        const credential = await navigator.credentials.create({ publicKey });
        console.log('Credential created:', credential);

        // Simpan status biometrik
        localStorage.setItem('loginBiometricAdded', 'true');

        // Handle credential creation success and proceed to menu
        if (credential) {
        console.log('Biometric credential:', credential);
        console.log('Biometric token:', localStorage.getItem('loginToken'));
        // Redirect ke halaman menu setelah login berhasil
        setToken(localStorage.getItem('loginToken')); // Simpan token di localStorage
        window.location.href = '/menu';
        error.value = 'Biometric login success.';
        } else {
        throw new Error('Biometric login failed. Please try again.');
        }
    } catch (error) {
        console.error('Biometric login error:', error);
        error.value = 'Biometric login failed. Please try again.';
    }
};

onMounted(() => {
  loginBiometricEnabled.value = localStorage.getItem('loginBiometricAdded') === 'true';
});

</script>

<template>
<v-container class="fill-height d-flex justify-center align-center" color="#18181b">
    <v-card max-width="450px" width="100%" class="pa-5 rounded-lg" color="#1f1f23">
        <v-card-title class="text-center">
            <h3>Login</h3>
            <p class="text-label-small">sign-in your account to continue</p>
        </v-card-title>
        <v-form class="mt-2 pa-5">
            <v-text-field label="username" type="text" color="#7C4DFF" prepend-inner-icon="mdi-account" variant="outlined" v-model="username"></v-text-field>

            <v-text-field label="password" type="password" color="#7C4DFF" prepend-inner-icon="mdi-key" variant="outlined" v-model="password" ></v-text-field>
            <p v-if="errorMessage" class="text-error text-caption text-center mb-3">
                {{ errorMessage }}
            </p>
            <v-btn block color="#7C4DFF" height="50px" @click="checkUsers">
                Login
            </v-btn>
        </v-form>
    </v-card>
</v-container>
</template>

<script setup>
import {ref} from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'

const router = useRouter();
const username = ref("")
const password = ref("")
const errorMessage = ref("");

const checkUsers = async () => {
    errorMessage.value = "";

    console.log(username.value);
    console.log(password.value);

    try {
        const response = await axios.post('http://localhost:3000/login', {
            username:username.value,
            password:password.value,
        });

        localStorage.setItem('token',response.data.token);

        username.value = "";
        password.value = "";

        router.push('/home');
        
    } catch (error) {
        if (error.response && error.response.data) {
            errorMessage.value = error.response.data.msg;
        }else {
            errorMessage.value = "ไม่สามารถเชื่อมต่อเซิฟเวอร์ได้"
        }
    }
}
</script>

<style lang="scss" scoped>
  
</style>

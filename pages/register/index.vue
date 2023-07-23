<template>
    <div class="d-flex register">
        <v-card class="pa-4 register_container">
            <v-tabs v-model="tab">
                <v-tab class="title" :text="$t('login')" :value="0"/>
                <v-tab class="title" :text="$t('register')" :value="1"/>
                <v-tab class="title resetPasswordTitle" :text="$t('forgot')" :value="2"/>
            </v-tabs>
            <v-window v-model="tab">
                <v-window-item :value="0">
                    <v-form class="registerForm" @submit.prevent="login">
                        <v-text-field :label="$t('email')" v-model="loginEmailReq.email"/>
                        <v-text-field :label="$t('password')" v-model="loginEmailReq.password"/>
                        <v-btn type="submit"> {{ $t('login') }} </v-btn>
                    </v-form>
                </v-window-item>
                <v-window-item :value="1">
                    <v-form class="registerForm" @submit.prevent="registerUser">
                        <div class="d-flex">
                            <v-text-field class="mr-3 pr-3" :label="$t('name')" v-model="user.first_name"/>
                            <v-text-field :label="$t('surname')" v-model="user.last_name"/>
                        </div>
                        <v-text-field :label="$t('email')" v-model="user.email"/>
                        <v-text-field :label="$t('password')" v-model="user.password"/>
                        <v-text-field :label="$t('repeatPassword')" v-model="user.repeteadPassword"/>
                        <v-checkbox v-model="acceptTerms" :ripple="false" color="rgb(var(--v-theme-primary))">
                            <template v-slot:label>
                                <span v-html="$t('acceptTerms')"/>
                            </template> 
                        </v-checkbox>
                        <v-btn :disabled="!acceptTerms" type="submit"> {{ $t('submit') }} </v-btn>
                    </v-form>
                </v-window-item>
                <v-window-item :value="1">
                    <div>
                        <p class="resetPassword"> {{ $t('resetPassword') }} </p>
                        <v-form class="registerForm" @submit.prevent="resetPassword">
                            <v-text-field :label="$t('email')" v-model="user.email"/>
                            <v-btn type="submit"> {{ $t('submit') }} </v-btn>
                        </v-form>
                    </div>
                </v-window-item>
            </v-window>
        </v-card>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';
import './register.scss';
import { User } from '~/model/user/User';
import { userStore } from '~/plugins/store/user/userStore';
import { LoginEmailRequest } from '~/model/user/LoginEmailRequest';

@Component({
    render: () => definePageMeta({ layout: 'empty' }),
})
export default class Register extends Vue {
    user = new User();

    loginEmailReq = new LoginEmailRequest();

    tab: 0 | 1 | 2 = 0;

    acceptTerms = false;

    async registerUser() {
        await userStore.registerUser(this.user);
    }

    async login() {
        await userStore.loginEmail(this.loginEmailReq);
    }

    async resetPassword() {
        console.warn('You would love to');
    }
}
</script>
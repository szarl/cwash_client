<template>
    <div>
        <v-icon> some icon </v-icon>
        <h2> {{ $t('successOrder') }} </h2>
        <span> {{ $t('findingCWasher') }} </span>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';

@Component
export default class SuccessContent extends Vue {
}
</script>
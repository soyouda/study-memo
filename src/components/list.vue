<template>
    <li>
        <div class="contents-text-wrapper">
            <h3 v-on:click="toggle(m)" v-bind:class="{ active: isActive }">{{ m.title }}</h3>
            <p>{{ m.content }}</p>
        </div>
        <button type="button" class="btn edit-btn" v-on:click="open(m.id)">수정</button>
    </li>
</template>

<script>
    export default {
        name: "list"
    }
</script>

<style scoped>

</style>
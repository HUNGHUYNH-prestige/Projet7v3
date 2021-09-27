<template>
<div>
    <MainHeader/>
    <div id="container">
        <h1>Ajouter un post</h1>
        <div id="form-container">
            <SubmitForm/>
        </div>
    </div>
</div>
</template>

<script>
import MainHeader from '../components/MainHeader.vue'
import SubmitForm from '../components/SubmitForm.vue'

export default {
    name: "Submit",
    components: {
        MainHeader,
        SubmitForm
    }
}

</script>

<style lang="scss" scoped>
#container {
    padding: 0.5em;
    margin: 0.5em;

    & h1 {
        padding: 0.5em;
        margin: 0.5em;
    }
    & #form-container {
        padding: 0.5em;
        margin: 0.5em;
    }
}

</style>
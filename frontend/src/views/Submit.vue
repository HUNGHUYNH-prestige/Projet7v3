<template>
<div id="main-container">
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
#main-container{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    padding: 0.1em;
    margin: 0.1em;
    //border: 1px solid green;
    width: 99%;
}

#container {
    //border: 1px solid red;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    padding: 0.1em;
    margin: 0.1em;
    & h1 {
        //border: 1px solid green;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.1em;
        margin: 0.1em;
    }
    & #form-container {
        //border: 1px solid red;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 0.5em;
        margin: 0.5em;
    }
}

</style>
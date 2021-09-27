<template>
<div id= "user-profile">
    <figure id="user-profile_img">
        <img v-bind:src="user.profilePicture" alt="photo de profil" />
    </figure>
    <div id="user-profile_infos">
        <h2>{{ user.firstname }} {{ user.lastname }}</h2>
        <div class="info-category">
            <p class="info-category_name">Adresse email : </p>
            <p>{{ user.email }}</p>
        </div>
        <div class="info-category">
            <p class="info-category_name">Membre du Service : </p>
            <p v-if="user.department !== null"> {{ user.department }} </p>
            <p v-else>Inconnu pour le moment</p>
        </div>
        <div class="info-category">
            <p class="info-category_name">Membre depuis le : </p>
            <time> {{getDate(user.createdAt)}}</time>
        </div>
    </div>
</div>
</template>

<script>
import moment from 'moment'

export default ({
    name: 'ProfileInfos',
    props: ['user'],
    methods: {
        getDate(date) {
            return moment(date).locale('fr').format('LL');
        }
    }
})
</script>

<style lang="scss" scoped>
#user-profile {
    border: 1px solid green;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2em;
    margin: 1.5em;
    background: lightgreen;
    &_img {
        height: 120px;
        width: 120px;
        border: 1px solid green;
        position: relative;
        top: -70px;
        & img {
            object-fit: cover;
            height: 100%;
            width: 100%;
        }
    }
    &_infos {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        position: relative;
        top: -50px;
        padding: 1em;
        margin: 1em;
        & h2 {
            width: 100%;
            border-bottom: 1px solid red;
            border-left: 1px solid red;
            padding: 0.5em;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            font-size: 1.5em;
        }
        & .info-category {
            width: 100%;
            border-bottom: 1px solid red;
            border-left: 1px solid red;
            padding: 0.5em;
            margin: 0.5em;
            display: flex;
            flex-direction: column;
            align-items: center;
            &_name {
                font-weight: bold;
                //text-decoration: wavy red underline overline;
                //text-decoration: 1px double overline black;
            }
        }
    }
}

@media screen and (max-width: 1000px) {
    #user-profile {
        width: 100%;
        &_img {
            top: 0px;
        }
        &_infos {
            top: 0px;
        }
    }
}
</style>
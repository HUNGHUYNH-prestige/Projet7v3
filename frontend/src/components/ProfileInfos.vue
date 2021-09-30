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
    border: 1px solid lightgreen;
    display: flex;
    flex-wrap: wrap;
    width: 90%;
    //flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0.1em;
    margin: 0.1em;
    background: lightgreen;
    &_img {
        height: 120px;
        width: 120px;
        border: 1px solid lightgreen;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.1em;
        margin: 0.1em;
        //position: relative;
        
        & img {
            border: 1px solid lightgreen;
            border-radius: 10px;
            padding: 0.1em;
            margin: 0.1em;
            display: flex;
            justify-content: center;
            align-items: center;
            object-fit: cover;
            height: 100%;
            width: 100%;
        }
    }
    &_infos {
        border-top: 5px solid yellow;
        //border-bottom: 1px solid yellow;
        display: flex;
        justify-content: center;
        //flex-direction: column;
        align-items: center;
        width: 100%;
        //position: relative;
        //top: -50px;
        padding: 0.1em 0.1em 0.1em 0.1em;
        margin: 0.1em;
        flex-wrap: wrap;
        & h2 {
            width: 100%;
            border-left: 1px solid red;
            border-bottom: 1px solid red;
            padding: 0.5em;
            margin: 0.1em;
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
            margin: 0.1em;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            //flex-direction: column;
            align-items: center;
            &_name {
                width: 100%;
                //border: 1px solid red;
                padding: 0.1em;
                margin: 0.1em;
                display: flex;
                justify-content: center;
                align-items: center;
                font-weight: bold;
                //text-decoration: wavy red underline overline;
                //text-decoration: 1px double overline black;
            }
        }
    }
}

</style>
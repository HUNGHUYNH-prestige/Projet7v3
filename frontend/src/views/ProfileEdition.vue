<template>
<div>
    <MainHeader/>
    <div v-if="this.$route.params.id == this.currentUserId || isAdmin === true ">
        <div id="profile-content" >
            <section id="profile-content_banner"> 
                <h1>Modifier votre profil</h1>
            </section>
            <main id="profile-content_form">
                <ProfileEditionForm v-if="user" :key="user.id" :user="user" />
            </main>
        </div>
    </div>
    <div v-else id="hidden-content">
        <p>ATTENTION : modification refusée !</p>
        <button @click="homeRedirection()">Retour à l'accueil</button>
    </div>
</div>
</template>

<script>
import MainHeader from '../components/MainHeader.vue'
import ProfileEditionForm from '../components/ProfileEditionForm.vue'

export default ({
    name: 'ProfileEdition',
    components: {
        MainHeader,
        ProfileEditionForm
    },
    data() {
        // Get the data in the local storage : prepare the data for use
        return {
            currentUserId: JSON.parse(localStorage.getItem('userId')),
            isAdmin: JSON.parse(localStorage.getItem('userAdmin')),
            token: localStorage.getItem('userToken'),
            user: null
        }
    },
    methods: {
        // Direction to home page
        homeRedirection() {
            this.$router.push('/home')
        },
        // Fetch into the API to get the user
        getUserProfile(id) {
            fetch(`http://localhost:3000/api/users/` + id, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${this.token}`
                }
            })
            .then(result => {
                if (result.ok) {
                    return result.json()
                }
            })
            .then(user => {
                //console.log(user)
                //console.log(user.email)
                this.user = user
                localStorage.setItem('userData', JSON.stringify(user))
            })
            .catch(error => console.log(error))
        }
    },
    mounted() {
        this.getUserProfile(this.$route.params.id);
    }
})
</script>

<style lang="scss" scoped>

#profile-content {
    //border: 1px solid red;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    //flex-direction: column;
    margin: 0.1em;
    padding: 0.1em;
    gap: 1em;
    width: 100%;
    &_banner {
        border: 1px solid pink;
        border-radius: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100px;
        color: white;
        background: pink;
        & h1 {
            //border: 1px solid black;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            paddding: 0.1em;
            margin: 0.1em;
            font-size: 2em;
            text-align: center;
        }
    }
    &_form {
        border: 1px solid pink;
        border-radius: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 0.1em;
        margin: 0.1em;
    }
}

#hidden-content {
    display: flex;
    justify-content: center;
    align-items: center;
    //flex-direction: column;
    text-align: center;
    margin: 0.1em;
    padding: 0.1em;
    & button {
        font-size: 1em;
        font-weight: bold;
        padding: 0.1em;
        margin: 0.1em;
        border: none;
        cursor: pointer;
        background: orange;
    }
}

</style>
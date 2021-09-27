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
        return {
            currentUserId: JSON.parse(localStorage.getItem('userId')),
            isAdmin: JSON.parse(localStorage.getItem('userAdmin')),
            token: localStorage.getItem('userToken'),
            user: null
        }
    },
    methods: {
        homeRedirection() {
            this.$router.push('/home')
        },
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
                console.log(user)
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
    border: 1px solid red;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0.5em;
    padding: 0.5em;
    gap: 40px;
    &_banner {
        border: 1px solid red;
        border-radius: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 150px;
        color: white;
        background: pink;
        & h1 {
            font-size: 3em;
        }
    }
    &_form {
        width: 550px;
    }
}

#hidden-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0.5em;
    padding: 0.5em;
    & button {
        font-size: 1em;
        font-weight: bold;
        padding: 0.5em;
        margin: 0.5em;
        border: none;
        cursor: pointer;
        background: orange;
    }
}

@media screen and (max-width: 800px) {
    #profile-content_form {
        width: 100%;
    }
}

@media screen and (max-width: 900px) {
    #profile-content_form {
        width: 100%;
    }
}

@media screen and (max-width: 800px) {
    #profile-content_form {
        width: 100%;
    }
}

</style>
<template>
    <div id="page-container">
        <MainHeader />
        <div v-if=" this.post && (this.post.User.id == this.currentUserId || isAdmin === true)" id="edition-content">
            <h1>Modifier le post</h1>
            <div id="form-container">
                <PostEditForm v-if="post" :post="post"/>
            </div>
        </div>
        <div v-else id="hidden-content">
            <p>ATTENTION : Modification refusée !</p>
            <button @click="homeRedirection()">Retour à l'accueil</button>
        </div>
    </div>
</template>

<script>
import MainHeader from '../components/MainHeader.vue'
import PostEditForm from '../components/PostEditForm.vue'

export default ({
    name: 'PostEdition',
    components: {
        MainHeader,
        PostEditForm
    },
    data() {
        return {
            currentUserId: JSON.parse(localStorage.getItem('userId')),
            isAdmin: JSON.parse(localStorage.getItem('userAdmin')),
            token: localStorage.getItem('userToken'),
            post: null
        }
    },
    methods: {
        homeRedirection() {
            this.$router.push('/home')
        },
        getPost(id) {
            fetch(`http://localhost:3000/api/posts/` + id, {
                headers: {
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${this.token}`
                }
            })
            .then(result => {
                if (result.ok) {
                    return result.json()
                }
            })
            .then(post => {
                console.log(post)
                this.post = post
                localStorage.setItem('postData', JSON.stringify(post))
            })
            .catch(error => console.log(error))
        },
    },
    mounted() {
         this.getPost(this.$route.params.id)
    }
})
</script>

<style  lang="scss" scoped>
#edition-content {
    padding: 0.5em;
    margin: 0.5em;
    & h1 {
        margin: 0.5em;
        padding: 0.5em;
    }
    & #form-container {
        background-color: white;

        padding: 0.5em;
        margin: 0.5em;
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
    }
}
</style>

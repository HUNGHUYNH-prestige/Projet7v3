<template>
<div>
    <MainHeader/>
    <div v-if="this.comment && (this.comment.userId == this.currentUserId || isAdmin === true)" id="edition-content">
        <h1>Modifier le commentaire</h1>
        <main id="form-container">
            <CommentEditionForm v-if="comment" :post="comment.postId" :comment="comment" class="CommentEditionForm"/>
        </main>
    </div>
    <div v-else id="hidden-content">
        <p>ATTENTION : Modification du commentaire refusée !</p>
        <button @click="homeRedirection()">Retour à l'accueil</button>
    </div>
</div>
</template>

<script>
import MainHeader from '../components/MainHeader.vue'
import CommentEditionForm from '../components/CommentEditionForm.vue'

export default ({
    name: 'CommentEdition',
    components: {
        MainHeader,
        CommentEditionForm
    },
    data() {
        return {
            currentUserId: JSON.parse(localStorage.getItem('userId')),
            isAdmin: JSON.parse(localStorage.getItem('userAdmin')),
            token: localStorage.getItem('userToken'),
            comment: null
        }
    },
    methods: {
        homeRedirection() {
            this.$router.push('/home')
        },
        getComment(postId, commentId) {
            fetch(`http://localhost:3000/api/posts/${postId}/comments/${commentId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                }
            })
            .then(result => {
                if (result.ok) {
                    return result.json();
                }
            })
            .then(comment => {
                //console.log('Content of comment :')
                console.log(comment);
                //console.log(comment.id)
                //console.log(comment.updatedAt)
                //console.log(comment.Post.id)
                this.comment = comment
                localStorage.setItem('postComment', JSON.stringify(comment))
            })
            .catch(error => console.log(error))
        }   
    },
    mounted() {
        this.getComment(this.$route.params.postId, this.$route.params.id)
    }
})
</script>

<style lang="scss" scoped>
#edition-content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: auto;
    //border: 1px solid orange;
    border-radius: 30px;
    padding: 0.1em;
    margin: 0.1em;
    & h1 {
        //border: 1px solid red;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 0.1em;
        margin: 0.1em;
    }
}

#form-container {
    //border: 1px solid green;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 0.1em;
    margin: 0.1em;
}

.CommentEditionForm {
    //border: 1px solid green;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 0.1em;
    margin: 0.1em;
}

#hidden-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0.1em;
    padding: 0.1em;
    & button {
        font-size: 1em;
        font-weight: bold;
        padding: 0.1em;
        margin: 0.1em;
        border: none;
        cursor: pointer;
        background-color: orange;
    }
}
</style>
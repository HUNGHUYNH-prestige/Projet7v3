<template>
    <div id="newComment-container">
        <!-- l'évènement `submit` ne rechargera plus la page -->
        <form @submit.prevent="createComment">
            <textarea placeholder="Publier mon commentaire" v-model="content"></textarea>
            <button type="submit">Publication de commentaire</button>
        </form>
    </div>
</template>

<script>

export default ({
    name: "Comments",
    data() {
        return {
            token: localStorage.getItem('userToken'),
            content: ''
        }
    },
    methods: {
        createComment() {
            const commentContent = {
                content: this.content
            }

            if (commentContent.content == '') {
                alert('Votre commentaire est vide : rien à publier !');
                return;
            }

            fetch(`http://localhost:3000/api/posts/${this.$route.params.id}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify(commentContent)
            })
            .then(result => {
                if (result.ok) {
                    return result.json()
                }
            })
            .then(() => {
                alert('Super ! Votre commentaire a été publié !')
            })
            .then(() => {
                window.location.reload();
            })
            .catch((error) => {
                console.log(error)
                console.log('Commentaire : ne veut pas se montrer')
            })
        }
    }
})
</script>

<style lang="scss" scoped>
#newComment-container {
    & form {
        width: 100%;
    }
    & textarea {
        width: 90%;
        padding: 2em;
        margin: 0.5em;
        height: 100px;
        border: 1px solid red;
        border-radius: 20px;
    }
    & button {
        display: flex;
        justify-content: center;
        align-item: center;
        width: 100%;
        border: 1px solid black;
        border-radius: 20px;
        padding: 0.5em;
        margin: 0.5em;
        color: black;
        font-weight: bold;
        background: orange;
        cursor: pointer;
    }
}
</style>
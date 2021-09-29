<template>
    <div>
        <!-- l'évènement `submit` ne rechargera plus la page -->
        <form method="put" v-on:submit.prevent="editComment(this.$route.params.postId, comment.id)">
            <textarea placeholder="Modifier le commentaire" v-model="form.content"></textarea>
            <button type="submit">Oui, modifier le commentaire</button>
        </form>
    </div>
</template>

<script>
export default ({
    name: 'CommentEditionForm',
    props: ['comment'],
    data() {
        // transform the local storage json format into a javascript object with : parse()
        const commentData = JSON.parse(localStorage.getItem('postComment'))
        return {
            // get the content from the form
            token: localStorage.getItem('userToken'),
            commentData,
            form: {
                content: commentData.content
            }
        }
    },
    methods: {
        editComment(postId, commentId) {
            // send the content got from the form to update the comment of a post
            const commentData = this.form
            //console.log(commentData)
            //console.log('--- --- --- --- ---')
            //console.log(this.form)
            fetch(`http://localhost:3000/api/posts/${postId}/comments/${commentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                // stringify to transform a javascript object into a json format
                body: JSON.stringify(commentData)
            })
            .then(res => {
                console.log(res)
                if (res.ok) {
                    alert('Super ! Le commentaire a bien été mis à jour !')
                    localStorage.removeItem('postComment')
                    this.$router.go(-1)
                } else {
                    if (res.status == 400) {
                        alert('Commentaire vide : rien à publier !')
                        return;
                    }
                }
            })
            .catch(error => console.log(error))
        }
    }
})
</script>)

<style lang="scss" scoped>
form {
    //border: 1px solid red;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 0.1em;
    margin: 0.1em;
    & textarea {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 1em;
        margin: 0.1em;
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
<template>
    <form method="put" enctype="multipart/form-data" v-on:submit.prevent="editPost(post.id)">
        <div id="title-field" class="form-field">
            <label for="title">Titre de la modification</label>
            <input type="text" id="title" name="title" placeholder="Partager la modification" v-model="form.title">
        </div>
        <div id="media-field" class="form-field">
            <label for="file">Ajouter un fichier pour le partager</label>
            <input type="file" id="file" name="file" @change="onFileChanged">
            <figure>
                <img v-if="url" :src="url" alt="image du post"/>
                <img v-else :src="postData.media" alt="image du post"/>
            </figure>
        </div>
        <button type="submit">METTRE EN LIGNE</button>
    </form>
</template>

<script>

export default ({
    name: "PostEditForm",
    props: ['post'],
    data() {
        const postData = JSON.parse(localStorage.getItem('postData'))
        //console.log(postData)
        return {
            token: localStorage.getItem('userToken'),
            postData,
            form: {
                title: postData.title
            },
            selectedFile: null,
            url: null
        }
    },
    methods: {
        onFileChanged(event) {
            this.selectedFile = event.target.files[0];
            this.url = URL.createObjectURL(this.selectedFile);
        },
        editPost(postId) {
            const formData = new FormData();
            formData.append('title', this.form.title)
            if (this.selectedFile != null) {
                formData.append('file', this.selectedFile)
            }
            fetch(`http://localhost:3000/api/posts/${postId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${this.token}`
                },
                body: formData
            })
            .then(res => {
                //console.log(res)
                if (res.ok) {
                    alert('Mise à jour du post fait !')
                    localStorage.removeItem('postData')
                    this.$router.push(`/posts/${this.$route.params.id}`)
                } else {
                    if (res.status == 400) {
                        alert('ATTENTION ! Veuillez remplir tous les champs avant de mettre en ligne !')
                        return;
                    } else if (res.status == 403) {
                        alert ("Modification interdite !")
                        return;
                    }
                }
                
            })
            .catch(error => console.log(error))
        },
    }
})
</script>

<style lang="scss" scoped>
form {
    //border: 1px solid red;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    //flex-direction: column;
    gap: 1.5em;
    width: 100%;
    padding: 0.1em;
    margin: 0.1em;
    & .form-field {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        width: 100%;
        //border: 1px solid red;
        //flex-direction: column;
        padding: 0.1em;
        margin: 0.1em;
        & label {
            width: 100%;
            padding: 0.1em;
            margin: 0.1em;
            display: flex;
            justify-content: center;
            align-items: center;
            //border: 1px solid red;
            font-size: 1em;
            font-weight: bold;
        }
        & input {
            //border: 1px solid red;
            padding: 0.1em;
            margin: 0.1em;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1em;
            height: 2em;
        }
    }
    
   
    & #media-field {
        //border: 1px solid red;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        //height: 100%;
        padding: 0.1em;
        margin: 0.1em;
        & figure {
            //border: 1px solid red;
            width: 50%;
            height: 50%;
            margin: 0.1em;
            padding: 0.1em;
            display: flex;
            justify-content: center;
            align-items: center;
            & img {
                //border: 1px solid red;
                object-fit: cover;
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 0.1em;
                padding: 0.1em;
            }
        }
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

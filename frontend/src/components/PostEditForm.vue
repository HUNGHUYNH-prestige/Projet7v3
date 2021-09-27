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
                console.log(res)
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
    display: flex;
    flex-direction: column;
    gap: 1.5em;
    & .form-field {
        display: flex;
        flex-direction: column;
        & label {
            font-size: 1em;
            font-weight: bold;
            margin: 0.3em;
        }
        & input {
            margin: 0.3em;
        }
    }
    & #title-field {
        & input {
            height: 30px;
        } 
    }
    & #content-field {
        & textarea {
            height: 130px;
        }
    }
    & #media-field {
        & figure {
            width: 250px;
            height: 150px;
            margin: 30px 0 10px 10px;
            & img {
                object-fit: cover;
                width: 250px;
                height: 150px;
            }
        }
    }
    & button {
        background: orange;
        cursor: pointer;
        color: black;
        font-weight: bold;
        border-radius: 30px;
        width: 100%;
        height: 40px;
    }
}
</style>

<template>
    <form method="post" enctype="multipart/form-data" v-on:submit.prevent="createPost">
        <div id="title-field" class="form-field">
            <label for="title">Titre</label>
            <input type="text" id="title" name="title" placeholder="Quoi partager ?" v-model="title">
        </div>
        <div id="media-field" class="form-field">
            <label for="file">Ajouter un fichier pour le partage</label>
            <input type="file" id="file" name="file" @change="onFileChanged">
        </div>
        <button type="submit">DIFFUSER MAINTENANT</button>
    </form>
</template>

<script>
import router from '../router/index'

export default ({
    name: "SubmitForm",
    props: ['submitAction', 'onSelectedFile'],
    data() {
        // Get the data from the local storage : ready to use
        return {
            token: localStorage.getItem('userToken'),
            title: '',
            selectedFile: null
        }
    },
    methods: {
        // Put a new file
        onFileChanged(event) {
            this.selectedFile = event.target.files[0]
        },
        // Create a post with the form
        createPost() {
            const userId = JSON.parse(localStorage.getItem('userId'));
            // Prepare the form
            const formData = new FormData();
            if (this.selectedFile == null) {
                alert('ATTENTION : Fichier vide !')
                return;
            }

            // Insert data in the form
            formData.append('file', this.selectedFile);
            formData.append('title', this.title);
            formData.append('userId', userId);
            fetch('http://localhost:3000/api/posts', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            })
            .then((res) => {
                if (res.ok) {
                    alert('Super ! La publication est faite !')
                    router.push('/home')
                } else {
                    if (res.status == 400) {
                        alert('ATTENTION ! Publication : ne veut pas se montrer !')
                        return;
                    }
                }
            })
            .catch(function(error) {
                console.log(error),
                alert('Refus du serveur : ne souhaite pas se montrer')
            })
        }
    }
})
</script>

<style lang="scss" scoped>
form {
    //border: 1px solid red;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    padding: 0.1em;
    margin: 0.1em;
    //flex-direction: column;
    gap: 1.5em;
    & .form-field {
        //border: 1px solid green;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        padding: 0.1em;
        margin: 0.1em;
        //flex-direction: column;
        & label {
            //border: 1px solid orange;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1em;
            font-weight: bold;
            margin: 0.1em;
            padding: 0.1em;
        }
    }
    & #title-field {
        /*
        border: 1px solid yellow;
        background: yellow;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.1em;
        margin: 0.1em;
        */
        & input {
            //border: 1px solid orange;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0.1em;
            margin: 0.1em;
            height: 50px;
        } 
    }
    
    & button {
        font-weight: bold;
        cursor: pointer;
        color: black;
        background: orange;
        border-radius: 30px;
        width: 100%;
        height: 30px;
        padding: 1em;
        display: flex;
        justify-content: center;
        flex-direction: row;
        align-items: center;
    }
}
</style>
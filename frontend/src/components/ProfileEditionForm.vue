<template>
    <div id="edition-form-container">
        <form method="post" v-on:submit.prevent="editProfile(user.id)">
            <div id="firstname-field" class="form-field">
                <label for="firstname">Prénom</label>
                <input type="text" id="firstname" name="firstname" v-model="form.firstname">
            </div>
            <div id="lastname-field" class="form-field">
                <label for="lastname">Nom</label>
                <input type="text" id="lastname" name="lastname" v-model="form.lastname">
            </div>
            <div id="email-field" class="form-field">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" v-bind:value="form.email" disabled>
            </div>
            <div id="password-field" class="form-field">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" disabled>
            </div>
            <div id="department-field" class="form-field">
                <label for="department">Service</label>
                <select name="department" id="department" v-model="form.department">
                    <option disabled value="">Sélectionnez votre service</option>
                    <option value="Achats">Achats</option>
                    <option value="Communication / Marketing">Communication / Marketing</option>
                    <option value="Comptabilité">Comptabilité</option>
                    <option value="Direction">Direction</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Informatique">Informatique</option>
                    <option value="Juridique">Juridique</option>
                    <option value="Ressources Humaines">Ressources Humaines</option>
                    <option value="Je suis nouveau/nouvelle">Je suis nouveau/nouvelle</option>
                </select>
            </div>
            <div id="media-field" class="form-field">
                <label for="file">Photo de profil</label>
                <input type="file" id="file" name="file" @change="onFileChanged">
                <figure id="media-field_preview">
                    <img v-if="url" :src="url" alt="photo de profil" />
                    <img v-else :src="userData.profilePicture" alt="photo de profil" />
                </figure>
            </div>
            <div id="error-msg">
            </div>
            <button type="submit">Enregistrer les modifications</button>
        </form>
    </div>
</template>

<script>

export default ({
    name: 'ProfileEditionForm',
    props: ['user'],
    data() {
        // Get the data from local storage
        const userData = JSON.parse(localStorage.getItem('userData'))
        // Then, set the data with return
        return {
            userData,
            form: {
                firstname: userData.firstname,
                lastname: userData.lastname,
                department: userData.department,
                email: userData.email,
                profilePicture: userData.profilePicture
            },
            selectedFile: null,
            url: null,
            token: localStorage.getItem('userToken')
        }
    },
    methods: {
        // When the file change : 
        onFileChanged(event) {
            this.selectedFile = event.target.files[0];
            this.url = URL.createObjectURL(this.selectedFile)

        },
        editProfile(userId) {
            let errorMsg = document.getElementById('error-msg')

            // IF empty fields : send warning message
            if (this.form.firstname == '' || this.form.lastname == '' || this.form.department == '') {
                errorMsg.innerHTML="ATTENTION : il faut remplir tous les champs avant l'enregistrement."
                errorMsg.style.display="flex"
                return;
            }

            // Create formData : ready to insert data into form
            const formData = new FormData();
            formData.append('department', this.form.department);
            formData.append('lastname', this.form.lastname)
            formData.append('firstname', this.form.firstname)
            if (this.selectedFile !== null) { 
                formData.append('file', this.selectedFile)
            }
            // Fetch to do update : PUT
            fetch(`http://localhost:3000/api/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${this.token}`
                },
                body: formData
            })
            .then(res => {
                console.log(res)
                if (res.ok) {
                    alert('Super ! Profil mis à jour fait !')
                    this.$router.push(`/profiles/${this.$route.params.id}`)
                } else {
                    if (res.status == 400) {
                        errorMsg.innerHTML="ATTENTION : pas de chiffres ou de symboles"
                        errorMsg.style.display="flex";
                        return;
                    }
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
        mounted() {
            console.log('--- --- --- --- ---')
            console.log(this.test)
        }
    }
})
</script>

<style lang="scss" scoped>
#edition-form-container {
    width: 99%;
    display: flex;
    justify-content: center;
    align-items: center;
    //border: 1px solid green;
    //border-radius: 30px;
    //background: green;
    padding: 0.1em;
    margin: 0.1em;
    & #error-msg {
        display: none;
        color: red;
        //border: 1px solid red;
        padding: 0.1em;
        margin: 0.1em;
    }
}

form {
    //border: 1px solid orange;
    padding: 0.1em;
    margin: 0.1em;
    border-radius: 20px;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    //flex-direction: column;
    gap: 0.1em;
    .form-field {
        width: 100%;
        display: flex;
        border: 1px solid pink;
        border-radius: 20px;
        padding: 0.5em;
        margin: 0.1em;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        //flex-direction: column;
        gap: 0.1em;
        & label {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            background: white;
            flex-wrap: wrap;
            width: 100%;
            border-left: 2px solid red;
            padding: 0.1em 0.1em 0.1em 0.2em;
            margin: 0.1em;
            font-weight: bold;
            text-transform: uppercase;
        }
        & input {
            width: 100%;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid pink;
            border-radius: 10px;
            padding: 0.1em;
            margin: 0.1em;
        }
        & select {
            width: 50%;
            border: 1px solid pink;
            border-radius: 20px;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 0.1em;
            margin: 0.1em;
        }
    }
    & button {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        width: 100%;
        font-size: 1.5em;
        font-weight: bold;
        padding: 0.5em;
        margin: 0.5em;
        border: 1px solid lightgreen;
        border-radius: 30px;
        cursor: pointer;
        background: lightgreen;
    }
    & #media-field {
        //border: 1px solid orange;
        display: flex;
        justify-content: center;
        align-items: center;
        //background: orange;
        //padding: 0.1em;
        //margin: 0.1em;
        //width: 100%;
        & input {
            padding: 0.5em;
            margin: 0.5em;
            border: 1px solid orange;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            width: 100%;
        }
        &_preview {
            padding: 0.5em;
            margin: 0.5em;
            border: 1px solid orange;
            border-radius: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            & img {
                //border: 1px solid red;
                display: flex;
                justify-content: center;
                align-items: center;
                object-fit: cover;
                height: 150px;
                width: 150px;
                padding: 0.1em;
                margin: 0.1em;
            }
        }
    }
}
</style>
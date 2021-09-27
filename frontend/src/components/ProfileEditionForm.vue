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
        const userData = JSON.parse(localStorage.getItem('userData'))
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
        onFileChanged(event) {
            this.selectedFile = event.target.files[0];
            this.url = URL.createObjectURL(this.selectedFile)

        },
        editProfile(userId) {
            let errorMsg = document.getElementById('error-msg')

            if (this.form.firstname == '' || this.form.lastname == '' || this.form.department == '') {
                errorMsg.innerHTML="ATTENTION : il faut remplir tous les champs avant l'enregistrement."
                errorMsg.style.display="flex"
                return;
            }

            const formData = new FormData();
            formData.append('department', this.form.department);
            formData.append('lastname', this.form.lastname)
            formData.append('firstname', this.form.firstname)
            if (this.selectedFile !== null) { 
                formData.append('file', this.selectedFile)
            }
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
            console.log(this.test)
        }
    }
})
</script>

<style lang="scss" scoped>
#edition-form-container {
    width: 100%;
    border: 1px solid green;
    border-radius: 30px;
    background: green;
    padding: 0.5em;
    margin: 0.5em;
    & #error-msg {
        display: none;
        color: red;
        border: 1px solid red;
        padding: 0.5em;
        margin: 0.5em;
    }
}

form {
    padding: 1.5em;
    margin: 0.5em;
    border: 1px solid white;
    border-radius: 20px;
    background: white;
    display: flex;
    flex-direction: column;
    gap: 1em;
    .form-field {
        display: flex;
        border: 1px solid red;
        border-radius: 20px;
        padding: 0.8em;
        margin: 0.5em;
        flex-direction: column;
        gap: 0.2em;
        & label {
            border-left: 1px solid red;
            padding-left: 0.2em;
            font-weight: bold;
            text-transform: uppercase;
        }
        & input {
            
            height: 50px;
        }
        & select {
            height: 50px;
        }
    }
    & button {
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
        & input {
            padding: 0.5em;
            margin: 0.5em;
            border: 1px solid orange;
        }
        &_preview {
            padding: 0.5em;
            margin: 0.5em;
            border: 1px solid orange;
            & img {
                object-fit: cover;
                height: 150px;
                width: 150px;
            }
        }
    }
}
</style>
<template>
<div id="page-container">
    <AuthHeader/>
    <div id="content">
        <main id="login">
            <h1>Se connecter</h1>
            <div id="login_fail-msg">
                <p id="wrong-fields"></p>
            </div>
            <form method="post" v-on:submit.prevent="loginUser" id="login_form">
                <div id="email-field" class="form-field">
                    <label for="email">Adresse e-mail</label>
                    <input type="email" id="email" name="email" placeholder="ex: davidmartin@gmail.com" v-model="email">
                </div>
                <div id="password-field" class="form-field">
                    <label for="password">Mot de passe</label>
                    <input type="password" id="password" name="password" v-model="password">
                </div>
                <button type="submit">Je me connecte</button>
            </form>
            <p id="login_redirection">Vous n'êtes pas encore membre ? <router-link to="/signup"><span>Je m'inscris</span></router-link></p>
        </main>
    </div>
</div>
</template>

<script>
import AuthHeader from "../components/AuthHeader.vue"
import router from '../router/index'

export default {
    name: "Login",
    components: {
        AuthHeader
    },
    data() {
        return {
            email: '',
            password: '',
        }
    },
    methods: {
        loginUser() {
            let wrongFieldsMessage = document.getElementById('wrong-fields')
            // Create object for user data
            let userData = {
                email: this.email,
                password: this.password
            }
            //console.log("This is user data :")
            //console.log(userData)

            // Cannot accept empty fields
            if (userData.email == '' || userData.password == '') {
                wrongFieldsMessage.style.display = "flex"
                wrongFieldsMessage.innerHTML = "Veuillez compléter tous les champs avant de valider le formulaire."
                console.log('Certains champs sont incomplets.')
                return;
            }

            fetch('http://localhost:3000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    if (response.status == 401) {
                        wrongFieldsMessage.style.display = "flex"
                        wrongFieldsMessage.innerHTML = "ATTENTION : Adresse email ou mot de passe incorrect(e)."
                        return;
                    }
                }
            })
            .then(data => {
                if (data) {
                    //console.log(data)
                    //console.log('LOGIN')
                    localStorage.setItem('userToken', data.token);
                    localStorage.setItem('userId', data.userId)
                    localStorage.setItem('userAdmin', data.userAdmin)
                    router.push('/home')
                } else {
                    return;
                }
                
            })
            .catch(error => {
                console.log(error)
                alert('ATTENTION : Erreur de connexion au serveur')
            })
        }
    }
}

</script>

<style scoped lang="scss">
#page-container {
    //border: 1px solid red;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex-wrap: wrap;
    padding: 0.1em;
    margin: 0.1em;
}

#content {
    border: 1px solid pink;
    border-radius: 30px;
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
}
#login {
    border: 1px dotted pink;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin: auto;
    padding: 0.1em;

    & h1 {
        border: 1px solid pink;
        border-radius: 30px;
        padding: 1em;
        margin: 1em;
    }
    &_fail-msg {
        font-size: 1.5em;
        color: red;
        margin: 0.5em;
        padding: 0.5em;
        width: 100%;
        & #missing-fields {
            display: none;
        }
    }
    &_form {
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 100%;
        & .form-field {
        display: flex;
        flex-direction: column;
            & label {
                font-weight: bold;
            }
            & input {
                border: 1px solid gray;
                height: 40px;
                padding: 0.1em;
                margin: 0.1em;
            }
        }
        & button {
            margin-top : 1em;
            background-color: pink;
            color: white;
            font-weight: bold;
            cursor: pointer;
            padding: 1em;
            border: 1px solid pink;
            border-radius: 30px;
        }
    }
    &_redirection {
        font-size: 1em;
    }
}

@media screen and (max-width: 320px) {
    #login {
        width: 100%;
    }
}

@media screen and (max-width: 768px) {
    #login {
        width: 100%;
    }
}

@media screen and (max-width: 700px) {
    #login {
        width: 100%;
    }
}

@media screen and (max-width: 800px) {
    #login {
        width: 100%;
    }
}

@media screen and (max-width: 900px) {
    #login {
        width: 100%;
    }
}

</style>
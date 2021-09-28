<template>
<div id="page-container">
    <AuthHeader/>
    <div id="content">
        <main id="signup">
            <h1>S'inscrire</h1>
            <div id="signup_fail-msg">
                <p id="wrong-fields"></p>
            </div>
            <form method="post" v-on:submit.prevent="signupUser" id="signup_form">
                <div id="firstname-field" class="form-field">
                    <label for="firstname">Prénom <span class="required">*</span></label>
                    <input type="text" id="firstname" name="firstname" minlength="2" placeholder="ex: David" v-model="firstname">
                </div>
                <div id="lastname-field" class="form-field"> 
                    <label for="lastname">Nom <span class="required">*</span></label>
                    <input type="text" id="lastname" name="lastname" minlength="2" placeholder="ex: MARTIN" v-model="lastname">
                </div>
                <div id="email-field" class="form-field">
                    <label for="email">Adresse e-mail <span class="required">*</span></label>
                    <input type="email" id="email" name="email" minlength="10" placeholder="ex: davidmartin@gmail.com" v-model="email">
                </div>
                <div id="password-field" class="form-field">
                    <label for="password">Mot de passe <span class="required">*</span></label>
                    <input type="password" id="password" name="password" minlength="8" v-model="password">
                </div>
                <button type="submit">Je m'inscris</button>
            </form>
            <p id="signup_redirection">Déjà inscrit(e) ? <router-link to="/login"><span>Je me connecte</span></router-link></p>
        </main>
    </div>
</div>
</template>

<script>
import AuthHeader from '../components/AuthHeader.vue'
import router from '../router/index'

export default {
    name: "Signup",
    components: {
        AuthHeader
    },
    data() {
        return {
            firstname: '',
            lastname: '',
            email: '',
            password: ''
        }
    },
    methods: {
        signupUser() {
            // Create object for user data
            let user = {
                firstname: this.firstname,
                lastname: this.lastname,
                email: this.email,
                password: this.password
            }
            let wrongFieldsMessage = document.getElementById('wrong-fields');
            // Cannot accept empty fields
            if (user.firstname == '' || user.lastname == '' || user.email == '' || user.password == '') {
                wrongFieldsMessage.style.display = "flex"
                wrongFieldsMessage.innerHTML = "Veuillez compléter tous les champs avant de valider le formulaire."
                console.log('Certains champs sont incomplets.')
                return;
            }
            // Signup API POST REQ
            fetch('http://localhost:3000/api/users/signup', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            .then(function(result) {
                console.log(result)
                if (result.ok) {
                    alert('Super ! Votre compte a bien été créé. Vous pouvez vous connecter.')
                    router.push('/login')
                    return result.json();
                    
                } else {
                    if (result.status == 401) {
                        alert("AVERTISSEMENT : L'utilisateur existe déjà !")
                    } else if (result.status == 500) {
                        wrongFieldsMessage.style.display = "flex"
                        wrongFieldsMessage.style.flexDirection= "column"
                        wrongFieldsMessage.innerHTML = "<p>ATTENTION :Certains champs ne sont pas valides.</p>"
                    } else if (result.status == 400) {
                        wrongFieldsMessage.style.display = "flex"
                        wrongFieldsMessage.style.flexDirection= "column"
                        wrongFieldsMessage.innerHTML = "<p>ATTENTION : Certains champs ne sont pas valides.</p><p>Le mot de passe doit contenir au moins :<br>- 8 caractères, dont<br>- 1 minuscule<br>- 1 majuscule<br>- 1 chiffre<br>- 1 caractère spécial<br> - Pas d'espace</p>"
                    }
                    
                    return;
                }
            })
            .catch(function(error) {
                console.log(error),
                alert('ATTENTION : Erreur de connexion au serveur')
            })
        }
    }

}

</script>

<style scoped lang="scss">
#content {
    border: 1px solid pink;
    border-radius: 30px;
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    padding: 0.1em;
}

#signup {
    border: 1px dotted pink;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin: auto;
    
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
        & #wrong-fields {
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
                height: 40px;
                padding: 0.1em;
            }
        }
        & .required {
            color: red;
            font-size: 0.8em;
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
    #signup {
        width: 100%;
    }
}

@media screen and (max-width: 768px) {
    #signup {
        width: 100%;
    }
}

@media screen and (max-width: 700px) {
    #signup {
        width: 100%;
    }
}

@media screen and (max-width: 800px) {
    #signup {
        width: 100%;
    }
}

@media screen and (max-width: 900px) {
    #signup {
        width: 100%;
    }
}

</style>
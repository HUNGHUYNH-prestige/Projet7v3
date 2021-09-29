<template>
    <header>
        <router-link to="/home">
            <img id="desktop-logo" src="../assets/icon-left-font.svg" alt="logo desktop Groupomania"/>
            <div class="image-mobile-container">
                <img id="mobile-logo" src="../assets/icon.png" alt="logo mobile Groupomania"/>
            </div>
            
        </router-link>
        <nav>
            <ul id="nav-links">
                <li id="nav-links_newPost"> 
                    <router-link to="/submit" class="link" aria-label="publier un post" id="newPost">+<span id="newPost_text">AJOUTER une nouvelle</span></router-link>
                </li>
                <li id="nav-links_forum"> 
                    <router-link to="/home" class="nav-link link" aria-label="accéder au forum">
                        <span class="desktop-link">Home</span>
                        <img src="../assets/home.png" alt="icone homepage" class="mobile-bar" />
                        
                    </router-link>
                </li>
                <li id="nav-links_account">
                    <!-- https://router.vuejs.org/fr/guide/essentials/named-routes.html -->
                    <router-link :to="{name: 'userProfile', params: {id: currentUserId}}" class="nav-link link" aria-label="Se rendre sur mon profil">
                        <span class="desktop-link">Mon Compte Personel</span>
                        <img src="../assets/account.png" alt="icone profil utilisateur" class="mobile-bar">
                    </router-link>
                </li>
                <li id="nav-links_logout">
                    <button class="nav-link link" @click="logout" aria-label="Se déconnecter">
                        <img src="../assets/logout.png" alt="icone deconnexion" />
                    </button>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
export default ({
    name: "MainHeader",
    data() {
        //const currentUserId = localStorage.getItem('userId')
        //console.log('The user id is :')
        //console.log(currentUserId)
        return {
            currentUserId: JSON.parse(localStorage.getItem('userId'))
        }
    },
    methods: {
        logout() {
            if(confirm("Se déconnecter ?")) {
                //console.log('LOGOUT')
                localStorage.clear();
                this.$router.push('Login');
            }
        },
    }
})
</script>

<style scoped lang="scss">
header {
    //border: 1px solid green;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0.5em;
    padding: 0.1em;
    & #desktop-logo {
        //border: 1px solid green;
        display: flex;
        width: 100%;
        height: 100%;
    }
    & #mobile-logo {
        display: none;
        //width: 80px;
        //height: 80px;
    }
}

nav {
    //border: 1px solid green;
    & ul {
        //border: 1px solid green;
        list-style-type: none;
        display: flex;
        & li {
            //border: 1px solid green;
            margin: 0.5em;
            padding: 0.1em;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
    & a {
        border-right: 2px solid green;
        border-bottom: 2px solid green;
        padding: 0.1em;
        text-decoration: none;
        color: red;
        cursor: pointer;
        &:hover {
            color: black;
            padding: 0.2em;
            border-top: 2px solid orange;
            border-left: 2px solid orange;
            border-right: none;
            border-bottom: none;
        }
    }
}

#nav-links {
    //border: 1px solid green;
    display: flex;
    text-align: center;
    &_newPost {
        //border: 1px solid orange;
        display: flex;
        justify-content: center;
        align-items: center;
        & #newPost {
            color: white;
            background: orange;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 2px solid orange;
            border-radius: 20px;
            padding: 0.5em;
            &:hover {
                color: black;
                background: pink;
                border: 1px solid pink;
            }
            &_text {
                //display: flex;
                //align-items: center;
                //justify-content: center;                
            }
        }
}
    &_logout button {
        border: 1px solid black;
        border-radius: 30px;
        height: 50px;
        width: 50px;
        cursor: pointer;
        & img {
            object-fit: contain;
            width: 100%;
            height: 100%;
        }
    }
    & .mobile-bar {
        display: none;
        height: 30px;
        width: 30px;
    }
}

@media screen and (max-width: 900px) {
    header {
        //border: 1px solid green;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        padding: 0.2em;
        margin: 0.2em;
        #desktop-logo {
            display: none;
        }
        #mobile-logo {
            //border: 1px solid red;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            width: 80px;
            height: 80px;
        }
    }

    .image-mobile-container {
        //border: 1px solid red;
        width: 100%;
        padding: 0.1em;
        margin: 0.1em;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #nav-links {
        //border: 1px solid green;
        width: 80%;
        display: flex;
        justify-content: center;
        align-items: center;

        & .desktop-link {
            display: none;
        }
        & .mobile-bar {
            display: flex;
        }
        & #newPost_text {
            display: none;
        }
    }
}

</style>

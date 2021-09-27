<template>
    <header>
        <router-link to="/home">
            <img id="desktop-logo" src="../assets/icon-left-font.svg" alt="logo desktop Groupomania"/>
            <img id="mobile-logo" src="../assets/icon.png" alt="logo mobile Groupomania"/>
        </router-link>
        <nav>
            <ul id="nav-links">
                <li id="nav-links_newPost"> 
                    <router-link to="/submit" class="link" aria-label="publier un post" id="newPost">+<span id="newPost_text">POSTER une nouvelle</span></router-link>
                </li>
                <li id="nav-links_forum"> 
                    <router-link to="/home" class="nav-link link" aria-label="accéder au forum">
                        <span class="desktop-link">Forum</span>
                        <img src="../assets/home.png" alt="icone homepage" class="mobile-bar" />
                    </router-link>
                </li>
                <li id="nav-links_account">
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
        return {
            currentUserId: JSON.parse(localStorage.getItem('userId'))
        }
    },
    methods: {
        logout() {
            if(confirm("Se déconnecter ?")) {
                localStorage.clear();
                this.$router.push('Login');
            }
        },
    }
})
</script>

<style scoped lang="scss">
header {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 1em;
    padding: 0.5em;
    & #desktop-logo {
        display: flex;
        width: 100%;
        height: 100%;
    }
    & #mobile-logo {
        display: none;
        width: 80px;
        height: 80px;
    }
}

nav {
    & ul {
        list-style-type: none;
        display: flex;
        & li {
            margin: 0.5em;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
    & a {
        text-decoration: none;
        color: black;
        cursor: pointer;
        &:hover {
            color: orange;
            border-top: 1px solid orange;
            border-left: 1px solid orange;
        }
    }
}

#nav-links {
    display: flex;
    text-align: center;
    &_newPost {
        display: flex;
        justify-content: center;
        align-items: center;
        & #newPost {
            display: flex;
            justify-content: center;
            align-items: center;
            border: 2px solid orange;
            border-radius: 20px;
            padding: 0.5em;
            &_text {
                align-items: center;
                justify-content: center;                
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
        #desktop-logo {
            display: none;
        }
        #mobile-logo {
            display: flex;
        }
    }

    #nav-links {
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

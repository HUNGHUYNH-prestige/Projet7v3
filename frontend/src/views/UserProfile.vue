<template>
<div id="page-container">
    <MainHeader/>
    <div v-if="user" id="content">
        <div id="profile-banner"> 
            <h1>Profil</h1>
        </div>
        <div id="profile-view">
            <aside>
                <ProfileInfos v-if="user" :key="user.id" :user="user"/>
                <div id="options">
                    <div v-if="currentUserId == this.$route.params.id || userAdmin === true" id="options_modify">
                        <button @click="editionRedirection()">Modifier le compte</button>
                    </div>
                    <div v-if="currentUserId == this.$route.params.id || userAdmin === true" id="options_delete">
                        <button @click="deleteAccount(this.$route.params.id)">Supprimer le compte</button>
                    </div>
                </div>
            </aside>
            <main>
                <div id="posts-list-container">
                    <h2>Mes Publications</h2>
                    <OnePost v-for="post in posts" :key="post.id" :post="post" :likesLength="post.Likes.length" :commentsLength="post.Comments.length" />
                    <p v-if="!posts">Aucune publication</p>
                </div>
            </main>
        </div>
    </div>
    <div v-else id="hidden-content">
        <p>L'utilisateur n'existe pas.</p>
        <button @click="homeRedirection()">Retour à l'accueil</button>
    </div>
</div>
</template>

<script>
import MainHeader from '../components/MainHeader.vue'
import ProfileInfos from '../components/ProfileInfos.vue'
import OnePost from '../components/OnePost.vue'

export default {
    name: "Profile",
    components: {
        MainHeader,
        ProfileInfos,
        OnePost
    },
    data() {
        // Get the data from the local storage : ready for use
        return {
            userAdmin: JSON.parse(localStorage.getItem('userAdmin')),
            currentUserId: JSON.parse(localStorage.getItem('userId')),
            token: localStorage.getItem('userToken'),
            user: null,
            posts: []
        }
    },
    methods: {
        // Direction home page
        homeRedirection() {
            this.$router.push('/home')
        },
        // Direction edit page
        editionRedirection() {
            this.$router.push(`/profiles/${this.$route.params.id}/edit`)
        },
        // Direction delete account
        deleteAccount(id) {
            if (confirm("ATTENTION : Suppression du compte ! Toutes vos données seront perdues.")) {
                fetch('http://localhost:3000/api/users/' + id, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.token}`
                    }
                })
                .then(res => {
                    console.log(res)
                    alert("ATTENTION : Suppression du compte ! Redirection vers l'accueil.")
                    if (this.$route.params.id == this.currentUserId) {
                        this.logout()
                    } else {
                        this.$router.push('/home')
                    }
                })
                .catch(error => console.log(error))
            } else {
                return;
            }
        },
        // Logout
        logout() {
            localStorage.clear();
            this.$router.push('Login');
        },
        // Fetch the user profile content
        getUserProfile(id) {
            fetch(`http://localhost:3000/api/users/` + id, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${this.token}`
                }
            })
            .then(result => {
                if (result.ok) {
                    return result.json()
                }
            })
            // Display profile content
            .then(user => {
                console.log(user)
                this.user = user
            })
            .catch(error => console.log(error))
        },
        // Fetch the user posts content
        getUsersPosts() {
            fetch(`http://localhost:3000/api/posts/users/${this.$route.params.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                }
            })
            .then(result => {
                if (result.ok) {
                    return result.json()
                }
            })
            // Display the post content
            .then(posts => {
                this.posts = posts
            })
            .catch(error => {
                console.log(error)
            })
        }
    },
    mounted() {
        this.getUserProfile(this.$route.params.id);
        this.getUsersPosts();
    }
}

</script>

<style lang="scss" scoped>
#page-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex-wrap: wrap;
    padding: 0.1em;
    margin: 0.1em;
}

#content {
    display: flex;
    //flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    padding: 0.1em;
    margin: 0.1em;
    //border: 1px solid pink;
    width: 90%;
    & #profile-banner {
        border: 1px solid pink;
        width: 100%;
        padding: 0.1em;
        margin: 0.1em;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 150px;
        background: pink;
        color: white;
        & h1 {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            font-size: 2em;
            padding: 0.1em;
            margin: 0.1em;
            //border: 1px solid black;
        }
    }
    & #profile-view {
        //border: 1px solid orange;
        //background: orange;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        width: 100%;
        margin: 0.1em;
        padding: 0.1em;
        //gap: 20px;
        & aside {
            //border: 1px solid red;
            //background: red;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            //flex-direction: column;
            align-items: center;
            margin: 0.1em;
            padding: 0.1em;
            width: 100%;
        }
        & main {
            //background: pink;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            width: 100%;
            margin: 0.1em;
            padding: 0.1em;
            //border: 1px solid black;
            & #posts-list-container {
                //background: black;
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
                //flex-direction: column;
                align-items: center;
                margin: 0.1em;
                padding: 0.1em;
                width: 100%;
                //border: 1px solid red;
                & h2 {
                    // /border: 1px solid red;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    padding: 0.1em;
                    margin: 0.1em;
                    width: 100%;
                }
            }
        }
    }
    & #options {
        //background: yellow;
        width: 100%;
        //border: 1px solid red;
        //border-radius: 30px;
        padding: 0.1em;
        margin: 0.1em;
        display: flex;
        flex-wrap: wrap;
        //flex-direction: column;
        align-items: center;
        //gap: 10px;
        justify-content: center;
        & button {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            font-size: 1em;
            font-weight: bold;
            padding: 0.1em;
            margin: 0.1em;
            border: none;
            border-radius: 30px;
            cursor: pointer;
        }
        &_modify {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            width: 100%;
            padding: 0.1em;
            margin: 0.1em;
            & button {
                border: 1px solid orange;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                background: orange;
                color: white;
                font-size: 1em;
                padding: 0.5em;
                margin: 0.5em;
            }
        }
        &_delete {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            width: 100%;
            padding: 0.1em;
            margin: 0.1em;
            & button {
                border: 1px solid red;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                background: red;
                color: white;
                font-size: 1em;
                padding: 0.5em;
                margin: 0.5em;
            }
        }
    }
}

#hidden-content {
    display: flex;
    justify-content: center;
    //flex-direction: column;
    align-items: center;
    margin: 0.5em;
    padding: 0.5em;
    & button {
        font-size: 1em;
        font-weight: bold;
        padding: 0.5em;
        margin: 0.5em;
        border: none;
        cursor: pointer;
        background-color: orange
    }
}

</style>
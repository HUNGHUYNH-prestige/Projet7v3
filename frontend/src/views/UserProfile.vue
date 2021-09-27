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
        return {
            userAdmin: JSON.parse(localStorage.getItem('userAdmin')),
            currentUserId: JSON.parse(localStorage.getItem('userId')),
            token: localStorage.getItem('userToken'),
            user: null,
            posts: []
        }
    },
    methods: {
        homeRedirection() {
            this.$router.push('/home')
        },
        editionRedirection() {
            this.$router.push(`/profiles/${this.$route.params.id}/edit`)
        },
        deleteAccount(id) {
            if (confirm("ATTENTION : Suppression du compte du compte ! Toutes vos données seront perdues.")) {
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
        logout() {
            localStorage.clear();
            this.$router.push('Login');
        },
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
            .then(user => {
                console.log(user)
                this.user = user
            })
            .catch(error => console.log(error))
        },
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
#content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0.5em;
    margin: 0.5em;
    & #profile-banner {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 150px;
        background: pink;
        color: white;
        & h1 {
            font-size: 3em;
        }
    }
    & #profile-view {
        display: flex;
        width: 100%;
        margin: auto;
        padding: 0;
        gap: 20px;
        & aside {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 0.5em;
            width: 30%;
            padding: 0.5em;
        }
        & main {
            width: 70%;
            margin: 1em;
            padding: 1em;
            & #posts-list-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                margin: auto;
                width: 95%;
                border: 1px solid red;
            }
        }
    }
    & #options {
        width: 80%;
        border: 1px solid red;
        border-radius: 30px;
        padding: 0.5em;
        margin: 0.5em;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        justify-content: center;
        & button {
            font-size: 1em;
            font-weight: bold;
            padding: 0.5em;
            margin: 0.5em;
            border: 1px solid transparent;
            border-radius: 30px;
            cursor: pointer;
        }
        &_modify {
            & button {
                background-color: orange;
                color: white;
                font-size: 1em;
                padding: 0.5em;
                margin: 0.5em;
            }
        }
        &_delete {
            & button {
                background-color: red;
                color: white;
                font0size: 1em;
                padding: 0.5em;
                margin: 0.5em;
            }
        }
    }
}

#hidden-content {
    display: flex;
    flex-direction: column;
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

@media screen and (max-width: 990px) {
    #content {
       & #profile-view {
            width: 100%;
            flex-direction: column;
            & aside {
                flex-direction: column-reverse;
                justify-content: center;
                gap: 30px;
                width: 100%;
            }
            & main {
                width: 100%;
                margin: auto;
            & #posts-list-container {
                width: 90%;
            }
        }
        } 
    }
}

@media screen and (max-width: 768px) {
    #content {
       & #profile-view {
            & main {
                & #posts-list-container {
                    width: 100%;
                }

            }
        } 
    }
}

@media screen and (min-width: 1400px) {
    #content {
        & #profile-view {
            width: 90%;
        }
    }
}
</style>
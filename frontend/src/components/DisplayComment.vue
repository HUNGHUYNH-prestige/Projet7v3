<template>
    <div id="comment-container">
        <!-- MAIN PAGE : COMMENT -->
        <div id="comment-container-main-page">
            <div id="user-informations">
                <img :src="comment.User.profilePicture" alt="photo de profil de l'utilisateur">
                <div>
                    <p id="name">
                        <router-link :to="{name: 'userProfile', params: {id: comment.User.id}}">
                            <span>{{comment.User.firstname}} {{comment.User.lastname}}</span>
                        </router-link>
                        a écrit le :
                        <span id="department">{{comment.User.department}}</span>
                    </p>
                    <time id="date">{{getDate(comment.createdAt)}} à {{ getHour(comment.createdAt) }}</time>
                </div>
            </div>
            <div v-if="comment.User.id == currentUserId || userAdmin === true" id="post-options">
                <button v-on:click="editionRedirection(post.id, comment.id)" aria-label="Editer le commentaire">
                    <img src="../assets/edit.png" alt="icone d'édition du commentaire">
                </button>
                <button v-on:click="deleteComment(post.id, comment.id)" aria-label="Supprimer le commentaire">
                    x
                </button>
            </div>
        </div>
        <!-- COMMENT CONTENT-->
        <div id="comment-container_content">
            <p>{{comment.content}}</p>
        </div>
    </div>
</template>

<script>
import moment from 'moment'

export default ({
    name: 'DisplayComment',
    props: ['post', 'comment'],
    data() {
        return {
            token: localStorage.getItem('userToken'),
            userAdmin: JSON.parse(localStorage.getItem('userAdmin')),
            currentUserId: JSON.parse(localStorage.getItem('userId'))
        }
    },
    methods: {
        getDate(date) {
            return moment(date).locale('fr').format('LL');
        },
        getHour(hour) {
        return moment(hour).locale('fr').format('LT')
        },
        editionRedirection(postId, commentId) {
            this.$router.push(`/posts/${postId}/comments/${commentId}/edit`)
        },
        deleteComment(postId, commentId) {
            if (confirm("Attention ! Suppression du commentaire !")) {
                fetch(`http://localhost:3000/api/posts/${postId}/comments/${commentId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.token}`
                    }
                })
                .then(res => {
                    console.log(res)
                    this.$router.go()
                })
                .catch(error => {
                    console.log(error)
                })
            }
        }
    }
})
</script>

<style lang="scss" scoped>
#comment-container {
    border: 1px solid green;
    border-radius: 20px;
    padding: 0.5em;
    margin: 0.5em;

    &-main-page {
        display: flex;
        justify-content: space-between;
        
        & #user-informations {
            display: flex;
            justify-content: center;
            align-items: center;
            border-left: 1px dashed green;
            border-bottom: 1px dashed green;
            & img {
                object-fit: cover;
                height: 50px;
                width: 50px;
                border: 3px solid lightgreen;
                border-radius: 30px;
                margin: 0.2em;
                padding: 0.2em;
            }
            & #name {
                color : blue;
                font-weight: bold;
                & #department {
                    font-weight: normal;
                    font-size: 0.8em;
                }
            }
            & #date {
                font-size: 0.8em;
                color: darkblue;
            }
        }
        & #post-options {
            display: flex;
            gap: 1.5em;
            & button {
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: white;
                border: 1px orange solid;
                border-radius: 20px;
                padding: 0.2em;
                cursor: pointer;
                width: 2em;
                height: 2em;
                & img {
                    height: 100%;
                }
                &:hover {
                    background-color: orange;
                    color: white;
                }
            }
        }
    }
    a {
        text-decoration: none;
        color: black;
        &:hover {
            background: lightgreen;
            padding: 0.3em;
        }
    }
}
</style>
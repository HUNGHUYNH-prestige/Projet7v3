<template>
<div>
    <div id="page-container">
        <MainHeader/>
        <div>
            <div id="content">
                <!-- MAIN PAGE : POST SECTION -->
                <main id="post-section">
                    <OnePost v-if="post" :key="post.id" :post="post" :likesLength="this.post.Likes.length" :commentsLength="this.comments.length"/>
                </main>
                <!-- COMMENTS SECTION -->
                <section v-if="post" id="comments-section">
                    <h2>Commentaires</h2>
                    <CommentsForm/>
                    <div v-for="comment in comments" :key="comment.id" id="commentsList">
                        <DisplayComment :post="post" :comment="comment" />
                    </div>
                </section>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import MainHeader from '../components/MainHeader.vue'
import OnePost from '../components/OnePost.vue'
import CommentsForm from '../components/CommentsForm.vue'
import DisplayComment from '../components/DisplayComment.vue'


export default {
    name: "Post",
    components: {
        MainHeader,
        OnePost,
        CommentsForm,
        DisplayComment
    },
    data() {
        const userToken = localStorage.getItem('userToken')
        console.log('User Token is :')
        console.log(userToken)
        return {
            token: localStorage.getItem('userToken'),
            post: null,
            comments: [],       
        }
    },
    methods: {
        getPost() {
            const postId = this.$route.params.id;
            console.log('The user ID in the database is :')
            console.log(postId)
            fetch(`http://localhost:3000/api/posts/` + postId, {
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
            .then(data => {
                this.post = data
            })
            .catch((error) => {
                console.log(error)
            })
        },
        getComments() {
            fetch(`http://localhost:3000/api/posts/${this.$route.params.id}/comments`, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${this.token}`
                }
            })
            .then(result => {
                if (result.ok) {
                    console.log('getComments result.ok = ' + result.ok)
                    return result.json()
                }
            })
            .then(data => {
                this.comments = data
            })
            .catch(error => {
                console.log(error)
            })
        }
    },
    // when the view is set, please mount this.methods to display the content on the screen
    mounted() {
        this.getPost();
        this.getComments();
    }
    
}

</script>

<style lang="scss" scoped>
#content {
    border: 1px dotted pink;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1em;
    margin: auto;
    & #post-section {
        width: 100%;
    }
    & #comments-section {
        width: 100%;
    }
}

@media screen and (min-width: 700px) {
    #content {
        width: 80%;
    }
}

@media screen and (min-width: 800px) {
    #content {
        width: 80%;
    }
}

@media screen and (min-width: 1200px) {
    #content {
        width: 80%;
    }
}

</style>
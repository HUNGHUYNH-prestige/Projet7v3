<template>
  <div id="page-container">
    <MainHeader/>
    <div>
      <div id="content">
        <h1>Les tendances du moments</h1>
        <main id="postsList">
          <OnePost v-for="post in posts" :key="post.id" :post="post" :likesLength="post.Likes.length" :commentsLength="post.Comments.length"/>
          <div v-if="posts.length == 0">
            <p id="noPost-msg">Rien à afficher pour le moment.</p>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import MainHeader from "../components/MainHeader.vue"
import OnePost from "../components/OnePost.vue"

export default {
  name: 'Home',
  components: {
    MainHeader,
    OnePost
  },
  data() {
    return {
      posts: [],
      token: localStorage.getItem('userToken')
    }
  },
  methods: {
    getPosts() {
      fetch('http://localhost:3000/api/posts', {
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      })
      .then(result => {
        if (result.ok) {
          return result.json()
        }
      })
      .then(data => {
        this.posts = data
      })
      .catch(error => {
        console.log(error)
      });
    },
  },
  mounted() {
    this.getPosts()
  }
}
</script>

<style lang="scss" scoped>
#page-container {
  border: 1px solid red;
  border-radius: 30px;
  padding: 0.1em;
  margin: 0.1em;
  & h1 {
    margin-bottom: 50px;
    border: 1px solid red;
    border-radius: 30px;
    padding: 0.5em;
    margin: 0.5em;
  }
}

#content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;
  margin: auto;
  width: 100%;
  & #postsList {
    padding: 0.2em;
    margin: 0.2em;
    width: 100%;
    & #noPost-msg {
      border-radius: 30px;
      padding: 0.5em;
      margin: 0.5em;
      display: flex;
      justify-content: center;
    }
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

@media screen and (min-width: 900px) {
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
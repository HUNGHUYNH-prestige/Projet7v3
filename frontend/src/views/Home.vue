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
          //console.log(result.ok)
          return result.json()
        }
      })
      .then(data => {
        // data -> post in posts
        console.log(data)
        //console.log(data.length)
        //console.log(data[1].Comments.length)
        //console.log(data[0].Comments[0].postId)
        //console.log(data[0].Comments[0].id)
        //console.log(data[0].Likes[0].userId)
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
  //border: 1px solid orange;
  border-radius: 30px;
  padding: 0px;
  margin: 10px;
  & h1 {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 50px;
    border-bottom: 1px solid green;
    padding: 0.1em;
    margin: 0.1em;
  }
}

#content {
  display: flex;
  //border: 1px solid orange;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  margin: 0px;
  width: 100%;
  & #postsList {
    //border: 1px solid orange;
    padding: 0em;
    margin: 0em;
    width: 100%;
    & #noPost-msg {
      //border: 1px solid orange;
      padding: 0em;
      margin: 0em;
      width: 100%;
    }
  }
}

@media screen and (min-width: 700px) {
    #content {
      //border: 1px solid orange;
      width: 100%;
    }
}

@media screen and (min-width: 800px) {
    #content {
      width: 100%;
    }
}

@media screen and (min-width: 900px) {
    #content {
      width: 100%;
    }
}

@media screen and (min-width: 1200px) {
    #content {
      width: 100%;
    }
}
</style>
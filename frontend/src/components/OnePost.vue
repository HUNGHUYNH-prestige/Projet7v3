<template>
  <div id="post-container">
    <!-- MAIN PAGE POST -->
    <div id="post-container_top">
      <div id="user-informations">
        <img v-bind:src="post.User.profilePicture" alt="photo de profil de l'utilisateur">
          <div>
            <p id="name">
              <router-link :to="{name: 'userProfile', params: {id: post.User.id}}">
                <span>{{post.User.firstname}} {{post.User.lastname}}</span>
              </router-link>
              a posté le :
              <time id="date">{{getDate(post.createdAt)}} à {{ getHour(post.createdAt) }}</time>
              <span class="departement"> dept. </span>
              <span id="department">{{post.User.department}}</span></p>
          </div>
      </div>
      <div v-if="post.User.id == currentUserId || userAdmin === true" id="post-options">
        <button @click="editionRedirection(post.id)" aria-label="Editer le post">
          <img src="../assets/edit.png" alt="icone d'édition du post">
        </button>
        <button v-on:click="deletePost(post.id)" aria-label="Supprimer le post">
          x
        </button>
      </div>
  </div>
    <!-- POST CONTENT -->
    <h2>{{post.title}}</h2>
    <figure id="postsList-img">
        <img :src="post.media" alt="image du post">
    </figure>
    <!-- POST BOTTOM -->
    <div id="bottom-line">
        <button id="likes" class="bottom-line_btn" @click="likePost" aria-label="Aimer le post">
          <img v-if="postIsLiked == false" src="../assets/like.svg" alt="icone like">
          <img v-else src="../assets/liked.png" alt="icone like">
            <p v-if="likesLength <= 1" class="bottom-line_btn_text">{{ likesLength }} like</p>
            <p v-else id="likes-nb" class="bottom-line_btn_text">{{ likesLength }} likes</p>
        </button>
        <router-link :to="{name: 'post', params: {id: post.id}}" id="comments" class="bottom-line_btn">
          <button >
              <img src="../assets/chat.svg" alt="icone commentaires">
              <p class="bottom-line_btn_text"><span id="comments_text">Commentaires </span>({{ commentsLength }})</p>
          </button>
        </router-link>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default ({
  name: 'OnePost',
  props: ['post', 'likesLength', 'commentsLength'],
  data() {
    return {
      userAdmin: JSON.parse(localStorage.getItem('userAdmin')),
      currentUserId: JSON.parse(localStorage.getItem('userId')),
      token: localStorage.getItem('userToken'),
      postIsLiked: false
    }
  },
  methods: {
    getDate(date) {
      // get a full date = timestamp without milliseconds
      return moment(date).locale('fr').format('LL');
    },
    getHour(hour) {
      // LT : Local Timing
      return moment(hour).locale('fr').format('LT')
    },
    editionRedirection(postId) {
      this.$router.push(`/posts/${postId}/edit`)
    },
    deletePost(id) {
      if (confirm("ATTENTION : Suppression du post ?")) {
        fetch('http://localhost:3000/api/posts/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`}
        })
        .then(res => {
            console.log(res)
            if (this.$route.path == '/home') {
              window.location.reload()
            } else {
              this.$router.push('/home')
            }
        })
        .catch(error => {
            console.log(error)
        })
      }
    },
    likePost() {
      fetch(`http://localhost:3000/api/posts/${this.post.id}/likes`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        }
      })
      .then(res => {
        console.log(res)
        window.location.reload()
      })
      .catch(error => {
        alert('Oh oh ! Action impossible !')
        console.log(error)
      })
    },
    getUserLike() {
      fetch(`http://localhost:3000/api/posts/${this.post.id}/like`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        }
      })
      .then(result => {
        //console.log(result.ok)
        if (result.ok) {
          //promise pending
          //console.log(result.json())
          return result.json()
        } else {
          return;
        }
      })
      .then(data => {
        //console.log(data)
        if (data !== null) {
          this.postIsLiked = true;
        }
      })
      .catch(error => {
        console.log(error)
      })
    }
  },
  mounted() {
    this.getUserLike();
  }
})
</script>

<style lang="scss" scoped>
#post-container {
  border: 1px solid green;
  border-radius: 20px;
  padding: 0.5em;
  margin: 0.5em;
  & h2 {
    font-size: 1em;
    margin-left: 1.5em;
    border-left: 1px solid green;
    padding-left: 1.5em;
  }
  & img {
    object-fit: contain;
    width: 100%;
    height: 300px;
  }
  & figure {
  border-top: 1px solid green;
  border-bottom: 1px solid green;
}
  &_top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 1.5em;

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
        color: black;
        font-weight: normal;
        font-size: 0.8em;
      }
    }
    & #date {
      font-size: 0.8em;
      color: darkblue;;
    }
    & .departement {
      color: green;
      font-size: 0.8em;
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
        background-color: #orange;
        color: white;
      }
    }
  }
}
}
router-link {
  text-decoration: none;
}
#bottom-line {
  display: flex;
  justify-content: space-around;
  padding: 0.5em;
  & .bottom-line_btn {
    display: flex;
    justify-content: center;
    background-color: white;
    border: none;
    align-items: center;
    cursor: pointer;
    & img {
      margin-right: 10px;
      height: 30px;
      width: 30px;
    }
  }
  & #likes {
    width: 50%;
    border-right: 1px solid green;
  }
  & #comments {
    width: 50%;
    & button {
      display: flex;
      background-color: transparent;
      border: none;
      align-items: center;
      cursor: pointer;
      padding: 0.8em;
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

@media screen and (max-width: 990px) {
  #bottom-line {
    padding: 10px;
    & #likes {
      width: 50%;
    }
    & #comments {
      width: 50%;
      &_text {
        display: none
      }
    }
    & .bottom-line_btn {
      display: flex;
      justify-content: center;
    }
  }
}

@media screen and (max-width: 800px) {
  #post-container {
    box-shadow: none;
    width: 90%;
  }
}
</style>
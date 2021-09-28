<template>
<div>
  <router-view :key="$route.fullPath"/>
  <footer>
    <div id="footer-text">{{ copyright }}</div>
    <div id="footer-links">
      <div id="footer-box">
        <router-link to="/charter">Règles de bonne conduite</router-link>
      </div>
      <div id="footer-box">
        <a href="mailto:administrateur-groupomania@gmail.com">Administrateur GROUPOMANIA</a>
      </div> 
    </div>
  </footer>
</div>
</template>

<script>
import { mapGetters } from "vuex"
// mapGetters => $store.getters. + computed object
export default {
  name: "App",
  computed: {
    ...mapGetters({
      copyright: "copyright"
    })
  }
}
</script>

<!-- scoped means only for this file -->
<style lang="scss" scoped>
* {
  font-family: Tahoma, Courier New, Courier, Verdana, Impact, Arial, Helvetica, sans-serif;
}

footer {
  border: 1px dotted pink;
  border-radius: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-item: center;
  background-color: lightpink;
  color: white;
  font-size: 1em;
  padding: 0.2em;
  margin: auto;
  width: 99%;
  height: 100%;
  & #footer-text {
    color: blue;
    width: 100%;
    display: flex;
    justify-content: center;
    align-item: center;
    border: 1px dotted pink;
    border-radius: 30px;
    padding: 1em;
    background: white;
  }
  & #footer-links {
    display: flex;
    justify-content: center;
    align-item: center;
    padding: 1em;
    width: 99%;
  }
  & #footer-box {
    display: flex;
    justify-content: center;
    align-item: center;
    padding: 0.2em 0.5em 0.2em 0.5em;
    & a {
      text-decoration: none;
      color: black;
      &:hover {
        border: 3px solid yellow;
        border-radius: 20px;
        color: black;
      }
    }
  }
}
</style>

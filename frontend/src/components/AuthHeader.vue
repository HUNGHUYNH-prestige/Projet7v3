<template>
    <header>
        <a href="#">
            <img id="logo" src="../assets/icon-left-font.svg" alt="logo Groupomania"/>
        </a>
        <nav>
            <ul>
                <li>
                    <router-link to="/signup" id="signup-link">Inscription</router-link>
                </li>
                <li>
                    <router-link to="/login" id="login-link">Connexion</router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
export default ({
    name: "AuthHeader",
})
</script>

<style scoped lang="scss">
header {
    //border: 1px solid pink;
    //border-radius: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: 0.5em;
    margin: auto;
    background: white;
    width: 95%;
    & a {
        //border: 1px solid red;
        //border-radius: 30px;
        //padding: 0.5em;
    }
    & #logo {
        //border: 1px solid red;
        //border-radius: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        width: 100%;
        margin: auto;
        padding: 0.1em;
    }
}

nav {
    //border: 1px solid red;
    //border-radius: 30px;
    & ul {
        //border: 1px solid red;
        //border-radius: 30px;
        list-style-type: none;
        display: flex;
        justify-content: center;
        align-items: center;
        & li {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
    // <router-link>  </router-link> = <a>  </a>
    & a {
        text-decoration: none;
        color: black;
        border: 1px solid pink;
        border-radius: 50px;
        padding: 0.8em;
        margin: 0.5em;
        &:hover {
        color: red;
        background: pink;
        }
    }
}

// split the header when mobile screen size
@media screen and (max-width: 900px) {
    header {
        //border: 1px solid red;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0px;
        margin: auto;
    }

    nav {
        //border: 1px solid red;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0px;
        margin: auto;
    }

    nav ul {
        //border: 1px solid red;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0em;
        margin: auto;
    }

    
    nav li {
        //border: 1px solid red;
        display: flex;
        padding-left: 0.1em;
        padding-right: 0.1em;
        justify-content: space-around;
        //width: 100%;
    }
    

    nav ul li a {
        color: black;
        &:hover {
            color: red;
            background: pink;
        }
    }
}

</style>

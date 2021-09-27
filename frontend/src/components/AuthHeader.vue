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
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: 1em;
    background: white;
    width: 95%;
    & #logo {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        width: 95%;
    }
}

nav {
    & ul {
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
        }
    }
}

// split the header when mobile screen size
@media screen and (max-width: 900px) {
    header {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    nav {
        width: 99%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    nav ul {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.2em;
        margin: 0px;
    }

    nav li {
        display: flex;
        justify-content: center;
        width: 100%;
    }

    nav li:hover {
        background: pink;
    }
}

</style>

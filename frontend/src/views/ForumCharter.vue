<template>
<div>
    <MainHeader />
    <div id="content">
        <div id="charter-text">
            <h1>ATTENTION : Règles de bonne conduite</h1>
            <p> Vous devez respecter le Règlement pour pouvoir profiter de cet espace convivial</p> 
        </div>
        <div id="rules">
            <h2>TOUTES PUBLICATIONS</h2>
            <ol>
                <li>LES MESSAGES DOIVENT RESTER PROFESSIONNELS</li>
                <li>LES IMAGES DE TYPE NUDE NE SONT PAS ADMISES SUR LE FORUM</li>
                <li>LES MESSAGES DOIVENT RESPECTER L'ORTHOGRAPHE ET LA GRAMMAIRE</li>
                <li>LES MESSAGES NE DOIVENT PAS CONTENIR D'INCITATION A LA HAINE, AU RACISME, OU TOUTES AUTRES FORMES DE DISCRIMINATIONS</li>
                <li>LES INFORMATIONS PERSONNELLES NE SONT PAS ADMISES SUR LE FORUM</li>
                <li>LES MESSAGES COMMERCIAUX NE SONT PAS ADMIS SUR LE FORUM</li>
                <li>LES INFORMATIONS PROFESSIONNELLES CONFIDENTIELLES DOIVENT RESTER CONFIDENTIELLES SELON LE SERVICE</li>
                <li>LES UTILISATEURS SONT UNIQUEMENT DES PERSONNES DU GROUPE GROUPOMANIA</li>
            </ol>
            <h2>TOUT UTILISATEUR</h2>
            <ol>
                <li>UNE IDENTITEE CORRESPONDANT A VOTRE PERSONNE</li>
                <li>UN EMAIL PROFESSIONNEL OU CELUI DU GROUPE</li>
                <li>VOUS ETES RESPONSABLE DE VOS DONNEES INFORMATIQUES</li>
            </ol>
            <h2>ADMINISTRATEUR</h2>
            <ol>
                <li>MODIFICATION ET SUPPRESSION POSSIBLES PAR L'ADMINISTRATEUR SI LES MESSAGES NE SONT PAS CORRECTS</li>
                <li>MODIFICATION ET SUPPRESSION POSSIBLES D'UN PROFIL UTILISATEUR SI LES REGLES NE SONT PAS RESPECTEES</li>
                <li>IL EST IMPORTANT DE RESPECTER LES DECISIONS DE L'ADMINISTRATEUR</li>
                <li>POUR TOUTES RECLAMATIONS ET DEMANDES, MERCI DE VOUS ADRESSER A VOTRE MANAGER DE SERVICE</li>
            </ol>
        </div>
    </div>
</div>
</template>

<script>
import MainHeader from '../components/MainHeader.vue'

export default ({
    name: 'ForumCharter',
    components: {
        MainHeader
    }
})
</script>

<style lang="scss" scoped>

#content {
    //border: 1px solid orange;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 0.1em;
    margin: 0.1em;
    width: 99%;
    height: 100%;
}

#charter-text {
    border: 1px solid red;
    padding: 0.1em;
    margin: 0.1em;
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    
    & h1 {
        //border: 1px solid red;
        text-align: center;
        width:100%;
        font-size: 3em;
        padding: 0.5em;
        margin: 0.5em;
    }
    & p {
        border: 1px solid grey;
        text-align: center;
        width: 100%;
        font-size: 2em;
        background: grey;
        color: white;
        padding: 0.5em;
        margin: 0.5em;
    }
}
#rules {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    padding: 2em;
    margin: 2em;
    border: 1px solid black;
    & h2 {
        border: 1px solid pink;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 0.1em;
        margin: 0.1em;
        background: pink;
    }
    & ol {
        //border: 1px solid blue;
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        justify-content: center;
        align-items: center;
        padding: 0.1em;
        maring: 0.1em;
    }
    & li {
        //border: 1px solid green;
        width: 100%;
        padding: 0.1em;
        margin: 0.1em;
    }
}
</style>
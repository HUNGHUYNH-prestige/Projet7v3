<template>
<div>
    <MainHeader />
    <div id="content">
        <div id="charter-text">
            <h1>ATTENTION : Règlement du forum</h1>
            <p> Vous devez respecter le Règlement pour pouvoir profiter de cette espace convivial</p> 
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
#charter-text {
    border: 1px solid red;
    padding: 2em;
    margin: 2em;
    display: flex;
    width: auto;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    
    & h1 {
        text-align: center;
        width:100%;
        font-size: 3em;
        padding: 0.5em;
        margin: 0.5em;
    }
    & p {
        text-align: center;
        width: 100%;
        font-size: 3em;
        background: grey;
        color: white;
        padding: 0.5em;
        margin: 0.5em;

    }
}
#rules {
    padding: 2em;
    margin: 2em;
    border: 1px solid red;
    width: auto;
}
</style>
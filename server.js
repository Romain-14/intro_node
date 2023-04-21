// node -> système de module commonJS
// on verra plus tard pour passer sur la syntaxe ES6
const http = require("http");
// fs est le système de fichier de node afin d'intéragir avec des fichiers dans notre application tel que lire, écrire...
const fs = require("fs");
// utiliser afin de joindre le chemin de notre appl' avec le chemin du fichier, ici, à envoyer
const path = require("path");

// définit le port sur lequel tourner, soit le port de l'environnement du service utilisé ( un cloud ...), soit on est en local et donc on lui définit un port fixe.
const PORT = process.env.port || 9000;

// création du server, en callback prends les 2 paramètre du cycle de communication entre client et serveur:
// request -> la requête envoyer par le client
// response -> la réponse à envoyer au client (depuis le serveur)
http.createServer((request, response) => {
    if(request.url === "/"){
        // __dirname est une variable d'environnement contenant le chemin où est executé le serveur
        // on demande à joindre le chemin de base avec le chemin depuis l'application jusqu'au fichier à envoyé en réponse
        // (error, data) est la callback pour gérer l'erreur, ou contenir le fichier à traiter
        fs.readFile(path.join(__dirname, "views/index.html"), (error, data) => {
            if(error) {
                // si il y a une erreur, on envoi un code status 404 (not found) et on termine le cycle de communication 
                response.writeHead(404);
                response.end();
                return;
            }
            // si pas d'erreur, on envoi le code status 200 (document trouvé), on transmets également le type de contenu(ici un fichier HTML (donc text/html)) on termine par envoyer le fichier traité par la méthode readFile
            response.writeHead(200, {"content-type" : "text/html"});
            response.end(data);
            return;
        });
    }

}).listen(PORT, () => {
    console.log(`Listening on: http://localhost:${PORT} ! `)
});
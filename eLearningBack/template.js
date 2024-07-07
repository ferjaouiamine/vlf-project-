exports.mail_new_user = async (username, password) => {
  var text = `
  Bonjour,

  Veuillez trouver ci-dessous les informations de connexion :

  Nom d'utilisateur : ${username}

  Mot de passe : ${password}


  Cet email est généré automatiquement.

  Bien cordialement
    `;

  return text;
};

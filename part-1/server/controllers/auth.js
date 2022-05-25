const bcrypt = require('bcryptjs');
const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && bcrypt.compare(password, users[i].password)) {
          let userToSend = {...users[i]};
          delete userToSend.password;
          res.status(200).send(userToSend);
          return;
        }
      }
      res.status(400).send("User not found.")
    },

    register: (req, res) => {
      const {username, email, firstName, lastName, password} = req.body;
      let salt = bcrypt.genSaltSync(5);
      let hashword = bcrypt.hashSync(password, salt);
      let user = {
        username,
        email,
        firstName,
        lastName,
        password: hashword
      }
      users.push(user);
      //is it necessary to copy user using spread to resUser or can I just
      //delete password prop off user since it's already pushed to users[]?
      const resUser = {...user};
      delete resUser.password;
      res.status(200).send(resUser);
    }
}
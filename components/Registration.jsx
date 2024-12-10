const React = require("react");
const Layout = require("./Layout");

module.exports = function Register({ title, user }) {
  return (
    <div>
      <Layout title={title} user={ user }>
        {user ? (
          <div>You are already loginned</div>
        ) : (
          <div>
            Registration
            <div className="registrationDiv">
                <form method="POST" className="registrationForm">
                    <div><label>Email: <input name="newUserEmail" type="text" /></label></div>
                    <div><label>Password: <input name="newUserPassword1" type="text" /></label></div>
                    <div><label>Confirm password: <input name="newUserPassword2" type="text" /></label></div>
                    <div><button id="regBtn" type="submit">Create new account</button></div>
                </form>
                <div className="messageDiv"></div>
            </div>
          </div>
        )}
      </Layout>
      <script defer src="/js/registration.script.js"></script>
    </div>
  );
};
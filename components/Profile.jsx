const React = require('react');
const Layout = require('./Layout');

module.exports = function Profile({ title, user }) {
    return (
        <div>
            <Layout title = { title }  user={ user }>
                {user ? (
                    <div>
                        <h2>{user.email}</h2>
                        <div>Personal data</div>
                    </div>
                ) : (
                    <div>You are not loginned</div>  
                )}
            </Layout>
            <script defer src='/js/login.script.js'></script>
        </div>
    )
}
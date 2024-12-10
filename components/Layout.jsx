const React = require('react');

module.exports = function Layout({ children, title, user }) {
    return (
        <html lang="en">
        <head>
            <title>{title}</title>
            <link rel="stylesheet" href="/css/style.css" />
            <script defer src='/js/script.js'></script>
        </head>
        <body>
            <header>
                <h1>RentOff</h1>
                {user ? 
                    (<nav>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/profile">Profile</a></li>
                        </ul>
                    </nav>) : (
                    <nav>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/login">Login</a></li>
                        </ul>
                    </nav>)
                }
            </header>
            <main>
                {children}
            </main>
        </body>
        </html>
    );
};
function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="text-center text-muted text-s py-6">
            <p>&copy; {year} Sukhman Kang | Built with React.js &amp; Node.js | <a href="" target="_blank" rel="noopener noreferrer" className="text-teal hover:text-accent transition">View on Github</a></p>
        </footer>
    );
}

export default Footer;
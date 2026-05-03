function Footer() {

  const linkStyle = "text-sm hover:text-white transition-colors";
  const headingStyle = "text-white font-semibold mb-3";

  return (
    <footer className="bg-gray-900 min-w-full  text-gray-300 mt-0.5 ">

      <div className="max-w-7xl mx-auto px-6 py-5 grid md:grid-cols-4 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-xl font-semibold text-white">Vivah E-Connect</h2>
          <p className="mt-3 text-sm">
            Connecting hearts and families through meaningful relationships.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className={headingStyle}>Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className={linkStyle}>Home</a></li>
            <li><a href="/profiles" className={linkStyle}>Browse Profiles</a></li>
            <li><a href="/connections" className={linkStyle}>Connections</a></li>
            <li><a href="/chat" className={linkStyle}>Messages</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className={headingStyle}>Support</h3>
          <ul className="space-y-2">
            <li><a href="#" className={linkStyle}>Help Center</a></li>
            <li><a href="#" className={linkStyle}>Privacy Policy</a></li>
            <li><a href="#" className={linkStyle}>Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className={headingStyle}>Contact</h3>
          <p className="text-sm">support@vivaheconnect.com</p>
          <p className="text-sm mt-1">+91 98765 43210</p>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} Vivah E-Connect
      </div>

    </footer>
  );
}

export default Footer;
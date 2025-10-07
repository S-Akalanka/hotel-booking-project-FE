import logo from "../images/logo.png";

export default function Footer() {
    
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center justify-center rounded-xl">
                  <img src={logo} alt="Logo" className="w-12" />
              </div>
              <h3 className="text-2xl font-display font-bold">Azure Retreat</h3>
            </div>
            <p className="text-primary-foreground/80 mb-6 max-w-md">
              Your gateway to extraordinary luxury accommodations around the
              world. Experience travel like never before.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Press
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Safety
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Cancellation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Privacy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center text-primary-foreground/60">
          <p>&copy; 2025 Azure Retreat. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

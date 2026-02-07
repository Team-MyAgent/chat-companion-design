import { Link } from "react-router-dom";
import { Search, ShoppingBag, User } from "lucide-react";

const categories = ["NEW", "OUTER", "TOP", "BOTTOM", "DRESS", "ACC&SHOES"];

const Navbar = () => {
  return (
    <header className="border-b border-border bg-card sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="text-xl font-bold tracking-widest text-foreground">
            MY AGENT
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {categories.map((cat) => (
              <Link
                key={cat}
                to="/"
                className="text-xs font-medium tracking-wider text-muted-foreground hover:text-foreground transition-colors"
              >
                {cat}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button className="text-foreground hover:text-muted-foreground transition-colors">
              <Search className="w-4 h-4" />
            </button>
            <button className="text-foreground hover:text-muted-foreground transition-colors">
              <User className="w-4 h-4" />
            </button>
            <button className="text-foreground hover:text-muted-foreground transition-colors relative">
              <ShoppingBag className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-foreground text-background text-[9px] rounded-full flex items-center justify-center font-medium">
                0
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

import { useState } from "react";
import { Phone, Menu, X, ChevronDown, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "/src/assets/Images/LIbraryLogo.png";
interface SubItem {
  to: string;
  label: string;
}

interface NavItem {
  to?: string;
  label: string;
  hasDropdown?: boolean;
  subItems?: SubItem[];
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems: NavItem[] = [
    { to: "/", label: "Home" },
    
    {
      label: "About Us",
      hasDropdown: true,
      subItems: [
        { to: "/about", label: "About" },
        { to: "/LibraryCommittee", label: "Library Advisory Committee" },
        { to: "/LibraryTeam", label: "Library Pillars" },
      ],
    },
    {
      label: "Services",
      hasDropdown: true,
      subItems: [
        { to: "/Library-info", label: "Library" },
        { to: "/studyRoom", label: "Study Room" },
      ],
    },
    { to: "/opac", label: "Online Catalogue (OPAC)" },
    { to: "/achivers", label: "Achievers" },
    { to: "/events", label: "Events" },
    { to: "/e-resource", label: "E-resource" },
    { to: "/donations", label: "Donations" },
    { to: "/contact", label: "Contact Us" },
  ];

  return (
    <header className="w-full">
      {/* Top Header with Logo and Contact Info */}
      <div className="bg-[#1B1464] text-[#FFFFF0] shadow-md">
        <div className="container mx-auto px-4 py-3 lg:py-6 flex items-center justify-between">
          <div className="flex items-center">
            <img src={logo} alt="Library Logo" className="h-12 lg:h-20 mr-3" />
            <div className="flex flex-col">
              <h1 className="text-sm lg:text-xl font-bold leading-tight">
                Late Dina Bama Patil Pratishthan's
              </h1>
              <h2 className="text-base lg:text-2xl font-bold text-[#DAA520] leading-tight">
                DINA BAMA PATIL LIBRARY & STUDY ROOM
              </h2>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-start gap-2">
              <Clock className="text-[#DAA520] mt-1" size={18} />
              <p className="text-normal">
              06:00 AM to 10:00 PM
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="text-[#DAA520]" size={18} />
              <p className="text-normal">+91 - 9702518684</p>
            </div>
          </div>

          <button
            onClick={toggleMenu}
            className="lg:hidden absolute right-4 top-4 text-[#DAA520]"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-[#1B1464] text-[#FFFFF0]">
        <div className={`${isMenuOpen ? "block" : "hidden"} lg:block w-full`}>
          <div className="container mx-auto">
            <ul className="flex flex-col lg:flex-row lg:items-center lg:justify-center px-4 py-2 lg:py-0">
              {navItems.map((item, index) => (
                <li key={index} className="relative group">
                  {item.hasDropdown ? (
                    <>
                      <div className="w-full lg:w-auto px-4 py-3 text-base font-medium hover:bg-[#8DB6CD] transition-colors duration-200 text-left lg:text-center whitespace-nowrap flex items-center justify-between cursor-pointer">
                        <span>{item.label}</span>
                        <ChevronDown
                          size={16}
                          className="ml-1 transform group-hover:rotate-180 transition-transform duration-200 text-[#DAA520]"
                        />
                      </div>
                      <ul
                        className="lg:absolute lg:top-full lg:left-0 lg:bg-[#1B1464] lg:min-w-[200px] lg:shadow-lg
                                   lg:hidden group-hover:block
                                   lg:group-hover:animate-fadeIn
                                   border-t-0 lg:border-t lg:border-[#8DB6CD]
                                   z-50"
                      >
                        {item.subItems?.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <Link
                              to={subItem.to}
                              className="block w-full text-left px-4 py-2 text-sm hover:bg-[#8DB6CD] whitespace-nowrap transition-colors duration-200"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {subItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    item.to && (
                      <Link
                        to={item.to}
                        className="block w-full lg:w-auto px-4 py-3 text-base font-medium hover:bg-[#8DB6CD] transition-colors duration-200 text-left lg:text-center whitespace-nowrap"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

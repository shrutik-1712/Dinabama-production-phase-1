import { useEffect } from 'react';

interface OPACProps {
  externalUrl?: string;
}

const OPAC: React.FC<OPACProps> = ({ externalUrl = 'http://49.128.160.229:9000/' }) => {
  useEffect(() => {
    // Open in new tab with security best practices
    const newWindow = window.open(externalUrl, '_blank');
    if (newWindow) {
      newWindow.opener = null;
    }
    
    // Optional: Redirect back to home or previous page
    // window.history.back();
  }, [externalUrl]);

  // Show loading state while opening new tab
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Opening OPAC System</h2>
        <p className="text-gray-600">The OPAC system is opening in a new tab.</p>
        <button 
          onClick={() => window.history.back()} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default OPAC;
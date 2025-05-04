import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 py-6 mt-10">
            <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-sm">
                <p className="mb-2 sm:mb-0">© {new Date().getFullYear()} Made with ❤️ by <span className="font-semibold">Chayan</span></p>
                <div className="flex gap-4">
                    <a href="#" className="hover:text-primary transition">Privacy</a>
                    <a href="#" className="hover:text-primary transition">Terms</a>
                    <a href="#" className="hover:text-primary transition">Contact</a>
                </div>
            </div>
        </footer>

    );
};

export default Footer;
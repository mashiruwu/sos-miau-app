const Header = () => {
    return (
        <div className="header sticky h-26 top-0 w-full flex items-center justify-between px-2 lg:px-10 bg-primary text-white">
            <div className="text-sm">Menu</div>
            <h1 className="font-tiny text-5xl">SOS Miau</h1>
            <div className="flex items-center gap-6">
                <p className="text-md uppercase">Entrar</p>
                <p className="text-md uppercase">Cadastrar</p>
            </div>
        </div>
    );
};

export default Header;

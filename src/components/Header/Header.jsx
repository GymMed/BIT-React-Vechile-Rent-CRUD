export default function Header({ AppName }) {
    return (
        <header className="py-5 px-10 flex justify-between items-center w-full bg-gradient-to-br from-primary-500 to-primary-700">
            <div className="text-accent-200 text-2xl font-bold">{AppName}</div>
            <nav></nav>
            <div className="text-accent-200 text-lg font-semibold">
                Hi fellow!
            </div>
        </header>
    );
}

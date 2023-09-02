import Search from "@/app/nav/Search";
import Logo from "@/app/nav/Logo";

export default function Navbar() {
    return(
        <header className={'sticky top-0 z-50 flex justify-between ng-white p-5 items-center text-grey-800 shadow-md'}>
            <Logo />
            <Search />
            <div>Right</div>
        </header>
    )
}

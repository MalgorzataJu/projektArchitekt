import {Login} from "../components/Authentication/Login";

export const HomeView = () => (
    <div className="home">
        <h1>Witamna stronie platformy Architekt.</h1>

        <Login/>
        <p>Platforma służy do rejestracji czasu pracy praconików.</p>
        <p>Pozwala zarządzać projektwami.</p>
    </div>
)
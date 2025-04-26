import { BrowserRouter, NavLink, Route, Routes } from "react-router";
import HomePage from "./pages/Home/Home";
import "./App.css";
import { useState } from "react";
import AddCardModal from "./components/AddCardModal/AddCardModal";
import Deck from "./pages/Deck/Deck";

function App() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="app">
            <nav>
                <ul>
                    <li>
                        <button onClick={() => setShowModal(true)}>
                            Add card
                        </button>
                    </li>
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? "active" : ""
                            }
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/deck"
                            className={({ isActive }) =>
                                isActive ? "active" : ""
                            }
                        >
                            Deck
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <AddCardModal
                open={showModal}
                onCloseModal={() => setShowModal(false)}
            />
            <Routes>
                <Route index element={<HomePage />} />
                <Route path="deck" element={<Deck />} />
            </Routes>
            <footer>
                <a
                    className="source-code"
                    href="https://github.com/Dinika/tab-notes"
                >
                    Source Code
                </a>
            </footer>
        </div>
    );
}

export default App;

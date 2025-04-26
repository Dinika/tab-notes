import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/Home/Home";
import "./App.css";
import { useState } from "react";
import AddCardModal from "./components/AddCardModal/AddCardModal";

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
                    <li>Home</li>
                    <li>Deck</li>
                </ul>
            </nav>
            <AddCardModal
                open={showModal}
                onCloseModal={() => setShowModal(false)}
            />
            <main>
                <BrowserRouter>
                    <Routes>
                        <Route index element={<HomePage />} />
                    </Routes>
                </BrowserRouter>
            </main>
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

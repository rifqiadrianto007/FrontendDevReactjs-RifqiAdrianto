import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "../pages/Login"
import Home from "../pages/Home"
import Detail from "../pages/Detail"

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/restaurants" element={<Home />} />
                <Route path="/restaurants/:id" element={<Detail />} />
            </Routes>
        </BrowserRouter>
    )
}

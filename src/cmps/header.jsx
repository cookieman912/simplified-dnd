import React from "react";
import { NavLink } from "react-router-dom";
export default function Header() {

    return (
        <header className="main-header">
            <div className="title-container">
                <p className="main-title">מבוכים ודרקונים</p>
                <p className="secondary title">הגרסה המפושטת</p>
            </div>

            <nav className="main-nav">
                <ul>
                    <li>
                        <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to={'/characters'}>דמויות</NavLink>
                    </li>
                    <li>
                        <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to={'/'}>בית</NavLink>
                    </li>
                </ul>
            </nav>

        </header>
    )
}
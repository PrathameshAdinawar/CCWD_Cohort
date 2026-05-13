import React from "react";
import { teas } from "./data.js";

export default function App() {
    return React.createElement(
        'div',
        { style: { backgroundColor: "black", color: "white" } },
        [
            React.createElement('h1', { key: 'h1' }, 'Hello world'),
            React.createElement('p', { key: 'p' }, 'This is paragraph'),
            React.createElement(
                'ul',
                { key: 'ul' },
                teas.map((tea) =>
                    React.createElement('li', { key: tea.id },
                        `${tea.name}:${tea.descriptiopm}`,
                    )
                )
            )
        ]
    )
}
import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function characterPreview(character) {
    character = character.character
    return (<card>
        <h1><Link to={'character-sheet/'+character.id}>{character.name}</Link></h1>
        
    </card>)
}
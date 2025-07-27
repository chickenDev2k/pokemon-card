import React from "react";
import "../card/Card.css";
import "../../App.css";

const Card = ({ pokemon }) => {
    return (
        <div className="card">
            <div className="cardImg">
                <img src={pokemon.sprites.front_default} alt="" />
            </div>
            <h3 className="cardName">{pokemon.name}</h3>
            <div className="cardType">
                <div className="">Type</div>
                {pokemon.types.map((type) => {
                    return (
                        <div key={type.type.name}>
                            <span>{type.type.name}</span>
                        </div>
                    );
                })}
            </div>
            <div className="cardInfor">
                <div className="cardData">
                    <p>Weight:{pokemon.weight}</p>
                </div>
                <div className="cardData">
                    <p>Height:{pokemon.height}</p>
                </div>
                <div className="cardData">
                    <p>Ability:{pokemon.abilities[0].ability.name}</p>
                </div>
            </div>
        </div>
    );
};

export default Card;

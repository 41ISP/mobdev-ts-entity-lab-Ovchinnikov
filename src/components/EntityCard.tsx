import { API_URL } from "../api";
import type { IItem } from "../types";

interface IItemCard extends IItem {

    
}

export function EntityCard({name,description,price, imgItem, QUANTITY ,sku, isActive,creationDate}: IItemCard ) {



    return (
        <article className="card">
            <div className="card__cover">
                <img src={API_URL + imgItem.url} alt={name} />
                <span>{imgItem.name}</span>
                <b className="card__badge">{QUANTITY > 50 ? "Всегда в наличии" : `осталось в наличие: ${QUANTITY}`}</b>
            </div>

            <div className="card__body">
                <h3>{name}</h3>

                <p className="card__desc">{description}</p>

                <p className="card__meta">Чекбокс: да</p>

                <div className="chips">
                    <span className="chip">Популярное</span>
                </div>
            </div>

            <footer className="card__footer">
                { price > 0 ? (<strong>{price} Р</strong>) : (<strong>Бесплатно</strong>)}
                <button className="link-btn">Удалить</button>
            </footer>
        </article>
    )
}

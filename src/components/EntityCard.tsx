import { API_URL } from "../api";
import type { IItem } from "../types";


// Явное описание пропсов с опциональными полями
interface IItemCardProps extends IItem {

}

function EntityCard ({
    name = "Без названия",
    description = "",
    price = 0,
    imgItem,
    QUANTITY = 0,
    sku = "",
    isActive = true,
    creationDate,
}: IItemCardProps) {
    
    const formattedDate = creationDate ? new Date(creationDate).toLocaleDateString('ru-RU') : '—';

    const availabilityText = QUANTITY > 50 
        ? "Всегда в наличии" 
        : `Осталось: ${QUANTITY} шт.`; 

    return (
        <article 
            className={`card ${!isActive ? 'card--disabled' : ''}`}
           
            
            aria-label={`Товар ${name}`}
        >
            <div className="card__cover">
                <img 
                    src={imgItem?.url ? API_URL + imgItem.url : '/placeholder-image.jpg'} 
                    alt={name} 
                    loading="lazy" 
                />
                <b className="card__badge">{availabilityText}</b>
            </div>

            <div className="card__body">
                <h3>{name}</h3>
                <p className="card__desc">{description || "Описание отсутствует."}</p>
                <div className="chips">
                    {sku && <span className="chip">Артикул: {sku}</span>}
                </div>
            </div>

            <footer className="card__footer">
                {price > 0 ? (
                    <strong>{price.toLocaleString('ru-RU')} ₽</strong>
                ) : (
                    <strong>Бесплатно</strong>
                )}
                <button 
                    className="link-btn" 
                    onClick={(e) => {
                        e.stopPropagation(); 
                      
                    }}
                   
                    aria-label={`Удалить товар ${name}`}
                >
                    Удалить
                </button>
            </footer>

          
            <time className="card__date" dateTime={creationDate}>
                Добавлено: {formattedDate}
            </time>
        </article>
    );
}


export default EntityCard ;
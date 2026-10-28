import { EntityCard } from "./components/EntityCard"
import { EntityForm } from "./components/EntityForm"
import { useItemStore } from "./store/useItemsStore"
import "./App.css"
import { useEffect, useState } from "react"




export default function App() {

    const {items, getGames} = useItemStore()
    const [error, setIsError] = useState<string | null>(null)
    const [loading, setIsLoading] = useState<boolean>(false)

 useEffect(() => {
        const load = async () => {
            setIsLoading(true)
            setIsError(null)
            try {
                await getGames()
            } catch (error) {
                console.error(error)
                setIsError('Что-то пошло не так')
            } finally {
                setIsLoading(false)
            }
        }
        load()
    }, [])

    useEffect(() => {
        console.log(items)
    }, [items])


    return (
        <div className="layout">
            <header className="top">
                <h1>Мои сущности</h1>
                <span className="pill">Количество</span>
            </header>

            <aside>
                <EntityForm />
            </aside>


               
            <main>
               {error && <p className="error">Ошибка: ошибка </p>}
               {loading && <p className="hint">Загрузка…</p>}
  {!loading && !error &&  items?.data && items.data.length > 0 ? (
                <div className="grid">
                    {items?.data.map((el) => (
  <EntityCard key={el.id} {...el} />
                    ))}
                  
                </div>
  ): (<p className="hint">Добавьте сущность</p>)}
  
            </main>
        </div>
    )
}

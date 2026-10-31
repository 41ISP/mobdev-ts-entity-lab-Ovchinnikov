import React, { useState } from "react";
import { api } from "../api";

import type { TItemInput } from "../types";
import { useItemStore } from "../store/useItemsStore";

// Начальные значения формы, соответствующие полям TItemInput
const initialForm: TItemInput = {
    name: '',
    description: '',
    price: 0,
    QUANTITY: 0,
    sku: '',
    creationDate: new Date().toISOString().slice(0, 10),
};

export function EntityForm() {
    const [form, setForm] = useState<TItemInput>(initialForm);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { getItems} = useItemStore();

    
    const onChange = <K extends keyof TItemInput>(key: K, value: TItemInput[K]) => {
        setForm((o) => ({ ...o, [key]: value }));
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            
            await api.createItem(form); 
            getItems();
          
            setForm(initialForm);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={onSubmit} className="form">
            <h2>Добавить товар</h2>

            <label className="field">
                Название
                <input 
                    onChange={(e) => onChange('name', e.target.value)} 
                    type="text" 
                    name="name" 
                    value={form.name} 
                    required 
                />
            </label>

            <label className="field">
                Описание
                <textarea 
                    rows={3} 
                    onChange={(e) => onChange('description', e.target.value)} 
                    name="description" 
                    value={form.description}
                />
            </label>

            <div className="row">
                <label className="field">
                    Цена, ₽
                    <input 
                        onChange={(e) => onChange('price', Number(e.target.value))} 
                        type="number" 
                        name="price" 
                        value={form.price} 
                        min={0} 
                        step={0.01} 
                    />
                </label>
                <label className="field">
                    Количество
                    <input 
                        onChange={(e) => onChange('QUANTITY', Number(e.target.value))} 
                        type="number" 
                        name="QUANTITY" 
                        value={form.QUANTITY} 
                        min={0} 
                        step={1} 
                    />
                </label>
            </div>

            <div className="row">
                <label className="field">
                    Артикул (SKU)
                    <input 
                        onChange={(e) => onChange('sku', e.target.value)} 
                        type="text" 
                        name="sku" 
                        value={form.sku} 
                    />
                </label>
                <label className="field">
                    Дата добавления
                    <input 
                        onChange={(e) => onChange('creationDate', e.target.value)} 
                        type="date" 
                        name="creationDate" 
                        value={form.creationDate} 
                        required 
                    />
                </label>
            </div>

    
            <label className="check">
                <input 
                    type="checkbox" 
                    checked={form.isActive} 
                    onChange={(e) => onChange('isActive', e.target.checked)} 
                />
                Активен
            </label>
            

            <button disabled={isLoading} className="btn">
                {isLoading ? "Сохраняем…" : "Добавить товар"}
            </button>
        </form>
    );
}
import React, { useEffect, useState } from "react";
import { createCategory, getCategories } from "../../services/category.service";

const CategoryForm = () => {

    const [categories, setCategories] = useState([]);

    const [form, setForm] = useState({
        name: "",
        description: "",
        parentCategory: "",
        isActive: true
    });

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const res = await getCategories();
            setCategories(res.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await createCategory(form);

            alert("Category Created Successfully");

            setForm({
                name: "",
                description: "",
                parentCategory: "",
                isActive: true
            });

            loadCategories();

        } catch (error) {
            console.log(error);
        }

    };

    return (

        <div className="card p-4">

            <h2>Category Management</h2>

            <form onSubmit={handleSubmit}>

                <div className="mb-3">

                    <label>Name</label>

                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />

                </div>

                <div className="mb-3">

                    <label>Description</label>

                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        className="form-control"
                    />

                </div>

                <div className="mb-3">

                    <label>Parent Category</label>

                    <select
                        name="parentCategory"
                        value={form.parentCategory}
                        onChange={handleChange}
                        className="form-control"
                    >

                        <option value="">Main Category</option>

                        {categories.map(category => (

                            <option
                                key={category._id}
                                value={category._id}
                            >
                                {category.name}
                            </option>

                        ))}

                    </select>

                </div>

                <div className="mb-3">

                    <label>

                        <input
                            type="checkbox"
                            name="isActive"
                            checked={form.isActive}
                            onChange={handleChange}
                        />

                        Active

                    </label>

                </div>

                <button
                    className="btn btn-primary"
                    type="submit"
                >
                    Save Category
                </button>

            </form>

        </div>

    );

};

export default CategoryForm;